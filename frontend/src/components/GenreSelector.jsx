import React, { useState } from "react";
import styles from "../styles/GenreSelector.module.css";

const GenreSelector = ({ onGenreChange }) => {
  // 飲食店のジャンルオプション
  const genreOptions = [
    { value: "G000", label: "すべて" }, // 全ジャンル (仮のオプション)
    { value: "G001", label: "居酒屋" },
    { value: "G002", label: "ダイニングバー・バル" },
    { value: "G003", label: "創作料理" },
    { value: "G004", label: "和食" },
    { value: "G005", label: "洋食" },
    { value: "G006", label: "イタリアン・フレンチ" },
    { value: "G007", label: "中華" },
    { value: "G008", label: "焼肉・ホルモン" },
    { value: "G009", label: "アジア・エスニック料理" },
    { value: "G010", label: "各国料理" },
    { value: "G011", label: "カラオケ・パーティ" },
    { value: "G012", label: "バー・カクテル" },
    { value: "G013", label: "ラーメン" },
    { value: "G014", label: "カフェ・スイーツ" },
    { value: "G015", label: "その他グルメ" },
    { value: "G016", label: "お好み焼き・もんじゃ" },
    { value: "G017", label: "韓国料理" },
  ];

  // 選択されたジャンルリスト(複数選択可能)
  const [selectedGenre, setSelectedGenre] = useState(["G000"]); // デフォルト値:すべて

  // チェックボックスの変更時に選択されたジャンルを更新
  const handleGenreChange = (value) => {
    let updatedGenres;
    if (value === "G000") {
      // "すべて" を選択した場合、チェックボックスをリセット
      updatedGenres = ["G000"];
    } else {
      updatedGenres = selectedGenre.includes(value)
        ? selectedGenre.filter((genre) => genre !== value) // チェックを削除
        : [...selectedGenre.filter((gen) => gen !== "G000"), value]; // チェックを追加
    }

    console.log("selectedGenre:", selectedGenre);

    setSelectedGenre(updatedGenres);
    onGenreChange(updatedGenres);
  };
  return (
    <div className={styles.genreSelectorContainer}>
      <div className={styles.genreSelectorTitle}>
        <h3>ジャンルを選択</h3>
      </div>
      <div className={styles.genreCheckBox}>
        {genreOptions.map((genre) => (
          <label key={genre.value} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.genreCheckboxInput}
              value={genre.value}
              checked={selectedGenre.includes(genre.value)}
              onChange={() => handleGenreChange(genre.value)}
            />
            <span className={styles.customGenreCheckbox}></span>
            {genre.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
