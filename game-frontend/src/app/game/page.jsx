"use client";

import { useEffect, useState } from "react";
import "animate.css";
import axios from "axios";

export default function Game() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [wait, setWait] = useState(false);
  const [settingPlayer, setSettingPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  // โหลดจำนวน player มาจาก API
  const loadUesr = async () => {
    const resp = await axios.get("/api/game");
    setPlayers(resp.data.players.length);
  };

  // โหลดจำนวนผู้เล่นจาก API
  const loadSettingPlayer = async () => {
    const resp = await axios.get("/api/setting");
    setSettingPlayer(resp.data.setting.numPlayer);
    setPageLoad(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      loadSettingPlayer();
      loadUesr();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  // InputName
  const inputNameOnChange = (event) => {
    setName(event.target.value);
    setUsername(name.toUpperCase());
  };

  const addName = async () => {
    try {
      await axios.post("/api/game", {
        username: username,
      });
      setWait(true);
    } catch (error) {
      alert("กด Submit ใหม่อีกครั้ง, อาจจะมีชื่อซ้ำ");
    }
  };

  useEffect(() => {
    if (players > 1 && settingPlayer > 1) {
      if (players === settingPlayer) {
        setTimeout(() => {
          window.location.href = `/game/play?username=${username}`;
        }, 5000);
      }
    }
  }, [players, settingPlayer]);

  // LoadPage
  const [pageLoad, setPageLoad] = useState(false);

  return (
    <>
      {wait && pageLoad && (
        <>
          <main class="bg-Wait flex justify-center items-center">
            <div class="flex flex-col justify-center items-center max-h-screen">
              <h1 class="text-[#ffd058] -mt-[240px]">Wait a moment....</h1>
              <h1 class="text-[#ffd058] ">
                {players} / {settingPlayer}
              </h1>
            </div>

            <div class="min-h-screen">
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
      {wait && !pageLoad && (
        <>
          <main class="bg-PreGame flex justify-center items-center min-h-screen">
            <div class="lds-hourglass"></div>
          </main>
        </>
      )}
      {!wait && (
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
      )}
    </>
  );
}
