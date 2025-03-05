const express = require("express"); // Expressをインポート
const axios = require("axios"); // HTTPリクエスト用のAxiosをインポート

const router = express.Router();
const HOTPEPPER_API_KEY = process.env.HOTPEPPER_API_KEY; // 環境変数からHotpepper APIキーを取得

// "/restaurants" ルートにGETリクエストが来た時の処理
router.get("/", async (req, res) => {
  try {
    // クエリパラメータ（緯度・経度・検索範囲）を取得
    const { lat, lng, range } = req.query;
    console.log("received request", { lat, lng, range });

    // 必須パラメータのチェック
    if (!lat || !lng || !range) {
      return res.status(400).json({ error: "Undefined lat, lng, range" });
    }

    // Hotpepper APIのURLを作成
    const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&lat=${lat}&lng=${lng}&range=${range}&format=json`;
    // Hotpepper APIを呼び出し（タイムアウト5秒）
    const response = await axios.get(apiUrl, { timeout: 5000 });
    const data = response.data; // APIからのレスポンスデータを取得

    // レストランデータを取得
    const restaurants = data.results.shop || [];

    // 該当するレストランがない場合の処理
    if (restaurants.length === 0) {
      console.log("can not found restaurants in the selected area");
      return res
        .status(404)
        .json({ message: "選択したエリアにレストランが見つかりません。" });
    }

    // クライアントにレストラン情報をJSONで返す
    res.json(restaurants);
  } catch (error) {
    console.log(error.message);
    // APIサーバーが応答しない場合のエラーハンドリング
    if (error.code === "ECONNRESET") {
      return res.status(500).json({
        error: "サーバーからの応答がありません。後でもう一度お試しください。",
      });
    }
    // その他のエラーを処理
    res.status(500).json(error);
  }
});

module.exports = router; // モジュールとしてエクスポート
