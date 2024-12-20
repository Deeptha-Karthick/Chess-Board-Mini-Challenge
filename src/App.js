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

  const getDiagonal = (rowIndex, colIndex, rowStep, colStep, diagonal) => {
    if (rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7) {
      return;
    }
    diagonal.push([rowIndex, colIndex]);
    let newRowIndex = rowIndex + rowStep;
    let newcolIndex = colIndex + colStep;
    return getDiagonal(newRowIndex, newcolIndex, rowStep, colStep, diagonal);
  };

  const onCellClick = (rowIndex, colIndex) => {
    setSelected([rowIndex, colIndex]);

    //Left Diagonal
    getDiagonal(rowIndex, colIndex, -1, -1, leftDiagonal); //Top Left Diagonal
    getDiagonal(rowIndex, colIndex, 1, -1, leftDiagonal); //Bottom Right Diagonal

    //Right Diagonal
    getDiagonal(rowIndex, colIndex, -1, 1, rightDiagonal); //Top Right Diagonal
    getDiagonal(rowIndex, colIndex, 1, 1, rightDiagonal); //Bottom Right Diagonal
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

