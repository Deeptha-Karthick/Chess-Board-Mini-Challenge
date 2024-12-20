import "./styles.css";
import { useState, useMemo } from "react";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [diagonals, setDiagonals] = useState([]);
  const boardConfig = Array.from({ length: 8 }, (_, rowIndex) =>
    Array.from({ length: 8 }, (_, colIndex) => null)
  );

  let leftDiagonal = [];
  let rightDiagonal = [];

  //ex - row 4 col 3

  console.log("diagonals", diagonals);

  const getTopLeftDiagonal = (rowIndex, colIndex) => {
    let newRowIndex = rowIndex;
    let newcolIndex = colIndex;
    if (rowIndex === 0 || colIndex === 0) {
      return;
    }
    leftDiagonal.push([newRowIndex - 1, newcolIndex - 1]);

    return getTopLeftDiagonal(newRowIndex - 1, newcolIndex - 1);
  };

  const cellClassName = (rowIndex, colIndex) => {
    let className = "";
    if (selected && selected[0] === rowIndex && selected[1] === colIndex) {
      return className + "maroon";
    } else {
      return diagonals.find((el) => el[0] === rowIndex && el[1] === colIndex)
        ? "selected"
        : "";
    }
  };
  const getBottomRightDiagonal = (rowIndex, colIndex) => {
    let newRowIndex = rowIndex;
    let newcolIndex = colIndex;
    if (rowIndex === 7 || colIndex === 7) {
      return;
    }
    leftDiagonal.push([newRowIndex + 1, newcolIndex + 1]);

    return getBottomRightDiagonal(newRowIndex + 1, newcolIndex + 1);
  };

  const getTopRightDiagonal = (rowIndex, colIndex) => {
    let newRowIndex = rowIndex;
    let newcolIndex = colIndex;
    if (rowIndex === 0 || colIndex === 7) {
      return;
    }
    rightDiagonal.push([newRowIndex - 1, newcolIndex + 1]);

    return getTopRightDiagonal(newRowIndex - 1, newcolIndex + 1);
  };

  const getBottomLeftDiagonal = (rowIndex, colIndex) => {
    let newRowIndex = rowIndex;
    let newcolIndex = colIndex;
    if (rowIndex === 7 || colIndex === 0) {
      return;
    }
    rightDiagonal.push([newRowIndex + 1, newcolIndex - 1]);

    return getBottomLeftDiagonal(newRowIndex + 1, newcolIndex - 1);
  };

  const onCellClick = (rowIndex, colIndex) => {
    setSelected([rowIndex, colIndex]);

    //Left Diagonal
    getTopLeftDiagonal(rowIndex, colIndex);
    getBottomRightDiagonal(rowIndex, colIndex);
    getTopRightDiagonal(rowIndex, colIndex);
    getBottomLeftDiagonal(rowIndex, colIndex);
    console.log("leftDiagonal", leftDiagonal);
    console.log("rightDiagonal", rightDiagonal);
    setDiagonals([...leftDiagonal, ...rightDiagonal]);

    //Right Diagonal
  };

  return (
    <div className="App">
      <h1>Chess Board</h1>
      <div className="chess-board">
        {boardConfig.map((el, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {el.map((el, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={`cell ${
                      rowIndex % 2 === colIndex % 2 ? "white" : "black"
                    } ${selected && cellClassName(rowIndex, colIndex)}`}
                    onClick={() => onCellClick(rowIndex, colIndex)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*



*/
