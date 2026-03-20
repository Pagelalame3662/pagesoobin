// game.js — 圈圈叉叉遊戲邏輯模組

export const WIN_LINES = [
  [0, 1, 2], // 第一橫列
  [3, 4, 5], // 第二橫列
  [6, 7, 8], // 第三橫列
  [0, 3, 6], // 第一縱行
  [1, 4, 7], // 第二縱行
  [2, 5, 8], // 第三縱行
  [0, 4, 8], // 左上至右下對角線
  [2, 4, 6], // 右上至左下對角線
];

let state = {
  board: Array(9).fill(null),
  currentPlayer: 'O',
  winner: null,
  isDraw: false,
  gameOver: false,
  winLine: null,
};

export function initGame() {
  state = {
    board: Array(9).fill(null),
    currentPlayer: 'O',
    winner: null,
    isDraw: false,
    gameOver: false,
    winLine: null,
  };
}

export function getState() {
  return {
    board: [...state.board],
    currentPlayer: state.currentPlayer,
    winner: state.winner,
    isDraw: state.isDraw,
    gameOver: state.gameOver,
    winLine: state.winLine ? [...state.winLine] : null,
  };
}

export function checkWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function checkDraw(board) {
  return board.every(cell => cell !== null) && checkWinner(board) === null;
}

export function makeMove(index) {
  if (state.gameOver) return getState();
  if (state.board[index] !== null) return getState();

  state.board[index] = state.currentPlayer;

  const winner = checkWinner(state.board);
  if (winner !== null) {
    state.winner = winner;
    state.gameOver = true;
    state.winLine = WIN_LINES.find(([a, b, c]) =>
      state.board[a] === winner && state.board[b] === winner && state.board[c] === winner
    );
    return getState();
  }

  if (checkDraw(state.board)) {
    state.isDraw = true;
    state.gameOver = true;
    return getState();
  }

  state.currentPlayer = state.currentPlayer === 'O' ? 'X' : 'O';
  return getState();
}
