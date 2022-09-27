import React, { useEffect } from "react";

import "./App.css";
import Todo from "./components/Todo";
import { useDispatch } from "react-redux";
import { fetchAllTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  return (
    <div className="App">
      TODO App
      <Todo />
    </div>
  );
}

export default App;
