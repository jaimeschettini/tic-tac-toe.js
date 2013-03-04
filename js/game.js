var Game = function() {
    
    var
        view = new View(),
        player = new Player(),
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
        };

    this.play = function() {
        view.configureListeners(cellClicked);
    };
};