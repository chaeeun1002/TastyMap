import { useState } from "react";

const RangeSelector = ({ onSearch }) => {
  // 🔹初期値を "3"（1km）に設定
  const [range, setRange] = useState("3");

  const rangeOptions = [
    { value: "1", label: "300m" },
    { value: "2", label: "500m" },
    { value: "3", label: "1km" },
    { value: "4", label: "2km" },
    { value: "5", label: "3km" },
  ];

  return (
    <div>
      <label>検索範囲 :</label>
      <select value={range} onChange={(e) => onSearch(e.target.value)}>
        {rangeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RangeSelector;
