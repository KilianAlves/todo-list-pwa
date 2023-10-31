import * as PropTypes from "prop-types";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import Done from "@mui/icons-material/Done";
import {useState} from "react";
import EditableText from "./EditableText.jsx";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(true);
  }

  const handleUpdateTodo = (text) => {
    setEditMode(false);
    onUpdate(text);
  }

  const todoText = (
    editMode ?
        <EditableText text={todo.text} onUpdate={handleUpdateTodo} onCancel={() => setEditMode(false)} />
      :
        <button className="todo-text" onClick={onToggle}>
          {todo.text}
        </button>
  );

  const style = todo.done ? "todo-item done" : "todo-item";
  return (
    <div className={style}>
      {todo.done && <Done />}
      {todoText}
      <button className="todo-action" onClick={handleEditMode} aria-label="Edit"><Edit /></button>
      <button className="todo-action" onClick={onDelete} aria-label="delete"><DeleteForever /></button>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
