import PropTypes from "prop-types";

export default function FormAddTodo({addTodo}) {
    const handleSubmit = (event) => {
      event.preventDefault();

      if (event.target.text.value !== "") {
        addTodo(event.target.text.value);
      }
      event.target.text.value = "";
    }

    return (
        <form className="todo-add-form" onSubmit={handleSubmit}>
            <input type="text" className="todo-add-input" placeholder="Todo's text" name="text" />
            <input type="submit" className="todo-add-submit" value="Add" />
        </form>
    );
}

FormAddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}
