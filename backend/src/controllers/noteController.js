
const Note = require('../models/NoteModel')


exports.createnotes = async (req,res) =>{
    try{

        const {title,content} = req.body;

        if(!title || !content){
            return res.status(400).json({
                success:false,
                message:'fill all required fields'
            });
        }

        const newnote=await  Note.create({
           title:title,
           content:content,
           userId:req.user.userId
        })

        return res.status(201).json({
            success:true,
            message:"successfully created the Note",
            newnote
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.getallnotes = async (req,res ) =>{
    try{
        const allnotes =await Note.find({userId:req.user.userId});

        if (allnotes.length === 0) {
    return res.status(200).json({
        success: true,
        message: "No notes found",
        notes: []
    });
}
        return res.status(200).json({
            success:true,
             count: allnotes.length,
            notes:allnotes
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// get single node using id

exports.getonenote = async (req,res) =>{
    try{
       const note = await Note.findOne({_id:req.params.id, userId:req.user.userId});

       if(!note){
        return res.status(200).json({
            success:true,
            message:'No data Founded'
        })
       }
       return res.status(200).json({
        success:true,
        note
       })
    }
    catch(err){
     return res.status(500).json({
        success:false,
        message:err.message
     })
    }
}


exports.updatenote = async (req,res) =>{
    try{
      const {title,content} = req.body;
      
       const findnote = await Note.findOne({_id:req.params.id,userId:req.user.userId});
      
       if(!findnote){
        return res.status(400).json({
            success:false,
            message:"no corresponding notes found"
        })
       }
       
      if(title) findnote.title = title;
       if(content) findnote.content = content;

       await findnote.save();
    
           return res.status(200).json({
            success:true,
            message: "Note updated successfully" ,
            note:findnote
           })
      

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.deletenote = async(req,res) =>{
    try{
       const deletedone = await Note.findOneAndDelete({
        _id:req.params.id,userId:req.user.userId
       })
       if(!deletedone){
        return  res.status(404).json({
            success:false,
            message:"No corresponding note find"
        })
       }

       return res.status(200).json({
        success:true,
        message:"Note deleted successfully"
       })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}