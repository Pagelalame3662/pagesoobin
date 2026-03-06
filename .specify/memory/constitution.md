<!--
Sync Impact Report
- Version change: N/A (template) -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. 繁體中文一致性
	- Template Principle 2 -> II. 簡潔優先與反過度設計
	- Template Principle 3 -> III. TDD 先行（不可跳過）
	- Template Principle 4 -> IV. Git 階段檢查與可追蹤提交
	- Template Principle 5 -> V. 任務可視化與規格保護
- Added sections:
	- 預設技術與交付邊界
	- 執行流程與品質門檻
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ✅ not applicable (no file): .specify/templates/commands/*.md
- Follow-up TODOs:
	- None
-->

# pagesoobin Constitution

## Core Principles

### I. 繁體中文一致性
所有規格文件（如 `spec.md`、`plan.md`、`tasks.md`）與對使用者的回覆 MUST 使用繁體中文。
程式碼識別字與第三方 API 名稱可保留原文，但說明文字、驗收條件與流程紀錄 MUST 為繁體中文。
Rationale: 減少溝通落差與審查誤解，確保需求到實作可直接對照。

### II. 簡潔優先與反過度設計
設計與實作 MUST 先滿足目前需求的最小可行解，不得預先加入未被需求要求的抽象層、框架或擴充點。
若採用較高複雜度方案，提案中 MUST 明確記錄必要性與替代方案比較。
Rationale: 降低維護成本與交付風險，維持可讀性與可迭代性。

### III. TDD 先行（不可跳過）
每個功能實作 MUST 遵循 Red-Green-Refactor：先寫測試、確認失敗、再實作通過，最後重構。
任務與提交紀錄 MUST 能對應到測試先行證據（例如測試任務先於實作任務、或提交順序可驗證）。
Rationale: 以可執行規格約束行為，避免回歸與需求偏差。

### IV. Git 階段檢查與可追蹤提交
每個階段開始與結束 MUST 執行 `git status`，提交前 MUST 檢查差異（`git diff --staged` 或同等命令）。
提交 MUST 僅包含該階段必要變更，不得混入無關修改。
Rationale: 提升變更可審查性，降低意外覆寫與遺漏風險。

### V. 任務可視化與規格保護
`implement` 階段執行時，`tasks.md` 的核取方塊 MUST 與實際進度同步打勾。
實作過程 MUST 不得刪除、覆蓋或以模板誤替換既有規格文件（尤其 `spec.md`、`plan.md`、`tasks.md`）。
除非使用者明確要求，流程中 SHOULD NOT 新增僅用於變更摘要或總結的 Markdown 檔案。
Rationale: 確保任務追蹤真實可用，並保護需求與設計資產不被意外破壞。

## 預設技術與交付邊界

若需求屬於網站專案且未指定部署目標，預設方案 MUST 以可部署到 GitHub Pages 的前端靜態網站為主。
僅在需求明確要求後端、伺服器端運算或其他部署環境時，才可偏離此前設。

## 執行流程與品質門檻

每個功能階段至少包含下列可驗證檢查點：
- 階段開始前：`git status` 工作樹乾淨度確認。
- 實作前：先建立對應測試並確認失敗。
- 實作後：測試轉為通過，並完成必要重構。
- 階段結束前：更新 `tasks.md` 勾選狀態，並再次執行 `git status`。
- 提交前：檢查 staged diff 僅含本階段範圍。

任何未通過上述門檻的變更 MUST 視為未完成，不可宣稱交付完成。

## Governance

本憲章優先於其他開發慣例；`plan-template`、`spec-template`、`tasks-template` 與實作流程 MUST 與本憲章一致。

修訂程序：
1. 以明確變更提案描述修訂條款、影響範圍與必要模板同步。
2. 檢查並更新受影響模板與流程文件。
3. 於憲章頂部更新 Sync Impact Report。

版本政策（SemVer）：
- MAJOR：移除或重新定義核心原則，造成流程不相容。
- MINOR：新增原則或新增強制治理章節。
- PATCH：文字澄清、錯字修正、非語義變更。

合規審查：
- 每次 `plan` 與 `implement` 審查 MUST 檢查：語言一致性、反過度設計、TDD、git 階段檢查、
	`tasks.md` 勾選同步、規格文件保護、網站預設部署前設。

**Version**: 1.0.0 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
