import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    
    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" })
      props.showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



  return (
    <div>
      <h1>Add a note</h1>
      <form className='my-3'>

        <div className="mb-3">
         <label htmlFor="title">Title</label>
         <input name='title' onChange={onChange} type="text" className="form-control" id="title"  placeholder="Tile" value={note.title} />
        </div>

        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <input  name ='description' onChange={onChange} type="text" className="form-control" id="description" placeholder="Description" value={note.description} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag">Tag</label>
          <input  name ='tag' onChange={onChange} type="text" className="form-control" id="tag" placeholder="Tag" value={note.tag}/>
        </div>

        <button disabled={note.title.length<5 || note.description.length<5}  onChange={onChange} onClick={handleClick} type="submit" className="btn btn-primary">Add note</button>
        
      </form>
    </div>
  )
}
