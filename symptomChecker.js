// symptomChecker.js - Disease Detection Logic

function checkSymptoms(symptoms) {
    const diseaseDatabase = [
        {
            disease: "Common Cold",
            symptoms: ["sneezing", "runny nose", "cough"],
            advice: "Drink warm fluids, get rest. Consult a doctor if symptoms persist for more than a week."
        },
        {
            disease: "Flu (Influenza)",
            symptoms: ["fever", "cough", "body pain", "fatigue"],
            advice: "Rest well, stay hydrated. Seek medical attention if fever is very high or you have difficulty breathing."
        },
        {
            disease: "Food Poisoning",
            symptoms: ["vomiting", "stomach pain", "diarrhea", "nausea"],
            advice: "Stay hydrated with electrolyte solutions. Seek medical help immediately if severe or prolonged."
        },
        {
            disease: "Migraine/Headache",
            symptoms: ["headache", "dizziness", "nausea"],
            advice: "Rest in a quiet, dark room. Apply cold compress. Consult doctor if frequent."
        },
        {
            disease: "Allergy",
            symptoms: ["itching", "sneezing", "runny nose", "watery eyes"],
            advice: "Avoid allergens. Take antihistamine if available. Consult doctor if severe."
        },
        {
            disease: "🚨 POSSIBLE EMERGENCY",
            symptoms: ["chest pain", "difficulty breathing", "severe headache"],
            advice: "⚠️ SEEK IMMEDIATE MEDICAL ATTENTION. Call emergency services immediately!"
        },
        {
            disease: "🚨 POSSIBLE EMERGENCY",
            symptoms: ["loss of consciousness", "severe bleeding", "difficulty breathing"],
            advice: "⚠️ CALL EMERGENCY SERVICES (108) IMMEDIATELY!"
        }
    ];

    let results = [];

    diseaseDatabase.forEach(entry => {
        // Count matching symptoms
        const matchCount = entry.symptoms.filter(symptom =>
            symptoms.some(userSymptom => 
                userSymptom.toLowerCase() === symptom.toLowerCase()
            )
        ).length;

        // If 2+ symptoms match, add to results
        if (matchCount >= 2) {
            results.push({
                disease: entry.disease,
                advice: entry.advice,
                matchedSymptoms: matchCount
            });
        }
    });

    // Sort by match count (emergency first)
    results.sort((a, b) => b.matchedSymptoms - a.matchedSymptoms);

    if (results.length === 0) {
        return [
            {
                disease: "No Specific Match",
                advice: "Your symptoms don't match any common conditions. Please consult a doctor for proper diagnosis."
            }
        ];
    }

    return results;
}

module.exports = checkSymptoms;
