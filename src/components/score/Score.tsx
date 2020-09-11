import React, { useState, useEffect, useContext } from "react";
import "./Score.css";
import { PointsContext } from "../context/PointsContextProvider";

const Score = (props: any) => {
  const context = useContext(PointsContext);
  if (typeof context === "undefined") {
    throw new Error("context is not defined");
  } else {
  }

  return (
    <div className="score-board">
      <div className="background-board">
        <h1 className="header-board">Moves</h1>
        <h1 className="points">{context.moves}</h1>

        <h1 className="header-board">Points</h1>

        <h1 className="points">{context.points}</h1>
      </div>
    </div>
  );
};

export default Score;
