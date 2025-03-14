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
  return (
    <div>
      <label>ジャンル : </label>
      <select onChange={(e) => onGenreChange(e.target.value)}>
        {genreOptions.map((genre) => (
          <option key={genre.value} value={genre.value}>
            {genre.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
