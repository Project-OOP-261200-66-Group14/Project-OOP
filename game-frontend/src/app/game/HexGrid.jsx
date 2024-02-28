export default function HexGrid({ rows, columns }) {
  return (
    <div className="">
      {Array(rows).fill(null).map((_, rowIndex) => (
        <div key={rowIndex} className={
          rowIndex % 2 === 0 ? "flex justify-center items-center ml-[100px] -mt-[34px]" : "flex justify-center items-center -mt-[34px]"
        }>
          {Array(columns).fill(null).map((_, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="hex mx-[20px] hover:mx-[20px]" />
          ))}
        </div>
      ))}
    </div>
  );
}