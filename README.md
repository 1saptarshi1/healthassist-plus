🏥 HealthAssist+

A simple healthcare assistant for early guidance, medicine reminders, and emergencies.

HealthAssist+ is a lightweight web platform built during a hackathon to solve three everyday healthcare problems with one easy-to-use solution:

Understanding symptoms early

Remembering medicines on time

Getting help fast during emergencies


All in one place. No complexity. No jargon.

✨ What This App Does

🔍 Symptom Checker

Users select symptoms they are experiencing

The system shows possible common conditions

Provides basic precautions and clear guidance

Highlights emergency symptoms (e.g. chest pain, breathing issues)


⚠️ Informational only. Not a medical diagnosis.


---

💊 Medicine Reminder

Add medicine name, dosage, and time

View all reminders on the dashboard

Helpful notes like “after food”

Data is safely stored and persistent


No more forgotten doses.


---

🚨 Emergency Alert

One-click emergency button

Instantly alerts the saved emergency contact

Shows confirmation and next-step guidance

Designed to easily extend to SMS / WhatsApp APIs


Simple, fast, and stress-free.


---

👤 User Accounts

Secure registration and login

Passwords hashed with BCrypt

Each user has their own data and emergency contact

Session-based authentication



---

🛠 Tech Stack (Hackathon-Friendly)

Backend: Node.js + Express.js

Database: MongoDB + Mongoose

Frontend: HTML, CSS, JavaScript

Templating: EJS

Auth: Sessions + BCrypt


Chosen because it is:

Fast to build

Easy to explain

Scalable beyond the hackathon



---

🚀 How It Works (Simple View)

Symptom Flow

User selects symptoms
→ System matches common conditions
→ Shows results ranked by relevance
→ Displays precautions & emergency warnings

Data Flow

Browser → Express Routes → MongoDB


---

📦 Installation (Quick Start)

# Install dependencies
npm install

# Start MongoDB (local or Atlas)

# Run server
npm start

# Open in browser
http://localhost:3000

MongoDB Atlas can be used by adding the connection string to .env.


---

📁 Project Structure (Overview)

healthassist-plus/
├── app.js                    # Main Express server
├── User.js                   # User database model
├── MedicineReminder.js       # Medicine reminder model
├── SymptomCheck.js          # Symptom history model
├── symptomChecker.js        # Core symptom logic
├── .env                      # Configuration (not in git)
├── package.json              # Dependencies
├── public/
│   └── styles.css           # All CSS styling
├── views/
│   ├── index.ejs            # Login/Register
│   ├── dashboard.ejs        # Main dashboard
│   ├── symptom-checker.ejs  # Symptom checker UI
│   ├── medicine-reminders.ejs
│   ├── emergency.ejs
│   ├── emergency-success.ejs
│   └── error.ejs
└── README.md                 # This file

---

🌍 Impact & Social Value

HealthAssist+ is designed for:

👵 Elderly users who need reminders and emergency help

🏘️ Rural users with limited doctor access

📱 Busy urban users who forget medicines

🌍 Anyone needing quick, reliable health guidance


Aligned with:

UN SDG 3: Good Health & Well-being

UN SDG 10: Reduced Inequalities



---

🔮 Future Scope

Push notifications for reminders

SMS / WhatsApp emergency alerts

Doctor chat or telemedicine

Mobile app version

Wearable & smartwatch integration



---

🔒 Security Highlights

Password hashing (BCrypt)

Protected routes

No sensitive data in URLs

Ready for HTTPS deployment



---

🎯 Hackathon Context

HackArena 2026 – Track 5: Healthcare & Assistive Technology

Why this project stands out:

Solves real-world problems

Fully working prototype

Simple logic, strong impact

Easy to scale after the hackathon



---

❤️ Final Note

HealthAssist+ is not about fancy AI claims.
It’s about clarity, speed, and care—especially when people need it most.

Saving lives, one reminder and one alert at a time.

