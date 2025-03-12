import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import RangeSelector from "./components/RangeSelector";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import { fetchRestaurants } from "./api";

// アプリのメインコンポーネント
const App = () => {
  const [restaurants, setRestaurants] = useState([]); // // レストラン一覧の状態
  const [page, setPage] = useState(1); // 現在のページ番号
  const [total, setTotal] = useState(0); // 検索結果の総件数
  const perPage = 5; // 1ページに表示するレストランの数

  // 検索処理関数
  const handleSearch = async (lat, lng, range, selectedPage = 1) => {
    setRestaurants([]); // 검색할 때 기존 데이터 초기화

    // APIからレストラン情報を取得
    const data = await fetchRestaurants(lat, lng, range, selectedPage);
    // 取得したデータを状態に反映
    setRestaurants(data.restaurants);
    setPage(data.currentPage);
    setTotal(data.total);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>レストラン検索</h1>
            <RangeSelector onSearch={handleSearch} />
            <RestaurantList
              restaurants={restaurants}
              total={total}
              perPage={perPage}
              currentPage={page}
              onPageChange={
                (newPage) => handleSearch(35.6895, 139.6917, 3, newPage) //後で現在位置を使用するように修正
              }
            />
          </div>
        }
      />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
    </Routes>
  );
};

export default App;
