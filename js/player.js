var Player = function() {
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
        ];

    this.sign = function() {
        return player % 2 === 0 ? "X" : "O";
    };

    this.mark = function(position) {
        moves[this.sign()] += position;
    };

    this.next = function() {
        player++;
    };

    this.hasWon = function() {
        for (var i = 0; i < winnerMoves.length; i++) {
            var rightMoves = 0;
            for (var j = 0; j < winnerMoves[i].length; j++) {
                if (moves[this.sign()].indexOf(winnerMoves[i][j]) != -1) {
                    rightMoves++;
                }
            }

            if (rightMoves === 3) {
                return true;
            }
        }

        return false;
    };

    this.resetMoves = function() {
        for(prop in moves) {
            moves[prop] = [];
        }
    };
};