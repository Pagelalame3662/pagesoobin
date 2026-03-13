import { describe, it, expect, beforeEach } from 'vitest';
import { initGame, getState, checkWinner, checkDraw, makeMove } from '../game.js';

beforeEach(() => {
  initGame();
});

// ─── checkWinner() 單元測試 ───────────────────────────────────────────
describe('checkWinner()', () => {
  it('棋盤全空時回傳 null', () => {
    const board = Array(9).fill(null);
    expect(checkWinner(board)).toBeNull();
  });

  it('第一橫列 [0,1,2] O 獲勝', () => {
    const board = ['O', 'O', 'O', null, null, null, null, null, null];
    expect(checkWinner(board)).toBe('O');
  });

  it('第二橫列 [3,4,5] X 獲勝', () => {
    const board = [null, null, null, 'X', 'X', 'X', null, null, null];
    expect(checkWinner(board)).toBe('X');
  });

  it('第三橫列 [6,7,8] O 獲勝', () => {
    const board = [null, null, null, null, null, null, 'O', 'O', 'O'];
    expect(checkWinner(board)).toBe('O');
  });

  it('第一縱行 [0,3,6] X 獲勝', () => {
    const board = ['X', null, null, 'X', null, null, 'X', null, null];
    expect(checkWinner(board)).toBe('X');
  });

  it('第二縱行 [1,4,7] O 獲勝', () => {
    const board = [null, 'O', null, null, 'O', null, null, 'O', null];
    expect(checkWinner(board)).toBe('O');
  });

  it('第三縱行 [2,5,8] X 獲勝', () => {
    const board = [null, null, 'X', null, null, 'X', null, null, 'X'];
    expect(checkWinner(board)).toBe('X');
  });

  it('左上至右下對角線 [0,4,8] O 獲勝', () => {
    const board = ['O', null, null, null, 'O', null, null, null, 'O'];
    expect(checkWinner(board)).toBe('O');
  });

  it('右上至左下對角線 [2,4,6] X 獲勝', () => {
    const board = [null, null, 'X', null, 'X', null, 'X', null, null];
    expect(checkWinner(board)).toBe('X');
  });

  it('棋盤未填滿但無勝利者時回傳 null', () => {
    const board = ['O', 'X', 'O', 'X', 'O', 'X', null, null, null];
    expect(checkWinner(board)).toBeNull();
  });
});

// ─── makeMove() 整合測試 ──────────────────────────────────────────────
describe('makeMove()', () => {
  it('落子後格子更新為目前玩家符號', () => {
    makeMove(0);
    const state = getState();
    expect(state.board[0]).toBe('O');
  });

  it('正常落子後切換玩家', () => {
    makeMove(0);
    const state = getState();
    expect(state.currentPlayer).toBe('X');
  });

  it('落子後再落子，切換回 O', () => {
    makeMove(0);
    makeMove(1);
    const state = getState();
    expect(state.currentPlayer).toBe('O');
  });

  it('落子到已佔用格子應忽略（V-001）', () => {
    makeMove(0);
    makeMove(0);
    const state = getState();
    expect(state.board[0]).toBe('O');
    expect(state.currentPlayer).toBe('X');
  });

  it('遊戲結束後落子應忽略（V-002）', () => {
    // O 獲勝後
    makeMove(0); // O
    makeMove(3); // X
    makeMove(1); // O
    makeMove(4); // X
    makeMove(2); // O wins
    const before = getState();
    makeMove(5); // should be ignored
    const after = getState();
    expect(after.board[5]).toBeNull();
    expect(after.currentPlayer).toBe(before.currentPlayer);
  });

  it('落子後觸發勝利判定，設定 winner 與 gameOver', () => {
    makeMove(0); // O
    makeMove(3); // X
    makeMove(1); // O
    makeMove(4); // X
    makeMove(2); // O wins [0,1,2]
    const state = getState();
    expect(state.winner).toBe('O');
    expect(state.gameOver).toBe(true);
    expect(state.winLine).toEqual([0, 1, 2]);
  });
});

// ─── checkDraw() 單元測試 ─────────────────────────────────────────────
describe('checkDraw()', () => {
  it('棋盤全滿且無勝利者回傳 true', () => {
    // O X O
    // X O X
    // X O X  → 無勝利者，平局
    const board = ['O', 'X', 'O', 'X', 'O', 'X', 'X', 'O', 'X'];
    expect(checkDraw(board)).toBe(true);
  });

  it('棋盤未滿時回傳 false', () => {
    const board = ['O', null, null, null, null, null, null, null, null];
    expect(checkDraw(board)).toBe(false);
  });

  it('棋盤全滿但有勝利者時回傳 false', () => {
    // O O O
    // X X O
    // X O X
    const board = ['O', 'O', 'O', 'X', 'X', 'O', 'X', 'O', 'X'];
    expect(checkDraw(board)).toBe(false);
  });

  it('makeMove 觸發平局後 isDraw 與 gameOver 為 true', () => {
    // 製造平局：O X O / X O X / X O X
    makeMove(0); // O
    makeMove(1); // X
    makeMove(2); // O
    makeMove(3); // X
    makeMove(4); // O
    makeMove(8); // X
    makeMove(5); // O
    makeMove(6); // X
    makeMove(7); // O  → 平局
    const state = getState();
    expect(state.isDraw).toBe(true);
    expect(state.gameOver).toBe(true);
    expect(state.winner).toBeNull();
  });
});

// ─── initGame() 重置測試 ──────────────────────────────────────────────
describe('initGame() 重置', () => {
  it('遊戲結束後呼叫 initGame()，board 全為 null', () => {
    makeMove(0); // O
    makeMove(3); // X
    makeMove(1); // O
    makeMove(4); // X
    makeMove(2); // O wins
    initGame();
    const state = getState();
    expect(state.board.every(cell => cell === null)).toBe(true);
  });

  it('遊戲結束後呼叫 initGame()，currentPlayer 回到 O', () => {
    makeMove(0); makeMove(3); makeMove(1); makeMove(4); makeMove(2);
    initGame();
    expect(getState().currentPlayer).toBe('O');
  });

  it('遊戲結束後呼叫 initGame()，gameOver 為 false', () => {
    makeMove(0); makeMove(3); makeMove(1); makeMove(4); makeMove(2);
    initGame();
    expect(getState().gameOver).toBe(false);
  });

  it('遊戲結束後呼叫 initGame()，winner 為 null', () => {
    makeMove(0); makeMove(3); makeMove(1); makeMove(4); makeMove(2);
    initGame();
    expect(getState().winner).toBeNull();
  });

  it('遊戲結束後呼叫 initGame()，isDraw 為 false', () => {
    makeMove(0); makeMove(3); makeMove(1); makeMove(4); makeMove(2);
    initGame();
    expect(getState().isDraw).toBe(false);
  });
});
