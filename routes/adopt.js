const express = require("express");
const router = express.Router();
const db = require("../db"); // 引用資料庫連接檔案

// 處理領養表單提交
router.post("/submit-adoption", express.json(), (req, res) => { // 使用 express.json() 解析 JSON 格式的資料
    const { name, email, phone, pet_id, experience, message } = req.body; // 確保提取所有表單數據

    // 插入領養申請數據到資料庫
    db.query('INSERT INTO adoptions (name, email, phone, pet_id, experience, message) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, email, phone, pet_id, experience, message], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('資料庫儲存錯誤');
            return;
        }

        // 回應成功
        res.json({ message: '領養申請已提交，謝謝！' });
    });
});

module.exports = router;
