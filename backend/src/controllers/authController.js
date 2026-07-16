const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const generatedToken = require('../utils/generateToken');



exports.register = async (req,res) =>{
    
    try{

       const {name,email,password} =req.body;
       if(!name || !email || !password){
         return res.status(400).json({
            success:false,
            message:"Fill all required fields"
        })
       }

       const existingUser = await User.findOne({email});

       if(existingUser){
        return res.status(400).json({
            success:false,
            message:'Already existing user'
        })
       }


       const hashedPassword = await bcrypt.hash(password,10);

       const user= await User.create({
        name:name,
        email:email,
        password:hashedPassword
       });

       const token = generatedToken(user._id);
       console.log(token)

       return res.status(201).json({
        success:true,
       token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }
       })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }


}


exports.login = async (req,res) => {
    try{
       const {email,password} = req.body;
        const user =await  User.findOne({email});
        if(!user){
            res.status(401).json({
                success:false,
                message:'Invalid Credential'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(401).json({
                success:false,
                message:'invalid credentials'
            })
        }

        const token= await generatedToken(user._id);

        return res.status(201).json({
            success:true,
            message:'successfully logged in ',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:false,
            message:err.message
        })
    }

    console.log(res);
}



exports.getprofile = async(req,res) =>{
    try{

        const user = await User.findById(req.user.userId).select('-password');

         return res.status(201).json({
            success:true,
            user
        })

    }catch(err){
        res.status(401).json({

            success:false,

            message:err.message
        })
        
    }
}


exports.forgotpassword = async(req,res) =>{
    try{
        const {email,newPassword } = req.body;
        if(!email && !newPassword){
            res.send(400).json({
                success:false,
                message:'Fill all required fields'
            })
        }
      const user = await User.findOne({email});

      if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
      }
      const hashedPassword = await bcrypt.hash(newPassword,10);
      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({
        success:true,
        message:"Successfully updated the password"
      })


    }catch(error){
        res.send(401).json({
            success:false,
            message:error.message
        })
    }
}