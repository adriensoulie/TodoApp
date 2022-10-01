import { Todo } from "../../types/types";
import "./Progress.css";

interface Props {
  total: number;
  todos: Todo[];
}

export default function Progress({ total, todos }: Props) {
  function calculatePurcent(total: number, completed: number) {
    let purcent = (completed / total) * 100;
    return purcent;
  }
  let todosCompleted = 0;
  todos.map((todo) => {
    if (todo.completed) {
      todosCompleted++;
    }
  });

  const fillerStyle = {
    height: "100%",
    width: `${calculatePurcent(total, todosCompleted)}%`,
    backgroundColor: "#FFF",
    borderRadius: "inherit",
    transition: "width 0.4s ease-in-out",
  };

  const barStyle = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const wrapperStyle = {
    backgroundColor: "#E07C7C",
    padding: "20px",
    borderRadius: "20px",
  };

  return (
    <div className="progress-wrapper">
      <p className="progress-title">Progress</p>
      <div className="progress-container">
        <div style={fillerStyle}>
          <span style={barStyle}></span>
        </div>
      </div>
      <p className="progress-completed">{todosCompleted} completed</p>
    </div>
  );
}
