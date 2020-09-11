import React, { useState, useEffect, useContext } from "react";
import "./Board.css";
import purpleCandy from "../../assets/img/purple-candy.png";
import emptyCell from "../../assets/img/empty.png";
import redCandy from "../../assets/img/red-candy.png";
import greenCandy from "../../assets/img/green-candy.png";
import orangeCandy from "../../assets/img/orange-candy.png";
import blueCandy from "../../assets/img/blue-candy.png";

import { PointsContext } from "../context/PointsContextProvider";
import {
  rearrangeBoard,
  makeNewBoardWithXsizing,
  checkIfCombos,
} from "../logic/gameLogic";
import { triggerAsyncId } from "async_hooks";
const Board = (props: any) => {
  const context = useContext(PointsContext);

  if (typeof context === "undefined") {
    throw new Error("context is not defined");
  } else {
  }

  //sets image according to value
  const getImgFromValue = (value: any) => {
    if (value === 0) {
      return blueCandy;
    }
    if (value === 1) {
      return purpleCandy;
    }
    if (value === 2) {
      return redCandy;
    }
    if (value === 3) {
      return greenCandy;
    }
    if (value === 4) {
      return orangeCandy;
    }
    if (value === -1) {
      return emptyCell;
    }
  };

  //based on a new board check if there are any combos horizontally or vertically
  //Through checking vertically and horizontally which ones should be eliminated

  const letsPickApiece = (line: number, col: number) => {
    if (useStartPosition[0] === -1) {
      setStartPostion([line, col]);
    } else {
      setEndPostion([line, col]);
    }
  };

  let [board, setNewBoard] = useState(makeNewBoardWithXsizing(6));
  let [previousBoard, setPreviousBoard] = useState();
  let [useStartPosition, setStartPostion] = useState([-1, -1]);
  let [useEndPosition, setEndPostion] = useState([-1, -1]);
  let [impossibleMove, setImpossibleMove] = useState(false);
  let [points, setPoints] = useState(0);
  let [destroyedCoordinates, setDestroyedCoordinates] = useState([]);
  let [numberOfCandysLeft, setNumberOfCandysLeft] = useState(context.moves);
  useEffect(() => {
    if (context.moves <= 0) {
      console.log("Reberti");

      props.triggerDefeat(points);
    }

    if (useEndPosition[0] !== -1) {
      let result = checkIfCombos(
        useStartPosition,
        useEndPosition,
        board,
        points,
        setPoints,
        setDestroyedCoordinates,
        context,
        setEndPostion,
        setStartPostion,
        setImpossibleMove,
        setPreviousBoard,
        numberOfCandysLeft,
        setNumberOfCandysLeft
      );
      setTimeout(() => {
        console.log("joao");
        setNewBoard(result);
      }, 200);
    }
    const timer = setTimeout(() => {
      if (impossibleMove) {
        setTimeout(() => {
          setNewBoard(previousBoard);
          setImpossibleMove(false);
        }, 500);
      } else {
        setNewBoard(
          rearrangeBoard(
            board,
            false,
            points,
            setPoints,
            setDestroyedCoordinates,
            context,
            numberOfCandysLeft,
            setNumberOfCandysLeft
          )
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className="board">
      {board.map((line: any, index: any) => {
        return (
          <div className="row">
            {line.map((cell: any, i: any) => {
              return (
                <div
                  className={`cell ${
                    useStartPosition[0] === index && useStartPosition[1] === i
                      ? "first-candy"
                      : ""
                  } ${
                    useEndPosition[0] === index && useEndPosition[1] === i
                      ? "second-candy"
                      : ""
                  }${destroyedCoordinates
                    .filter((coordinate) => {
                      if (coordinate[0] === index && coordinate[1] === i) {
                        return true;
                      }
                    })
                    .map((coordinate) => {
                      return "disappear-animation ";
                    })}`}
                >
                  <img
                    alt="candy"
                    draggable
                    onClick={() => letsPickApiece(index, i)}
                    src={getImgFromValue(cell)}
                  ></img>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
