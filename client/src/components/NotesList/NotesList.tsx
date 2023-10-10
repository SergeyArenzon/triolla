import './NotesList.css';
import { Note } from '../../shared/types';
import trash from '../../assets/trash.svg';
import {  Link } from "react-router-dom";


type Props = {
    notes: Note[]
}


export default function NotesList({notes}: Props) {


  return (
    <div className='notes-list'>
        {notes.map(n => {
            return <Link className='notes-list__note' to={`/${n._id}/comment`}>
                <p>{n.title}</p>
                <img src={trash}/>
            </Link>
        })}    
    <Link className='notes-list__button' to='/create-note'>Create new Note</Link>

    </div>
  )
}
