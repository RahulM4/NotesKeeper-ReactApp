import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;
  return (
        <div className="col-md-3">
              <div className="card my-3">
              <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
          
            <div className="d-flex justify-content-around">
            <i className="mx-2 fa-sharp fa-solid fa-trash" onClick={() => { deleteNote(note._id); showAlert("Note added successfully", "success");  }}></i>
             <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
             
            </div>
      </div>
    </div>
  )
}
