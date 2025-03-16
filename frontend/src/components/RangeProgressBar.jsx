import { useState } from "react";
import styles from "../styles/RangeProgressBar.module.css";

const RangeProgressBar = ({ onRangeChange }) => {
  // 🔹初期値を "3"（1km）に設定
  const [range, setRange] = useState(3);

  const rangeOptions = [
    { value: 1, label: "300m" },
    { value: 2, label: "500m" },
    { value: 3, label: "1km" },
    { value: 4, label: "2km" },
    { value: 5, label: "3km" },
  ];

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setRange(value);
    onRangeChange(value);
  };

  const currentLabel =
    rangeOptions.find((option) => option.value === range)?.label || "";

  return (
    <div className={styles.rangeProgressBarContainer}>
      <div className={styles.rangeProgressBarTitle}>
        <h3>検索範囲を選択</h3>
      </div>
      <div className={styles.rangeWrapper}>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={range}
          onChange={handleChange}
          className={styles.rangeInput}
        />
        <span className={styles.rangeValue}>{currentLabel}</span>
      </div>
    </div>
  );
};

export default RangeProgressBar;
