# 寵物領養平台後端系統 (Pet Adoption Backend)

## 專案定位
本專案為寵物領養平台的 RESTful API 核心後端，負責處理使用者驗證、寵物數據檢索、領養申請邏輯及多媒體檔案管理。系統設計專注於資料一致性與模組化架構，確保前端應用能穩定存取醫療等級的寵物照護數據。

---

## 專案介紹 — Description
本系統旨在建構一個透明、高效的寵物領養撮合平台後端。透過 Express.js 搭建高效能路由，並整合 MySQL 進行結構化數據存儲。系統核心包含完整的寵物生命週期管理、使用者權限分級，以及基於 Multer 的動態圖片上傳引擎，讓領養資訊更具視覺化與真實性。

---

## 運行環境需求 — Requirement
- Node.js：v14.0.0 以上版本  
- npm：v6.0.0 以上版本  
- MySQL Server：8.0 或以上，需具備資料庫管理權限  
- 相依套件：包含 cors、dotenv、express-session、multer、mysql2 等  

---

## 環境檔（.env）設定 — .env Setting
請在專案根目錄建立 `.env` 檔案，並參考以下欄位進行設定：

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_pwd
    DB_NAME=pet_adoption
    PORT=3000
    SESSION_SECRET=secret

---

## 安裝與運行步驟 — Build Setup

### Local 端

#### 複製專案庫
    git clone https://github.com/Kathy1155/pet-adoption-backend.git
    cd pet-adoption-backend

#### 安裝依賴
    npm install

#### 啟動開發服務（使用 Nodemon 自動重啟）
    npm start

---

### Server 端

#### 驗證連線
確保伺服器防火牆已開啟指定連接埠（預設 3000）

#### 持久化運行
建議使用 PM2 進行進程管理

    pm2 start index.js --name "pet-backend"

---

## 系統架構與功能 — System Architecture
本系統採用 MVC（Model-Routes-Controller）的概念進行模組化切分：

### Entry Point
- `index.js`：負責中介軟體配置與服務啟動  

### Persistence
- `db.js`：封裝資料庫連接池，優化查詢效能  

### Routing
- `/pets`：處理寵物資料清單、分類查詢與細節檢索  
- `/user`：管理使用者個資與帳號狀態  
- `/login`：基於 Session 的驗證機制  
- `/adopt`：管理領養申請流程與歷史紀錄  

### Storage
- `/photos`：靜態資源存儲，存放寵物與使用者上傳圖片  

---

## Function Map
- 驗證模組：支援使用者登入狀態持久化（express-session）  
- 領養管理：實現多對多關係映射，紀錄使用者與寵物間的領養申請狀態  
- 檔案引擎：整合 Multer 處理 multipart/form-data，支援寵物圖片上傳與儲存  
- 數據過濾：提供分頁與分類篩選 API，優化前端展示效能  

---

## 測試與驗證 — Testing

### 單元測試
- 針對 `db.js` 的連線池穩定度進行壓力測試  

### API 驗證
- 建議搭配 Postman 或 Insomnia 測試 `/routes` 下的各項 Endpoint 狀態碼是否符合 RESTful 標準（如 200、201、404、500）  

---

## 開發者與支援 — Support
- 主要開發者：呂欣樺 Kathy  
- 學術單位：醫學資訊系 三年級  
- 開發身份：412570405 呂欣樺  

---

## 注意事項 — Warning

### 安全性
請勿將包含真實密碼的 `.env` 檔案推送到 GitHub 公開儲存庫  

### 圖片權限
`/photos` 目錄在 Linux Server 下運作時，需確保具備寫入權限（chmod 755）  

### 資料庫初始化
啟動服務前，請確認 MySQL 服務已預先建立對應名稱的資料庫與資料表架構  
