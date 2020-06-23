import React from "react";
import "./NoMatch.css";
import { Button } from "antd";

function NoMatch() {
  return (
    <div>
      <div className="container" id="noMatchCon">
        <div>
          <a href="/">
            <Button size="small" type="primary">
              Back to Home
            </Button>
          </a>
          <h1 style={{ marginTop: ".5em", fontWeight: "bolder" }}>
            Page Not Found...
          </h1>
        </div>
        <br />
        <a href="/">
          <img
            src="/404.gif"
            alt="404"
            style={{ width: "360px", height: "300px" }}
          />
        </a>
      </div>
    </div>
  );
}

export default NoMatch;