import { useState, useEffect } from 'react'
import './App.css'
import CreateNote from './components/CreateNote/CreateNote';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import axios from 'axios';
import { Note } from './shared/types'; 

const BACKEND_URL = "http://localhost:5001/api";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [comments, setComments] = useState<[]>([]);

  useEffect(() => {
    

    const fetchNotes = async() => {
      const res = await axios.get(BACKEND_URL + '/notes');
      setNotes(res.data);
      const res2 = await axios.get(BACKEND_URL + '/comments');
      setComments(res2.data);
      
    }

    fetchNotes()
  }, [])
  




  const createNoteHandler = async(title: string) => {
    try {
      const res = await axios.post(BACKEND_URL + '/notes', {title});
      console.log(res);
      

    } catch (error) {
      console.log(error)
    }
    return <Navigate to="/" replace={true} />;

  }
  const addComment = async(id:string, text: string) => {
    try {
      const res = await axios.post(BACKEND_URL + "/" + id + '/comment', {text});
      console.log("------");
      
      console.log(res.data.newComment);
      console.log("------");
      const newComments = [...comments];
      newComments.push(res.data.newComment)
      setComments(newComments);
      

    } catch (error) {
      console.log(error)
    }
    // return <Navigate to="/" replace={true} />;

  }

  console.log({notes,comments});
  


  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage notes={notes}/> } />
              <Route path="/create-note" element={<CreateNote createNoteHandler={createNoteHandler}/> } />
              <Route path="/:id/comment" element={<HomePage notes={notes} addComment={addComment} comments={comments} /> } />
            {/* <Route path="/" element={<Layout />}>
              <Route path="/about" element={<AboutPage />} />
            </Route> */}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
