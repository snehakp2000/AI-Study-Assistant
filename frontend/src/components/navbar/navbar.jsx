import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
    <span className="logo-icon">📚</span>
    <div className="logo-text">
        <h2>AI Study</h2>
        <p>Assistant</p>
    </div>
</div>

            <div className="navbar-right">

                <button className="icon-btn">
                    <FaBell />
                </button>

                <button className="icon-btn">
                    <FaUserCircle />
                </button>

            </div>

        </nav>
    );
}

export default Navbar;