require("dotenv").config(); // 環境変数ファイル（.env)を読み込む
const express = require("express"); // Expressフレームワークをインポート
const cors = require("cors"); // CORS（クロスオリジンリソースシェアリング）を有効化
const restaurantsRouter = require("./routes/restaurants"); // レストラン検索用のルーティングをインポート
const restaurantRouter = require("./routes/restaurant");

const app = express();
const PORT = process.env.PORT || 5000; // ポート番号を環境変数から取得（なければ5000を使用）

// CORS 設定 (Reactと通信可能)
app.use(cors());
app.use(express.json()); // JSONリクエストの解析を可能にする
app.use("/restaurants", restaurantsRouter); // "/restaurants" のリクエストを restaurantsRouter に委託
app.use("/restaurant", restaurantRouter); // "/restaurant" のリクエストを restaurantRouter に委託

// 基本Route (テスト用)
app.get("/", (req, res) => {
  res.send("Expressサーバーが正常に実行中です！");
});

// サーバー実行
app.listen(PORT, () => {
  console.log(`サーバー実行中： http://localhost:${PORT}`);
});
