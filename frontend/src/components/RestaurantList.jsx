import React from "react";

const RestaurantList = ({ restaurants }) => {
  return (
    <div>
      <h2>レストラン一覧</h2>
      {restaurants.length === 0 ? (
        <p>該当するレストランがありません。</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            // 各レストランの固有IDをkeyとして設定
            <li key={restaurant.id}>
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
