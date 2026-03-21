# 快速入門: 圈圈叉叉遊戲

**Feature**: `001-tic-tac-toe` | **Date**: 2026-03-13

**語言要求**: 本文件 MUST 使用繁體中文。

## 環境需求

| 項目 | 最低版本 | 說明 |
|------|----------|------|
| Node.js | 18+ | 執行測試（Vitest）所需 |
| npm | 9+ | 套件管理 |
| 任意現代瀏覽器 | — | 遊戲執行環境 |

> 若只需在瀏覽器執行遊戲而不跑測試，則不需要 Node.js。

---

## 本地開發啟動

### 1. 在瀏覽器中執行遊戲

直接以瀏覽器開啟根目錄的 `index.html` 即可：

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

或使用 VS Code 的 Live Server 擴充套件，右鍵點擊 `index.html` → **Open with Live Server**。

---

### 2. 執行測試

```bash
# 安裝依賴
npm install

# 執行測試（單次）
npm test

# 監看模式（開發中即時回饋）
npm run test:watch
```

---

## 目錄結構

```
pagesoobin/
├── index.html          # 遊戲主頁面
├── style.css           # 樣式
├── game.js             # 遊戲邏輯（純函式，可獨立測試）
├── package.json        # npm 設定（Vitest）
├── vitest.config.js    # Vitest 設定
└── tests/
    └── game.test.js    # 遊戲邏輯單元測試
```

---

## 部署至 GitHub Pages

1. 在 GitHub 倉庫頁面，前往 **Settings → Pages**。
2. **Source** 選擇 `Deploy from a branch`。
3. **Branch** 選擇 `main`，資料夾選擇 `/ (root)`。
4. 儲存後，GitHub Pages 將在數分鐘內發布。
5. 網址格式：`https://<username>.github.io/<repo-name>/`

---

## 遊戲操作說明

1. 開啟 `index.html`（或 GitHub Pages 網址）。
2. 頁面顯示「玩家一回合（O）」，代表遊戲已就緒。
3. 玩家一點擊任意空格，格子顯示「O」，輪到玩家二。
4. 玩家二點擊任意空格，格子顯示「X」，輪到玩家一。
5. 連成三子者獲勝，頁面顯示「玩家X獲勝！」。
6. 若棋盤填滿無人連線，顯示「平局！」。
7. 點擊「重新開始」可重置棋盤，開始新局。

---

## TDD 開發流程

依憲章要求，每個功能 MUST 遵循 Red-Green-Refactor：

```bash
# 1. 先寫測試（在 tests/game.test.js）
# 2. 確認測試失敗（紅燈）
npm test

# 3. 實作功能（在 game.js / index.html / style.css）
# 4. 確認測試通過（綠燈）
npm test

# 5. 重構並確認測試仍通過
npm test
```
