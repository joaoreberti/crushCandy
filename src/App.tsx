import React, { useState } from "react";
import "./App.css";

import Board from "./components/board/Board";
import Score from "./components/score/Score";
import Modal from "./components/modal/Modal";
import ModalDefeat from "./components/modal/ModalDefeat";
import { PointsContextProvider } from "./components/context/PointsContextProvider";

function App() {
  let [conditionsAccepted, setConditionsAccepted] = useState(false);
  let [defeat, setDefeat] = useState(false);
  let [pointsOnDefeat, setPointsOnDefeat] = useState(0);

  const getConsent = () => {
    setConditionsAccepted(true);
  };

  const triggerDefeat = (points: number) => {
    setDefeat(true);
    setPointsOnDefeat(points);
  };
  return (
    <div className="wrapper">
      {conditionsAccepted ? (
        defeat ? (
          <ModalDefeat points={pointsOnDefeat} />
        ) : (
          <div className="container">
            <PointsContextProvider>
              <Board triggerDefeat={triggerDefeat} />
              <Score />
            </PointsContextProvider>
          </div>
        )
      ) : (
        <Modal getConsent={getConsent} />
      )}
    </div>
  );
}

export default App;
