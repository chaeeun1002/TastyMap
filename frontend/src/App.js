import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import RangeSelector from "./components/RangeSelector";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import { fetchRestaurants } from "./api";

// アプリのメインコンポーネント
const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [total, setTotal] = useState(0); // 전체 데이터 갯수
  const perPage = 5; // 한 페이지당 표시할 데이터 갯수

  // 検索処理関数
  const handleSearch = async (lat, lng, range, selectedPage = 1) => {
    setRestaurants([]); // 검색할 때 기존 데이터 초기화

    const data = await fetchRestaurants(lat, lng, range, selectedPage);
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
              onPageChange={(newPage) =>
                handleSearch(35.6895, 139.6917, 3, newPage)
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
