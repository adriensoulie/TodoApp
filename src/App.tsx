import React, { useEffect } from "react";
import { RootState } from "./store/store";
import "./App.css";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchAllTodos } from "./reducers/todos/todoSlice";
import { AppDispatch } from "./store/store";
import { useState } from "react";
import Select from "./components/Select";
import Progress from "./components/Progress";

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

  return (
    <div className="App">
      <Progress total={todos.length} todos={todos} />
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Add task"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
      <Select onChange={selectChange} options={selectOptions} />

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
      </div>
    </div>
  );
}

export default App;
