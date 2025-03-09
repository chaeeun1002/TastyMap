import { useState } from "react";
import RangeSelector from "./components/RangeSelector";
import RestaurantList from "./components/RestaurantList";
import { fetchRestaurants } from "./api";

// アプリのメインコンポーネント
const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  // 検索処理関数
  const handleSearch = async (lat, lng, range) => {
    const data = await fetchRestaurants(lat, lng, range);
    setRestaurants(data);
  };

  return (
    <div>
      <h1>レストラン検索</h1>
      <RangeSelector onSearch={handleSearch} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default App;
