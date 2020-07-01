import React from "react";

export default function Welcome() {
  return (
    <div>
      <img
        className="App-logo"
        style={{
          height: "2em",
          width: "2em",
          display: "inline",
        }}
        src="/circle.png"
        alt="Logo"
      />
      <h1 style={{ marginLeft: "1em", display: "inline" }}>
        Welcome!
      </h1>
    </div>
  );
}