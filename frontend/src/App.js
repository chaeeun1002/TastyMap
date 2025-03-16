import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RangeProgressBar from "./components/RangeProgressBar";
import GenreSelector from "./components/GenreSelector";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetailModal";
import SavedRestaurants from "./components/SavedRestaurants";
import { fetchRestaurants } from "../src/api/api";
import "./App.css";

// アプリのメインコンポーネント
const App = () => {
  const [restaurants, setRestaurants] = useState([]); // // レストラン一覧の状態
  const [page, setPage] = useState(1); // 現在のページ番号
  const [total, setTotal] = useState(0); // 検索結果の総件数
  const perPage = 10; // 1ページに表示するレストランの数
  const [lat, setLat] = useState(35.6895); // 位置情報を管理
  const [lng, setLng] = useState(139.6917);
  const [range, setRange] = useState(3); // 検索範囲（初期値3）
  const [genre, setGenre] = useState(["G000"]); // ジャンル選択（初期値 all）

  // 検索処理関数
  const handleSearch = async (
    selectedRange,
    selectedGenre,
    selectedPage = 1
  ) => {
    setRestaurants([]); // 検索時、既存データをリセット

    console.log("Searching with:", {
      lat,
      lng,
      selectedRange,
      selectedGenre,
      selectedPage,
    });

    // APIからレストラン情報を取得
    const data = await fetchRestaurants(
      lat,
      lng,
      selectedRange,
      selectedGenre.join(","),
      selectedPage
    );
    // 取得したデータを状態に反映
    setRestaurants(data.restaurants);
    setPage(data.currentPage);
    setTotal(data.total);
  };

  // rangeとgenreが変更された際に自動で検索を実行
  useEffect(() => {
    handleSearch(range, genre, 1);
  }, [range, genre]);

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          <h1>TastyMap</h1>
        </Link>
        <nav>
          <Link to="/saved">お気に入り</Link>
        </nav>
      </header>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <RangeProgressBar onRangeChange={setRange} />
                <GenreSelector onGenreChange={setGenre} />
                <RestaurantList
                  restaurants={restaurants}
                  total={total}
                  perPage={perPage}
                  currentPage={page}
                  onPageChange={(newPage) =>
                    handleSearch(range, genre, newPage)
                  }
                />
              </div>
            }
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/saved" element={<SavedRestaurants />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
