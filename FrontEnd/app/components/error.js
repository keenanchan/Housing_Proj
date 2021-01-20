import React from "react";
export default function Error({ message }) {
  return (
    <div className="col nonflex-center">
      <img
        src="./app/resources/error_message.svg"
        alt="error"
        width="40%"
        height="40%"
      />
      <h2>Oops....</h2>
      <h3>{message}</h3>
    </div>
  );
}
