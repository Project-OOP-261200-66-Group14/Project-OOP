"use client";

import { useState } from "react";
import "animate.css";
import InGame from "./compronent/InGame";

export default function Game() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const inputNameOnChange = (event) => {
    setName(event.target.value);
  };

  const addName = () => {
    setUsername(name);
  };

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
          <InGame name={username}/>
        </>
      )}
    </>
  );
}
