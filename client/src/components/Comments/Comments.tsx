import React, {useState, useRef} from 'react'
import {  useParams } from 'react-router-dom';
import './Comments.css'


export default function Comments({ addComment, comments}) {
    const [showAddComment, setShowAddComment] = useState(false);
    const textRef = useRef<string>('');


    let { id } = useParams();  

    const onSubmit = (e) => {
        e.preventDefault();

        addComment(id, textRef.current.value);

    }
console.log({comments});

    const noteComments = comments?.filter(c => c.note_id === id );
    console.log({noteComments});
    

  return (
    <div className='comments'>
        <div>

            {noteComments && noteComments.length > 0 && noteComments.map(c => <div>{c.text}</div>)}
        </div>

       {showAddComment &&  <form onSubmit={onSubmit}>
            <input type='text' ref={textRef}></input>
            <button type='submit'>Save</button>
            <button onClick={() => setShowAddComment(prev => !prev)}>Cancle</button>
        </form>}
        
        {id && <button onClick={() => setShowAddComment(prev => !prev)}>add comment</button>}
    </div>
  )
}
