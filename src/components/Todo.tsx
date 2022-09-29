import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  removeTodo,
  updateCompleteTodo,
  updateTitleTodo,
} from "../reducers/todos/todoSlice";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
  completed: boolean;
}

export default function Todo({ id, title, completed }: Props) {
  const [showPopOver, setShowPopOver] = useState(false);
  const [activateEdit, setActivateEdit] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  function handleRemove() {
    dispatch(removeTodo(id));
  }
  function handleComplete() {
    dispatch(updateCompleteTodo(id));
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      setValue("");
      return;
    }

    dispatch(
      updateTitleTodo({
        id: id,
        title: value,
        completed: false,
      })
    );

    setValue("");
    setActivateEdit(false);
    setShowPopOver(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        {showPopOver && !activateEdit ? (
          <div style={{ backgroundColor: "red" }}>
            <button onClick={() => setActivateEdit(true)}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        ) : null}
      </div>

      {completed ? (
        <button onClick={handleComplete}>X</button>
      ) : (
        <button onClick={handleComplete}>O</button>
      )}
      {activateEdit ? (
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder={title}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          {showPopOver && activateEdit ? (
            <button type="submit">Save</button>
          ) : null}
        </form>
      ) : (
        <p>{title}</p>
      )}

      {!showPopOver && (
        <button onClick={() => setShowPopOver(!showPopOver)}>...</button>
      )}
    </div>
  );
}
