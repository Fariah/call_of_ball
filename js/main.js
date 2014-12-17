
/*
 * Класс пешки, принимает 3 параметра
 * 
 * old_pos - string, координаты стартовой позиции фигуры, например "a2"
 * new_pos - string, координаты конечной позиции фигуры, например "a4" 
 * 
 */

var pl_1, pl_2;

function getCord(str) {
    var x = Number(str.replace("px",""));
    return parseInt(x);
}

function checkPlayersBall(top, left, pixel) {

    var pl_1_t = getCord(pl_1.style.top);

    var pl_2_t = getCord(pl_2.style.top);

    var result = false;

    if(left < 65 && (top+10 > pl_1_t) && (top+10 < pl_1_t + 58)) {
        result = pixel;
    }
    if(left > 820 && (top+10 > pl_2_t) && (top+10 < pl_2_t + 58)) {
        result = -pixel;
    }
    return result;
}

var playerClass = function(objects) {

    var move_step = 4;
    pl_1 = objects.one;
    pl_2 = objects.two;

    objects.one.style.top = "105px";
    objects.two.style.top = "200px";

    var up_border   = 0;
    var down_border = 339;

    var playerUp_flag, playerDown_flag, playerW_flag, playerS_flag = true;

    var PlayerUp, PlayerDown, PlayerW, PlayerS;
    //var playerDown_flag = true;

    function check_blockUp(block) {
        if(block > up_border){
            return true;
        } else {
            return false;
        }
    }
    function check_blockDown(block) {
        if(block < down_border){
            return true;
        } else {
            return false;
        }
    }


    function movePlayerUp() {
        var curent_top = getCord(objects.two.style.top);
        if(check_blockUp(curent_top)) {
            objects.two.style.top = (curent_top - move_step) + "px";
        }
        if(getCord(objects.two.style.top) < up_border){
            objects.two.style.top = up_border + "px";
        }

        PlayerUp = setTimeout(movePlayerUp, 10); // call moveRight in 20msec
    }
    function stopMovePlayerUp() {
        clearTimeout(PlayerUp);
    }
    function movePlayerDown() {
        var curent_top = getCord(objects.two.style.top);
        if(check_blockDown(curent_top)) {
            objects.two.style.top = (curent_top + move_step) + "px";
        }
        if(getCord(objects.two.style.top) > down_border){
            objects.two.style.top = down_border + "px";
        }
        PlayerDown = setTimeout(movePlayerDown, 10); // call moveRight in 20msec
    }
    function stopMovePlayerDown() {
        clearTimeout(PlayerDown);
    }


    function movePlayerW() {
        var curent_top = getCord(objects.one.style.top);
        if(check_blockUp(curent_top)) {
            objects.one.style.top = (curent_top - move_step) + "px";
        }
        if(getCord(objects.one.style.top) > down_border){
            objects.one.style.top = down_border + "px";
        }
        PlayerW = setTimeout(movePlayerW, 10); // call moveRight in 20msec
    }
    function stopMovePlayerW() {
        clearTimeout(PlayerW);
    }
    function movePlayerS() {
        var curent_top = getCord(objects.one.style.top);
        if(check_blockDown(curent_top)) {
            objects.one.style.top = (curent_top + move_step) + "px";
        }
        if(getCord(objects.one.style.top) > down_border){
            objects.one.style.top = down_border + "px";
        }
        PlayerS = setTimeout(movePlayerS, 10); // call moveRight in 20msec
    }
    function stopMovePlayerS() {
        clearTimeout(PlayerS);
    }

    return {
        init: function() {
            $(document).keydown(function( event ) {
                if(event.key == 'w' && playerW_flag) {
                    playerW_flag = false;
                    movePlayerW();
                }
                if(event.key == 's' && playerS_flag) {
                    playerS_flag = false;
                    movePlayerS();
                }
                if(event.key == 'Up' && playerUp_flag) {
                    playerUp_flag = false;
                    movePlayerUp();
                }
                if(event.key == 'Down' && playerDown_flag) {
                    playerDown_flag = false;
                    movePlayerDown();
                }
            });
            $(document).keyup(function( event ) {
                if(event.key == 'w') {
                    playerW_flag = true;
                    stopMovePlayerW();
                }
                if(event.key == 's') {
                    playerS_flag = true;
                    stopMovePlayerS();
                }
                if(event.key == 'Up') {
                    playerUp_flag = true;
                    stopMovePlayerUp();
                }
                if(event.key == 'Down') {
                    playerDown_flag = true;
                    stopMovePlayerDown();
                }
            });
        }
    }
}
var ballClass = function(object) {

    var ball = object;

    var top, left, pixel = 2, pixel_top = 2, pixel_left = 2, speed = 1;

    ball.style.top = "100px";
    ball.style.left = "400px";

    function setMove() {
        top = getCord(ball.style.top);
        left = getCord(ball.style.left);

        var data = getDirectionData(top, left);

        ball.style.top = data.top + "px";
        ball.style.left = data.left + "px";

        animate = setTimeout(setMove, speed); // call moveRight in 20msec
    }
    function setStop() {
        clearTimeout(animate);
    }

    function getDirectionData(top, left) {

        if(top < 0) {
            pixel_top = pixel;
        } else if(top > 377) {
            pixel_top = -pixel;
        }

        if(left < 0) {
            pixel_left = pixel;
        } else if(left > 877) {
            pixel_left = -pixel;
        }
        var check = checkPlayersBall(top, left, pixel);

        if(check !== false) {
            pixel_left = check;
        }

        return {top: top + pixel_top, left: left + pixel_left};
    }

    return {
        move: function(spd) {
            if (spd) {
                speed = parseInt(spd);
            }
            setMove();
        },
        stop: function() {
            setStop();
        }
    }
}