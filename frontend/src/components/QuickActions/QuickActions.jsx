import {
    FaFilePdf,
    FaRobot,
    FaBrain,
    FaLayerGroup
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import ActionCard from "../ActionCard/ActionCard";
import "./QuickActions.css";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="quick-actions">

            <h2>Quick Actions</h2>

            <div className="quick-grid">

                <ActionCard
                    title="Upload PDF"
                    icon={<FaFilePdf />}
                    onClick={() => navigate("/uploadPDF")}
                />

                <ActionCard
                    title="Summary"
                    icon={<FaRobot />}
                    onClick={() => navigate("/summary")}
                />

                <ActionCard
                    title="Quiz"
                    icon={<FaBrain />}
                    onClick={() => navigate("/quiz")}
                />

                <ActionCard
                    title="Flashcards"
                    icon={<FaLayerGroup />}
                    onClick={() => navigate("/flashcard")}
                />

            </div>

        </div>

    );

}

export default QuickActions;