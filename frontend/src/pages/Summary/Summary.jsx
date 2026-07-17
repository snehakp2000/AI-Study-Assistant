import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { getAllNotes } from "../../services/noteService";
import { generateSummary } from "../../services/aiService";
import { toast } from 'react-toastify';

import "./Summary.css";

function Summary() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

   

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

    const handleGenerate = async () => {

        if (!selectedNote) {

            toast.warning("Please select a note.");

            return;

        }

        try {

            setLoading(true);

            const response = await generateSummary(selectedNote);

            if (response.success) {

                setSummary(response.summary);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to generate summary."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="summary-page">

            <Navbar />

            <div className="summary-layout">

                <Sidebar />

                <div className="summary-main">

                    <h2>AI Summary</h2>

                   <div className="form-group">

    <label>Select Note</label>

    <select
        value={selectedNote}
        onChange={(e) => setSelectedNote(e.target.value)}
    >
        <option value="">-- Select a Note --</option>

        {notes.map((note) => (
            <option
                key={note._id}
                value={note._id}
            >
                {note.title}
            </option>
        ))}

    </select>

</div>

                    <button
                    className="generate-btn"
                        onClick={handleGenerate}
                    >
                        {
                            loading
                                ? "Generating..."
                                : "Generate Summary"
                        }
                    </button>

                    {
                        summary && (

                            <div className="summary-box">

                                <h3>Summary</h3>

                                <p>{summary}</p>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Summary;