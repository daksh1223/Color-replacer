import { useEffect, useState } from "react";
import VideoCapture from "./VideoCapture";
import "../styles/home.css";

export default function Home() {
  const [videoOn, setVideoOn] = useState(false);
  const [target, setTarget] = useState("Violet");
  const [source, setSource] = useState("Violet");
  useEffect(() => {
    console.log(target, source);
  }, [target, source]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div className="input-wrapper">
        <div style={{
          display: "flex",
        }}>
          <label style={{
          width: "max-content",
        }} for="source">Color to change</label>
        <select
          className="color-selector"
          id="source"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
          }}
        >
          <option>Violet</option>
          <option>Indigo</option>
          <option>Blue </option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Orange</option>
          <option>Red</option>
          <option>Black</option>
          <option>White</option>
        </select>
        <label for="target" style={{ marginLeft: "2%" }}>
          Target Color
        </label>
        <select
          className="color-selector"
          id="target"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        >
          <option>Violet</option>
          <option>Indigo</option>
          <option>Blue </option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Orange</option>
          <option>Red</option>
          <option>Black</option>
          <option>White</option>
          </select>
          </div>
        <button
          onClick={() => {
            setVideoOn(!videoOn);
          }}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "2px 5px 2px 5px",
            borderRadius: "10px",
            marginTop: "10px",
            textAlign: "center",
            width: "5rem",
            height: "2rem",
            fontSize: "larger"
          }}
        >
          {!videoOn ? "Show" : "Hide"}
        </button>
      </div>

      {<VideoCapture source={source} target={target} videoOn={videoOn} />}
    </div>
  );
}
