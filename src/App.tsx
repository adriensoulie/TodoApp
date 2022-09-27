import React, { useEffect } from "react";
import { RootState } from "./store/store";
import "./App.css";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, selectTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  console.log(todos);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  return (
    <div className="App">
      TODO App
      <div>
        {todos.map((todo) => {
          return <p>{todo.title}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
