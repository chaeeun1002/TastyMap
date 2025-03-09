// バックエンドサーバーの基本URLを設定
const API_BASE_URL = "http://localhost:5000";

export const fetchRestaurants = async (lat, lng, range) => {
  try {
    // fetch(requestUrl) -> APIにGETリクエストを送信
    const response = await fetch(
      `${API_BASE_URL}/restaurants?lat=${lat}&lng=${lng}&range=${range}`
    );
    if (!response.ok) throw new Error("Failed to fetch retaurants");
    console.log("ステータスコード : " + response.status);
    // レスポンスをJSON形式に変換して返す
    return await response.json();
  } catch (error) {
    console.error("API Error : ", error);
    return [];
  }
};
