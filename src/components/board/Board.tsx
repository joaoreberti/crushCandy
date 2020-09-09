import React, { useState, useEffect } from "react";
import "./Board.css";
import purpleCandy from "../../assets/img/purple-candy.png";
import emptyCell from "../../assets/img/empty.png";
import redCandy from "../../assets/img/red-candy.png";
import greenCandy from "../../assets/img/green-candy.png";
import orangeCandy from "../../assets/img/orange-candy.png";
import blueCandy from "../../assets/img/blue-candy.png";

const Board = () => {
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
  };

  const rearrangeInitialBoard = (boardToValidate: any) => {
    let result = [...boardToValidate];

    let checkHorizontally = (board: any) => {
      let tempResult = [...board];
      for (let i = 0; i < tempResult.length; i++) {
        let start = 0;
        let end = 0;
        let tempValue = undefined;
        for (let j = 0; j < tempResult[i].length; j++) {
          if (j === 0) {
            tempValue = tempResult[i][j];
            console.log("joao");
          } else {
            if (tempResult[i][j] === tempValue) {
              end = j;
              tempResult[i][j] = -1;
            } else {
              tempValue = tempResult[i][j];
              start = j;
              end = j;
              tempResult[i][j] = -1;
            }
          }
        }
        if (end - start >= 3) {
          console.log("reberti");
          return (result = tempResult);
        }
      }
      return board;
    };
    checkHorizontally(boardToValidate);
    for (let i = 0; i < boardToValidate.length; i++) {
      for (let j = 0; j < boardToValidate[i].length; j++) {}
    }
    return result;
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 5);
  };
  const makeNewBoardWithXsizing = (x: any) => {
    let newBoard: any = [];
    for (let i = 0; i < x; i++) {
      newBoard.push([]);
      for (let j = 0; j < x; j++) {
        newBoard[i].push(randomNumber());
      }
    }

    return newBoard;
  };
  let [board, setNewBoard] = useState(makeNewBoardWithXsizing(10));

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewBoard(rearrangeInitialBoard(board));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="board">
      {board.map((line: any, index: any) => {
        return (
          <div className="row">
            {line.map((cell: any, i: any) => {
              return (
                <div className="cell">
                  {/*    line: {index}
                  index: {i}
                  candy: {cell} */}
                  <img alt="candy" src={getImgFromValue(cell)}></img>
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
