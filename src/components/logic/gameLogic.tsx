export const rearrangeBoard = (
  boardToValidate: any,
  checkMove: Boolean,
  points: any,
  setPoints: any,
  setDestroyedCoordinates: any,
  context: any,
  numberOfCandysLeft: any,
  setNumberOfCandysLeft: any
) => {
  let result = JSON.parse(JSON.stringify(boardToValidate));
  let toDeleteHorizontal: any = [];
  let toDeleteVertical: any = [];
  let emptyPieces = false;

  let addNewPieces = (boardToCheck: any) => {
    let tempResult = [...boardToCheck];

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

  let checkVertical = (boardToCheck: any) => {
    let tempResult = JSON.parse(JSON.stringify(boardToCheck));

    for (let col = 0; col < tempResult[0].length; col++) {
      let start = 0;
      let end = 0;
      let tempValue = undefined;
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

  let checkHorizontally = (boardToCheck: any) => {
    let tempResult = JSON.parse(JSON.stringify(boardToCheck));
    for (let i = 0; i < tempResult.length; i++) {
      let start = 0;
      let end = 0;
      let tempValue = undefined;
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
  let arrayToDestroy: any = [];
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
        setTimeout(() => {
          result[toDeleteHorizontal[h][0]][z] = -1;
        }, 100);
      } else {
        result[toDeleteHorizontal[h][0]][z] = -1;
      }
    }
  }
  for (let h = 0; h < toDeleteVertical.length; h++) {
    //console.log("reberti");

    for (let z = toDeleteVertical[h][2]; z < toDeleteVertical[h][1] + 1; z++) {
      //console.log(`coordinates arrayToDestroy: ${arrayToDestroy}`);
      if (!checkMove) {
        points = points + 10;
        // console.log({ points });

        setPoints(points);
        arrayToDestroy.push([z, toDeleteVertical[h][0]]);
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
  return result;
};

const randomNumber = () => {
  return Math.floor(Math.random() * 5);
};

export const makeNewBoardWithXsizing = (x: any) => {
  let newBoard: any = [];
  for (let i = 0; i < x; i++) {
    newBoard.push([]);
    for (let j = 0; j < x; j++) {
      newBoard[i].push(randomNumber());
    }
  }

  return newBoard;
};

export const checkIfCombos = (
  first: any,
  second: any,
  boardToCheck: any,
  points: any,
  setPoints: any,
  setDestroyedCoordinates: any,
  context: any,
  setEndPostion: any,
  setStartPostion: any,
  setImpossibleMove: any,
  setPreviousBoard: any,
  numberOfCandysLeft: any,
  setNumberOfCandysLeft: any
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
          context,
          numberOfCandysLeft,
          setNumberOfCandysLeft
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
          context,
          numberOfCandysLeft,
          setNumberOfCandysLeft
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
