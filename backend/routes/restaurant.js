const express = require("express");
const axios = require("axios");

const router = express.Router();
const HOTPEPPER_API_KEY = process.env.HOTPEPPER_API_KEY;

// 特定のレストラン詳細情報を取得するAPI
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // URLからレストランIDを取得
    console.log("Restaurant ID:", id); // IDの確認ログ

    if (!id) {
      return res.status(400).json({ message: "Undifined restaurant ID" });
    }

    // HotpepperAPIを使用してレストラン情報を取得
    const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&id=${id}&format=json`;
    console.log("API URL:", apiUrl);

    const response = await axios.get(apiUrl, { timeout: 5000 });

    // レスポンスデータからレストラン情報を取得
    const restaurant = response.data.results.shop[0] || null;
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "レストラン情報が見つかりません。" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error.message);
    res.status(500).json({ error: "レストラン情報の取得に失敗しました。" });
  }
});

module.exports = router;
