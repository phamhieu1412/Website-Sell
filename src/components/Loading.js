import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="#349eff"
        height={86}
        width={86}
      />
    </div>
  );
}
