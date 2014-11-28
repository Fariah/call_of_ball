
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

function checkPlayersBall(ball) {
    //console.log(ball.style.top);
    //console.log(pl_1);
    //console.log(pl_2);
    var l = getCord(ball.style.left);
    var t = getCord(ball.style.top);
    var pl_1_t = getCord(pl_1.style.top);
    //var pl_1_l = getCord(pl_1.style.left);
    var pl_2_t = getCord(pl_2.style.top);
    //var pl_2_l = getCord(pl_2.style.left);
    if(66 > l > 64) {
        console.log('contact 1');
        if((pl_1_t-5)+60 > t && t > (pl_1_t-5)) {
            console.log('contact 2');
        }
    }
    if(816 > l > 814) {
        console.log('contact 3');
        if((pl_2_l-5)+60 > t && t > (pl_2_l-5)) {
            console.log('contact 4');
        }
    }
}

var playerClass = function(objects) {

    var move_step = 40;
    pl_1 = objects.one;
    pl_2 = objects.two;

    objects.one.style.top = "105px";
    objects.two.style.top = "200px";

    var up_border   = 0;
    var down_border = 339;

    var w = 87;
    var a = 65;
    var s = 83;
    var d = 68;

    var up    = 38;
    var down  = 40;
    var left  = 37;
    var right = 39;

    var duration = 100; // Длительность - 0.1 секунда


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

    function movePlayerW() {
        var curent_top = getCord(objects.one.style.top);
        if(check_blockUp(curent_top)) {
            //$( objects.one ).animate({
            //    top: curent_top - move_step
            //}, 300, function() {
// Animation complete.
//            });
            objects.one.style.top = (curent_top - move_step) + "px";
        }
        if(getCord(objects.one.style.top) < up_border){
            objects.one.style.top = up_border + "px";
        }
    }
    function movePlayerS() {
        var curent_top = getCord(objects.one.style.top);
        if(check_blockDown(curent_top)) {
            objects.one.style.top = (curent_top + move_step) + "px";
        }
        if(getCord(objects.one.style.top) > down_border){
            objects.one.style.top = down_border + "px";
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
    }
    function movePlayerDown() {
        var curent_top = getCord(objects.two.style.top);
        if(check_blockDown(curent_top)) {
            objects.two.style.top = (curent_top + move_step) + "px";
        }
        if(getCord(objects.two.style.top) > down_border){
            objects.two.style.top = down_border + "px";
        }
    }

    return {
        init: function() {

            $(document).keypress(function( event ) {
                console.log('event: ', event.key);
                if(event.key == 'w') {
                    movePlayerW();
                }
                if(event.key == 's') {
                    movePlayerS();
                }
                if(event.key == 'Up') {
                    movePlayerUp();
                }
                if(event.key == 'Down') {
                    movePlayerDown();
                }
            });
        }
    }
}
var ballClass = function(object) {

    var ball = object;

    var top, left, direction, pixel = 2, speed = 1;

    ball.style.top = "100px";
    ball.style.left = "400px";

    function setMove() {
        top = getCord(ball.style.top);
        left = getCord(ball.style.left);

        var data = getDirectionData(top, left, direction);
        direction = data.direction;

        if(checkPlayersBall(ball)) {

        }

        ball.style.top = data.top + "px";
        ball.style.left = data.left + "px";

        animate = setTimeout(setMove, speed); // call moveRight in 20msec
    }
    function setStop() {
        clearTimeout(animate);
    }

    function getDirectionData(top, left, direction) {
        var result;
        if(!direction) {
            direction = 'dr';
        }
        switch (direction) {
            case 'tr':      //top-right
                if(top < 1 && left < 877) {
                    result = {top: top - pixel, left: left + pixel, direction: 'dr'};
                }
                else if(top < 1 && left > 877) {
                    result = {top: top - pixel, left: left - pixel, direction: 'dl'};
                }
                else if(top < 377 && left > 877) {
                    result = {top: top + pixel, left: left - pixel, direction: 'tl'};
                }
                else {
                    result = {top: top - pixel, left: left + pixel, direction: 'tr'};
                }
                break;
            case 'tl':      //top-left
                if(top < 1 && left > 0) {
                    result = {top: top + pixel, left: left - pixel, direction: 'dl'};
                }
                else if(top < 1 && left < 1) {
                    result = {top: top + pixel, left: left + pixel, direction: 'dr'};
                }
                else if(top > 0 && left < 1) {
                    result = {top: top - pixel, left: left + pixel, direction: 'tr'};
                }
                else {
                    result = {top: top - pixel, left: left - pixel, direction: 'tl'};
                }
                break;
            case 'dr':      //down-right
                if(top > 377 && left < 877) {
                    result = {top: top - pixel, left: left + pixel, direction: 'tr'};
                }
                else if(top > 377 && left > 877) {
                    result = {top: top - pixel, left: left - pixel, direction: 'tl'};
                }
                else if(top < 377 && left > 877) {
                    result = {top: top + pixel, left: left - pixel, direction: 'dl'};
                }
                else {
                    result = {top: top + pixel, left: left + pixel, direction: 'dr'};
                }
                break;
            case 'dl':      //down-left
                if(top > 377 && left > 1) {
                    result = {top: top - pixel, left: left - pixel, direction: 'tl'};
                }
                else if(top > 377 && left < 1) {
                    result = {top: top - pixel, left: left + pixel, direction: 'tr'};
                }
                else if(top < 377 && left < 1) {
                    result = {top: top + pixel, left: left + pixel, direction: 'dr'};
                }
                else {
                    result = {top: top + pixel, left: left - pixel, direction: 'dl'};
                }
                break;
        }
        return result;
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