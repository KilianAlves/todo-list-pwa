import PropTypes from "prop-types";
import TodoItem from "./TodoItem.jsx";
import LinearProgress from '@mui/material/LinearProgress';

export default function TodoList({todos, isLoading, deleteTodo, toggleTodo, updateTodo}) {
  return (
    <div className="main-list">
      {
        isLoading
          ?
            <LinearProgress />
          :
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
                onUpdate={(text) => updateTodo(todo.id, text)}
              />
            ))
      }
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  })),
  isLoading: PropTypes.bool,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

TodoList.defaultProps = {
  isLoading: false,
}
