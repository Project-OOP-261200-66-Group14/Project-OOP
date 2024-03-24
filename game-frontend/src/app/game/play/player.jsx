import axios from "axios";
import { useEffect, useState } from "react";

export default function Player({ name }) {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  const [budget, setBudget] = useState(0);
  const loadBudget = async () => {
    try {
      const resp = await axios.get("/api/info");
      // กำหนดค่า budget จากข้อมูลที่ได้รับ
      setBudget(resp.data.current.find(player => player.username === name)?.budget || 0);
    } catch (error) {
      console.error("Error loading budget:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      loadBudget();;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const begin = () => {
    if(name === username){
      return "You";
    } else {
      return "Player"
    }
  }

  return (
    <>
      <div class="mr-10">
        <h1 class="text-2xl">{begin()}: {name.toUpperCase()}</h1>
        <div class="flex items-center">
          <img src="/picture/start/10.png" class="w-[80px]" />
          <div class="bg-white p-3 rounded-full w-[200px]">
            <h2 class="text-center">{budget}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
