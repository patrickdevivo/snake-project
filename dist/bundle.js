/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snake__ = __webpack_require__(4);\n\n\nlet snake = new __WEBPACK_IMPORTED_MODULE_0__Snake__[\"a\" /* default */](100, 8);\n\nsnake.start();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9pbmRleC5qcz9kYWRjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTbmFrZSBmcm9tICcuL1NuYWtlJztcblxubGV0IHNuYWtlID0gbmV3IFNuYWtlKDEwMCwgOCk7XG5cbnNuYWtlLnN0YXJ0KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\n\tSnake Class\n*/\n\nclass Snake {\n\tconstructor(boardSize, pieceSize) {\n\t\t// init some class vars\n\t\tthis.boardSize = boardSize;\n\t\tthis.board = [];\n\t\tthis.direction = 'up';\n\t\tthis.snake = [];\n\t\tthis.moveQueue = [];\n\n\t\t// set up the board on the dom\n\t\tconst board = document.getElementById('board');\n\t\tboard.style.height = board.style.width = pieceSize * boardSize;\n\n\t\t// set up the pieces on the board\n\t\tfor (let r = 0; r < boardSize; r++) {\n\n\t\t\tthis.board.push((new Array(boardSize).map(() => 0)));\n\n\t\t\tfor (let c = 0; c < boardSize; c++) {\n\t\t\t\tconst piece = document.createElement('div');\n\t\t\t\tpiece.id = `piece-${c}:${r}`;\n\t\t\t\tpiece.className = \"board-piece\";\n\t\t\t\tpiece.style.height = piece.style.width = pieceSize;\n\n\t\t\t\tboard.appendChild(piece)\n\t\t\t}\n\t\t}\n\n\t\t// setup the initial grid\n\t\tthis.generateFood();\n\t\tthis.initSnake();\n\n\t\t// start listening for key events\n\t\tdocument.onkeydown = (e) => {\n\t\t\te = e || window.event; // IE compat\n\t\t\tswitch(e.keyCode.toString()) {\n\t\t\t\tcase '38': return this.setDirection('up');\n\t\t\t\tcase '40': return this.setDirection('down');\n\t\t\t\tcase '37': return this.setDirection('left');\n\t\t\t\tcase '39': return this.setDirection('right');\n\t\t\t}\n\t\t};\n\t}\n\n\t/*\n\t\tfinds a random empty board piece, used for generating new food and initializing the snake\n  */\n\tgetRandomEmptyBoardPiece() {\n\t\tconst b = this.board;\n\t\tconst s = this.boardSize;\n\t\tconst r = Math.floor(Math.random() * s);\n\t\tconst c = Math.floor(Math.random() * s);\n\t\tif (b[r][c]) return this.getRandomEmptyBoardPiece();\n\t\telse return {r, c}\n\t}\n\n\t/*\n\t\tsets the current direction of the snake\n  */\n\tsetDirection(dir) {\n\t\tif (this.direction === 'up' && dir === 'down') return;\n\t\tif (this.direction === 'down' && dir === 'up') return;\n\t\tif (this.direction === 'left' && dir === 'right') return;\n\t\tif (this.direction === 'right' && dir === 'left') return;\n\n\t\tthis.direction = dir;\n\t}\n\n\t/*\n\t\tmodifies the grid with a new piece of food\n\t*/\n\tgenerateFood() {\n\t\tconst {r, c} = this.getRandomEmptyBoardPiece();\n\t\tthis.board[r][c] = 2;\n\t}\n\n\t/*\n\t\tinitialize the snake on the grid\n\t*/\n\tinitSnake() {\n\t\tconst {r, c} = this.getRandomEmptyBoardPiece();\n\t\tthis.snake.push({r, c});\n\t}\n\n\t/*\n\t\tchecks if coordinates are within the bounds of the board, otherwise end the game\n\t*/\n\tcheckBounds(r, c) {\n\t\tif (r > this.boardSize-1 || c > this.boardSize-1 || r < 0 || c < 0) this.gameOver();\n\t}\n\n\t/*\n\t\tgiven a current position and a direction, find the next coordinate\n\t*/\n\tnextCoordinates(r, c, direction) {\n\t\tthis.board[c][r] = 0;\n\t\tlet newR = r;\n\t\tlet newC = c;\n\n\t\tswitch(direction) {\n\t\t\tcase 'up':\n\t\t\t\tnewR -= 1; break;\n\t\t\tcase 'down':\n\t\t\t\tnewR += 1; break;\n\t\t\tcase 'left':\n\t\t\t\tnewC -= 1; break;\n\t\t\tcase 'right':\n\t\t\t\tnewC += 1; break;\n\t\t}\n\n\t\treturn {newR, newC};\n\t}\n\n\t/*\n\t\tmove the snake on the grid\n\t*/\n\tmoveSnake() {\n\t\tthis.moveQueue.unshift(this.direction);\n\n\t\tfor (let i = 0; i < this.snake.length; i++) {\n\t\t\tconst {r, c} = this.snake[i];\n\t\t\tconst {newR, newC} = this.nextCoordinates(r, c, this.moveQueue[i]);\n\n\t\t\tthis.checkBounds(newR, newC);\n\n\t\t\tif (this.board[newC][newR] === 2) {\n\t\t\t\tthis.growSnake();\n\t\t\t}\n\n\t\t\tif (this.board[newC][newR] === 1) {\n\t\t\t\tthis.gameOver();\n\t\t\t}\n\n\t\t\tthis.board[newC][newR] = 1;\n\t\t\tthis.snake[i] = {r: newR, c: newC};\n\t\t}\n\t}\n\n\t/*\n\t\tgrow the snake after it's eaten food, generate new food as well\n\t*/\n\tgrowSnake() {\n\t\tthis.generateFood();\n\t\tconst lastSnakePiece = this.snake[this.snake.length-1];\n\t\tconst {r, c} = lastSnakePiece;\n\t\tsetTimeout(() => this.snake.push({r, c}), 0);\n\t}\n\n\t/*\n\t\trun in an interval, make modifications to the grid then render the board\n  */\n\trenderFrame() {\n\t\tthis.moveSnake();\n\t\tthis.renderBoard();\n\t}\n\n\t/*\n\t\ttranslate the grid into a board representation in the DOM\n\t*/\n\trenderBoard() {\n\t\tconst boardSize = this.boardSize;\n\t\tfor (let r = 0; r < boardSize; r++) {\n\t\t\tfor (let c = 0; c < boardSize; c++) {\n\t\t\t\tconst piece = this.board[r][c];\n\t\t\t\tif (piece) this.fillPiece(r, c);\n\t\t\t\tif (!piece) this.unFillPiece(r, c);\n\t\t\t}\n\t\t}\n\t}\n\n\tfillPiece(r, c) {\n\t\tconst piece = document.getElementById(`piece-${r}:${c}`);\n\t\tpiece.classList.add('filled');\n\t}\n\n\tunFillPiece(r, c) {\n\t\tconst piece = document.getElementById(`piece-${r}:${c}`);\n\t\tpiece.classList.remove('filled');\n\t}\n\n\tstart() {\n\t\tthis.interval = setInterval(() => this.renderFrame.call(this), 100)\n\t}\n\n\tstop() {\n\t\tclearInterval(this.interval);\n\t}\n\n\tgameOver() {\n\t\tthis.stop();\n\t\talert('Game over!');\n\t}\n\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Snake;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9TbmFrZS5qcz8wNGViIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdFNuYWtlIENsYXNzXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZSB7XG5cdGNvbnN0cnVjdG9yKGJvYXJkU2l6ZSwgcGllY2VTaXplKSB7XG5cdFx0Ly8gaW5pdCBzb21lIGNsYXNzIHZhcnNcblx0XHR0aGlzLmJvYXJkU2l6ZSA9IGJvYXJkU2l6ZTtcblx0XHR0aGlzLmJvYXJkID0gW107XG5cdFx0dGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuXHRcdHRoaXMuc25ha2UgPSBbXTtcblx0XHR0aGlzLm1vdmVRdWV1ZSA9IFtdO1xuXG5cdFx0Ly8gc2V0IHVwIHRoZSBib2FyZCBvbiB0aGUgZG9tXG5cdFx0Y29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcblx0XHRib2FyZC5zdHlsZS5oZWlnaHQgPSBib2FyZC5zdHlsZS53aWR0aCA9IHBpZWNlU2l6ZSAqIGJvYXJkU2l6ZTtcblxuXHRcdC8vIHNldCB1cCB0aGUgcGllY2VzIG9uIHRoZSBib2FyZFxuXHRcdGZvciAobGV0IHIgPSAwOyByIDwgYm9hcmRTaXplOyByKyspIHtcblxuXHRcdFx0dGhpcy5ib2FyZC5wdXNoKChuZXcgQXJyYXkoYm9hcmRTaXplKS5tYXAoKCkgPT4gMCkpKTtcblxuXHRcdFx0Zm9yIChsZXQgYyA9IDA7IGMgPCBib2FyZFNpemU7IGMrKykge1xuXHRcdFx0XHRjb25zdCBwaWVjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRwaWVjZS5pZCA9IGBwaWVjZS0ke2N9OiR7cn1gO1xuXHRcdFx0XHRwaWVjZS5jbGFzc05hbWUgPSBcImJvYXJkLXBpZWNlXCI7XG5cdFx0XHRcdHBpZWNlLnN0eWxlLmhlaWdodCA9IHBpZWNlLnN0eWxlLndpZHRoID0gcGllY2VTaXplO1xuXG5cdFx0XHRcdGJvYXJkLmFwcGVuZENoaWxkKHBpZWNlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHNldHVwIHRoZSBpbml0aWFsIGdyaWRcblx0XHR0aGlzLmdlbmVyYXRlRm9vZCgpO1xuXHRcdHRoaXMuaW5pdFNuYWtlKCk7XG5cblx0XHQvLyBzdGFydCBsaXN0ZW5pbmcgZm9yIGtleSBldmVudHNcblx0XHRkb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuXHRcdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50OyAvLyBJRSBjb21wYXRcblx0XHRcdHN3aXRjaChlLmtleUNvZGUudG9TdHJpbmcoKSkge1xuXHRcdFx0XHRjYXNlICczOCc6IHJldHVybiB0aGlzLnNldERpcmVjdGlvbigndXAnKTtcblx0XHRcdFx0Y2FzZSAnNDAnOiByZXR1cm4gdGhpcy5zZXREaXJlY3Rpb24oJ2Rvd24nKTtcblx0XHRcdFx0Y2FzZSAnMzcnOiByZXR1cm4gdGhpcy5zZXREaXJlY3Rpb24oJ2xlZnQnKTtcblx0XHRcdFx0Y2FzZSAnMzknOiByZXR1cm4gdGhpcy5zZXREaXJlY3Rpb24oJ3JpZ2h0Jyk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8qXG5cdFx0ZmluZHMgYSByYW5kb20gZW1wdHkgYm9hcmQgcGllY2UsIHVzZWQgZm9yIGdlbmVyYXRpbmcgbmV3IGZvb2QgYW5kIGluaXRpYWxpemluZyB0aGUgc25ha2VcbiAgKi9cblx0Z2V0UmFuZG9tRW1wdHlCb2FyZFBpZWNlKCkge1xuXHRcdGNvbnN0IGIgPSB0aGlzLmJvYXJkO1xuXHRcdGNvbnN0IHMgPSB0aGlzLmJvYXJkU2l6ZTtcblx0XHRjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcyk7XG5cdFx0Y29uc3QgYyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHMpO1xuXHRcdGlmIChiW3JdW2NdKSByZXR1cm4gdGhpcy5nZXRSYW5kb21FbXB0eUJvYXJkUGllY2UoKTtcblx0XHRlbHNlIHJldHVybiB7ciwgY31cblx0fVxuXG5cdC8qXG5cdFx0c2V0cyB0aGUgY3VycmVudCBkaXJlY3Rpb24gb2YgdGhlIHNuYWtlXG4gICovXG5cdHNldERpcmVjdGlvbihkaXIpIHtcblx0XHRpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd1cCcgJiYgZGlyID09PSAnZG93bicpIHJldHVybjtcblx0XHRpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdkb3duJyAmJiBkaXIgPT09ICd1cCcpIHJldHVybjtcblx0XHRpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBkaXIgPT09ICdyaWdodCcpIHJldHVybjtcblx0XHRpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgZGlyID09PSAnbGVmdCcpIHJldHVybjtcblxuXHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyO1xuXHR9XG5cblx0Lypcblx0XHRtb2RpZmllcyB0aGUgZ3JpZCB3aXRoIGEgbmV3IHBpZWNlIG9mIGZvb2Rcblx0Ki9cblx0Z2VuZXJhdGVGb29kKCkge1xuXHRcdGNvbnN0IHtyLCBjfSA9IHRoaXMuZ2V0UmFuZG9tRW1wdHlCb2FyZFBpZWNlKCk7XG5cdFx0dGhpcy5ib2FyZFtyXVtjXSA9IDI7XG5cdH1cblxuXHQvKlxuXHRcdGluaXRpYWxpemUgdGhlIHNuYWtlIG9uIHRoZSBncmlkXG5cdCovXG5cdGluaXRTbmFrZSgpIHtcblx0XHRjb25zdCB7ciwgY30gPSB0aGlzLmdldFJhbmRvbUVtcHR5Qm9hcmRQaWVjZSgpO1xuXHRcdHRoaXMuc25ha2UucHVzaCh7ciwgY30pO1xuXHR9XG5cblx0Lypcblx0XHRjaGVja3MgaWYgY29vcmRpbmF0ZXMgYXJlIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBib2FyZCwgb3RoZXJ3aXNlIGVuZCB0aGUgZ2FtZVxuXHQqL1xuXHRjaGVja0JvdW5kcyhyLCBjKSB7XG5cdFx0aWYgKHIgPiB0aGlzLmJvYXJkU2l6ZS0xIHx8IGMgPiB0aGlzLmJvYXJkU2l6ZS0xIHx8IHIgPCAwIHx8IGMgPCAwKSB0aGlzLmdhbWVPdmVyKCk7XG5cdH1cblxuXHQvKlxuXHRcdGdpdmVuIGEgY3VycmVudCBwb3NpdGlvbiBhbmQgYSBkaXJlY3Rpb24sIGZpbmQgdGhlIG5leHQgY29vcmRpbmF0ZVxuXHQqL1xuXHRuZXh0Q29vcmRpbmF0ZXMociwgYywgZGlyZWN0aW9uKSB7XG5cdFx0dGhpcy5ib2FyZFtjXVtyXSA9IDA7XG5cdFx0bGV0IG5ld1IgPSByO1xuXHRcdGxldCBuZXdDID0gYztcblxuXHRcdHN3aXRjaChkaXJlY3Rpb24pIHtcblx0XHRcdGNhc2UgJ3VwJzpcblx0XHRcdFx0bmV3UiAtPSAxOyBicmVhaztcblx0XHRcdGNhc2UgJ2Rvd24nOlxuXHRcdFx0XHRuZXdSICs9IDE7IGJyZWFrO1xuXHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdG5ld0MgLT0gMTsgYnJlYWs7XG5cdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdG5ld0MgKz0gMTsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtuZXdSLCBuZXdDfTtcblx0fVxuXG5cdC8qXG5cdFx0bW92ZSB0aGUgc25ha2Ugb24gdGhlIGdyaWRcblx0Ki9cblx0bW92ZVNuYWtlKCkge1xuXHRcdHRoaXMubW92ZVF1ZXVlLnVuc2hpZnQodGhpcy5kaXJlY3Rpb24pO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCB7ciwgY30gPSB0aGlzLnNuYWtlW2ldO1xuXHRcdFx0Y29uc3Qge25ld1IsIG5ld0N9ID0gdGhpcy5uZXh0Q29vcmRpbmF0ZXMociwgYywgdGhpcy5tb3ZlUXVldWVbaV0pO1xuXG5cdFx0XHR0aGlzLmNoZWNrQm91bmRzKG5ld1IsIG5ld0MpO1xuXG5cdFx0XHRpZiAodGhpcy5ib2FyZFtuZXdDXVtuZXdSXSA9PT0gMikge1xuXHRcdFx0XHR0aGlzLmdyb3dTbmFrZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5ib2FyZFtuZXdDXVtuZXdSXSA9PT0gMSkge1xuXHRcdFx0XHR0aGlzLmdhbWVPdmVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYm9hcmRbbmV3Q11bbmV3Ul0gPSAxO1xuXHRcdFx0dGhpcy5zbmFrZVtpXSA9IHtyOiBuZXdSLCBjOiBuZXdDfTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGdyb3cgdGhlIHNuYWtlIGFmdGVyIGl0J3MgZWF0ZW4gZm9vZCwgZ2VuZXJhdGUgbmV3IGZvb2QgYXMgd2VsbFxuXHQqL1xuXHRncm93U25ha2UoKSB7XG5cdFx0dGhpcy5nZW5lcmF0ZUZvb2QoKTtcblx0XHRjb25zdCBsYXN0U25ha2VQaWVjZSA9IHRoaXMuc25ha2VbdGhpcy5zbmFrZS5sZW5ndGgtMV07XG5cdFx0Y29uc3Qge3IsIGN9ID0gbGFzdFNuYWtlUGllY2U7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB0aGlzLnNuYWtlLnB1c2goe3IsIGN9KSwgMCk7XG5cdH1cblxuXHQvKlxuXHRcdHJ1biBpbiBhbiBpbnRlcnZhbCwgbWFrZSBtb2RpZmljYXRpb25zIHRvIHRoZSBncmlkIHRoZW4gcmVuZGVyIHRoZSBib2FyZFxuICAqL1xuXHRyZW5kZXJGcmFtZSgpIHtcblx0XHR0aGlzLm1vdmVTbmFrZSgpO1xuXHRcdHRoaXMucmVuZGVyQm9hcmQoKTtcblx0fVxuXG5cdC8qXG5cdFx0dHJhbnNsYXRlIHRoZSBncmlkIGludG8gYSBib2FyZCByZXByZXNlbnRhdGlvbiBpbiB0aGUgRE9NXG5cdCovXG5cdHJlbmRlckJvYXJkKCkge1xuXHRcdGNvbnN0IGJvYXJkU2l6ZSA9IHRoaXMuYm9hcmRTaXplO1xuXHRcdGZvciAobGV0IHIgPSAwOyByIDwgYm9hcmRTaXplOyByKyspIHtcblx0XHRcdGZvciAobGV0IGMgPSAwOyBjIDwgYm9hcmRTaXplOyBjKyspIHtcblx0XHRcdFx0Y29uc3QgcGllY2UgPSB0aGlzLmJvYXJkW3JdW2NdO1xuXHRcdFx0XHRpZiAocGllY2UpIHRoaXMuZmlsbFBpZWNlKHIsIGMpO1xuXHRcdFx0XHRpZiAoIXBpZWNlKSB0aGlzLnVuRmlsbFBpZWNlKHIsIGMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZpbGxQaWVjZShyLCBjKSB7XG5cdFx0Y29uc3QgcGllY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGllY2UtJHtyfToke2N9YCk7XG5cdFx0cGllY2UuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG5cdH1cblxuXHR1bkZpbGxQaWVjZShyLCBjKSB7XG5cdFx0Y29uc3QgcGllY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGllY2UtJHtyfToke2N9YCk7XG5cdFx0cGllY2UuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHR0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5yZW5kZXJGcmFtZS5jYWxsKHRoaXMpLCAxMDApXG5cdH1cblxuXHRzdG9wKCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG5cdH1cblxuXHRnYW1lT3ZlcigpIHtcblx0XHR0aGlzLnN0b3AoKTtcblx0XHRhbGVydCgnR2FtZSBvdmVyIScpO1xuXHR9XG5cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9TbmFrZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);