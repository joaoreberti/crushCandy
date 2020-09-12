type PointsContextType = {
  points: number;
  setPoints: (value: number) => void;
  moves: number;
  setMoves: (value: number) => void;
};

export const rearrangeBoard = (
  boardToValidate: Array<Array<number>>,
  checkMove: Boolean,
  points: number,
  setPoints: (x: number) => void,
  setDestroyedCoordinates: (x: any) => void,
  context: PointsContextType | undefined
) => {
  if (typeof context === "undefined") {
    throw new Error("context is not defined");
  } else {
  }
  let result: Array<Array<number>> = JSON.parse(
    JSON.stringify(boardToValidate)
  );
  let toDeleteHorizontal: Array<Array<number>> = [];
  let toDeleteVertical: Array<Array<number>> = [];
  let emptyPieces: boolean = false;

  let addNewPieces = (boardToCheck: Array<Array<number>>) => {
    let tempResult: Array<Array<number>> = [...boardToCheck];

    for (let line = tempResult.length - 1; line >= 0; line--) {
      for (let col = 0; col < tempResult[line].length; col++) {
        if (tempResult[line][col] === -1) {
          emptyPieces = true;
          /*  console.log(
              `line: ${line}, index: ${col}, value: ${board[line][col]}`
            ); */

          if (tempResult[line - 1]) {
            /*               console.log(
                `candy from above: ${
                  tempResult[line - 1][col]
                }, candy that was deleted: ${tempResult[line][col]}`
              ); */

            tempResult[line][col] = tempResult[line - 1][col];
            tempResult[line - 1][col] = -1;
          } else {
            tempResult[line][col] = Math.floor(Math.random() * 5);
            context.moves = context.moves - 1;
          }
        }
      }
    }
  };

  addNewPieces(result);

  let checkVertical = (boardToCheck: Array<Array<number>>) => {
    let tempResult: Array<Array<number>> = JSON.parse(
      JSON.stringify(boardToCheck)
    );

    for (let col = 0; col < tempResult[0].length; col++) {
      let start: number = 0;
      let end: number = 0;
      let tempValue: number | undefined = undefined;
      for (let line = 0; line < tempResult.length; line++) {
        /*  console.log(
            `line: ${line}, index: ${col}, value: ${tempResult[line][col]}`
          ); */
        if (line === 0) {
          tempValue = tempResult[line][col];
          end = line;
        } else {
          if (tempValue === tempResult[line][col]) {
            end = line;
            if (line === tempResult[line].length - 1) {
              if (end - start >= 2) {
                toDeleteVertical.push([col, end, start]);
              }
            }
          } else {
            //console.log(`end: ${end}, start: ${start}`);
            if (end - start >= 2) {
              //console.log("reberti");
              toDeleteVertical.push([col, end, start]);
            }
            tempValue = tempResult[line][col];
            start = line;
            end = line;
          }
        }
      }
    }
    //console.log(`toDeleteVertical: ${toDeleteVertical}`);
  };

  let checkHorizontally = (boardToCheck: Array<Array<number>>) => {
    let tempResult: Array<Array<number>> = JSON.parse(
      JSON.stringify(boardToCheck)
    );
    for (let i = 0; i < tempResult.length; i++) {
      let start: number = 0;
      let end: number = 0;
      let tempValue: number | undefined = undefined;
      for (let j = 0; j < tempResult[i].length; j++) {
        //console.log(`line: ${i}, index: ${j}, value: ${tempResult[i][j]}`);
        if (j === 0) {
          tempValue = tempResult[i][j];
          end = j;
        } else {
          if (tempResult[i][j] === tempValue) {
            end = j;

            if (j === tempResult[i].length - 1) {
              if (end - start >= 2) {
                toDeleteHorizontal.push([i, end, start]);
              }
            }
          } else {
            //console.log(`end: ${end}, start: ${start}`);

            if (end - start >= 2) {
              toDeleteHorizontal.push([i, end, start]);
            }
            tempValue = tempResult[i][j];
            start = j;
            end = j;
          }
        }
      }
      //console.log(`toDeleteHorizontal: ${toDeleteHorizontal}`);
    }
  };
  if (!emptyPieces) {
    checkHorizontally(boardToValidate);
    checkVertical(boardToValidate);
  }

  //delete cells based on list with coordinates
  let arrayToDestroy: Array<Array<number> | []> = [];
  for (let h = 0; h < toDeleteHorizontal.length; h++) {
    //console.log("reberti");

    for (
      let z = toDeleteHorizontal[h][2];
      z < toDeleteHorizontal[h][1] + 1;
      z++
    ) {
      //console.log(`coordinates arrayToDestroy: ${arrayToDestroy}`);
      if (!checkMove) {
        points = points + 10;
        //console.log({ points });
        setPoints(points);
        arrayToDestroy.push([toDeleteHorizontal[h][0], z]);
        setDestroyedCoordinates(arrayToDestroy);
        console.log({ arrayToDestroy });

        setTimeout(() => {
          result[toDeleteHorizontal[h][0]][z] = -1;
        }, 100);
      } else {
        result[toDeleteHorizontal[h][0]][z] = -1;
      }
    }
  }
  for (let h = 0; h < toDeleteVertical.length; h++) {
    for (let z = toDeleteVertical[h][2]; z < toDeleteVertical[h][1] + 1; z++) {
      //console.log(`coordinates arrayToDestroy: ${arrayToDestroy}`);
      if (!checkMove) {
        points = points + 10;
        // console.log({ points });

        setPoints(points);
        arrayToDestroy.push([z, toDeleteVertical[h][0]]);
        setDestroyedCoordinates(arrayToDestroy);
        console.log({ arrayToDestroy });

        setTimeout(() => {
          result[z][toDeleteVertical[h][0]] = -1;
        }, 100);
      } else {
        result[z][toDeleteVertical[h][0]] = -1;
      }
    }
  }
  setDestroyedCoordinates(arrayToDestroy);
  context.setPoints(points);
  context.setMoves(context.moves);

  console.log(`returning result`);
  return result;
};

const randomNumber = () => {
  return Math.floor(Math.random() * 5);
};

export const makeNewBoardWithXsizing = (x: number) => {
  let newBoard: Array<Array<number>> = [];
  for (let i = 0; i < x; i++) {
    newBoard.push([]);
    for (let j = 0; j < x; j++) {
      newBoard[i].push(randomNumber());
    }
  }

  return newBoard;
};

export const checkIfCombos = (
  first: Array<number>,
  second: Array<number>,
  boardToCheck: Array<Array<number>>,
  points: number,
  setPoints: (value: number) => void,
  setDestroyedCoordinates: (x: any) => void,
  context: PointsContextType | undefined,
  setEndPostion: (x: Array<number>) => void,
  setStartPostion: (x: Array<number>) => void,
  setImpossibleMove: (x: boolean) => void,
  setPreviousBoard: (x: Array<Array<number>>) => void
) => {
  let newBoard = JSON.parse(JSON.stringify(boardToCheck));

  if (Math.abs(second[0] - first[0]) <= 1 && second[1] === first[1]) {
    /*   console.log(
        `Original Board, first candy: ${
          boardToCheck[first[0]][first[1]]
        }, second candy: ${boardToCheck[second[0]][second[1]]}`
      ); */
    let firstCandy = boardToCheck[first[0]][first[1]];
    let secondCandy = boardToCheck[second[0]][second[1]];

    newBoard[first[0]][first[1]] = secondCandy;
    newBoard[second[0]][second[1]] = firstCandy;
    /*       console.log(
        `newBoard, first candy: ${
          newBoard[first[0]][first[1]]
        }, second candy: ${newBoard[second[0]][second[1]]}`
      ); */

    /*  console.log(JSON.stringify(rearrangeBoard(newBoard)));
      console.log(JSON.stringify(newBoard));
 */

    if (
      JSON.stringify(
        rearrangeBoard(
          newBoard,
          true,
          points,
          setPoints,
          setDestroyedCoordinates,
          context
        )
      ) === JSON.stringify(newBoard)
    ) {
      console.log("they are the same, nothing changed");
      setEndPostion([-1, -1]);
      setStartPostion([-1, -1]);
      setImpossibleMove(true);
      setPreviousBoard(boardToCheck);
      return newBoard;
    } else {
      setEndPostion([-1, -1]);
      setStartPostion([-1, -1]);
      return newBoard;
    }
  }

  if (Math.abs(second[1] - first[1]) <= 1 && second[0] === first[0]) {
    /*  console.log(
        `Original Board, first candy: ${
          boardToCheck[first[0]][first[1]]
        }, second candy: ${boardToCheck[second[0]][second[1]]}`
      ); */
    let firstCandy = boardToCheck[first[0]][first[1]];
    let secondCandy = boardToCheck[second[0]][second[1]];

    newBoard[first[0]][first[1]] = secondCandy;
    newBoard[second[0]][second[1]] = firstCandy;
    /* console.log(
        `newBoard, first candy: ${
          newBoard[first[0]][first[1]]
        }, second candy: ${newBoard[second[0]][second[1]]}`
      ); */

    /*  console.log(JSON.stringify(rearrangeBoard(newBoard)));
    console.log(JSON.stringify(newBoard)); */
    if (
      JSON.stringify(
        rearrangeBoard(
          newBoard,
          true,
          points,
          setPoints,
          setDestroyedCoordinates,
          context
        )
      ) === JSON.stringify(newBoard)
    ) {
      console.log("they are the same, nothing changed 1");
      setEndPostion([-1, -1]);
      setStartPostion([-1, -1]);
      setImpossibleMove(true);
      setPreviousBoard(boardToCheck);
      return newBoard;
    } else {
      setEndPostion([-1, -1]);
      setStartPostion([-1, -1]);
      return newBoard;
    }
  }
};
