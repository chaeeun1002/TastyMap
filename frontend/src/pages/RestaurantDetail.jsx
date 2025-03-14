import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRestaurantById } from "../api/api";
import { isClosedToday } from "../utils/utils";
import GooGoogleMapWrapper from "../components/GoogleMap";

const RestaurantDetail = () => {
  const { id } = useParams(); // URLからレストランのIDを取得
  const [restaurant, setRestaurant] = useState(null);

  console.log("Restaurant ID:", id); // IDが正しく取得されているか確認

  useEffect(() => {
    const loadRestaurant = async () => {
      const data = await fetchRestaurantById(id); // APIリクエストでレストラン詳細情報を取得
      setRestaurant(data);
    };
    loadRestaurant();
  }, [id]);

  // データが存在しない場合、メッセージを表示
  if (!restaurant) {
    return <p>レストランの詳細情報が見つかりません。</p>;
  }

  return (
    <div>
      <h2>
        {restaurant.name}
        {isClosedToday(restaurant) && (
          <span style={{ color: "red" }}>（定休日）</span>
        )}
      </h2>
      <img src={restaurant.photo.pc.l} alt={restaurant.name} width="300" />
      {/* 地図を表示 */}
      {restaurant.lat && restaurant.lng && (
        <GooGoogleMapWrapper
          lat={restaurant.lat}
          lng={restaurant.lng}
          zoom={18}
        />
      )}
      <p>住所: {restaurant.address}</p>
      <p>営業時間: {restaurant.open}</p>
      <p>アクセス: {restaurant.access}</p>
      <p>駐車場: {restaurant.parking}</p>
      <p>子供連れOK: {restaurant.child}</p>
    </div>
  );
};

export default RestaurantDetail;
