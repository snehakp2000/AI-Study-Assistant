const express = require('express');
const authMiddleWare = require('../middleware/authMiddleware');
const { summarizeNote, quizGenerator, flashcardGenerator } = require('../controllers/aiController');

const router = express.Router();


router.post('/summarize/:id',authMiddleWare,summarizeNote);

router.post('/quiz/:id',authMiddleWare,quizGenerator);

router.post('/flashcards/:id',authMiddleWare,flashcardGenerator);

module.exports = router;