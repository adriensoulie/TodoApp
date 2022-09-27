import React, { useEffect } from "react";
import { RootState } from "./store/store";
import "./App.css";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchAllTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";
import { useState } from "react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  console.log(todos);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      setValue("");
      return;
    }

    dispatch(
      addTodo({
        id: Date.now().toString(36) + Math.random().toString(36),
        title: value,
        completed: false,
      })
    );

    setValue("");
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Add task"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>

      <div>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
