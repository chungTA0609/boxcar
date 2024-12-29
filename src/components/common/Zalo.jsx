import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zalo from "../../../public/images/icons/zalo.svg";
const Zalo = () => {
  // Show button when scrolled 200px
  const toZalo = () => {
    window.open("https://zalo.me/0333948786", "_blank");
  };

  return (
    <>
      {
        <div className="zalo" onClick={toZalo} style={{ display: "block" }}>
          <span className="zalo-icon"></span>
        </div>
      }
    </>
  );
};

export default Zalo;
