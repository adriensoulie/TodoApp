import { Todo } from "../types/types";

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

  const containerStyle = {
    height: 15,
    width: "100%",
    backgroundColor: "#3B3B3B",
    borderRadius: 50,
  };

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
    <div style={wrapperStyle}>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "28px",
          textAlign: "left",
        }}
      >
        Progress
      </p>
      <div style={containerStyle}>
        <div style={fillerStyle}>
          <span style={barStyle}></span>
        </div>
      </div>
      <p
        style={{
          color: "#EBB9B8",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
        }}
      >
        {todosCompleted} completed
      </p>
    </div>
  );
}
