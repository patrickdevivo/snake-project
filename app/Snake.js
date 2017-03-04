/*
	Snake Class
*/

export default class Snake {
	constructor(boardSize, pieceSize) {
		// init some class vars
		this.boardSize = boardSize;
		this.board = [];
		this.direction = 'up';
		this.snake = [];
		this.moveQueue = [];

		// set up the board on the dom
		const board = document.getElementById('board');
		board.style.height = board.style.width = pieceSize * boardSize;

		// set up the pieces on the board
		for (let r = 0; r < boardSize; r++) {

			this.board.push((new Array(boardSize).map(() => 0)));

			for (let c = 0; c < boardSize; c++) {
				const piece = document.createElement('div');
				piece.id = `piece-${c}:${r}`;
				piece.className = "board-piece";
				piece.style.height = piece.style.width = pieceSize;

				board.appendChild(piece)
			}
		}

		// setup the initial grid
		this.generateFood();
		this.initSnake();

		// start listening for key events
		document.onkeydown = (e) => {
			e = e || window.event; // IE compat
			switch(e.keyCode.toString()) {
				case '38': return this.setDirection('up');
				case '40': return this.setDirection('down');
				case '37': return this.setDirection('left');
				case '39': return this.setDirection('right');
			}
		};
	}

	/*
		finds a random empty board piece, used for generating new food and initializing the snake
  */
	getRandomEmptyBoardPiece() {
		const b = this.board;
		const s = this.boardSize;
		const r = Math.floor(Math.random() * s);
		const c = Math.floor(Math.random() * s);
		if (b[r][c]) return this.getRandomEmptyBoardPiece();
		else return {r, c}
	}

	/*
		sets the current direction of the snake
  */
	setDirection(dir) {
		if (this.direction === 'up' && dir === 'down') return;
		if (this.direction === 'down' && dir === 'up') return;
		if (this.direction === 'left' && dir === 'right') return;
		if (this.direction === 'right' && dir === 'left') return;

		this.direction = dir;
	}

	/*
		modifies the grid with a new piece of food
	*/
	generateFood() {
		const {r, c} = this.getRandomEmptyBoardPiece();
		this.board[r][c] = 2;
	}

	/*
		initialize the snake on the grid
	*/
	initSnake() {
		const {r, c} = this.getRandomEmptyBoardPiece();
		this.snake.push({r, c});
	}

	/*
		checks if coordinates are within the bounds of the board, otherwise end the game
	*/
	checkBounds(r, c) {
		if (r > this.boardSize-1 || c > this.boardSize-1 || r < 0 || c < 0) this.gameOver();
	}

	/*
		given a current position and a direction, find the next coordinate
	*/
	nextCoordinates(r, c, direction) {
		this.board[c][r] = 0;
		let newR = r;
		let newC = c;

		switch(direction) {
			case 'up':
				newR -= 1; break;
			case 'down':
				newR += 1; break;
			case 'left':
				newC -= 1; break;
			case 'right':
				newC += 1; break;
		}

		return {newR, newC};
	}

	/*
		move the snake on the grid
	*/
	moveSnake() {
		this.moveQueue.unshift(this.direction);

		for (let i = 0; i < this.snake.length; i++) {
			const {r, c} = this.snake[i];
			const {newR, newC} = this.nextCoordinates(r, c, this.moveQueue[i]);

			this.checkBounds(newR, newC);

			if (this.board[newC][newR] === 2) {
				this.growSnake();
			}

			if (this.board[newC][newR] === 1) {
				this.gameOver();
			}

			this.board[newC][newR] = 1;
			this.snake[i] = {r: newR, c: newC};
		}
	}

	/*
		grow the snake after it's eaten food, generate new food as well
	*/
	growSnake() {
		this.generateFood();
		const lastSnakePiece = this.snake[this.snake.length-1];
		const {r, c} = lastSnakePiece;
		setTimeout(() => this.snake.push({r, c}), 0);
	}

	/*
		run in an interval, make modifications to the grid then render the board
  */
	renderFrame() {
		this.moveSnake();
		this.renderBoard();
	}

	/*
		translate the grid into a board representation in the DOM
	*/
	renderBoard() {
		const boardSize = this.boardSize;
		for (let r = 0; r < boardSize; r++) {
			for (let c = 0; c < boardSize; c++) {
				const piece = this.board[r][c];
				if (piece) this.fillPiece(r, c);
				if (!piece) this.unFillPiece(r, c);
			}
		}
	}

	fillPiece(r, c) {
		const piece = document.getElementById(`piece-${r}:${c}`);
		piece.classList.add('filled');
	}

	unFillPiece(r, c) {
		const piece = document.getElementById(`piece-${r}:${c}`);
		piece.classList.remove('filled');
	}

	start() {
		this.interval = setInterval(() => this.renderFrame.call(this), 100)
	}

	stop() {
		clearInterval(this.interval);
	}

	gameOver() {
		this.stop();
		alert('Game over!');
	}

}