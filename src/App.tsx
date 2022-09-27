import React, { useEffect } from "react";
import { RootState } from "./store/store";
import "./App.css";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchAllTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  console.log(todos);

  function fakeAdd() {
    dispatch(
      addTodo({ id: "myfakeid", title: "my fake todo", completed: false })
    );
  }

  return (
    <div className="App">
      TODO App
      <div>
        <button onClick={fakeAdd}>ADD TODO</button>
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
