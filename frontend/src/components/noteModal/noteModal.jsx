import "./noteModal.css";
import { useState, useEffect } from "react";

function NoteModal({ onClose, onSave, note, isEditing }) {

   const [title, setTitle] = useState(note ? note.title : "");
const [content, setContent] = useState(note ? note.content : "");
console.log("isEditing:", isEditing);
    console.log("note:", note);

useEffect(() => {

    console.log("isEditing:", isEditing);
    console.log("note:", note);

    if (isEditing && note) {
        console.log("Setting title:", note.title);
        console.log("Setting content:", note.content);

        setTitle(note.title);
        setContent(note.content);
    } else {
        console.log("Resetting fields");

        setTitle("");
        setContent("");
    }

}, [note, isEditing]);

    const handleSubmit = () => {

        if (!title || !content) {
            alert("Please fill all fields");
            return;
        }

        onSave({
            title,
            content
        });

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {isEditing ? "Edit Note" : "Create Note"}
                </h2>

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    rows="8"
                    placeholder="Enter Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="modal-buttons">

                    <button
                        className="save-btn"
                        onClick={handleSubmit}
                    >
                        {isEditing ? "Update" : "Save"}
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default NoteModal;