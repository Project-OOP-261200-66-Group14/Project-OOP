"use client";

import "animate.css";
import axios from "axios";
import { useState } from "react";

export default function Setting() {
  const [numPlayer, setNumPlayer] = useState(2);
  const numPlayerOnChange = (event) => {
    setNumPlayer(parseInt(event.target.value));
  };

  const [col, setCol] = useState(10);
  const colOnChange = (event) => {
    setCol(parseInt(event.target.value));
  };

  const [row, setRow] = useState(10);
  const rowOnChange = (event) => {
    setRow(parseInt(event.target.value));
  };

  const [init_plan_min, setInit_plan_min] = useState(2);
  const init_plan_minOnChange = (event) => {
    setInit_plan_min(parseInt(event.target.value));
  };

  const [init_plan_sec, setInit_plan_sec] = useState(0);
  const init_plan_secOnChange = (event) => {
    setInit_plan_sec(parseInt(event.target.value));
  };

  const [budget, setBudget] = useState(10000);
  const budgetOnChange = (event) => {
    setBudget(parseInt(event.target.value));
  };

  const [interest, setInterest] = useState(5);
  const interestOnChange = (event) => {
    setInterest(parseInt(event.target.value));
  };

  const defaultSet = () => {
    setNumPlayer(2);
    setCol(10);
    setRow(10);
    setBudget(10000);
    setInit_plan_min(3);
    setInit_plan_sec(0);
    setInterest(5);
  };

  const updateSettings = async () => {
    try {
      if (numPlayer < 2 || numPlayer > 6 || numPlayer === null) {
        alert("Please select a Players between 2-6");
      } else if (row < 10 || row > 100) {
        alert("Please select a Rows between 10-100");
      } else if (col < 10 || col > 100) {
        alert("Please select a Column between 10-100");
      } else if (init_plan_min < 1 || init_plan_min > 5) {
        alert("Please select a Time to Plan(min) between 1-5");
      } else if (init_plan_sec < 0 || init_plan_sec > 59) {
        alert("Please select a Time to Plan(sec) between 0-59");
      } else if (budget < 5000 || budget > 50000) {
        alert("Please select a Budget between 5000-50000");
      } else if (interest < 2 || interest > 20) {
        alert("Please select a Interest Rate between 2-20");
      } else {
        await axios.put("/api/setting", {
          numPlayer: numPlayer,
          col: col,
          row: row,
          initplan: init_plan_min * 60 + init_plan_sec,
          budget: budget,
          interest: interest,
        });
        alert("UPDATE SUCCESS");
      }
    } catch (error) {
      alert("ERROR");
    }
  };

  return (
    <>
      <main class="bg-Home">
        <div class=" flex justify-center flex-col items-center max-h-screen">
          <h1 class="animate__heartBeat">Setting</h1>

          <div class="p-10 mt-3 backdrop-blur-[1px]">
            <div class="flex flex-row gap-10">
              <h1 class="text-2xl">Players</h1>
              <input
                type="number"
                name="numPlayer"
                id="numPlayer"
                min="2"
                max="6"
                placeholder="2-6"
                onChange={numPlayerOnChange}
                value={numPlayer}
                class="bg-white rounded-full max-h-[32px] text-center"
              />
            </div>

            <div class="flex flex-row gap-10 pt-10">
              <h1 class="text-2xl">COLUMN</h1>
              <input
                type="number"
                name="col"
                id="col"
                min="10"
                max="100"
                placeholder="10-100"
                onChange={colOnChange}
                value={col}
                class="bg-white rounded-full max-h-[32px] text-center"
              />
            </div>

            <div class="flex flex-row gap-10 pt-10">
              <h1 class="text-2xl">ROW</h1>
              <input
                type="number"
                name="row"
                id="row"
                min="10"
                max="100"
                placeholder="10-100"
                onChange={rowOnChange}
                value={row}
                class="bg-white rounded-full max-h-[32px] text-center"
              />
            </div>

            <div class="flex flex-row items-center gap-10 pt-10">
              <h1 class="text-2xl">TIME TO PLAN</h1>
              <div class="flex flex-row gap-2">
                <input
                  type="number"
                  name="init_plan_min"
                  id="init_plan_min"
                  min="1"
                  max="5"
                  placeholder="1-5"
                  onChange={init_plan_minOnChange}
                  value={init_plan_min}
                  class="bg-white rounded-full max-h-[32px] text-center"
                />
                <h1 class="text-2xl">:</h1>
                <input
                  type="number"
                  name="init_plan_sec"
                  id="init_plan_sec"
                  min="0"
                  max="59"
                  placeholder="0-59"
                  onChange={init_plan_secOnChange}
                  value={init_plan_sec}
                  class="bg-white rounded-full max-h-[32px] text-center"
                />
              </div>
            </div>

            <div class="flex flex-row gap-10 pt-10">
              <h1 class="text-2xl">BUDGET</h1>
              <input
                type="number"
                name="budget"
                id="budget"
                min="5000"
                max="50000"
                placeholder="5000-50000"
                onChange={budgetOnChange}
                value={budget}
                class="bg-white rounded-full max-h-[32px] text-center"
              />
            </div>

            <div class="flex flex-row gap-10 pt-10">
              <h1 class="text-2xl">INTERREST RATE</h1>
              <div class="flex flex-row gap-2">
                <input
                  type="number"
                  name="interest"
                  id="interest"
                  min="2"
                  max="20"
                  placeholder="2-20"
                  onChange={interestOnChange}
                  value={interest}
                  class="bg-white rounded-full max-h-[32px] text-center"
                />
                <h1 class="text-2xl">%</h1>
              </div>
            </div>
          </div>

          <div class="flex flex-row gap-24">
            <button class="w-48" onClick={defaultSet}>
              <img src="/picture/setting/Default.png" class="hover:scale-110" />
            </button>
            <button class="w-48" onClick={updateSettings}>
              <img src="/picture/setting/Enter.png" class="hover:scale-110" />
            </button>
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
