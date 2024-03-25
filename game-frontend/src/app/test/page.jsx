"use client";

import "animate.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const [setting, setSetting] = useState(null);
  const [loadingSetting, setLoadingSetting] = useState(false);

  const loadSetting = async () => {
    setLoadingSetting(true);
    const resp = await axios.get("/api/setting");
    setSetting(resp.data.setting);
    setLoadingSetting(false);
  };

  useEffect(() => {
    loadSetting();
  }, []);

  return (
    <>
      <main class="bg-white">
        {loadingSetting && !setting && <div>Load....</div>}
        {setting && (
          <>
            <p key={setting.col}>Number of Players: {setting.numPlayer}</p>
            <p key={setting.col}>col: {setting.col}</p>
            <p key={setting.col}>row: {setting.row}</p>
            <p key={setting.col}>budget: {setting.budget}</p>
            <p key={setting.col}>initplan: {setting.initplan}</p>
            <p key={setting.col}>Interest: {setting.interest}</p>
          </>
        )}
      </main>
    </>
  );
}
