
const fs = require('fs');

const pdfParse = require('pdf-parse');

const Note = require('../models/NoteModel');


exports.uploadPdf = async (req, res) => {
try{
   if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Please upload a PDF file"
    });
}
   const dataBuffer = fs.readFileSync(req.file.path);

   console.log(pdfParse);

   const data = await pdfParse(dataBuffer);



   if (!data.text || !data.text.trim()){
    
    return res.status(400).json({
        success:false,
        message:"pdf not containing any content"
    })


   }

   const  note =  await Note.create({
    title:req.file.originalname,
        content:data.text,
        userId:req.user.userId
    })
    if(note){
        try {
    fs.unlinkSync(req.file.path);
} catch (error) {
    console.log("File deletion failed:", error.message);
}
    }
return res.status(201).json({
        success: true,
        message: "PDF uploaded and note created successfully",
        note
    });
}
   catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
   } 

}