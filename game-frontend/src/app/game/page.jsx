"use client";

import { useState } from "react";
import HexGrid from "./HexGrid";

export default function Game() {
  const rows = 8;
  const columns = 14;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const inputNameOnChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const addName = () => {
    setUsername(name);
    console.log(username);
  };

  return (
    <>
      {username == "" ? (
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
              <div class="col-span-2">
                <div class="flex flex-col">
                  <div class="p-[40px]">
                    <h1 class="text-3xl">Name: {username}</h1>
                  </div>
                  <div class="p-[40px]">
                    <div>
                      <h1 class="text-3xl">Player1</h1>
                      <div class="flex items-center">
                        <img src="/picture/start/10.png" class="w-[80px]" />
                        <div class="bg-white p-3 ml-6 rounded-full w-[160px]">
                          <h2 class="text-center">0</h2>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h1 class="text-3xl">Player2</h1>
                        <div class="flex items-center">
                          <img src="/picture/start/10.png" class="w-[80px]" />
                          <div class="bg-white p-3 ml-6 rounded-full w-[160px]">
                            <h2 class="text-center">0</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-4">
                <div class="min-h-screen flex justify-center items-center overflow-hidden">
                  <HexGrid rows={rows * 2} columns={columns / 2} />
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
