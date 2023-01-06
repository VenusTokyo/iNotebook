const express=require('express')
const router =express.Router()
const fetchUser =require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

const Notes = require('../models/Notes')
// route 1 to get all notes of a user
router.get('/fetchallnotes',fetchUser,
async (req,res)=>{
    const notes= await Notes.find({user:req.user.id})
    res.json(notes)
})
// route 2 adding new notes
router.get('/addnote',fetchUser,[
body('title', 'Enter a valid title').isLength({ min: 2 }),
body('description', 'Description must be atleat 5 charecters').isLength({ min: 5 })
],
async (req,res)=>{
    try {
        
        const {title, description, tag,}=req.body
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user:req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNotes)
    } catch (error) {
        
    }
})

module.exports=router