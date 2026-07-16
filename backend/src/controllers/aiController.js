const Note = require('../models/NoteModel');
const { summerizeText, quizGenerator:generateQuiz,flashcardGenerator } = require('../services/geminiService');

exports.summarizeNote = async (req,res) =>{
    try{

        const note = await Note.findOne({
            userId:req.user.userId,
            _id:req.params.id
        })

        if(!note){
            return res.status(401).json({
                success:false,
                message:'No record find'
            })
        }

        const summary = await summerizeText(note.content);

        return res.status(200).json({
            success:true,
            message:'successfully created Summary',
            summary
        })





    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.quizGenerator = async (req,res) =>{

    try{
        
          const  note = await Note.findOne({
        userId:req.user.userId,
        _id:req.params.id
    });
      
    if(!note){
        return res.status(401).json({
            success:false,
            message:'Note does not containing content'
        })
    }

    const quiz = await generateQuiz(note.content);

    
    
    res.status(200).json({
        success:true,
        message:'Successfully quiz generated',
        quiz
    })
    }
     catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
     }
  

    
}

exports.flashcardGenerator = async(req,res) => {
      try {

        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!note) {

            return res.status(404).json({
                success: false,
                message: "Note not found"
            });

        }

        const flashcards = await flashcardGenerator(note.content);

        return res.status(200).json({
            success: true,
            flashcards
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
}