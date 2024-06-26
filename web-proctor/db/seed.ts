import { db, User, ExamTable } from 'astro:db';
import { Argon2id } from "oslo/password";

const hashedPassword = await new Argon2id().hash('pw123');

export default async function() {
    await db.insert(User).values([
        { id: '1', username: 'user1', hashed_password: hashedPassword },
        { id: '2', username: 'user2', hashed_password: hashedPassword },
        { id: '3', username: 'user3', hashed_password: hashedPassword },
    ]);

    await db.insert(ExamTable).values([
        {id: 1, name: 'Food Safety Certification',
            questions: 
            [
                {
                "question": "What is the temperature range in which perishable foods should be stored to prevent bacterial growth?",
                "options": [
                    "a. 32°F - 40°F",
                    "b. 40°F - 140°F",
                    "c. 140°F - 165°F",
                    "d. 165°F - 212°F"
                ],
                "answer": "b. 40°F - 140°F"
                },
                {
                "question": "Which microorganism is commonly associated with undercooked poultry and eggs?",
                "options": [
                    "a. Salmonella",
                    "b. E. coli",
                    "c. Listeria",
                    "d. Norovirus"
                ],
                "answer": "a. Salmonella"
                },
                {
                "question": "What is the recommended minimum internal cooking temperature for ground beef?",
                "options": [
                    "a. 145°F",
                    "b. 160°F",
                    "c. 165°F",
                    "d. 180°F"
                ],
                "answer": "b. 160°F"
                },
                {
                "question": "Which of the following is a symptom of foodborne illness?",
                "options": [
                    "a. Sneezing",
                    "b. Headache",
                    "c. Drowsiness",
                    "d. All of the above"
                ],
                "answer": "d. All of the above"
                },
                {
                "question": "Cross-contamination is the transfer of:",
                "options": [
                    "a. Heat from one food to another",
                    "b. Bacteria from one surface or food to another",
                    "c. Flavors between different foods",
                    "d. None of the above"
                ],
                "answer": "b. Bacteria from one surface or food to another"
                },
                {
                "question": "What is the danger zone for bacterial growth in food?",
                "options": [
                    "a. 32°F - 40°F",
                    "b. 40°F - 140°F",
                    "c. 140°F - 165°F",
                    "d. 165°F - 212°F"
                ],
                "answer": "b. 40°F - 140°F"
                },
                {
                "question": "Which type of food is most likely to cause botulism if not handled properly?",
                "options": [
                    "a. Canned vegetables",
                    "b. Fresh fruits",
                    "c. Raw poultry",
                    "d. Fermented dairy products"
                ],
                "answer": "a. Canned vegetables"
                },
                {
                "question": "What is the main cause of most foodborne illnesses?",
                "options": [
                    "a. Allergens",
                    "b. Contaminated water",
                    "c. Improper food handling and preparation",
                    "d. Genetic factors"
                ],
                "answer": "c. Improper food handling and preparation"
                },
                {
                "question": "How long can perishable foods be safely left at room temperature?",
                "options": [
                    "a. 1 hour",
                    "b. 2 hours",
                    "c. 4 hours",
                    "d. 6 hours"
                ],
                "answer": "b. 2 hours"
                },
                {
                "question": "Which of the following is an example of a physical contaminant in food?",
                "options": [
                    "a. Bacteria",
                    "b. Glass shards",
                    "c. Mold",
                    "d. Viruses"
                ],
                "answer": "b. Glass shards"
                },
                {
                "question": "Which government agency is responsible for regulating and ensuring food safety in the United States?",
                "options": [
                    "a. FDA (Food and Drug Administration)",
                    "b. USDA (United States Department of Agriculture)",
                    "c. CDC (Centers for Disease Control and Prevention)",
                    "d. EPA (Environmental Protection Agency)"
                ],
                "answer": "a. FDA (Food and Drug Administration)"
                },
                {
                "question": "What is the recommended method for thawing frozen meats?",
                "options": [
                    "a. Microwave",
                    "b. Room temperature",
                    "c. In the refrigerator",
                    "d. Boiling water"
                ],
                "answer": "c. In the refrigerator"
                },
                {
                "question": "Which foodborne pathogen is associated with improperly canned goods?",
                "options": [
                    "a. Salmonella",
                    "b. E. coli",
                    "c. Clostridium botulinum",
                    "d. Staphylococcus aureus"
                ],
                "answer": "c. Clostridium botulinum"
                },
                {
                "question": "What is the correct way to wash hands before handling food?",
                "options": [
                    "a. Rinse with water only",
                    "b. Use cold water and soap for 10 seconds",
                    "c. Use warm water and soap for at least 20 seconds",
                    "d. Use hand sanitizer only"
                ],
                "answer": "c. Use warm water and soap for at least 20 seconds"
                },
                {
                "question": "Which of the following is a safe method for defrosting frozen food quickly?",
                "options": [
                    "a. Leave it on the kitchen counter",
                    "b. Use a hairdryer on low heat",
                    "c. Defrost in the refrigerator",
                    "d. Run hot water over it"
                ],
                "answer": "c. Defrost in the refrigerator"
                },
                {
                "question": "What is the first step in the process of safe food storage?",
                "options": [
                    "a. Labeling",
                    "b. Cooling",
                    "c. Cleaning",
                    "d. Washing"
                ],
                "answer": "c. Cleaning"
                },
                {
                "question": "Which foodborne pathogen is commonly associated with raw shellfish?",
                "options": [
                    "a. Norovirus",
                    "b. Listeria",
                    "c. Vibrio vulnificus",
                    "d. Campylobacter"
                ],
                "answer": "c. Vibrio vulnificus"
                },
                {
                "question": "How often should cutting boards be cleaned and sanitized in a commercial kitchen?",
                "options": [
                    "a. Once a day",
                    "b. Once a week",
                    "c. After each use",
                    "d. Once a month"
                ],
                "answer": "c. After each use"
                },
                {
                "question": "What is the recommended minimum internal cooking temperature for poultry?",
                "options": [
                    "a. 145°F",
                    "b. 160°F",
                    "c. 165°F",
                    "d. 180°F"
                ],
                "answer": "c. 165°F"
                },
                {
                "question": "Which of the following is a common symptom of foodborne botulism?",
                "options": [
                    "a. Diarrhea",
                    "b. Muscle weakness",
                    "c. Nausea",
                    "d. Fever"
                ],
                "answer": "b. Muscle weakness"
                },
                {
                "question": "What is the primary purpose of HACCP (Hazard Analysis and Critical Control Points) in food safety?",
                "options": [
                    "a. Training food handlers",
                    "b. Identifying and preventing food safety hazards",
                    "c. Inspecting restaurants",
                    "d. Setting temperature guidelines"
                ],
                "answer": "b. Identifying and preventing food safety hazards"
                },
                {
                "question": "What is the primary cause of foodborne illness outbreaks linked to raw vegetables and fruits?",
                "options": [
                    "a. Cross-contamination",
                    "b. Improper storage",
                    "c. Pesticide residues",
                    "d. Inadequate washing"
                ],
                "answer": "a. Cross-contamination"
                },
                {
                "question": "Which is an example of a high-risk population for foodborne illness?",
                "options": [
                    "a. Young adults",
                    "b. Pregnant women",
                    "c. Athletes",
                    "d. Vegetarians"
                ],
                "answer": "b. Pregnant women"
                },
                {
                "question": "What is the best method for cooling hot food quickly to prevent bacterial growth?",
                "options": [
                    "a. Leave it on the counter to cool naturally",
                    "b. Refrigerate it immediately",
                    "c. Use a fan to blow cool air over it",
                    "d. Place it in an airtight container"
                ],
                "answer": "b. Refrigerate it immediately"
                },
                {
                "question": "Which food safety principle involves keeping raw and cooked foods separate to prevent cross-contamination?",
                "options": [
                    "a. Temperature control",
                    "b. Personal hygiene",
                    "c. Avoiding time-temperature abuse",
                    "d. Prevention of cross-contamination"
                ],
                "answer": "d. Prevention of cross-contamination"
                }
            ]
        }
    ])
}
