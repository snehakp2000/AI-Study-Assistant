import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoteCard from "../../components/notecard/notecard";
import NoteModal from "../../components/NoteModal/NoteModal";
import { toast } from 'react-toastify';

import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
} from "../../services/noteService";

import "./notes.css";

function Notes() {

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Load all notes
    const loadNotes = async () => {

        try {

            const response = await getAllNotes();

            if (response.success) {
                setNotes(response.notes);
            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        loadNotes();
    }, []);

    // Create Note
    const handleCreateNote = async (noteData) => {

        try {

            const response = await createNote(noteData);

            if (response.success) {

                toast.success(response.message);

                setShowModal(false);
                setSelectedNote(null);
                setIsEditing(false);

                loadNotes();

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to create note"
            );

        }

    };

    // Edit Button Click
  const handleEdit = (note) => {
    console.log("Selected Note:", note);

    setSelectedNote(note);
    setIsEditing(true);
    setShowModal(true);
};

    // Update Note
    const handleUpdateNote = async (noteData) => {

        try {

            const response = await updateNote(
                selectedNote._id,
                noteData
            );

            if (response.success) {

                toast.sucess(response.message);

                setShowModal(false);
                setSelectedNote(null);
                setIsEditing(false);

                loadNotes();

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to update note"
            );

        }

    };

  const handleDeleteNote = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {

        const response = await deleteNote(id);

        if (response.success) {

            toast.success(response.message);

            loadNotes();

        }

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Unable to delete note"
        );

    }

};

    // Search Notes
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="notes-page">

            <Navbar />

            <div className="notes-layout">

                <Sidebar />

                <div className="notes-main">

                    <div className="page-header">

                        <h2>Notes</h2>

                        <button
                            onClick={() => {

                                setSelectedNote(null);
                                setIsEditing(false);
                                setShowModal(true);

                            }}
                        >
                            + New Note
                        </button>

                    </div>

                    <div className="search-bar">

                        <input
                            type="text"
                            placeholder="Search Notes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="notes-list">

                        {filteredNotes.length === 0 ? (

                            <p>No Notes Available</p>

                        ) : (

                            filteredNotes.map((note) => (

                                <NoteCard
                                    key={note._id}
                                    title={note.title}
                                    description={note.content}
                                    updatedAt={new Date(note.updatedAt).toLocaleDateString()}
                                    onEdit={() => handleEdit(note)}
                                    onDelete={() => handleDeleteNote(note._id)}
                                />

                            ))

                        )}

                    </div>

                </div>

            </div>

            {showModal && (

                <NoteModal
                    note={selectedNote}
                    isEditing={isEditing}
                    onClose={() => {

                        setShowModal(false);
                        setSelectedNote(null);
                        setIsEditing(false);

                    }}
                    onSave={
                        isEditing
                            ? handleUpdateNote
                            : handleCreateNote
                    }
                />

            )}

        </div>

    );

}

export default Notes;