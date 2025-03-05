const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정 (React와 통신 가능하도록 허용)
app.use(cors());
app.use(express.json());

// 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("Express 서버가 정상적으로 실행 중입니다!");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
