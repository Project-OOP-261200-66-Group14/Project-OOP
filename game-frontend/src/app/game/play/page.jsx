"use client";
import "animate.css";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Player from "./player";
import HexGrid from "./HexGrid";
import { useEffect, useState } from "react";
import axios from "axios";
export default function InGame() {
  // Turn
  const [iturn, setIturn] = useState(0);

  // Time
  const [time, setTime] = useState(60);
  // const loadTime = async () => {
  //   try {
  //     const resp = await axios.get("/api/setting");
  //     setTime(resp.data.setting.initplan);
  //   } catch {
  //     console.log("Error loading time in game");
  //   }
  // };

  // useEffect(() => {
  //   loadTime();
  // }, []);

  useEffect(() => {
    let interval = null;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      setIturn((prevTurn) => prevTurn + 1);
      setTime(90);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // เอา list player มาจาก API
  const [players, setPlayers] = useState([]);
  const loadPlayers = async () => {
    try {
      const resp = await axios.get("/api/game");
      setPlayers(resp.data.players);
    } catch {
      console.log("Error loading players in game");
    }
  };

  // pop up กับ Row กับ Col ตอนที่กด
  const [isPopupOpen, setPopupOpen] = useState(false);
  // setRow กับ Col ที่กำลังเลือก
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);
  const togglePopup = (row, col) => {
    setPopupOpen(!isPopupOpen);
    setRowIndex(row);
    setColIndex(col);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      loadPlayers();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ระบุ username ที่เล่น
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  // setRow, Col
  const [cols, setCol] = useState(null);
  const [rows, setRow] = useState(null);
  const loadRowsCols = async () => {
    setPageLoad(false);
    const resp = await axios.get("/api/setting");
    setRow(resp.data.setting.row);
    setCol(resp.data.setting.col);
    setPageLoad(true);
  };

  useEffect(() => {
    loadRowsCols();
  }, []);

  // ReadWrite
  const [constructionPlanText, setConstructionPlanText] = useState("");
  const [text, setText] = useState("");
  const inputText = (event) => {
    setText(event.target.value);
  };

  const ReadConfigText = (event) => {
    if (text === "cls") {
      setConstructionPlanText("");
    } else if (text === "resetTime = 0") {
      setConstructionPlanText(constructionPlanText + text + "\n");
      setTime(10);
      setIturn(0);
    } else {
      setConstructionPlanText("" + text + "\n");
    }
    setText("");
  };

  // hiddenConstructionPlan
  const [constructionPlan, setConstructionPlan] = useState(false);

  // delete Player
  const deletePlayers = async () => {
    try {
      await axios.delete("/api/game", {
        data: {
          username: username,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // onClick สร้างcity
  const createCity = async () => {
    setPopupOpen(!isPopupOpen);
    try {
      await axios.post("/api/game/play", {
        username: username,
        positionName: "city",
        position: {
          row: rowIndex,
          col: colIndex,
        },
      });
      await axios.post("/api/info", {
        username: username,
        budget: 1,
        position: {
          row: rowIndex,
          col: colIndex,
        },
      });
      alert("สร้าง City เรียบร้อย");
    } catch (error) {
      alert("มี City อยู่แล้ว");
    }
  };

  // onClick สร้างcity
  const createCityCrew = async () => {
    setPopupOpen(!isPopupOpen);
    try {
      await axios.post("/api/game/play", {
        username: username,
        positionName: "cityCrew",
        position: {
          row: rowIndex,
          col: colIndex,
        },
      });
      await axios.put("/api/info", {
        username: username,
        budget: 1,
        position: {
          row: rowIndex,
          col: colIndex,
        },
      });
      alert("สร้าง CityCrew เรียบร้อย");
    } catch (error) {
      alert("สร้าง CityCrew ไม่สำเร็จ");
    }
  };

  // onClick ยกเลิกสร้างCity
  const cancelCreateCity = async () => {
    setPopupOpen(!isPopupOpen);
    try {
      await axios.delete("/api/game/play", {
        data: {
          username: username,
          positionName: "city",
          position: {
            row: rowIndex,
            col: colIndex,
          },
        },
      });
      await axios.delete("/api/info", {
        data: {
          username: username,
        },
      });
      alert("ยกเลิกสร้าง City เรียบร้อย");
    } catch (error) {
      alert("ยกเลิกสร้าง City ไม่สำเร็จ");
    }
  };

  // onClick ยกเลิกสร้าง CityCrew
  const cancelCreateCityCrew = async () => {
    setPopupOpen(!isPopupOpen);
    try {
      await axios.delete("/api/game/play", {
        data: {
          username: username,
          positionName: "cityCrew",
          position: {
            row: rowIndex,
            col: colIndex,
          },
        },
      });
      alert("ยกเลิกสร้าง CityCrew เรียบร้อย");
    } catch (error) {
      alert("ยกเลิกสร้าง CityCrew ไม่สำเร็จ");
    }
  };

  // หน้าโหลด
  const [pageLoad, setPageLoad] = useState(false);

  // CheckYouWin
  const [win, setWin] = useState(false);
  const [num, setNum] = useState(null);
  const loadNum = async () => {
    const resp = await axios.get("/api/game");
    setNum(resp.data.players.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadNum();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (num === 1) {
      Reset();
      setWin(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 8000);
    }
  }, [num]);

  const Reset = async () => {
    try {
      await axios.post("/api/reset");
    } catch {
      console.log("ResetError");
    }
  };

  return (
    <>
      {win && (
        <>
          <main class="bg-Win"></main>
        </>
      )}
      {!win && (
        <>
          {isPopupOpen && (
            <div class="flex justify-center items-center absolute z-10 backdrop-blur-[2px] min-h-screen min-w-full">
              <div class="bg-slate-300 rounded-md p-[10px] flex justify-center items-center flex-col gap-1 w-[360px] border-solid border-2 border-black shadow-md">
                <div class="flex justify-between items-center w-full">
                  <h1 class="text-2xl text-black pl-[48px]">
                    ตำแหน่ง : {rowIndex + 1},{colIndex + 1}
                  </h1>
                  <button>
                    <img
                      src="/picture/close.png"
                      class="h-[16px]"
                      onClick={() => setPopupOpen(!setPopupOpen)}
                    />
                  </button>
                </div>
                {iturn !== 0 && (
                  <div class="w-full">
                    <h1 class="text-[10px] text-black pl-[48px]">
                      Deposit: 1000
                    </h1>
                  </div>
                )}
                <div class="flex justify-center items-center flex-col gap-1">
                  {iturn === 0 && (
                    <>
                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={createCity}
                      >
                        Create City
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={cancelCreateCity}
                      >
                        Cancel Create City
                      </button>
                    </>
                  )}

                  {iturn !== 0 && (
                    <>
                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={createCityCrew}
                      >
                        Create City Crew
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={cancelCreateCityCrew}
                      >
                        Cancel Create City Crew
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        Shoot
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        Collect
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        Move
                      </button>

                      {/* <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        เดินขวาขึ้น
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        เดินซ้ายลง
                      </button>

                      <button
                        class="bg-white rounded-md w-[240px]"
                        onClick={() => setPopupOpen(!setPopupOpen)}
                      >
                        เดินขวาลง
                      </button> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <main class="bg-Start relative h-screen">
            <div class="grid grid-cols-6 h-full">
              <div class="col-span-2 backdrop-blur-[1px]">
                <div class="flex flex-col">
                  <div class="p-[40px]">
                    <h1 class="text-[24px]">
                      TURN:{iturn === 0 ? "Setup Plan" : iturn}
                    </h1>
                    <div class="flex flex-row items-center mt-8 animate__animated animate__fadeIn">
                      <img src="/picture/start/clock.png" class="h-10" />
                      <h1 class="text-[24px]">Time: {formatTime(time)}</h1>
                    </div>
                  </div>
                  <div class="flex flex-col mx-[40px] py-2 overflow-y-scroll max-h-[640px] animate__animated animate__fadeIn ">
                    {players.map((std, index) => (
                      <Player key={index} name={std.username} />
                    ))}
                  </div>
                </div>
                <div>
              <div
                class="flex justify-between items-center bg-white mx-[40px] mt-4 px-[12px] py-[4px] rounded-md border-solid border-2 border-[#4a4e69]"
                onClick={() => setConstructionPlan(!constructionPlan)}
              >
                <p class="text-[#4a4e69] ">construction plan</p>
                {constructionPlan ? (
                  <img src="/picture/arrow-up.png" class="h-[20px]" />
                ) : (
                  <img src="/picture/arrow-down.png" class="h-[20px]" />
                )}
              </div>
              <div
                class={`bg-white mx-[40px] mt-2 rounded-md border-solid border-2 border-[#4a4e69] ${
                  constructionPlan
                    ? "animate__animated animate__fadeOut"
                    : "animate__animated animate__fadeIn"
                }`}
              >
                <div class="m-2 p-0 rounded-md border-solid border-2 border-[#4a4e69]">
                  <SyntaxHighlighter
                    language="javascript"
                    class="h-[200px]"
                    showLineNumbers={1}
                  >
                    {constructionPlanText}
                  </SyntaxHighlighter>
                </div>
                <div class="flex flex-row justify-center items-center h-[130px] mx-2">
                  <textarea
                    type="text"
                    class="pl-1 mr-2 rounded-md border-solid border-2 w-full border-[#4a4e69] max-h-[120px] min-h-[120px]"
                    placeholder="Enter your code here"
                    onChange={inputText}
                    value={text}
                  />
                  <button
                    class="bg-red-600 rounded-md text-white h-[36px] w-[60px] hover:scale-110"
                    onClick={ReadConfigText}
                  >
                    SENT
                  </button>
                </div>
              </div>
            </div>
              </div>
              <div class="col-span-4">
                <div class="h-full w-full flex items-center justify-center">
                  {!pageLoad && <div class="lds-hourglass"></div>}
                  {pageLoad && (
                    <div class="max-h-[80vh] max-w-[80vw] overflow-scroll p-10 relative mr-10 mb-10">
                      <HexGrid
                        rows={rows}
                        columns={cols}
                        togglePopup={togglePopup}
                        class="absolute"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="min-h-screen bg-red-400">
              <a href="/" onClick={deletePlayers}>
                <img
                  src="/picture/howto/homepage.png"
                  alt=""
                  class="w-[80px] max-w-48 absolute bottom-4 left-4 hover:scale-110"
                />
              </a>
            </div>
          </main>
        </>
      )}
    </>
  );
}
