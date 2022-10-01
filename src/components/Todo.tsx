import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  removeTodo,
  updateCompleteTodo,
  updateTitleTodo,
} from "../reducers/todos/todoSlice";
import { ReactComponent as CheckedIcon } from "../assets/Vector.svg";
import { ReactComponent as DotsIcon } from "../assets/Dots.svg";
import { useState } from "react";
import "./Todo.css";

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
    <div className="todo-wrapper">
      <div className="todo-container">
        {completed ? (
          <div className="todo-checked" onClick={handleComplete}>
            <CheckedIcon height={12} width={12} />
          </div>
        ) : (
          <div onClick={handleComplete} className="todo-unchecked">
            <CheckedIcon height={12} width={12} />
          </div>
        )}
        {activateEdit ? (
          <form onSubmit={submit}>
            <input
              className="todo-input"
              type="text"
              placeholder={title}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            {showPopOver && activateEdit && (
              <button className="button-save" type="submit">
                Save
              </button>
            )}
          </form>
        ) : completed ? (
          <p style={{ textDecorationLine: "line-through", color: "#A9A9A9" }}>
            {title}
          </p>
        ) : (
          <p>{title}</p>
        )}
      </div>

      {!activateEdit && (
        <div
          className="dots-container"
          onClick={() => setShowPopOver(!showPopOver)}
        >
          <DotsIcon />
        </div>
      )}
      {showPopOver && !activateEdit && (
        <div className="pop-over">
          <p
            style={{ paddingLeft: "20px", cursor: "pointer" }}
            onClick={() => setActivateEdit(true)}
          >
            Edit
          </p>
          <p
            style={{ paddingLeft: "20px", color: "#E07C7C", cursor: "pointer" }}
            onClick={handleRemove}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
