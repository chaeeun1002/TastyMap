import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList = ({ restaurants }) => {
  const navigate = useNavigate(); // 画面遷移用のフック

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
              key={restaurant.id}
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
    </div>
  );
};

export default RestaurantList;
