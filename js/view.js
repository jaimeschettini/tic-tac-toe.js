var View = function() {
    var
        cells = document.getElementsByClassName("board")[0].children,

        addClass = function(cell, className) {
            cell.className += " " + className;
        };

    this.configureListeners = function(listener) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener("click", listener(cells[i], i));
        }
    };

    this.markCell = function(cell, text) {
        cell.textContent = text;
        addClass(cell, text);
    };

    this.clearBoard = function() {
        for (var i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
            cells[i].className = cells[i].className.replace(/(?:^|\s)[XO](?!\S)/g , '');
        }
    };
};