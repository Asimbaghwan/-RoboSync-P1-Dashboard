import React, { useEffect, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAYaVVi_sdgxj6i6Q7jIUQCMpKDBne-udo",
  authDomain: "esp8266ledcontrol-648f6.firebaseapp.com",
  databaseURL:
    "https://esp8266ledcontrol-648f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266ledcontrol-648f6",
  storageBucket: "esp8266ledcontrol-648f6.firebasestorage.app",
  messagingSenderId: "785496335355",
  appId: "1:785496335355:web:c7be94f44f3f7f5fc6215e",
  measurementId: "G-PEFC817338",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [fireStatus, setFireStatus] = useState(false);
  const [gasLevel, setGasLevel] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fireRef = ref(database, "fireEvents");

    onValue(fireRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      setFireStatus(data.fireStatus);
      setGasLevel(data.gasLevel);

      const newLog = {
        time: new Date().toLocaleString(),
        gas: data.gasLevel,
        status: data.fireStatus ? "🔥 FIRE" : "✅ SAFE",
      };

      setHistory((prev) => [newLog, ...prev]);
    });
  }, []);

  const percent = Math.min((gasLevel / 1000) * 100, 100);

  return (
    <div className="container">
      <h1>🔥 Fire Alert & Security</h1>

      <div className={`status ${fireStatus ? "fire" : "safe"}`}>
        {fireStatus ? "🔥 FIRE ALERT" : "✅ SAFE"}
      </div>

      <div className="gas-box">
        <h2>Gas Level</h2>

        <div className="progress">
          <div className="gas-bar" style={{ width: percent + "%" }}></div>
        </div>

        <span>{gasLevel}</span>
      </div>

      <div className="history">
        <h2>📜 Alert History</h2>

        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.time} → Gas: {item.gas} → {item.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;