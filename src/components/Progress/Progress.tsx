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

  return (
    <div className="progress-wrapper">
      <p className="progress-title">Progress</p>
      <div className="progress-container">
        <div style={fillerStyle}>
          <span className="progress-bar"></span>
        </div>
      </div>
      <p className="progress-completed">{todosCompleted} completed</p>
    </div>
  );
}
