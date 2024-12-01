const express = require('express'); 
const app = express();
const router = express.Router();
const mysql = require('mysql2/promise'); 


// 配置資料庫連接
const dbConfig = {
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,       
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME     
};

// 解析 JSON 請求
app.use(express.json());


// POST 路由處理登入
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 驗證請求的必填字段
    if (!username || !password) {
        return res.status(400).json({ error: '請提供帳號和密碼' });
    }

    // 使用資料庫執行查詢
    mysql.createConnection(dbConfig)
        .then((connection) => {
            return connection.execute('SELECT * FROM users WHERE username = ?', [username])
                .then(([userResult]) => {
                    connection.end(); // 關閉連接

                    if (!Array.isArray(userResult) || userResult.length === 0) {
                        return res.status(401).json({ error: '帳號或密碼錯誤' });
                    }

                    const user = userResult[0];
                    if (user.password !== password) {
                        return res.status(401).json({ error: '帳號或密碼錯誤' });
                    }

                    // 登入成功，回傳用戶資料
                    const { username, phone, address } = user;
                    return res.status(200).json({ message: '登入成功', user: { username, phone, address } });
                })
                .catch((queryError) => {
                    console.error('資料庫查詢錯誤：', queryError);
                    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' });
                });
        })
        .catch((connectionError) => {
            console.error('資料庫連接錯誤：', connectionError);
            return res.status(500).json({ error: '伺服器錯誤，請稍後再試' });
        });
});

// 匯出路由模組
module.exports = router;
