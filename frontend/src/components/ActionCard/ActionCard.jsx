import "./ActionCard.css";

function ActionCard({ title, icon, onClick }) {

    return (
        <div
            className="action-card"
            onClick={onClick}
        >

            <div className="action-card-icon">
                {icon}
            </div>

            <h3>{title}</h3>

        </div>
    );
}

export default ActionCard;