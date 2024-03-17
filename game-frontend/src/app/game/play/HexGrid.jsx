import React from "react";

export default function HexGrid({
  rows,
  columns,
  togglePopup,
  selectedCityCrew,
  cityCrew,
  toggleBuildCity,
}) {
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
                const isCity = cityCrew.find(
                  (pos) => pos.row === rowIndex && pos.col === colIndex
                );
                return (
                  <div
                    key={colIndex}
                    className={
                      colIndex % 2 === 0
                        ? selectedCityCrew &&
                          selectedCityCrew.row === rowIndex &&
                          selectedCityCrew.col === colIndex
                          ? "hex -ml-[10px] bg-blue-300 hover:bg-gray-300"
                          : isCity
                          ? "hex -ml-[10px] bg-blue-300 hover:bg-gray-300"
                          : "hex -ml-[10px] bg-white hover:bg-gray-300"
                        : selectedCityCrew &&
                          selectedCityCrew.row === rowIndex &&
                          selectedCityCrew.col === colIndex
                        ? "hex -mt-[65px] -ml-[10px] bg-blue-300 hover:bg-gray-300"
                        : isCity
                        ? "hex -mt-[65px] -ml-[10px] bg-blue-300 hover:bg-gray-300"
                        : "hex -mt-[65px] -ml-[10px] bg-white hover:bg-gray-300"
                    }
                    onClick={() => {
                      togglePopup(rowIndex, colIndex);
                      toggleBuildCity();
                    }}
                  >
                    {selectedCityCrew && (
                      <p className="h-full flex justify-center items-center">
                        {selectedCityCrew.row + 1},{selectedCityCrew.col + 1}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
}
