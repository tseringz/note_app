import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';


const Notepage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    let [note, setNote] = useState('');

    useEffect(() => {
        getNote();
    },[id]);

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let getNote = async () => {
        if (id === 'new') return 
        let response = await fetch(`/api/notes/${id}/`);
        let data = await response.json();
        setNote(data);
    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/');
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote();
        } else if (id !== 'new') {
            updateNote();
        } else if (id === 'new' && note !== null ) {
            createNote();
        }

        updateNote();
        navigate('/');
    }

  return (
    <div className='note'>
        <div className="note-header">
            <h3> 
                <ArrowLeft onClick={handleSubmit}/>
            </h3>
            {id !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>) : 
                (<button onClick={handleSubmit}>Done</button>)
            }
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default Notepage;