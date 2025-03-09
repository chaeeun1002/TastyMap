import { useState } from "react";

const RangeSelector = ({ onSearch }) => {
  // 検索範囲(range)の状態を管理（デフォルトは3 = 1km）
  const [range, setRange] = useState("3");

  /**
   * 버튼 클릭 시, 범위를 변경하고 해당 위치의 데이터를 가져옴
   * - 현재는 도쿄의 위도(latitude), 경도(longitude)를 수동 설정하여 테스트
   * - 실제 배포 시에는 `navigator.geolocation`을 활성화하여 사용자의 현재 위치로 검색하도록 변경 가능
   */
  /**
   * ボタンをクリックすると検索範囲を変更し、該当エリアのデータを取得
   * - 現在は東京の緯度 (latitude)、経度 (longitude) を固定してテスト
   * - 本番環境では `navigator.geolocation` を有効にしてユーザーの現在位置を使用
   */

  const handleRangeChange = (selectedRange) => {
    setRange(selectedRange);

    // デフォルトの検索位置（東京-新宿）
    const latitude = 35.6895;
    const longitude = 139.6917;

    onSearch(latitude, longitude, selectedRange);

    // ユーザーの現在位置を取得（本番環境で有効化）
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    // 사용자 현재 위치 정보를 가져옴
    //       const { latitude, longitude } = position.coords;
    // onSearch 함수를 호출하여 사용자의 현재 위치에서 검색 실행
    //       onSearch(latitude, longitude, range);
    //     },
    //     (error) => {
    //       console.error("Geolocation error: ", error);
    //       alert("現在位置情報を取得できません。");
    //     }
    //   );
    // } else {
    // Geolocation API를 지원하지 않는 브라우저의 경우 경고 메시지 표시
    //   alert("他のブラウザを利用してください。");
    // }
  };

  // APIのrange値に応じて検索半径が異なる
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
      <div>
        {rangeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleRangeChange(option.value)} // クリックすると即時検索を実行
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "8px",
              border:
                range === option.value ? "2px solid blue" : "1px solid gray",
              backgroundColor: range === option.value ? "#d0e8ff" : "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RangeSelector;
