import React, { useState } from "react";

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

  // 선택한 장르 리스트(다중선택가능)
  const [selectedGenre, setSelectedGenre] = useState(["G000"]); // 기본값 : 전체

  // 체크박스 변경시 선택된 장르 업데이트
  const handleGenreChange = (value) => {
    let updatedGenres;
    if (value === "G000") {
      // 전체 선택시 체크박스 초기화
      updatedGenres = ["G000"];
    } else {
      updatedGenres = selectedGenre.includes(value)
        ? selectedGenre.filter((genre) => genre !== value) // 체크 해제
        : [...selectedGenre.filter((gen) => gen !== "G000"), value]; // 추가 체크
    }

    console.log("selectedGenre:", selectedGenre);

    setSelectedGenre(updatedGenres);
    onGenreChange(updatedGenres);
  };
  return (
    <div>
      <h3>ジャンルを選択</h3>
      {genreOptions.map((genre) => (
        <label
          key={genre.value}
          style={{ display: "block", marginBottom: "5px" }}
        >
          <input
            type="checkbox"
            value={genre.value}
            checked={selectedGenre.includes(genre.value)}
            onChange={() => handleGenreChange(genre.value)}
          />
          {genre.label}
        </label>
      ))}
    </div>
  );
};

export default GenreSelector;
