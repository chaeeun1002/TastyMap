import GooGoogleMapWrapper from "./GoogleMap";
import styles from "../styles/RestaurantDetailModal.module.css";
import { isClosedToday, getFormattedOpenHours } from "../utils/utils";

const RestaurantDetailModal = ({ restaurant, onClose }) => {
  // データが存在しない場合、メッセージを表示
  if (!restaurant) {
    return <p>レストランの詳細情報が見つかりません。</p>;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modelTitle}>
          <h3>レストランの詳細情報</h3>
        </div>
        <div className={styles.modalImgWrap}>
          <img
            src={restaurant.photo.pc.l}
            alt={restaurant.name}
            className={styles.modalImage}
          />
        </div>
        <div className={styles.restaurantNameWrap}>
          <p>{restaurant.name}</p>
          {isClosedToday(restaurant) && <span>（定休日）</span>}
        </div>
        {/* 가게 위치 지도 */}
        <div className={styles.restaurantMap}>
          {restaurant.lat && restaurant.lng && (
            <GooGoogleMapWrapper
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              className={styles.modalMap}
              lat={restaurant.lat}
              lng={restaurant.lng}
              zoom={18}
            />
          )}
        </div>
        <div className={styles.restaurantTableWrap}>
          <table className={styles.restaurantTable}>
            <tbody>
              <tr>
                <th>
                  <span className={styles.columnSpan}>住所</span>
                </th>
                <td>{restaurant.address}</td>
              </tr>
              <tr>
                <th>
                  <span className={styles.columnSpan}>アクセス</span>
                </th>
                <td>{restaurant.access}</td>
              </tr>
              <tr>
                <th>
                  <span className={styles.columnSpan}>営業時間</span>
                </th>
                <td>
                  {getFormattedOpenHours(restaurant.open)
                    .split("\n")
                    .map((line, index) => (
                      <span key={index} className={styles.openTime}>
                        {line}
                        <br />
                      </span>
                    ))}
                </td>
              </tr>
              <tr>
                <th>
                  <span className={styles.columnSpan}>駐車場</span>
                </th>
                <td>{restaurant.parking}</td>
              </tr>
              <tr>
                <th>
                  <span className={styles.columnSpan}>子供連れOK</span>
                </th>
                <td>{restaurant.child}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
