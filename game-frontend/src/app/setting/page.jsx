"use client";

import "animate.css";
import { useState } from "react";

export default function Setting() {
  const [col, setCol] = useState();
  const colOnChange = (event) => {
    setCol(event.target.value);
  };

  const [row, setRow] = useState();
  const rowOnChange = (event) => {
    setRow(event.target.value);
  };

  const [init_plan_min, setInit_plan_min] = useState();
  const init_plan_minOnChange = (event) => {
    setInit_plan_min(event.target.value);
  };

  const [init_plan_sec, setInit_plan_sec] = useState();
  const init_plan_secOnChange = (event) => {
    setInit_plan_sec(event.target.value);
  };

  const [budget, setBudget] = useState();
  const budgetOnChange = (event) => {
    setBudget(event.target.value);
  };

  const [interest, setInterest] = useState();
  const interestOnChange = (event) => {
    setInterest(event.target.value);
  };

  const defaultSet = () => {
    setCol(10);
    setRow(10);
    setBudget(10000);
    setInit_plan_min(3);
    setInit_plan_sec(0);
    setInterest(5);
  };

  return (
    <>
      <main class="bg-Home">
        <div class=" flex justify-center flex-col items-center max-h-screen">
          <h1 class="animate__heartBeat">Setting</h1>

          <div class="p-10 mt-3 backdrop-blur-[1px]">
            <div class="flex flex-row gap-10">
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
            <button class="bg-white w-32" onClick={defaultSet}>
              Default
            </button>
            <button class="bg-white w-32">Enter</button>
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
