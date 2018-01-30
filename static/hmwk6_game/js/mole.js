function some() {
    var mole = document.createElement("div");
    mole.className = "mole";
    document.getElementsByClassName("Hole")[10].appendChild(mole);
}

function del() {
    var ele = document.getElementsByClassName("Hole")[10];
    ele.removeChild(ele.firstChild);
}

var timer = function () {
    var time = 0;
    this.setTime = function (orgTime) {
        time = orgTime;
    }
    this.leave = function () {
        return time;
    }
    this.reduce = function () {
        --time;
    }
}

window.onload = function () {
    var gameState = "waiting";
    var gameTime = 30;
    var score = 0;
    var time = new timer();
    var intervalId = null;
    var holeSet = document.getElementsByClassName("hole");
    var molePos = 0;

    var countBack = function () {
        time.reduce();
        document.getElementById("timeBar").innerHTML = time.leave();
        if (time.leave() == 0) {
            endGame();
        }
    }

    var newMole = function () {
        molePos = Math.floor(Math.random() * holeSet.length);
        while (molePos == holeSet.length) {
            molePos = Math.floor(Math.random() * holeSet.length);
        }
        var NewMole = document.createElement("div");
        NewMole.className = "mole";
        holeSet[molePos].appendChild(NewMole);
    }
    var removeMole = function () {
        var moleHole = holeSet[molePos];
        moleHole.removeChild(moleHole.firstChild);
    }

    var beginGame = function () {
        gameState = "begin";
        score = 0;
        document.getElementById("scoreBar").innerHTML = score;
        document.getElementById("state").innerHTML = "Playing";
        newMole();
        time.setTime(gameTime);
        intervalId = setInterval(countBack, 1000);
    }
    var endGame = function () {
        removeMole();
        gameState = "waiting";
        alert("Game Over\n" + "Your Score : " + score);
        clearInterval(intervalId);
        document.getElementById("state").innerHTML = "Game Over";
    }

    var addScore = function (scorePerMole) {
        score += scorePerMole;
        document.getElementById("scoreBar").innerHTML = score;
    }
    document.getElementById("startButton").onclick = function () {
        if (gameState == "waiting") {
            beginGame();
        } else {
            endGame();
        }
    }
    document.getElementById("moleMap").onclick = function () {
        if (gameState == "waiting") {
            return;
        }
        if (event.target.className == "mole" || event.target === holeSet[molePos]) {
            removeMole();
            addScore(1);
            newMole();
        } else if (event.target.className == "hole") {
            addScore(-1);
            if (score < 0) {
                endGame();
            }
        }

    }
}
