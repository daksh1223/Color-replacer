import React from "react";
import toHex from "../utils";

const Cam = ({ target, source, videoOn }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "calc(100vh - 5rem)",
        alignItems: "center",
        border: "2px solid white",
        height: "80vh",
        marginTop: "1%",
        width: "80vw"
      }}
    >
      {!videoOn && <div> Click on "Show" button to start the program</div>}
      {videoOn && (
        <img
          style={{ width: "100%", height: "100%" }}
          src={`http://localhost:4000/video_feed?target=${toHex(target).substr(
            1
          )}&source=${source.toLowerCase()}`}
          alt="Video"
        />
      )}
    </div>
  );
};
export default Cam;
