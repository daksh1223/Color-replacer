import { useEffect, useState } from "react";
import VideoCapture from "./VideoCapture";
import "../styles/home.css";

export default function Home() {
  const [videoOn, setVideoOn] = useState(false);
  const [target, setTarget] = useState("Black");
  const [source, setSource] = useState("Black");
  useEffect(() => {
    console.log(target, source);
  }, [target, source]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="input-wrapper">
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <label for="source">Color to change</label>
          <select
            className="color-selector"
            id="source"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
            }}
          >
            <option>Black</option>
            <option>White</option>
            <option>Blue </option>
            <option>Green</option>
            <option>Yellow</option>
            <option>Orange</option>
            <option>Red</option>
            <option>Purple</option>
            <option>Gray</option>
          </select>
          <label for="target">Target Color</label>
          <select
            className="color-selector"
            id="target"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          >
            <option>Black</option>
            <option>White</option>
            <option>Blue </option>
            <option>Green</option>
            <option>Yellow</option>
            <option>Orange</option>
            <option>Red</option>
            <option>Purple</option>
            <option>Gray</option>
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
            fontSize: "larger",
            float: "right"
          }}
        >
          {!videoOn ? "Show" : "Hide"}
        </button>
      </div>

      {<VideoCapture source={source} target={target} videoOn={videoOn} />}
    </div>
  );
}
