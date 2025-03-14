// 오늘날짜(요일)
export const getToday = () => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const today = new Date().getDay(); //0（日)～６（土）
  console.log("today:", days[today]);
  return days[today];
};

// 오늘날짜가 레스토랑의 정기휴무인지 확인
export const isClosedToday = (restaurants) => {
  if (!restaurants.close || restaurants.close === "なし") return false;
  return restaurants.close.includes(getToday());
};

// localStorage에서 찜한 가게 목록 불러오기
export const getSavedRestaurants = () => {
  const savedData = localStorage.getItem("savedRestaurants");
  return savedData ? JSON.parse(savedData) : [];
};

// 찜 목록에 레스토랑을 추가/삭제하는 함수
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

// 전체 페이지 수 계산
export const calculateTotalPages = (total, perPage) => {
  console.log("total:", total);
  console.log("perPage:", perPage);
  return Math.ceil(total / perPage);
};
