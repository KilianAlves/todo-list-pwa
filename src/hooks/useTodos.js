import {useEffect, useState} from "react";
import {addApiTodo, deleteApiTodo, getApiTodos, updateApiTodo} from "../services/todos.js";

export default function useTodos() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllTodos()
            .catch((err) => {
                /* Network error */
                console.log(err.message);
            });
    }, []);

    const getAllTodos = async function() {
        setTodos(await getApiTodos());
        setLoading(false);
    }

    const getTodos = () => {
        console.log("get Todos");

        getAllTodos()
          .catch((err) => {
              /* Network error */
              console.log(err.message);
          });
    };

    const toggleTodo = (id) => {
        console.log("toggleTodo Todo :", id);

        const todoToUpdate = todos.find((todo) => todo.id === id);
        updateApiTodo({...todoToUpdate, done: !todoToUpdate.done})
          .then(() => getAllTodos())
          .catch((err) => {
              /* Network error */
              console.log(err.message);
          });
    };

    const deleteTodo = (id) => {
        console.log("delete Todo :", id);

        deleteApiTodo(id)
          .then(() => getAllTodos())
          .catch((err) => {
              /* Network error */
              console.log(err.message);
          });
    };

    const updateTodo = (id, text) => {
        console.log("update Todo :", id, text);
        const todoToUpdate = todos.find((todo) => todo.id === id);
        updateApiTodo({...todoToUpdate, text})
          .then(() => getAllTodos())
          .catch((err) => {
              /* Network error */
              console.log(err.message);
          });
    };

    const addTodo = (text) => {
        console.log("add Todo :", text);

        addApiTodo(text)
          .then(() => getAllTodos())
          .catch((err) => {
              /* Network error */
              console.log(err.message);
          });
    };

    return {
        todos,
        isLoading,
        toggleTodo,
        addTodo,
        deleteTodo,
        updateTodo,
        getTodos,
    }
}
