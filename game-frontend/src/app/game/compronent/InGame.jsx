import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Player from "./player";
import HexGrid from "./HexGrid";
import { useEffect, useState } from "react";

export default function InGame({ name }) {
  const rows = 20;
  const columns = 20;
  const [iturn, setIturn] = useState(0)

  // Time
  const [time, setTime] = useState(5);
  useEffect(() => {
    let interval = null;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if(time <= 0){
      setIturn((prevTurn) => prevTurn + 1);
      setTime(5);
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

  // ReadWrite
  const [constructionPlanText, setConstructionPlanText] = useState("");
  const [text, setText] = useState("");
  const inputText = (event) => {
    setText(event.target.value);
  };

  const ReadConfigText = (event) => {
    if (text === "cls") {
      setConstructionPlanText("");
    } else {
      setConstructionPlanText(constructionPlanText + text + "\n");
    }
    setText("");
  };

  // hiddenConstructionPlan
  const [constructionPlan, setConstructionPlan] = useState(false);

  return (
    <>
      <main class="bg-Start relative h-screen">
        <div class="grid grid-cols-6 h-full">
          <div class="col-span-2 backdrop-blur-[1px]">
            <div class="flex flex-col">
              <div class="p-[40px]">
                <h1 class="text-3xl animate__animated animate__lightSpeedInLeft ">
                  TURN: {iturn === 0 ? "Setup Plan": iturn}
                </h1>
                <div class="flex flex-row items-center animate__animated animate__lightSpeedInLeft mt-8">
                  <img src="/picture/start/clock.png" class="h-10" />
                  <h1 class="text-3xl">Time: {formatTime(time)}</h1>
                </div>
              </div>
              <div class="flex flex-row mx-[40px] py-2 animate__animated animate__zoomIn overflow-y-scroll">
                <Player name={name} />
                <Player name={"bot1"} />
                <Player name={"bot2"} />
                <Player name={"bot3"} />
              </div>
            </div>
            <div>
              <div
                class="flex justify-between items-center bg-white mx-[40px] mt-12 px-[12px] py-[4px] rounded-md border-solid border-2 border-[#4a4e69]"
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
                class={`bg-white mx-[40px] mt-4 rounded-md border-solid border-2 border-[#4a4e69] ${
                  constructionPlan ? "animate__animated animate__fadeOut" : "animate__animated animate__fadeIn"
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
                <div class="flex flex-row justify-center items-center h-[150px] mx-2">
                  <textarea
                    type="text"
                    class="pl-1 mr-2 rounded-md border-solid border-2 w-full border-[#4a4e69] max-h-[144px] min-h-[144px]"
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
              <div class="max-h-[80vh] max-w-[80vw] overflow-scroll p-10 relative mr-10 mb-10">
                <HexGrid rows={rows} columns={columns} class="absolute " />
              </div>
            </div>
          </div>
        </div>

        <div class="min-h-screen">
          <a href="/">
            <img
              src="/picture/howto/homepage.png"
              alt=""
              class="w-[80px] max-w-48 absolute bottom-4 left-4 hover:scale-110"
            />
          </a>
        </div>
      </main>
    </>
  );
}
