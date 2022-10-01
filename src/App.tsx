import React, { useEffect } from "react";
import { RootState } from "./store/store";
import "./App.css";
import Todo from "./components/Todo/Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchAllTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";
import { useState } from "react";
import Select from "./components/Select/Select";
import Progress from "./components/Progress/Progress";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [value, setValue] = useState("");
  const selectOptions = [
    { value: "all", text: "All" },
    { value: "done", text: "Done" },
    { value: "undone", text: "Undone" },
  ];
  const [selected, setSelected] = useState<string>(selectOptions[0].value);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

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

  const inputStyle = {
    border: "0px solid transparent",
    outline: "none",
    padding: "18px",
    margin: "5px",
    width: "-webkit-fill-available",
    borderRadius: "999px",
    backgroundColor: "#fff",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "4px",
    marginBottom: "12px",
    fontSize: "14px",
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Progress total={todos.length} todos={todos} />
        <div className="tasks-container">
          <p style={{ fontSize: "24px" }}>Tasks</p>
          <Select onChange={selectChange} options={selectOptions} />
        </div>

        <div>
          {selected === "all" &&
            todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                />
              );
            })}
          {selected === "done" &&
            todos.map((todo) => {
              if (todo.completed) {
                return (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                  />
                );
              }
            })}
          {selected === "undone" &&
            todos.map((todo) => {
              if (!todo.completed) {
                return (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                  />
                );
              }
            })}
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Add task"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              style={inputStyle}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
