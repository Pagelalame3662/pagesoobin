---

description: "Task list for 圈圈叉叉遊戲 implementation"
---

# Tasks: 圈圈叉叉遊戲

**Input**: Design documents from `/specs/001-tic-tac-toe/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ui-contract.md ✓, quickstart.md ✓

**語言要求**: 本文件 MUST 使用繁體中文（程式碼識別字與外部 API 名稱除外）。

**Tests**: 本專案包含 Vitest 單元測試（research.md 決策 2）。TDD 為 MANDATORY：每個遊戲邏輯實作任務前 MUST 先有測試任務，先驗證失敗（紅燈）後才可進入實作（綠燈）與重構。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions
- 任務完成時 MUST 即時勾選 `[ ]` -> `[x]`，使 `tasks.md` 與實際進度一致

---

## Phase 1: Setup（共用基礎設施）

**Purpose**: 專案初始化與基本結構建立

- [ ] T001 執行 `git status` 確認階段開始狀態
- [ ] T002 建立根目錄專案結構：`index.html`、`style.css`、`game.js`、`tests/game.test.js`（per plan.md Project Structure）
- [ ] T003 [P] 初始化 npm 專案並安裝 Vitest：`npm init -y && npm install --save-dev vitest`（per research.md 決策 2）
- [ ] T004 [P] 建立 `vitest.config.js` 設定測試環境
- [ ] T005 在 `package.json` 新增 `"test": "vitest"` 腳本
- [ ] T006 建立規格保護檢查：確認 `spec.md`、`plan.md`、`tasks.md` 在實作過程中不被刪除或覆寫

**Checkpoint**: 執行 `npm test` 可啟動測試執行器，`git status` 確認初始狀態乾淨

---

## Phase 2: Foundational（阻塞性先決條件）

**Purpose**: 所有使用者故事共用的遊戲狀態核心，MUST 在任何使用者故事實作前完成

**⚠️ CRITICAL**: 所有使用者故事均依賴本階段完成

- [ ] T007 在 `game.js` 定義 `GameState` 初始結構與 `WIN_LINES` 靜態常數陣列（per data-model.md）
- [ ] T008 在 `game.js` 實作 `initGame()` 函式，重置棋盤、玩家、勝利者、平局旗標至初始值（per contracts/ui-contract.md JS 公開介面）
- [ ] T009 在 `game.js` 實作 `getState()` 函式，回傳目前遊戲狀態的唯讀副本（per contracts/ui-contract.md JS 公開介面）
- [ ] T010 在 `index.html` 建立基本 HTML 骨架：`#status`、`#board`（9 個 `.cell[data-index]` button）、`#restart` 按鈕（per contracts/ui-contract.md DOM 結構合約）
- [ ] T011 在 `style.css` 建立基礎棋盤版面與 `.cell` 基礎樣式（grid layout、格子大小）

**Checkpoint**: 遊戲邏輯模組可被 import；`getState()` 回傳正確初始值；HTML 骨架可在瀏覽器開啟並顯示棋盤

---

## Phase 3: User Story 1 — 進行一局遊戲並決出勝負（Priority: P1）🎯 MVP

**Goal**: 兩位玩家輪流落子，正確判定八條勝利路徑並顯示獲勝訊息，棋盤鎖定

**Independent Test**: 開啟 `index.html`，兩位玩家輪流點擊格子，直到其中一方連成三子，頁面顯示獲勝訊息即為成功

### 測試 — User Story 1（先寫測試，先驗證失敗）

- [ ] T012 [P] [US1] 在 `tests/game.test.js` 撰寫 `checkWinner()` 單元測試：覆蓋所有 8 條勝利路徑（3 橫、3 縱、2 斜）及無勝利情況（per data-model.md WIN_LINES）
- [ ] T013 [P] [US1] 在 `tests/game.test.js` 撰寫 `makeMove()` 整合測試：正常落子切換玩家、落子後立即觸發勝利判定
- [ ] T014 [US1] 執行 `npm test` 確認 T012、T013 測試全部失敗（紅燈）

### 實作 — User Story 1

- [ ] T015 [US1] 在 `game.js` 實作 `checkWinner(board)` 函式：迭代 `WIN_LINES` 判斷是否有三格相同且非 null，回傳獲勝符號或 `null`（per data-model.md V-003）
- [ ] T016 [US1] 在 `game.js` 實作 `makeMove(index)` 函式：驗證格子可落子（V-001、V-002）、更新 board、呼叫 `checkWinner`、設定 `winner`/`gameOver`/`winLine`、切換 `currentPlayer`（per data-model.md 驗證規則）
- [ ] T017 [US1] 執行 `npm test` 確認 T012、T013 測試全部通過（綠燈）
- [ ] T018 [US1] 在 `index.html` 的 `<script>` 或 `game.js` 中為每個 `.cell` 綁定 `click` 事件，呼叫 `makeMove(index)` 並更新 DOM：顯示符號、切換 `#status` 文字（per contracts/ui-contract.md 事件 1、狀態文字合約）
- [ ] T019 [US1] 落子後判斷勝利：在獲勝格子加上 `.cell--winner`、在 `#board` 加上 `.board--gameover`、更新 `#status` 為「玩家X獲勝！」（per contracts/ui-contract.md CSS 狀態類別、UI-004）
- [ ] T020 [US1] 在 `style.css` 新增 `.cell--taken`（`cursor: not-allowed`）、`.cell--winner`（高亮背景）、`.board--gameover`（停用點擊）樣式（per contracts/ui-contract.md CSS 狀態類別合約）
- [ ] T021 [US1] 手動測試場景 UI-001、UI-002、UI-003、UI-004（per contracts/ui-contract.md 驗收測試場景）

**Checkpoint**: 完成後 User Story 1 應可獨立運作：開啟瀏覽器，兩位玩家落子直到一方勝出，獲勝訊息正確顯示，棋盤停止接受輸入

---

## Phase 4: User Story 2 — 平局判定（Priority: P2）

**Goal**: 棋盤填滿且無人獲勝時顯示平局訊息

**Independent Test**: 操作棋盤使所有格子被填入但無人連成三子，確認遊戲顯示平局訊息

### 測試 — User Story 2（先寫測試，先驗證失敗）

- [ ] T022 [P] [US2] 在 `tests/game.test.js` 撰寫 `checkDraw()` 單元測試：棋盤全滿且無勝利者回傳 `true`、棋盤未滿或有勝利者回傳 `false`（per data-model.md V-004）
- [ ] T023 [US2] 執行 `npm test` 確認 T022 測試失敗（紅燈）

### 實作 — User Story 2

- [ ] T024 [US2] 在 `game.js` 實作 `checkDraw(board)` 函式：檢查 board 全部格子非 null 且 `winner === null`，設定 `isDraw = true`、`gameOver = true`（per data-model.md V-004）
- [ ] T025 [US2] 更新 `makeMove(index)` 函式，在 `checkWinner` 回傳 null 後呼叫 `checkDraw`（per data-model.md 狀態轉換）
- [ ] T026 [US2] 執行 `npm test` 確認 T022 測試通過（綠燈）
- [ ] T027 [US2] 在 `index.html` DOM 事件處理中，平局後更新 `#status` 為「平局！」並在 `#board` 加上 `.board--gameover`（per contracts/ui-contract.md UI-005）
- [ ] T028 [US2] 手動測試場景 UI-005（per contracts/ui-contract.md 驗收測試場景）

**Checkpoint**: 完成後 User Stories 1 AND 2 均可獨立運作：勝利與平局情境皆能正確觸發，棋盤鎖定

---

## Phase 5: User Story 3 — 重新開始遊戲（Priority: P3）

**Goal**: 遊戲結束後點擊「重新開始」重置棋盤，開始新局；任何時間皆可重置

**Independent Test**: 遊戲結束後點擊重新開始按鈕，棋盤恢復空白且輪次回到玩家一

### 測試 — User Story 3（先寫測試，先驗證失敗）

- [ ] T029 [P] [US3] 在 `tests/game.test.js` 撰寫 `initGame()` 重置測試：遊戲結束後呼叫 `initGame()`，`getState()` 回傳初始狀態（board 全 null、currentPlayer = 'O'、gameOver = false）（per data-model.md V-005）
- [ ] T030 [US3] 執行 `npm test` 確認 T029 測試失敗（紅燈）

### 實作 — User Story 3

- [ ] T031 [US3] 確認 `initGame()` 完整重置所有 GameState 欄位（board、currentPlayer、winner、isDraw、gameOver、winLine）（per data-model.md 初始值）
- [ ] T032 [US3] 執行 `npm test` 確認 T029 測試通過（綠燈）
- [ ] T033 [US3] 在 `index.html` 為 `#restart` 按鈕綁定 `click` 事件：呼叫 `initGame()`，清空所有 `.cell` 文字內容、移除 `.cell--taken`/`.cell--winner`/`.board--gameover`、重設 `#status` 為「玩家一回合（O）」（per contracts/ui-contract.md 事件 2、UI-006）
- [ ] T034 [US3] 手動測試場景 UI-006（遊戲結束後重置）及 spec.md 場景 2（遊戲進行中重置）

**Checkpoint**: 完成後所有三個 User Stories 均可獨立運作

---

## Phase 6: Polish & Cross-Cutting Concerns（收尾）

**Purpose**: 跨使用者故事的改善、無障礙性、部署與文件更新

- [ ] T035 [P] 在 `style.css` 新增響應式佈局（RWD），確保桌面、平板、手機均可正常操作（per spec.md SC-004）
- [ ] T036 [P] 在 `index.html` 為棋盤格子加上 `aria-label`，提升無障礙性
- [ ] T037 執行 `npm test` 確認全部單元測試通過
- [ ] T038 手動執行 quickstart.md 驗證流程，確認所有驗收場景（UI-001 至 UI-006）通過
- [ ] T039 確認 `index.html` 根目錄部署於 GitHub Pages 可正常執行（per research.md 決策 3）
- [ ] T040 執行 `git status` 與 `git diff --staged` 確認最終提交範圍正確

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無依賴，可立即開始
- **Foundational (Phase 2)**: 依賴 Phase 1 完成 — BLOCKS 所有使用者故事
- **User Stories (Phase 3–5)**: 依賴 Foundational Phase 完成
  - 可按優先順序依序執行：US1 → US2 → US3
  - US2 邏輯依賴 US1 中 `makeMove()` 的基礎；US3 使用 `initGame()` 已在 Phase 2 定義
- **Polish (Phase 6)**: 依賴所有使用者故事完成

### User Story Dependencies

- **US1 (P1)**: Phase 2 完成後可開始 — 無其他故事依賴
- **US2 (P2)**: Phase 2 完成後可開始 — 需整合至 `makeMove()` 但可獨立測試
- **US3 (P3)**: Phase 2 完成後可開始 — `initGame()` 已存在，只需綁定 UI 事件

### Within Each User Story

- 測試 MUST 先寫並驗證失敗，再進行實作
- 邏輯函式（game.js）先於 DOM 事件綁定（index.html）
- 每個故事完成後獨立驗證，再進行下一故事

### Parallel Opportunities

- T003/T004 可並行（不同設定檔）
- T012/T013 可並行（同一測試檔不同 describe 區塊，可分工撰寫）
- T022/T029 可並行（不同測試區塊）
- T035/T036 可並行（不同 concerns）

---

## Parallel Example: User Story 1

```bash
# 並行撰寫測試（TDD 紅燈階段）：
Task T012: "撰寫 checkWinner() 單元測試（8 條勝利路徑）in tests/game.test.js"
Task T013: "撰寫 makeMove() 整合測試 in tests/game.test.js"

# 待測試失敗確認後，依序實作：
Task T015: "實作 checkWinner(board) in game.js"
Task T016: "實作 makeMove(index) in game.js"
```

---

## Implementation Strategy

### MVP First（僅 User Story 1）

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational（CRITICAL — 阻塞所有故事）
3. 完成 Phase 3: User Story 1
4. **停止並驗證**: 獨立測試 User Story 1
5. 若驗證通過，可部署至 GitHub Pages 展示 MVP

### Incremental Delivery

1. 完成 Setup + Foundational → 基礎就緒
2. 加入 User Story 1 → 獨立測試 → 部署/展示（MVP！）
3. 加入 User Story 2 → 獨立測試 → 部署/展示
4. 加入 User Story 3 → 獨立測試 → 部署/展示
5. 每個故事增加價值，不破壞前一故事功能

---

## Notes

- [P] 任務 = 不同檔案，無依賴關係，可並行執行
- [Story] 標籤將任務對應至特定使用者故事，確保可追溯性
- 每個使用者故事應可獨立完成並測試
- **MANDATORY**: 實作前驗證測試失敗（紅燈），通過後（綠燈）再重構
- 每個邏輯任務群組後執行 `git commit`
- 可在任意 Checkpoint 停下來獨立驗證故事
- 避免：模糊任務、同一檔案衝突、破壞獨立性的跨故事依賴
- 每個階段結束前執行 `git status`，提交前檢查 `git diff --staged`
- 除非使用者明確要求，不新增僅用於變更摘要或總結的 Markdown 檔案
