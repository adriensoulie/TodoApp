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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "12px",
        marginBottom: "12px",
        borderRadius: "999px",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {completed ? (
          <div
            onClick={handleComplete}
            style={{
              backgroundColor: "#585292",
              borderRadius: "6px",
              padding: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #585292",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            <CheckedIcon height={12} width={12} />
          </div>
        ) : (
          <div
            onClick={handleComplete}
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              padding: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #585292",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            <CheckedIcon height={12} width={12} />
          </div>
        )}
        {activateEdit ? (
          <form onSubmit={submit}>
            <input
              type="text"
              style={{
                border: "0px solid transparent",
                outline: "none",
                padding: "10px",
                margin: "5px",
                flexGrow: "4",
                minWidth: "100%",
              }}
              placeholder={title}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            {showPopOver && activateEdit && (
              <button
                style={{
                  backgroundColor: "#585292",
                  borderRadius: "999px",
                  fontSize: "14px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  paddingLeft: "17px",
                  cursor: "pointer",
                  textAlign: "center",
                  paddingRight: "17px",
                  border: "0px solid transparent",
                  color: "white",
                }}
                type="submit"
              >
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
          style={{
            padding: "7px",
            marginRight: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <DotsIcon onClick={() => setShowPopOver(!showPopOver)} />
        </div>
      )}
      {showPopOver && !activateEdit && (
        <div
          style={{
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
            backgroundColor: "#fff",
            position: "absolute",
            right: "40px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1);",
            borderRadius: "10px",
            width: "110px",
          }}
        >
          <p
            style={{ paddingLeft: "20px" }}
            onClick={() => setActivateEdit(true)}
          >
            Edit
          </p>
          <p
            style={{ paddingLeft: "20px", color: "#E07C7C" }}
            onClick={handleRemove}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
