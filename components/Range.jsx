"use client";

import { useState } from "react";

export function Range() {
  const [value, setValue] = useState(720);

  return (
    <>
      <input
        id="range"
        type="range"
        min="0"
        max="1440"
        step="1"
        onChange={(e) => setValue(e.target.value)}
      />
      <output id="value">Máx. {value}min</output>
    </>
  );
}
