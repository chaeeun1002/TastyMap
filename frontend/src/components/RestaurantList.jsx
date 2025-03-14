import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isClosedToday,
  getSavedRestaurants,
  updateSavedRestaurants,
  calculateTotalPages,
} from "../utils/utils";

const RestaurantList = ({
  restaurants,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const navigate = useNavigate(); // 画面遷移用のフック
  const totalPages = calculateTotalPages(total, perPage); // 全ページ数を計算
  console.log("totalPages:", totalPages);

  // お気に入りのレストランリストを取得（localStorageから読み込み）
  const [saved, setSaved] = useState(getSavedRestaurants());

  // レストランの「お気に入り」追加/削除機能
  const toggleSave = (id) => {
    const updatedSaved = updateSavedRestaurants(id);
    setSaved(updatedSaved);
  };

  return (
    <div>
      <h2>レストラン一覧</h2>
      {restaurants.length === 0 ? (
        <p>該当するレストランがありません。</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            // レストランのIDをkeyとして設定
            <li
              key={restaurant.id} // 各レストランのIDをkeyとして設定
              onClick={() => navigate(`/restaurant/${restaurant.id}`)} // クリック時に詳細ページへ遷移
            >
              <img
                src={restaurant.photo.pc.l}
                alt={restaurant.name}
                width="100"
              />
              <h3>
                {restaurant.name}
                {isClosedToday(restaurant) && (
                  <span style={{ color: "red" }}>（定休日）</span>
                )}
              </h3>
              <p>{restaurant.address}</p>
              <p>{restaurant.open}</p>
              {/* お気に入りボタン */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 詳細ページへの遷移を防ぐ
                  toggleSave(restaurant.id);
                }}
              >
                {saved.includes(restaurant.id) ? "♥" : "♡"}
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* ページネーションボタン */}
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1} // 1ページ目では非活性化
        >
          前へ
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages} // 最終ページでは非活性化
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
