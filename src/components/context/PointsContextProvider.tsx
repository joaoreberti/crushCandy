import React, { useState, createContext } from "react";

type PointsContextType = {
  points: number;
  setPoints: (value: number) => void;
  moves: number;
  setMoves: (value: number) => void;
};
export const PointsContext = createContext<PointsContextType | undefined>(
  undefined
);

// Create a provider for components to consume and subscribe to changes
export const PointsContextProvider = (props: any) => {
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(200);

  return (
    <PointsContext.Provider value={{ points, setPoints, moves, setMoves }}>
      {props.children}
    </PointsContext.Provider>
  );
};
