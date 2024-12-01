const express = require("express");
const router = express.Router();
const db = require("../db"); // 引用資料庫連接檔案

// 註冊 API
router.post("/register", (req, res) => {
    const { username, password, phone, address } = req.body;

    // 基本驗證
    if (!username || !password || !phone || !address) {
        return res.status(400).json({ error: "請填寫所有必填欄位。" });
    }

    // 建立 SQL 查詢語句
    const query = "INSERT INTO users (username, password, phone, address) VALUES (?, ?, ?, ?)";

    // 執行插入操作
    db.execute(query, [username, password, phone, address], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "資料庫錯誤" });
        }
        res.status(201).json({ message: "註冊成功！" });
    });
});

module.exports = router;