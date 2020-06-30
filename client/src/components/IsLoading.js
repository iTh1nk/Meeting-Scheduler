import React from "react";
import "./IsLoading.css";

export default function IsLoading() {
  return (
    <>
      <div id="loading-img-div">
        <img id="loading-img" src="/loading.gif" alt="Loading..." />
      </div>
    </>
  );
}
