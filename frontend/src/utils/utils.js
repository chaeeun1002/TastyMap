// 今日の曜日を取得
export const getToday = () => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date().getDay(); //0（日)～６（土）
  console.log("today:", days[today]);
  return days[today];
};

// 今日がレストランの定休日かどうかを確認
export const isClosedToday = (restaurants) => {
  if (!restaurants.close || restaurants.close === "なし") return false;
  return restaurants.close.includes(getToday());
};

// localStorageからお気に入りのレストランリストを取得
export const getSavedRestaurants = () => {
  const savedData = localStorage.getItem("savedRestaurants");
  return savedData ? JSON.parse(savedData) : [];
};

// お気に入りリストにレストランを追加/削除する関数
export const updateSavedRestaurants = (id) => {
  let saved = getSavedRestaurants();
  if (saved.includes(id)) {
    saved = saved.filter((SavedId) => SavedId !== id);
  } else {
    saved.push(id);
  }
  localStorage.setItem("savedRestaurants", JSON.stringify(saved));
  return saved;
};

// 全ページ数を計算
export const calculateTotalPages = (total, perPage) => {
  console.log("total:", total);
  console.log("perPage:", perPage);
  return Math.ceil(total / perPage);
};
