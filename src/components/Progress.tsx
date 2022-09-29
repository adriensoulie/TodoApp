import React from "react";
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

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${calculatePurcent(total, todosCompleted)}%`,
    backgroundColor: "blue",
    borderRadius: "inherit",
  };

  const barStyle = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      Progress
      <div>{todosCompleted} completed</div>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={barStyle}></span>
        </div>
      </div>
    </div>
  );
}
