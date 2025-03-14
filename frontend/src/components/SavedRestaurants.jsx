import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchRestaurantById } from "../api/api";
import {
  getSavedRestaurants,
  updateSavedRestaurants,
  isClosedToday,
} from "../utils/utils";

const SavedRestaurants = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(getSavedRestaurants());
  const [savedRestaurants, setSavedRestaurants] = useState([]);

  // localStorageからお気に入りのレストランリストを取得
  useEffect(() => {
    const storedSaved = localStorage.getItem("savedRestaurants");
    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  useEffect(() => {
    const fetchSaved = async () => {
      const restaurantDetails = await Promise.all(
        saved.map((id) => fetchRestaurantById(id))
      );
      setSavedRestaurants(restaurantDetails.filter((res) => res !== null));
    };

    if (saved.length > 0) {
      fetchSaved();
    }
  }, [saved]);

  // レストランのお気に入り解除機能
  const toggleSave = (id) => {
    let updatedSaved = updateSavedRestaurants(id); // 対象のレストランIDを削除
    setSaved(updatedSaved);
    setSavedRestaurants((prev) => prev.filter((res) => res.id !== id));
  };
  return (
    <div>
      <h2>お気に入りリスト</h2>
      <Link to="/">ホームに戻る</Link>
      {savedRestaurants.length === 0 ? (
        <p>お気に入りのレストランがありません。</p>
      ) : (
        <ul>
          {savedRestaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <img
                src={restaurant.photo.pc.l}
                alt={restaurant.name}
                width="100"
              />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
              <p>{restaurant.open}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 詳細ページへの遷移を防ぐ
                  toggleSave(restaurant.id);
                }}
              >
                ♥
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRestaurants;
