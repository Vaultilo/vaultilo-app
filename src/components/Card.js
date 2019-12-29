import React, { useState } from "react";

export default function Cards () {
  const [move, setMove] = useState(false);
  const handleClick = () => {
    setMove(true);
  }
  return (
    <div className="cards-container col-12">
      <div className="scene scene--block">
        <div className={`block ${move ? 'is-flipped': ''}`}>
          <div className="block__face block__face--front">front</div>
          <div className="block__face block__face--back">back</div>
        </div>
      </div>
      <div className="border p-3 deal" onClick={handleClick}>Deal</div>
    </div>
  )
}
