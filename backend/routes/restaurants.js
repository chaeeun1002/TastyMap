const express = require("express");
const axios = require("axios");

const router = express.Router();

const HOTPEPPER_API_KEY = process.env.HOTPEPPER_API_KEY; // 環境変数からHotpepper APIキーを取得

router.get("/", async (req, res) => {
  try {
    // クライアントから位置情報を取得
    const { lat, lng, range, genre = "G000" } = req.query;
    let page = Math.max(1, Number(req.query.page) || 1);
    console.log("received request", { lat, lng, range, genre, page });

    // 必須パラメータのチェック
    if (!lat || !lng || !range) {
      return res.status(400).json({ error: "Undefined lat, lng, range" });
    }

    const pageNum = Math.max(1, Number(page)); // ページ番号が1未満の場合は1に補正

    // ページネーションの設定
    const perPage = 10; // 1ページあたりの件数
    const start = (pageNum - 1) * perPage + 1; // APIの開始位置設定

    // Hotpepper API のリクエスト URL を作成
    let apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&lat=${lat}&lng=${lng}&range=${range}&count=${perPage}&start=${start}&order=4&format=json`;

    if (genre !== "G000") {
      apiUrl += `&genre=${genre}`;
    }

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
    res.json({
      total: data.results.results_available, // 総検索結果数
      perPage, // 1ページあたりの件数
      currentPage: page, // 現在のページ番号
      restaurants,
    });
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
