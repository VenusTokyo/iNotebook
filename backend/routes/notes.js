const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note')
// route 1 to get all notes of a user
router.get('/fetchallnotes', fetchUser,
    async (req, res) => {
        try {

            const note= await Note.find({ user: req.user.id })
            res.json(note)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error");
        }
    })
//refactoring code


// route 2 adding new notes
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'Description must be atleat 5 charecters').isLength({ min: 5 })
],
    async (req, res) => {
        try {

            const { title, description, tag, } = req.body
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
        } catch (error) {

        }
    })
//route no. 3 updating an existing note --login required
router.put('/updatenote:id', fetchUser, 
async (req,res)=>{
    const {title, description, tag}= req.body;
    //creat newNote obj
    const newNote ={};
    if (title){newNote.title=title}
    if (description){newNote.description=description}
    if (tag){newNote.tag=tag}
    
    //find the note to be updated and update it
    
}) 

module.exports = router