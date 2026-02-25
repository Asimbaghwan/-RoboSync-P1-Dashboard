import React, { useEffect, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYaVVi_sdgxj6i6Q7jIUQCMpKDBne-udo",
  authDomain: "esp8266ledcontrol-648f6.firebaseapp.com",
  databaseURL:
    "https://esp8266ledcontrol-648f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266ledcontrol-648f6",
  storageBucket: "esp8266ledcontrol-648f6.appspot.com",
  messagingSenderId: "785496335355",
  appId: "1:785496335355:web:c7be94f44f3f7f5fc6215e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [data, setData] = useState({});
  const [mode, setModeState] = useState("AUTO");

  useEffect(() => {
    const irrigationRef = ref(db, "smart_irrigation");

    onValue(irrigationRef, (snapshot) => {
      const val = snapshot.val();
      setData(val);
      setModeState(val.mode);
    });
  }, []);

  const setMode = (m) => {
    set(ref(db, "smart_irrigation/mode"), m);
  };

  const pumpOn = () =>
    set(ref(db, "smart_irrigation/manual_command"), "ON");

  const pumpOff = () =>
    set(ref(db, "smart_irrigation/manual_command"), "OFF");

  const moistureColor =
    data?.soil_moisture < 30
      ? "red"
      : data?.soil_moisture < 60
      ? "orange"
      : "limegreen";

  return (
    <div className="container">
      <h1>🌱 RoboSync P1 Dashboard</h1>

      <div className="card">

        <h2 style={{ color: moistureColor }}>
          💧 {data?.soil_moisture || 0}%
        </h2>

        <p>🌡 {data?.temperature || 0}°C</p>
        <p>💦 {data?.humidity || 0}%</p>

        <div className={`pump ${data?.pump_status === "ON" ? "on" : ""}`}>
          {data?.pump_status}
        </div>

      </div>

      <div className="buttons">

        <button
          className={mode === "AUTO" ? "active" : ""}
          onClick={() => setMode("AUTO")}
        >
          AUTO
        </button>

        <button
          className={mode === "MANUAL" ? "active" : ""}
          onClick={() => setMode("MANUAL")}
        >
          MANUAL
        </button>

        <button onClick={pumpOn}>Pump ON</button>
        <button onClick={pumpOff}>Pump OFF</button>

      </div>
    </div>
  );
}

export default App;