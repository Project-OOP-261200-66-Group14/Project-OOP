import React, { useEffect, useState } from "react";

export default function HexGrid({ rows, columns, togglePopup }) {
  // ระบุ username ที่เล่น
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  const [hexColor, setHexColor] = useState({});
  const loadHexColor = async () => {
    try {
      const resp = await fetch("/api/dbAll");
      const data = await resp.json();
      const colors = {};

      data.all.table.forEach((item) => {
        const { row, col } = item.position;
        // เช็คว่า username เป็นของตัวเองหรือไม่
        if (item.username === username) {
          colors[`${row}-${col}`] = "blue-500";
        } else {
          colors[`${row}-${col}`] = item.username ? "red-500" : "white";
        }
      });

      setHexColor(colors);
    } catch (error) {
      console.error("Error loading hex colors:", error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      loadHexColor();;
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      {Array(rows)
        .fill(null)
        .map((_, rowIndex) => (
          <div
            key={rowIndex}
            class={
              rowIndex === 0
                ? "flex justify-center items-center w-fit "
                : "flex justify-center items-center mt-[8px] w-fit"
            }
          >
            {Array(columns)
              .fill(null)
              .map((_, colIndex) => {
                const hexKey = `${rowIndex}-${colIndex}`;
                const bgColor = hexColor[hexKey] || "white";

                return (
                  <div
                    key={colIndex}
                    class={
                      colIndex % 2 === 0
                        ? `hex -ml-[10px] bg-${bgColor} hover:bg-gray-300`
                        : `hex -mt-[65px] -ml-[10px] bg-${bgColor} hover:bg-gray-300`
                    }
                    onClick={() => togglePopup(rowIndex, colIndex)}
                  >
                    <p class="h-full flex justify-center items-center">
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
