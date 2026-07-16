const express = require('express');
const cors=require('cors');

const authRoutes = require('./routes/authRoutes');

const noteRoutes = require('./routes/noteRoutes');

const uploadRoutes = require('./routes/uploadRoutes');

const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/note',noteRoutes);
app.use('/api/pdf',uploadRoutes);
app.use('/api/ai',aiRoutes);

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message: "success full"
        
    })
});

module.exports =app;