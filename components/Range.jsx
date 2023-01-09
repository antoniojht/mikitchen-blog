"use client";

import { useState } from "react";

export function Range({ getRange }) {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    getRange(e.target.value);
  };

  return (
    <>
      <input
        id="range"
        type="range"
        min="0"
        max="1440"
        step="1"
        onChange={(e) => {
          setValue(e.target.value), handleChange(e);
        }}
      />
      <output id="value">Máx. {value}min</output>
    </>
  );
}
