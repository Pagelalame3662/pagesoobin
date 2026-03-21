# UI 合約: 圈圈叉叉遊戲

**Feature**: `001-tic-tac-toe` | **Date**: 2026-03-13

**語言要求**: 本文件 MUST 使用繁體中文。

## 概述

本文件定義圈圈叉叉遊戲的 UI 合約，包含 DOM 元素、CSS 類別、用戶互動事件及其對應狀態變化。作為前端實作的行為規格，可直接驅動 UI 測試。

---

## DOM 結構合約

```html
<!-- 狀態提示列 -->
<div id="status">玩家一回合（O）</div>

<!-- 3×3 棋盤 -->
<div id="board">
  <button class="cell" data-index="0"></button>
  <button class="cell" data-index="1"></button>
  <button class="cell" data-index="2"></button>
  <button class="cell" data-index="3"></button>
  <button class="cell" data-index="4"></button>
  <button class="cell" data-index="5"></button>
  <button class="cell" data-index="6"></button>
  <button class="cell" data-index="7"></button>
  <button class="cell" data-index="8"></button>
</div>

<!-- 重新開始按鈕 -->
<button id="restart">重新開始</button>
```

---

## CSS 狀態類別合約

| CSS 類別 | 套用元素 | 觸發條件 | 視覺效果 |
|----------|----------|----------|----------|
| `.cell` | `button[data-index]` | 永遠 | 棋盤格子基礎樣式 |
| `.cell--taken` | `.cell` | 格子已落子 | 停用游標（`cursor: not-allowed`） |
| `.cell--winner` | `.cell` | 屬於獲勝連線 | 背景色高亮（例如黃色） |
| `.board--gameover` | `#board` | `gameOver === true` | 所有格子停用點擊 |

---

## 互動事件合約

### 事件 1：點擊棋盤格子

| 屬性 | 規格 |
|------|------|
| **觸發元素** | `.cell[data-index]` |
| **前置條件** | `board[index] === null` 且 `gameOver === false` |
| **後置條件（一般）** | 格子顯示當前玩家符號（`'O'` 或 `'X'`），輪次切換 |
| **後置條件（獲勝）** | `#status` 顯示「玩家X獲勝！」，獲勝格子加上 `.cell--winner`，`#board` 加上 `.board--gameover` |
| **後置條件（平局）** | `#status` 顯示「平局！」，`#board` 加上 `.board--gameover` |
| **忽略條件** | `board[index] !== null` 或 `gameOver === true` → 無任何 DOM 變更 |

### 事件 2：點擊「重新開始」按鈕

| 屬性 | 規格 |
|------|------|
| **觸發元素** | `#restart` |
| **前置條件** | 無限制（任何時間皆可點擊） |
| **後置條件** | 所有 `.cell` 內容清空、移除 `.cell--taken`、`.cell--winner`、`.board--gameover`；`#status` 重設為「玩家一回合（O）」 |

---

## 狀態文字合約

| 遊戲狀態 | `#status` 顯示內容 |
|----------|-------------------|
| 遊戲進行中，玩家一回合 | `玩家一回合（O）` |
| 遊戲進行中，玩家二回合 | `玩家二回合（X）` |
| 玩家一獲勝 | `玩家一獲勝！` |
| 玩家二獲勝 | `玩家二獲勝！` |
| 平局 | `平局！` |

---

## JavaScript 公開介面合約（game.js）

```javascript
// 初始化或重置遊戲狀態
function initGame(): void

// 玩家在 index 落子；回傳落子後的遊戲狀態
function makeMove(index: number): GameState

// 檢查是否有玩家獲勝；回傳獲勝符號或 null
function checkWinner(board: Array<string|null>): string | null

// 檢查是否平局（棋盤滿且無獲勝者）
function checkDraw(board: Array<string|null>): boolean

// 取得目前遊戲狀態（唯讀副本）
function getState(): GameState
```

**GameState 型別**:
```javascript
{
  board: Array<string|null>,   // 9 格棋盤
  currentPlayer: 'O' | 'X',
  winner: 'O' | 'X' | null,
  isDraw: boolean,
  gameOver: boolean,
  winLine: Array<number> | null  // 獲勝格子索引，平局或進行中為 null
}
```

---

## 驗收測試場景（UI 層）

| 測試 ID | 場景 | 預期 DOM 狀態 |
|---------|------|--------------|
| UI-001 | 初始載入 | `#status` = 「玩家一回合（O）」；所有 `.cell` 空白 |
| UI-002 | 點擊空格（index=0） | `cell[0]` 內容 = `O`；`#status` = 「玩家二回合（X）」 |
| UI-003 | 點擊已佔用格子 | DOM 不變 |
| UI-004 | 玩家一連成三子 | `#status` = 「玩家一獲勝！」；獲勝格子有 `.cell--winner`；`#board` 有 `.board--gameover` |
| UI-005 | 棋盤填滿無人獲勝 | `#status` = 「平局！」；`#board` 有 `.board--gameover` |
| UI-006 | 點擊重新開始 | 所有格子清空；`#status` = 「玩家一回合（O）」 |
