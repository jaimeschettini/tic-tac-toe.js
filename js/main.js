$(document).ready(function() {
	
	var 
		player = (function() {
			var
				player = 1,
				moves = {
					"X" : [],
					"O" : []
				},
				winnerMoves = [
					[1, 2, 3],
					[1, 4, 7],
					[1, 5, 9],
					[2, 5, 8],
					[3, 6, 9],
					[3, 5, 7],
					[4, 5, 6],
					[7, 8, 9]
				],

				actualSign = function() {
					return player % 2 === 0 ? "X" : "O";
				},

				mark = function(position) {
					moves[actualSign()] += position;
				},

				next = function() {
					player++;
				}, 

				hasWon = function() {
					for (var i = 0; i < winnerMoves.length; i++) {
						var rightMoves = 0;
						for (var j = 0; j < winnerMoves[i].length; j++) {
							if (moves[actualSign()].indexOf(winnerMoves[i][j]) != -1) {
								rightMoves++;
							}
						}

						if (rightMoves === 3) {
							return true;
						}
					}

					return false;
				},

				resetMoves = function() {
					for(prop in moves) {
						moves[prop] = [];
					}
				};

			return {
				sign : actualSign,
				mark : mark,
				next : next,
				hasWon : hasWon,
				resetMoves : resetMoves
			};
		}()),

		view = (function() {
			var
				cells = document.getElementsByClassName("board")[0].children,

				configureListeners = function(listener) {
					for (var i = 0; i < cells.length; i++) {
						cells[i].addEventListener("click", listener(cells[i], i));
					}
				},

				markCell = function(cell, text) {
					cell.textContent = text;
					addClass(cell, text);
				},

				addClass = function(cell, className) {
					cell.className += " " + className;
				},

				clearBoard = function() {
					for (var i = 0; i < cells.length; i++) {
						cells[i].textContent = "";
						cells[i].className = cells[i].className.replace(/(?:^|\s)[XO](?!\S)/g , '');
					}
				};

			return {
				configureListeners : configureListeners,
				markCell : markCell,
				clearBoard : clearBoard
			}
		}()),

		game = (function() {
			var
				moves = 0,

				finished = function() {
					return player.hasWon() || moves === 9;
				},

				tellWhoHasWon = function() {
					if (player.hasWon()) {
						alert("O jogador '" + player.sign() + "' venceu!");
					} else {
						alert("O jogo terminou empatado.");
					}

				},

				cellClicked = function(cell, index) {
					return function() {
						if (cell.textContent != "") return;

						view.markCell(cell, player.sign());

						moves++;
						player.mark(index + 1);
						if (finished()) {
							tellWhoHasWon();
							view.clearBoard();
							player.resetMoves();
							moves = 0;
						}
						player.next();
					}
				},

				play = function() {
					view.configureListeners(cellClicked);
				};

			return {
				play : play
			}
		}());

	game.play();
});