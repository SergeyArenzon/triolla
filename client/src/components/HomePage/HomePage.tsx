import React from 'react'
import './HomePage.css';
import NotesList from '../NotesList/NotesList';
import { Note } from '../../shared/types';
import {  useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';


type Props = {
    notes: Note[],
    addComment: ()=>void
}


export default function HomePage({notes, addComment, comments}: Props) {
    let { id } = useParams();    
  return (

    <div className='home-page'>
        <NotesList notes={notes}/>
        <Comments addComment={addComment} comments={comments}/>
    </div>
  )
}
