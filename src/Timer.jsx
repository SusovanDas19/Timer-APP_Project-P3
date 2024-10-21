import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer() {
  const hoursRef = useRef(0);
  const minutesRef = useRef(0);
  const secondsRef = useRef(0);

  const [btn, setButton] = useState(false);
  const [inp, setInput] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSec) => prevSec - 1);
        } else if (minutes > 0) {
          setMinutes((prevMin) => prevMin - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHr) => prevHr - 1);
          setMinutes(59);
          setSeconds(59);
        }else if(seconds == 0)
        {
            setTimeUp(true);
        }
         else {
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds]);

  function stopTimer() {
    setInput((currInpStatus) => !currInpStatus);
    setButton((currBtnStatus) => !currBtnStatus);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
    setTimeUp(false);
  }

  function startTimer() {
    setHours(parseInt(hoursRef.current.value) || 0);
    setMinutes(parseInt(minutesRef.current.value) || 0);
    setSeconds(parseInt(secondsRef.current.value) || 0);

    setInput((currInpStatus) => !currInpStatus);
    setButton((currBtnStatus) => !currBtnStatus);
    setIsActive(true);
  }

  return (
    <>
      <div style={h1Style}>
        <h1>A Simple Timer App</h1>
      </div>
      <div style={mainTimeSection}>
        <div style={h2Style}>
          {!timeUp ? (
            <>
              <h2>{hours.toString().padStart(2, "0")}</h2>
              <span style={spanStyle}>:</span>
              <h2>{minutes.toString().padStart(2, "0")}</h2>
              <span style={spanStyle}>:</span>
              <h2>{seconds.toString().padStart(2, "0")}</h2>
            </>
          ) : (
            <h2>Time Up</h2>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {inp ? (
            <>
              <div style={timeStyle}>
                <span>Hours</span>
                <input ref={hoursRef} type="number" max="99" className="inputBox" />
              </div>
              <div style={timeStyle}>
                <span>Minutes</span>
                <input ref={minutesRef} type="number" max="59" className="inputBox" />
              </div>
              <div style={timeStyle}>
                <span>Seconds</span>
                <input ref={secondsRef} type="number" max="59" className="inputBox" />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {btn ? (
          <>
            <button className="button" onClick={()=>setIsActive(currActiveStatus => !currActiveStatus)}>
                {isActive?"Pause":"Resume"}
            </button>
            <button className="button reSetBtn" onClick={stopTimer}>
              Reset
            </button>
          </>
        ) : (
          <button className="button" onClick={startTimer}>
            Start
          </button>
        )}
      </div>
    </>
  );
}

const spanStyle = {
  fontSize: "3rem",
  lineHeight: "1",
  color: "white",
};

const mainTimeSection = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "200px 0 50px 0",
  gap: "20px",
};

const timeStyle = {
  color: "white",
  fontSize: "1em",
  fontWeight: "500",
  letterSpacing: "2px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  gap: "10px",
};

const h2Style = {
  padding: "10px 30px",
  borderRadius: "20px",
  display: "flex",
  gap: "20px",
  boxShadow: "#7E60BF 8px 10px 250px",
  color: "white",
  marginBottom: "80px",
  fontSize: "2em",
};
const h1Style = {
  color: "white",
  display: "flex",
  justifyContent: "center",
  margin: "30px 0 60px 0",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textShadow: "2px 2px 5px #7E60BF",
  letterSpacing: "2px",
  fontFamily: "'Roboto', sans-serif",
};

export default Timer;
