const express = require("express");
const axios = require("axios");

const router = express.Router();

const HOTPEPPER_API_KEY = process.env.HOTPEPPER_API_KEY; // 環境変数からHotpepper APIキーを取得

router.get("/", async (req, res) => {
  try {
    // クライアントから位置情報を取得
    const { lat, lng, range } = req.query;
    console.log("received request", { lat, lng, range });

    // 必須パラメータのチェック
    if (!lat || !lng || !range) {
      return res.status(400).json({ error: "Undefined lat, lng, range" });
    }

    // APIの最大取得件数 (count) は 100 まで
    // range に応じて count を調整し、検索結果に差をつける
    let countValue;
    if (range == 1) countValue = 10;
    else if (range == 2) countValue = 20;
    else if (range == 3) countValue = 50;
    else if (range == 4) countValue = 80;
    else countValue = 100;

    // Hotpepper API のリクエスト URL を作成
    const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&lat=${lat}&lng=${lng}&range=${range}&count=${countValue}&order=3&format=json`;
    console.log("Requesting Hotpepper API:", apiUrl);

    // Hotpepper API にリクエスト (タイムアウト: 5秒)
    const response = await axios.get(apiUrl, { timeout: 5000 });
    const data = response.data; // APIからのレスポンスデータを取得

    // レストランデータを取得
    const restaurants = data.results.shop || [];

    // 該当するレストランがない場合
    if (restaurants.length === 0) {
      console.log("can not found restaurants in the selected area");
      return res
        .status(404)
        .json({ message: "選択したエリアにレストランが見つかりません。" });
    }

    // クライアントに JSON 形式でレストラン情報を返す
    res.json(restaurants);
  } catch (error) {
    console.log(error.message);
    // サーバーまたはクライアントの接続が異常終了した場合のエラー処理
    if (error.code === "ECONNRESET") {
      return res.status(500).json({
        error: "サーバーからの応答がありません。後でもう一度お試しください。",
      });
    }
    res.status(500).json(error);
  }
});

module.exports = router;
