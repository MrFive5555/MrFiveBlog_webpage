window.onload = function () {
    var gameState = "waiting";
    var noCheat = false;

    document.getElementById("maze_container").onmouseover = function () {
        var result = document.getElementById("result");
        if (event.target.id == "gameBegin") {
            gameState = "begin";
            noCheat = false;
            result.className = "cantSee";
        } else if (event.target.id == "gameEnd" && gameState == "begin") {
            gameState = "waiting";
            if (noCheat) {
                result.innerHTML = "Your Win";
            } else {
                result.innerHTML = "Don't cheat, you should start from the 's' and move to the 'E' inside the maze!";
            }
            result.className = "canSee";
        } else if (event.target.id == "maze_5") {
            noCheat = true;
        } else if (gameState == "begin" && event.target.className == "wall") {
            event.target.className = "wallWarning";
            gameState = "waiting";
            result.innerHTML = "Your Lose";
            result.className = "canSee";
        }
    }

    document.getElementById("maze_container").onmouseout = function () {
        var red_wall = document.getElementsByClassName("wallWarning")[0];
        if (red_wall != undefined) {
            red_wall.className = "wall";
        }
    }
}