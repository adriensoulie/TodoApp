import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeTodo, updateCompleteTodo } from "../reducers/todos/todoSlice";

interface Props {
  id: string;
  title: string;
  completed: boolean;
}

export default function Todo({ id, title, completed }: Props) {
  console.log(completed);
  const dispatch = useDispatch<AppDispatch>();
  function handleRemove() {
    dispatch(removeTodo(id));
  }
  function handleComplete() {
    dispatch(updateCompleteTodo(id));
  }
  return (
    <div style={{ display: "flex" }}>
      <p>{title}</p>
      {completed ? (
        <button onClick={handleComplete}>X</button>
      ) : (
        <button onClick={handleComplete}>O</button>
      )}
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
}
