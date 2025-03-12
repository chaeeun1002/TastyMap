import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList = ({
  restaurants,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const navigate = useNavigate(); // 画面遷移用のフック
  const totalPages = Math.ceil(total / perPage); // 全ページ数を計算

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
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
              <p>{restaurant.open}</p>
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
