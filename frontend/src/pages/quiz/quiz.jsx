import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./quiz.css";

import { getAllNotes } from "../../services/noteService";
import { toast } from 'react-toastify';

import { generateQuiz } from "../../services/aiService";

function Quiz() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("");

    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
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

    const handleGenerateQuiz = async () => {

        if (!selectedNote) {

            toast.warning("Please select a note.");

            return;

        }

        try {

            setLoading(true);

            const response = await generateQuiz(selectedNote);

            if (response.success) {

                setQuiz(response.quiz);

                setAnswers({});
                setScore(null);
                setSubmitted(false);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to generate quiz."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleOptionSelect = (questionIndex, option) => {

        if (submitted) return;

        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: option
        }));

    };

    const handleSubmitQuiz = () => {

        let marks = 0;

        quiz.forEach((question, index) => {

            if (answers[index] === question.answer) {

                marks++;

            }

        });

        setScore(marks);
        setSubmitted(true);

    };

    const handleRetry = () => {

        setAnswers({});
        setScore(null);
        setSubmitted(false);

    };

    return (

        <div className="quiz-page">

            <Navbar />

            <div className="quiz-layout">

                <Sidebar />

                <div className="quiz-main">

                    <div className="quiz-header">

                        <h1> AI Quiz Generator</h1>

                        

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

                            {
                                notes.map((note) => (

                                    <option
                                        key={note._id}
                                        value={note._id}
                                    >
                                        {note.title}
                                    </option>

                                ))
                            }

                        </select>

                    </div>

                    <button
                        className="generate-btn"
                        onClick={handleGenerateQuiz}
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Generating..."
                                : "Generate Quiz"
                        }
                    </button>

                    {
                        quiz.length === 0 && (

                            <div className="empty-state">

                                <h2>📚 Ready to Practice?</h2>

                                <p>

                                    Select a study note and click
                                    <strong> Generate Quiz </strong>

                                    to start.

                                </p>

                            </div>

                        )
                    }

                    {
                        quiz.length > 0 && (

                            <div className="quiz-result">

                                {
                                    quiz.map((item, index) => (

                                        <div
                                            key={index}
                                            className="question-card"
                                        >

                                            <div className="question-header">

                                                <span className="question-number">

                                                    Question {index + 1} of {quiz.length}

                                                </span>

                                            </div>

                                            <h3>{item.question}</h3>

                                            <div className="options">

                                                {
                                                    item.options.map((option, optionIndex) => (

                                                        <label

                                                            key={optionIndex}

                                                            className={`option-card

                                                            ${
                                                                submitted &&
                                                                option === item.answer
                                                                    ? "correct"
                                                                    : ""
                                                            }

                                                            ${
                                                                submitted &&
                                                                answers[index] === option &&
                                                                option !== item.answer
                                                                    ? "wrong"
                                                                    : ""
                                                            }

                                                            ${
                                                                answers[index] === option
                                                                    ? "selected"
                                                                    : ""
                                                            }
                                                        `}

                                                        >

                                                            <input

                                                                type="radio"

                                                                name={`question-${index}`}

                                                                checked={
                                                                    answers[index] === option
                                                                }

                                                                disabled={submitted}

                                                                onChange={() =>
                                                                    handleOptionSelect(
                                                                        index,
                                                                        option
                                                                    )
                                                                }

                                                            />
                                                            <span>
        {String.fromCharCode(65 + optionIndex)}. {option}
    </span>

                                                            

                                                        </label>

                                                    ))
                                                }

                                            </div>

                                        </div>

                                    ))
                                }

                                {

                                    !submitted && (

                                        <button

                                            className="submit-btn"

                                            onClick={handleSubmitQuiz}

                                        >

                                            Submit Quiz

                                        </button>

                                    )

                                }

                                {

                                    submitted && (

                                        <div className="score-card">

                                            <h2>

                                                🎉 Quiz Completed

                                            </h2>

                                            <h1>

                                                {score} / {quiz.length}

                                            </h1>

                                            <p>

                                                Accuracy :

                                                {" "}

                                                {Math.round(
                                                    (score / quiz.length) * 100
                                                )}

                                                %

                                            </p>

                                            <div className="quiz-actions">

                                                <button
                                                    onClick={handleRetry}
                                                >

                                                    🔄 Retry

                                                </button>

                                                <button
                                                    onClick={handleGenerateQuiz}
                                                >

                                                    ✨ New Quiz

                                                </button>

                                            </div>

                                        </div>

                                    )

                                }

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default Quiz;