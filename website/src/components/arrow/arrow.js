import React from "react";

export default function Arrow({ direction, onClick }) {
  return (
    <span
      className={`rmdp-arrow-container ${direction}`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <i className="rmdp-arrow" />
    </span>
  );
}
