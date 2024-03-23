import React from "react";

export default function HexGrid({ rows, columns, togglePopup }) {
  return (
    <div>
      {Array(rows)
        .fill(null)
        .map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={
              rowIndex === 0
                ? "flex justify-center items-center w-fit "
                : "flex justify-center items-center mt-[8px] w-fit"
            }
          >
            {Array(columns)
              .fill(null)
              .map((_, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={
                      colIndex % 2 === 0
                        ? "hex -ml-[10px] bg-white hover:bg-gray-300"
                        : "hex -mt-[65px] -ml-[10px] bg-white hover:bg-gray-300"
                    }
                    onClick={() => {
                      togglePopup(rowIndex, colIndex);
                    }}
                  >
                    <p className="h-full flex justify-center items-center">
                      {rowIndex + 1},{colIndex + 1}
                    </p>
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
}
