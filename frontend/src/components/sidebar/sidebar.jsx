import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaStickyNote,
    FaUpload,
    FaFileAlt,
    FaBrain,
    FaLayerGroup,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <aside className="sidebar">

            

            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/notes"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaStickyNote />
                <span>Notes</span>
            </NavLink>

            <NavLink
                to="/uploadpdf"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaUpload />
                <span>Upload PDF</span>
            </NavLink>

            <NavLink
                to="/summary"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaFileAlt />
                <span>Summary</span>
            </NavLink>

            <NavLink
                to="/quiz"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaBrain />
                <span>Quiz</span>
            </NavLink>

            <NavLink
                to="/flashcard"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaLayerGroup />
                <span>Flashcards</span>
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    isActive ? "menu-item active" : "menu-item"
                }
            >
                <FaUser />
                <span>Profile</span>
            </NavLink>

            <button
                className="menu-item logout-btn"
                onClick={handleLogout}
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

        </aside>
    );
}

export default Sidebar;