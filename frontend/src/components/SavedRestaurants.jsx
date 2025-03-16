import { useState, useEffect } from "react";
import { fetchRestaurantById } from "../api/api";
import styles from "../styles/RestaurantList.module.css";
import heart from "../assets/imgs/heart.png";
import heartFill from "../assets/imgs/heart_fill.png";
import RestaurantDetailModal from "../components/RestaurantDetailModal";
import {
  getSavedRestaurants,
  updateSavedRestaurants,
  isClosedToday,
} from "../utils/utils";

const SavedRestaurants = () => {
  const [saved, setSaved] = useState(getSavedRestaurants());
  const [savedRestaurants, setSavedRestaurants] = useState([]);

  // localStorageからお気に入りのレストランリストを取得
  useEffect(() => {
    const storedSaved = localStorage.getItem("savedRestaurants");
    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  // コンポーネントが最初にレンダリングされる時にローカルストレージからお気に入りデータを取得
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

  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの状態
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 選択したレストラン情報

  // モーダルを開く関数
  const handleOpenModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  // モーダルを閉じる関数
  const handleCloseModel = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };
  return (
    <div className={styles.restaurantContainer}>
      <h2 className={styles.restaurantListTitle}>お気に入りリスト</h2>
      {savedRestaurants.length === 0 ? (
        <p>お気に入りのレストランがありません。</p>
      ) : (
        <div className={styles.restaurantGrid}>
          {savedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className={styles.restaurantCard}>
              <div className={styles.restaurantImg}>
                <img src={restaurant.photo.pc.l} alt={restaurant.name} />
              </div>
              <div className={styles.restaurantInfo}>
                <div className={styles.restaurantName}>
                  <div className={styles.restaurantNameWrapper}>
                    {/* クリック時にモーダルを開く */}
                    <p onClick={() => handleOpenModal(restaurant)}>
                      {restaurant.name}
                    </p>
                    {isClosedToday(restaurant) && <span>定休日</span>}
                  </div>
                  {/* お気に入り解除ボタン */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(restaurant.id);
                    }}
                  >
                    {saved.includes(restaurant.id) ? (
                      <img src={heartFill} />
                    ) : (
                      <img src={heart} />
                    )}
                  </button>
                </div>
                <div className={styles.restaurantAddr}>
                  <p>{restaurant.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* モーダルコンポーネント */}
      {isModalOpen && selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={handleCloseModel}
        />
      )}
    </div>
  );
};

export default SavedRestaurants;
