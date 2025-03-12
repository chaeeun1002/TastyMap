// バックエンドサーバーの基本URLを設定
const API_BASE_URL = "http://localhost:5000";

// レストラン一覧を取得する関数
export const fetchRestaurants = async (lat, lng, range, page = 1) => {
  try {
    // fetch(requestUrl) -> APIにGETリクエストを送信
    const response = await fetch(
      `${API_BASE_URL}/restaurants?lat=${lat}&lng=${lng}&range=${range}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to fetch retaurants");
    console.log("ステータスコード : " + response.status);
    // レスポンスをJSON形式に変換して返す
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { total: 0, perPage: 5, currentPage: page, restaurants: [] };
  }
};

// レストランの詳細情報を取得する関数
export const fetchRestaurantById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurant/${id}`);
    console.log("fetchingId:" + id);
    if (!response.ok) throw new Error("Failed to fetch restaurant details");
    console.log("ステータスコード : " + response.status);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
