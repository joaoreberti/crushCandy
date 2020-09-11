import React from "react";
import "./Modal.css";
const Modal = (props: any) => {
  const goToRealCandyCrush = () => {
    document.location.href = "https://www.king.com/game/candycrush";
  };

  return (
    <div className="modal">
      <div className="modal-tex-area">
        <h1>All rights are reserved to Candy Crush &#174; </h1>
        <h2>This is just a proof of concept in React</h2>
        <p>
          In order to try the game you must accept that <br />
          this is NOT candy crush in any way, shape or form.
        </p>
        <button onClick={props.getConsent}>I accept trying this mockup</button>
        <button onClick={goToRealCandyCrush}>
          I want to play the real deal
        </button>
      </div>
    </div>
  );
};

export default Modal;
