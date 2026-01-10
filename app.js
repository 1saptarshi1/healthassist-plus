require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const checkSymptoms = require('./symptomChecker');

// Import Models
const User = require('./User');
const MedicineReminder = require('./MedicineReminder');
const SymptomCheck = require('./SymptomCheck');

const app = express();

// ============= MIDDLEWARE =============
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// ============= DATABASE CONNECTION =============
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthassist')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));

// ============= ROUTES =============

// 1. HOME - LOGIN PAGE
app.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('index');
});

// 2. REGISTER
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, emergencyContact } = req.body;

        if (password !== confirmPassword) {
            return res.send('<script>alert("Passwords do not match"); history.back();</script>');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('<script>alert("Email already registered"); history.back();</script>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            emergencyContact
        });

        await user.save();
        res.redirect('/');
    } catch (err) {
        res.send(`<script>alert("Registration Error: ${err.message}"); history.back();</script>`);
    }
});

// 3. LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.send('<script>alert("User not found"); history.back();</script>');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('<script>alert("Invalid password"); history.back();</script>');
        }

        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect('/dashboard');
    } catch (err) {
        res.send(`<script>alert("Login Error: ${err.message}"); history.back();</script>`);
    }
});

// 4. DASHBOARD (Protected)
app.get('/dashboard', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const user = await User.findById(req.session.userId);
        const reminders = await MedicineReminder.find({ userId: req.session.userId });
        res.render('dashboard', { user, reminders });
    } catch (err) {
        res.send('Error loading dashboard');
    }
});

// 5. SYMPTOM CHECKER PAGE
app.get('/symptom-checker', (req, res) => {
    if (!req.session.userId) return res.redirect('/');
    res.render('symptom-checker', { results: null });
});

// 6. CHECK SYMPTOMS
app.post('/check-symptoms', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const symptoms = Array.isArray(req.body.symptoms) 
            ? req.body.symptoms 
            : [req.body.symptoms];

        const results = checkSymptoms(symptoms);

        // Save to database
        const symptomCheck = new SymptomCheck({
            userId: req.session.userId,
            symptoms: symptoms,
            results: results.map(r => r.disease)
        });
        await symptomCheck.save();

        res.render('symptom-checker', { results, symptoms });
    } catch (err) {
        res.send('Error checking symptoms');
    }
});

// 7. MEDICINE REMINDERS PAGE
app.get('/medicine-reminders', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const reminders = await MedicineReminder.find({ userId: req.session.userId });
        res.render('medicine-reminders', { reminders });
    } catch (err) {
        res.send('Error loading reminders');
    }
});

// 8. ADD MEDICINE REMINDER
app.post('/add-medicine', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const { medicineName, dosage, time, description } = req.body;
        const reminder = new MedicineReminder({
            userId: req.session.userId,
            medicineName,
            dosage,
            time,
            description
        });
        await reminder.save();
        res.redirect('/medicine-reminders');
    } catch (err) {
        res.send('Error adding medicine');
    }
});

// 9. DELETE MEDICINE
app.post('/delete-medicine/:id', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        await MedicineReminder.findByIdAndDelete(req.params.id);
        res.redirect('/medicine-reminders');
    } catch (err) {
        res.send('Error deleting medicine');
    }
});

// 10. EMERGENCY ALERT PAGE
app.get('/emergency', (req, res) => {
    if (!req.session.userId) return res.redirect('/');
    res.render('emergency');
});

// 11. SEND EMERGENCY ALERT
app.post('/send-emergency', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    try {
        const user = await User.findById(req.session.userId);
        // Simulation: In real app, send SMS/notification
        console.log(`🚨 EMERGENCY ALERT: ${user.name} (${user.phone}) - Contact: ${user.emergencyContact}`);
        
        res.render('emergency-success', { name: user.name, contact: user.emergencyContact });
    } catch (err) {
        res.send('Error sending emergency alert');
    }
});

// 12. LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

// ============= ERROR HANDLER =============
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

// ============= START SERVER =============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════╗
║   🏥 HealthAssist+ Platform 🏥   ║
║   Smart Healthcare Assistance     ║
╚═══════════════════════════════════╝

🚀 Server running on http://localhost:${PORT}
📱 Login/Register: http://localhost:${PORT}/
🔍 Symptom Checker: http://localhost:${PORT}/symptom-checker
💊 Medicine Reminders: http://localhost:${PORT}/medicine-reminders
🚨 Emergency Alert: http://localhost:${PORT}/emergency
✅ MongoDB Connected
    `);
});
