import TodoList from "./TodoList";
import FormAddTodo from "./FormAddTodo.jsx";
import useTodos from "../hooks/useTodos.js";

export default function Main() {
  const { todos, isLoading, toggleTodo, deleteTodo, updateTodo, addTodo } = useTodos();

  return (
        <main className="main">
            <FormAddTodo addTodo={addTodo} />
            <TodoList todos={todos} isLoading={isLoading} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </main>
    )
}
