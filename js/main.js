
/*
 * Класс пешки, принимает 3 параметра
 * 
 * old_pos - string, координаты стартовой позиции фигуры, например "a2"
 * new_pos - string, координаты конечной позиции фигуры, например "a4" 
 * 
 */
var ballClass = function(object) {

    var ball = object;

    var top, left, direction, speed = 1;

    ball.style.top = "100px";
    ball.style.left = "400px";

    function getCord(str) {
        var x = Number(str.replace("px",""));
        return parseInt(x);
    }

    function setMove() {
        top = getCord(ball.style.top);
        left = getCord(ball.style.left);

        var data = getDirectionData(top, left, direction);
        direction = data.direction;

        ball.style.top = data.top + "px";
        ball.style.left = data.left + "px";

        animate = setTimeout(setMove,10); // call moveRight in 20msec
    }
    function setStop() {
        clearTimeout(animate);
        ball.style.top = "100px";
        ball.style.left = "400px";
    }

    function getDirectionData(top, left, direction) {
        var result;
        if(!direction) {
            direction = 'dr';
        }
        switch (direction) {
            case 'tr':      //top-right
                if(top < 1 && left < 877) {
                    result = {top: top - speed, left: left + speed, direction: 'dr'};
                }
                else if(top < 1 && left > 877) {
                    result = {top: top - speed, left: left - speed, direction: 'dl'};
                }
                else if(top < 377 && left > 877) {
                    result = {top: top + speed, left: left - speed, direction: 'tl'};
                }
                else {
                    result = {top: top - speed, left: left + speed, direction: 'tr'};
                }
                break;
            case 'tl':      //top-left
                if(top < 1 && left > 0) {
                    result = {top: top + speed, left: left - speed, direction: 'dl'};
                }
                else if(top < 1 && left < 1) {
                    result = {top: top + speed, left: left + speed, direction: 'dr'};
                }
                else if(top > 0 && left < 1) {
                    result = {top: top - speed, left: left + speed, direction: 'tr'};
                }
                else {
                    result = {top: top - speed, left: left - speed, direction: 'tl'};
                }
                break;
            case 'dr':      //down-right
                if(top > 377 && left < 877) {
                    result = {top: top - speed, left: left + speed, direction: 'tr'};
                }
                else if(top > 377 && left > 877) {
                    result = {top: top - speed, left: left - speed, direction: 'tl'};
                }
                else if(top < 377 && left > 877) {
                    result = {top: top + speed, left: left - speed, direction: 'dl'};
                }
                else {
                    result = {top: top + speed, left: left + speed, direction: 'dr'};
                }
                break;
            case 'dl':      //down-left
                if(top > 377 && left > 1) {
                    result = {top: top - speed, left: left - speed, direction: 'tl'};
                }
                else if(top > 377 && left < 1) {
                    result = {top: top - speed, left: left + speed, direction: 'tr'};
                }
                else if(top < 377 && left < 1) {
                    result = {top: top + speed, left: left + speed, direction: 'dr'};
                }
                else {
                    result = {top: top + speed, left: left - speed, direction: 'dl'};
                }
                break;
        }
        return result;
    }

    function movePlayer(map) {

    }

    return {
        init: function() {
            var w = 87;
            var a = 65;
            var s = 83;
            var d = 68;

            var up   = 38;
            var down = 40;
            var left = 37;
            var right = 39;

            var map = []; // Or you could call it "key"
            onkeydown = onkeyup = function(e){
                e = e || event; // to deal with IE
                map[e.keyCode] = e.type == 'keydown';
                if(map[w] || map[a] || map[s] || map[d] || map[up] || map[down] || map[left] || map[right]) {
                    movePlayer(map);
                }
            }
        },
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