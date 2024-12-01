const mysql = require("mysql2");
require("dotenv").config(); // 加載環境變數

// 建立資料庫連接
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // 使用環境變數
  user: process.env.DB_USER,       // 使用環境變數
  password: process.env.DB_PASSWORD, // 使用環境變數
  database: process.env.DB_NAME     // 使用環境變數
});

// 連接到資料庫
db.connect((err) => {
  if (err) {
    console.error("資料庫連線失敗", err);
  } else {
    console.log("成功連接到資料庫");
  }
});

module.exports = db;
