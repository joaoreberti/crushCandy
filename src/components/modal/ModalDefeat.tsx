import React from "react";
import "./Modal.css";
const ModalDefeat = (props: any) => {
  const goToRealCandyCrush = () => {
    document.location.href = "https://www.king.com/game/candycrush";
  };
  const tryAgain = () => {
    document.location = document.location;
  };

  return (
    <div className="modal">
      <div className="modal-tex-area">
        <h1>Defeat </h1>
        <h2>You managed to get{props.points}</h2>

        <button onClick={tryAgain}>TryAgain</button>
        <button onClick={goToRealCandyCrush}>
          I want to play the real deal
        </button>
      </div>
    </div>
  );
};

export default ModalDefeat;
