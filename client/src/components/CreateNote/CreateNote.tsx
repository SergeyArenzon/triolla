import React, {useRef} from 'react'
import "./CreateNote.css";
import TextInput from '../TextInput/TextInput';

interface Props {
    createNoteHandler: (text:string) => void
}


export default function CreateNote({createNoteHandler}: Props) {
    const contentRef = useRef<HTMLInputElement>();


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(contentRef.current) {
            const text: string  = contentRef.current.value;
            createNoteHandler(text)
        } else {
            
        }
        
        
    }

  return (
    <form className='create-note' onSubmit={onSubmit}>
        <p>CreateNew Note</p>
        <div>
            <input type='text' ref={contentRef}></input>
            <button type='submit' className='create-note__create'>Create</button>
            <button className='create-note__cancle'>Cancle</button>
        </div>
    </form>
  )
}
