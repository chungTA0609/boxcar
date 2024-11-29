import React from "react";

export default function Description({ desciption }) {
  return (
    <>
      <h4 className="title">Mô tả</h4>
      <div className="text two">{desciption}</div>
    </>
  );
}
