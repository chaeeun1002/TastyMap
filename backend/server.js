const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 設定 (Reactと通信可能)
app.use(cors());
app.use(express.json());

// 基本Route (テスト用)
app.get("/", (req, res) => {
  res.send("Expressサーバーが正常に実行中です！");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`サーバー実行中： http://localhost:${PORT}`);
});
