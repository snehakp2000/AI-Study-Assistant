import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import WelcomeCard from "../../components/welcomecard/welcomeCard";
import StatCard from "../../components/StatCard/statCard";
import QuickActions from "../../components/QuickActions/QuickActions";

import { getAllNotes } from "../../services/noteService";

import "./dashboard.css";

function Dashboard() {

    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

   

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
    return (

        <>
            <Navbar />

            <div className="dashboard-layout">

                <Sidebar />

                <div className="dashboard-content">

                    <WelcomeCard />

                    <div className="stats-container">

                        <StatCard
                            title="Total Notes"
                            count={notes.length}
                        />

                        <StatCard
                            title="Quizzes"
                            count={notes.length}
                        />

                        <StatCard
                            title="Flashcards"
                            count={notes.length}
                        />

                    </div>

                    <QuickActions />

                    <section className="recent-notes">

                        <div className="recent-notes-header">

                            <h2>Recent Notes</h2>

                            <button
                                className="view-all-btn"
                                onClick={() => navigate("/notes")}
                            >
                                View All
                            </button>

                        </div>

                        <div className="notes-list">

                            {
                                notes.length === 0 ? (

                                    <p>No Notes Available</p>

                                ) : (

                                    notes
                                        .slice(0, 5)
                                        .map((note) => (

                                            <div
                                                key={note._id}
                                                className="note-item"
                                            >

                                                <div className="note-info">

                                                    <h3>

                                                        📄 {note.title}

                                                    </h3>

                                                    <p>

                                                        Last Updated :

                                                        {" "}

                                                        {new Date(
                                                            note.updatedAt
                                                        ).toLocaleDateString()}

                                                    </p>

                                                </div>

                                            </div>

                                        ))

                                )
                            }

                        </div>

                    </section>

                </div>

            </div>

        </>

    );

}

export default Dashboard;