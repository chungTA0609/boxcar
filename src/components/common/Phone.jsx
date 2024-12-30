import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zalo from "../../../public/images/icons/zalo.svg";
const Phone = () => {
  // Show button when scrolled 200px
  const toZalo = () => {
    window.open("https://zalo.me/0333948786", "_blank");
  };

  return (
    <>
      {
        <div className="phone" style={{ display: "block" }}>
          <a
            href="tel:0333948786"
            rel="nofollow"
            title="Hotline"
            className="zalo-icon"
            target="_blank"
          ></a>
        </div>
      }
    </>
  );
};

export default Phone;
