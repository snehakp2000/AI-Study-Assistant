const {GoogleGenerativeAI} = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const summerizeText = async (content) =>{




const prompt = `summarize the following content in simple bullet points: 
Rules:
- Maximum 5 bullet points
- Keep under 100 words
- Focus only on key skills, experience, and projects
${content} `;


// const prompt = "What is React?";

const result = await model.generateContent(prompt);

return result.response.text();

}


const quizGenerator = async (content) =>{

   const prompt = ` Generate 10 multiple-choice questions from the following content.

Return ONLY valid JSON.

Format:

[
 {
   "question":"",
   "options":["","","",""],
   "answer":""
 }
] ${content}`;

const result = await model.generateContent(prompt);


let quiz = result.response.text();

// Remove markdown if Gemini returns ```json ... ```
quiz = quiz.replace(/```json/g, "");
quiz = quiz.replace(/```/g, "");
quiz = quiz.trim();

// Convert string to JavaScript array
const parsedQuiz = JSON.parse(quiz);

return parsedQuiz;

}


const flashcardGenerator = async (content) => {

    const prompt = `
Generate exactly 10 flashcards from the following study material.

Rules:
1. Return ONLY valid JSON.
2. Do NOT return markdown (no \`\`\`json).
3. Each flashcard should have:
   - question
   - answer
4. Keep answers short (1-3 sentences).
5. Focus on important concepts only.

Format:

[
  {
    "question": "What is React?",
    "answer": "React is a JavaScript library used to build user interfaces."
  }
]

Study Material:

${content}
`;

    const result = await model.generateContent(prompt);

    let flashcards = result.response.text();

    // Remove markdown if Gemini returns ```json
    flashcards = flashcards.replace(/```json/g, "");
    flashcards = flashcards.replace(/```/g, "");
    flashcards = flashcards.trim();

    const parsedFlashcards = JSON.parse(flashcards);

    return parsedFlashcards;
};

module.exports = { summerizeText, quizGenerator ,flashcardGenerator }

