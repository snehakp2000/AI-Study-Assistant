import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./flashcard.css"
import { toast } from 'react-toastify';


import { getAllNotes } from "../../services/noteService";
import { generateFlashcards } from "../../services/aiService";

function Flashcards() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("");

    const [flashcards, setFlashcards] = useState([]);

    const [currentCard, setCurrentCard] = useState(0);

    const [flipped, setFlipped] = useState(false);

    const [loading, setLoading] = useState(false);

    

    const loadNotes = async () => {

        try {

            const response = await getAllNotes();

            if (response.success) {

                setNotes(response.notes);

            }

        } catch (err) {

            console.log(err);

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

            const response = await generateFlashcards(selectedNote);

            if (response.success) {

                setFlashcards(response.flashcards);

                setCurrentCard(0);

                setFlipped(false);

            }

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to generate flashcards."
            );

        } finally {

            setLoading(false);

        }

    };

    const nextCard = () => {

        if (currentCard < flashcards.length - 1) {

            setCurrentCard(currentCard + 1);

            setFlipped(false);

        }

    };

    const previousCard = () => {

        if (currentCard > 0) {

            setCurrentCard(currentCard - 1);

            setFlipped(false);

        }

    };

    return (

        <div className="flash-page">

            <Navbar />

            <div className="flash-layout">

                <Sidebar />

                <div className="flash-main">

                    <div className="flash-header">

                        <h1>AI Flashcards</h1>

                    </div>

                    <div className="form-group">

                        <label>Select Study Note</label>

                        <select
                            value={selectedNote}
                            onChange={(e) =>
                                setSelectedNote(e.target.value)
                            }
                        >

                            <option value="">
                                -- Select Note --
                            </option>

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
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Generating..."
                                : "Generate Flashcards"
                        }

                    </button>

                    {

                        flashcards.length > 0 && (

                            <>

                                <div className="card-counter">

                                    Card {currentCard + 1} of {flashcards.length}

                                </div>

                                <div
                                    className="flashcard"
                                    onClick={() =>
                                        setFlipped(!flipped)
                                    }
                                >

                                    {

                                        !flipped
                                            ?

                                            <>

                                                <h3>Question</h3>

                                                <p>

                                                    {flashcards[currentCard].question}

                                                </p>

                                            </>

                                            :

                                            <>

                                                <h3>Answer</h3>

                                                <p>

                                                    {flashcards[currentCard].answer}

                                                </p>

                                            </>

                                    }

                                </div>

                                <div className="navigation">

                                    <button
                                        onClick={previousCard}
                                        disabled={currentCard === 0}
                                    >

                                        ◀ Previous

                                    </button>

                                    <button
                                        onClick={nextCard}
                                        disabled={
                                            currentCard === flashcards.length - 1
                                        }
                                    >

                                        Next ▶

                                    </button>

                                </div>

                            </>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default Flashcards;