window.onload = function () {
    var map = [];
    var stepStack = [];

    var tool = {
        getPosition: function (id) {
            var id_i = parseInt(id[id.length - 2]);
            var id_j = parseInt(id[id.length - 1]);
            for (var i = 0; i != 4; ++i) {
                for (var j = 0; j != 4; ++j) {
                    if (map[i][j][0] == id_i && map[i][j][1] == id_j) {
                        return [i, j];
                    }
                }
            }
        },
        getMovePosition: function (id) {
            var nowPos = tool.getPosition(id);
            var i = nowPos[0];
            var j = nowPos[1];
            var empty = [3, 3];
            if (tool.isEmpty(i + 1, j)) {
                return [i + 1, j];
            }
            if (tool.isEmpty(i - 1, j)) {
                return [i - 1, j];
            }
            if (tool.isEmpty(i, j + 1)) {
                return [i, j + 1];
            }
            if (tool.isEmpty(i, j - 1)) {
                return [i, j - 1];
            }
        },
        isEmpty: function (i, j) {
            if (i < 0 || i >= 4 || j < 0 || j >= 4) {
                return false;
            }
            return map[i][j][0] == 3 && map[i][j][1] == 3;
        },
        move: function (id) {
            var toPos = tool.getMovePosition(id);
            if (toPos == undefined) {
                return false;
            }
            var to_i = toPos[0];
            var to_j = toPos[1];

            var nowPos = tool.getPosition(id);
            var now_i = nowPos[0];
            var now_j = nowPos[1];

            var id_i = parseInt(id[id.length - 2]);
            var id_j = parseInt(id[id.length - 1]);
            $("#" + id).css({ top: 100 * to_i, left: 100 * to_j });
            map[to_i][to_j] = [id_i, id_j];
            map[now_i][now_j] = [3, 3];

            return true;
        },
        isWin: function () {
            for (var i = 0; i != 4; ++i) {
                for (var j = 0; j != 4; ++j) {
                    if (map[i][j][0] != i || map[i][j][1] != j) {
                        return;
                    }
                }
            }
            setTimeout(function () {
                alert("成功");
            }, 200);
        },
        random: function () {
            init();
            var emptyPos = [3, 3];
            var dir = [0, -1, 0, 1];
            var last = [3, 3];
            var time = 200;
            while (time != 0 || !(emptyPos[0] == 3 && emptyPos[1] == 3)) {
                var dir_i = Math.ceil(Math.random() * 1000) % 4;
                var dir_j = (dir_i + 1) % 4;
                var newPos = [emptyPos[0] + dir[dir_i], emptyPos[1] + dir[dir_j]];
                while (newPos[0] < 0 || newPos[0] >= 4
                    || newPos[1] < 0 || newPos[1] >= 4
                    || (newPos[0] == last[0] && newPos[1] == last[1])) {
                    dir_j = dir_i;
                    dir_i = (dir_i + 1) % 4;
                    newPos = [emptyPos[0] + dir[dir_i], emptyPos[1] + dir[dir_j]];
                }
                last = emptyPos;
                emptyPos = newPos;
                var movingBlock = map[newPos[0]][newPos[1]];
                tool.move("block" + movingBlock[0] + movingBlock[1]);
                stepStack.push([movingBlock[0], movingBlock[1]]);

                if (time != 0) {
                    --time;
                }
            }
        },
        autoFinish: function () {
            var count = 0;
            
            var func = function () {
                var i = stepStack.length - 1;
                return function () {
                    var id_i = stepStack[i][0];
                    var id_j = stepStack[i][1];
                    tool.move("block" + id_i + id_j);
                    stepStack.pop();
                    --i;
                }
            }();
            var times = stepStack.length;
            while (times--) {
                setTimeout(func, 25 * (count++));
            }
        }
    };

    var init = function () {
        map = [];
        stepStack = [];
        $(".block").remove();
        for (var i = 0; i != 4; ++i) {
            map.push([]);
            for (var j = 0; j != 4; ++j) {
                var puzzleBlock = $("<li></li>")
                puzzleBlock.addClass("block");
                puzzleBlock.attr("id", "block" + i + j);
                map[i][j] = [i, j];
                if (i == 3 && j == 3) {
                    continue;
                }
                puzzleBlock.css("background-position", "" + -j * 100 + "px " + -i * 100 + "px");
                puzzleBlock.css("top", "" + i * 100 + "px");
                puzzleBlock.css("left", "" + j * 100 + "px")
                $("#puzzle").append(puzzleBlock);
            }
        }

        $(".block").click(function () {
            var id = $(this).attr("id");
            var id_i = id[id.length - 2];
            var id_j = id[id.length - 1];
            if (tool.move(id)) {
                stepStack.push([id_i, id_j]);
                tool.isWin();
            }
        })
    }
    init();

    $("#restart").click(init);

    $("#random").click(tool.random);

    $("#autoFinish").click(tool.autoFinish);
}