const { Model } = require('mongoose');
const {createnotes ,getallnotes, getonenote ,updatenote, deletenote } = require('../controllers/noteController');

const authMiddleware = require('../middleware/authMiddleware');

const express = require('express');

const router = express.Router();

router.post('/createnote',authMiddleware,createnotes);

router.get('/getallnotes',authMiddleware,getallnotes);
 
router.get('/getonenote/:id',authMiddleware,getonenote);

router.put('/updatenote/:id',authMiddleware,updatenote);

router.delete('/deletenote/:id',authMiddleware,deletenote);

module.exports = router;