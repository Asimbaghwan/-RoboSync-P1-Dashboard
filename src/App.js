import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./App.css";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAYaVVi_sdgxj6i6Q7jIUQCMpKDBne-udo",
  authDomain: "esp8266ledcontrol-648f6.firebaseapp.com",
  databaseURL: "https://esp8266ledcontrol-648f6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"esp8266ledcontrol-648f6" ,
  storageBucket: "esp8266ledcontrol-648f6.firebasestorage.app",
   messagingSenderId: "785496335355",
   appId: "1:785496335355:web:c7be94f44f3f7f5fc6215e",
 measurementId: "G-PEFC817338"
};

/* 🔥 INITIALIZE FIREBASE */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {

  const [devices, setDevices] = useState({
    device1State: 0,
    device2State: 0,
    buzzerState: 0,
  });

  /* 📡 READ REALTIME DATA */
  useEffect(() => {
    const homeRef = ref(db, "home/");

    onValue(homeRef, (snapshot) => {
      if (snapshot.exists()) {
        setDevices(snapshot.val());
      }
    });
  }, []);

  /* 🎛 TOGGLE FUNCTION */
  const toggle = (device, value) => {
    set(ref(db, "home/" + device), value);
  };

  return (
    <div className="main">
      <h1>🏠 Smart Home Dashboard</h1>

      <Device
        name="💡 Light"
        state={devices.device1State}
        toggle={() =>
          toggle("device1State", devices.device1State ? 0 : 1)
        }
      />

      <Device
        name="🌀 Fan"
        state={devices.device2State}
        toggle={() =>
          toggle("device2State", devices.device2State ? 0 : 1)
        }
      />

      <Device
        name="🔔 Buzzer"
        state={devices.buzzerState}
        toggle={() =>
          toggle("buzzerState", devices.buzzerState ? 0 : 1)
        }
      />
    </div>
  );
}

/* 🔘 DEVICE CARD COMPONENT */
function Device({ name, state, toggle }) {
  return (
    <div className="card">
      <h2>{name}</h2>

      <button
        className={state ? "on" : "off"}
        onClick={toggle}
      >
        {state ? "ON ✅" : "OFF ❌"}
      </button>
    </div>
  );
}