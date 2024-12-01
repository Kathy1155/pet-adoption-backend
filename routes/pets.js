const express = require("express");
const router = express.Router();
const db = require("../db"); // 引用資料庫連接檔案

// 獲取所有寵物資料
router.get("/", (req, res) => {
    const { city, gender, species, age, shelterId } = req.query;

    let query = "SELECT * FROM pets WHERE 1=1"; // 基本查詢語句

    const queryParams = []; // 用來存放查詢條件的值

    // 根據查詢條件組合 SQL 語句
    if (city) {
        query += " AND city = ?";
        queryParams.push(city);
    }
    if (gender) {
        query += " AND gender = ?";
        queryParams.push(gender);
    }
    if (species) {
        query += " AND species LIKE ?";
        queryParams.push(`%${species}%`); // 使用模糊匹配
    }
    if (age) {
        query += " AND age = ?";
        queryParams.push(age);
    }
    if (shelterId) {
        query += " AND shelter_id = ?";
        queryParams.push(shelterId);
    }

    // 執行查詢
    db.execute(query, queryParams, (err, rows) => {
        if (err) {
            console.error("資料庫查詢錯誤:", err);
            return res.status(500).json({ error: "資料庫錯誤" });
        }
    
        res.status(200).json(rows); // 確保返回的總是陣列
    });
});

module.exports = router; // 確保正確導出路由
    