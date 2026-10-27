# 樂譜圖片辨識與播放器（免安裝 Python）

這是 **Vercel 靜態網頁 + Node.js Serverless Function** 專案。使用者只需瀏覽器；網站管理者需要一次性部署與設定 OpenAI API 金鑰。

## 部署到 Vercel（推薦）

1. 將此資料夾的 `index.html`、`package.json` 與 `api/recognize.js` 上傳到 GitHub 新儲存庫（保留 `api` 資料夾結構）。
2. 到 https://vercel.com 註冊或登入，按 **Add New → Project**，匯入該 GitHub 儲存庫。
3. Framework Preset 選 **Other**，Root Directory 選專案根目錄，Build Command 留空，Output Directory 留空，部署。
4. 在 Vercel 專案 **Settings → Environment Variables** 加入 `OPENAI_API_KEY`，值為你的 OpenAI API 金鑰；可選 `OPENAI_MODEL`（預設 `gpt-4.1-mini`）。
5. 在 **Deployments** 重新部署（Redeploy），讓環境變數生效。
6. 使用 Vercel 提供的 `https://...vercel.app` 網址，即可在手機或電腦瀏覽器上傳圖片辨識、校正與播放。

**重要：** API 金鑰只應放在 Vercel 環境變數，不可寫在 `index.html` 或公開的 GitHub 程式碼。OpenAI API 可能依用量計費，且與 ChatGPT 訂閱分開。公開網站可能被他人使用並產生費用，正式公開前應加入登入驗證、速率限制及費用控管。

## 本機使用

直接開啟 `index.html` 可以載入示範、手動編輯 JSON 並播放；但 **AI 辨識需要部署後的 `/api/recognize`**。若想本機測試 API，可選擇安裝 Node.js 與 Vercel CLI（不需要 Python）。

## 目前限制

- 支援 JPG/PNG/WebP，單張最大 8MB；PDF 請先轉成圖片。
- AI 辨識手寫譜可能出錯，尤其是中音譜號、複雜節奏、多聲部及模糊圖片。請先校正 JSON。
- 播放使用瀏覽器 Web Audio 正弦波音色，並非真實鋼琴音源。
- 目前沒有圖形化逐音拖曳校正；透過 JSON 編輯音符。
- 本專案未執行真實 OpenAI API 的端對端測試。
