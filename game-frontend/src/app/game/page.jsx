"use client";

import { useState } from "react";
import HexGrid from "./compronent/HexGrid";
import "animate.css";
import Player from "./compronent/player";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Game() {
  const rows = 30;
  const columns = 30;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const inputNameOnChange = (event) => {
    setName(event.target.value);
  };

  const addName = () => {
    setUsername(name);
  };

  const text = `const text = "Hello ${name}"`+
`
t = t + 1
m = 0
while (deposit) {
  if (deposit - 100)
  then collect (deposit / 4)
  else if (budget - 25) then invest 25
  else {}
  if (budget - 100) then {} else done
    opponentLoc = opponent
  if (opponentLoc / 10 - 1)
  then
    if (opponentLoc % 10 - 5) then move downleft
    else if (opponentLoc % 10 - 4) then move down
    else if (opponentLoc % 10 - 3) then move downright
    else if (opponentLoc % 10 - 2) then move right
    else if (opponentLoc % 10 - 1) then move upright
    else move up
  else if (opponentLoc)
  then
    if (opponentLoc % 10 - 5) then {
      cost = 10 ^ (nearby upleft % 100 + 1)
      if (budget - cost) then shoot upleft cost else {}
    }
    else if (opponentLoc % 10 - 4) then {
      cost = 10 ^ (nearby downleft % 100 + 1)
      if (budget - cost) then shoot downleft cost else {}
    }
    else if (opponentLoc % 10 - 3) then {
      cost = 10 ^ (nearby down % 100 + 1)
      if (budget - cost) then shoot down cost else {}
    }
    else if (opponentLoc % 10 - 2) then {
      cost = 10 ^ (nearby downright % 100 + 1)
      if (budget - cost) then shoot downright cost else {}
    }
    else if (opponentLoc % 10 - 1) then {
      cost = 10 ^ (nearby upright % 100 + 1)
      if (budget - cost) then shoot upright cost else {}
    }
    else {
      cost = 10 ^ (nearby up % 100 + 1)
      if (budget - cost) then shoot up cost else {}
    }
  else {  # no visible opponent; move in a random direction
    dir = random % 6
    if (dir - 4) then move upleft
    else if (dir - 3) then move downleft
    else if (dir - 2) then move down
    else if (dir - 1) then move downright
    else if (dir) then move upright
    else move up
    m = m + 1
  }
}
if (budget - 1) then invest 1 else {}
`

  return (
    <>
      {username == "" || username == " " ? (
        <>
          <main class="bg-PreGame flex justify-center items-center">
            <div class="flex flex-col justify-center items-center w-[360px] h-40 bg-slate-300 rounded-md ">
              <h2 class="drop-shadow-md">Your name!</h2>
              <input
                type="text"
                class="mx-10 rounded-md drop-shadow-md"
                onChange={inputNameOnChange}
                value={name}
              />
              <button
                class="m-2 px-2 bg-green-300 rounded-md drop-shadow-md"
                onClick={addName}
              >
                Submit
              </button>
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
      ) : (
        <>
          <main class="bg-Start relative h-screen">
            <div class="grid grid-cols-6 h-full">
              <div class="col-span-2 backdrop-blur-[1px]">
                <div class="flex flex-col">
                  <div class="p-[40px]">
                    <h1 class="text-3xl animate__animated animate__lightSpeedInLeft ">
                      TURN: 1
                    </h1>
                    <div class="flex flex-row items-center animate__animated animate__lightSpeedInLeft mt-8">
                      <img src="/picture/start/clock.png" class="h-10" />
                      <h1 class="text-3xl">Time: 00:00</h1>
                    </div>
                  </div>
                  <div class="flex flex-row mx-[40px] py-2 animate__animated animate__zoomIn overflow-y-scroll">
                    <Player name={username} />
                    <Player name={"bot1"} />
                    <Player name={"bot2"} />
                    <Player name={"bot3"} />
                  </div>
                </div>
                <div>
                  <div class="bg-white mx-[40px] mt-12 px-[12px] py-[4px] rounded-md border-solid border-2 border-[#4a4e69] ">
                    <p class="text-[#4a4e69]">current plan</p>
                  </div>
                  <div class="bg-white mx-[40px] mt-4 rounded-md border-solid border-2 border-[#4a4e69]">
                    <div class="m-2 rounded-md border-solid border-2  border-[#4a4e69]">
                      <SyntaxHighlighter
                        language="jsx"
                        style={atomOneLight}
                        class="h-[200px]"
                        showLineNumbers={1}
                      >
                        {text}
                      </SyntaxHighlighter>
                    </div>
                    <div class="flex flex-row justify-center items-center h-12 mx-2">
                      <input
                        type="text"
                        class="pl-1 mr-2 rounded-md border-solid border-2 w-full border-[#4a4e69] h-[36px]"
                        placeholder="Enter your code here"
                      />
                      <button class="bg-red-600 rounded-md text-white h-[36px] w-[60px] hover:scale-110">
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
      )}
    </>
  );
}
