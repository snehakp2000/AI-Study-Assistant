import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./notecard.css";

function NoteCard(props){

    
    return <div className="note-card">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.updatedAt}</p>
        <div className="note-card-actions">
            <button className="view-btn">
    <FaEye />
    <span>View</span>
</button>
  <button
    className="edit-btn"
    onClick={props.onEdit}
>
    <FaEdit /> Edit
</button>

<button
        className="delete-btn"
        onClick={props.onDelete}
    >
        <FaTrash />delete
    </button>
        </div>
    </div>
}

export default NoteCard;