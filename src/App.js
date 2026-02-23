import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// 🔥 Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYaVVi_sdgxj6i6Q7jIUQCMpKDBne-udo",
  authDomain: "esp8266ledcontrol-648f6.firebaseapp.com",
  databaseURL:
    "https://esp8266ledcontrol-648f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266ledcontrol-648f6",
  storageBucket: "esp8266ledcontrol-648f6.firebasestorage.app",
  messagingSenderId: "785496335355",
  appId: "1:785496335355:web:c7be94f44f3f7f5fc6215e",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [led, setLed] = useState(false);

  const toggleLED = () => {
    const newState = !led;
    setLed(newState);

    // 🔁 Send data to Firebase
    set(ref(db, "LED_STATUS"), newState ? "ON" : "OFF");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔥 ESP8266 LED Control</h1>

      <button
        onClick={toggleLED}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: led ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {led ? "Turn OFF" : "Turn ON"}
      </button>

      <h2>Status: {led ? "ON" : "OFF"}</h2>
    </div>
  );
}

export default App;