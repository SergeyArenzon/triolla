const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');



app.use(bodyParser.json());
app.use(cookieParser())


app.use(cors({
    origin: '*',
    credentials: true,
  }));
  

async function main() {
  await mongoose.connect('mongodb://localhost:27017');
}
main().catch(err => console.log(err));



const notesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', notesSchema);



const commentSchema = new mongoose.Schema({
    note_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    },
    text: String
});

const Comment = mongoose.model('Comment', commentSchema);


// GET /api/notes: Fetch all notes.
app.post('/api/notes', async(req, res) => {
    const { title } = req.body;
    console.log(req.body)
    try {
        const note = new Note({title, content: ""});
        await note.save();
        res.status(201).json({message: "note added successfuly", note})
    } catch (error) {
        console.log({error});
        res.status(400).json({message: "Somthing went wrong"})
    }



});


app.post('/api/:id/comment', async(req, res) => {
    const { text } = req.body;
    const { id } = req.params;


    try {
        // Find the existing note by its _id
        const existingNote = await Note.findById(id);
    
        if (!existingNote) {
          console.log('Note not found');
            res.status(404).json({message: "Note didnt found"})

          return;
        }
    
        // Create a new comment
        const newComment = new Comment({
          note_id: existingNote._id, // Associate the comment with the existing note
          text
        });
    
        // Save the comment to the database
        await newComment.save();
    
        res.status(201).json({message: "Comment added successfuly", newComment})
        
      } catch (error) {
        console.error('Error adding comment:', error);
      }

});

// POST /api/notes: Create a new note.
app.get('/api/notes', async(req,res) => {
    try {
        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        console.log({error});
        res.status(400).json({message: "Somthing went wrong"})
    }

})
app.get('/api/comments', async(req,res) => {
    try {
        const comment = await Comment.find().exec();
        console.log({comment})
        res.status(200).json(comment);
    } catch (error) {
        console.log({error});
        res.status(400).json({message: "Somthing went wrong"})
    }

})



app.listen(5001, () => {
  console.log("Listening on 5001");
});