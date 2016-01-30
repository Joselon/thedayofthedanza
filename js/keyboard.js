var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;

function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }
    if (e.keyCode == KEYCODE_A || e.keyCode == KEYCODE_LEFT) {
        actualPlayer.movingLeft = true;

    } else if (e.keyCode == KEYCODE_D || e.keyCode == KEYCODE_RIGHT) {
        actualPlayer.movingRight = true;
    } else if (e.keyCode == KEYCODE_W || e.keyCode == KEYCODE_UP) {
        handleJump();
    } else if (e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE) {
        nextPlayer();
    }

    //movePlayer(actualPlayer);
}

function handleKeyUp(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }
    if (actualPlayer.movingLeft && (e.keyCode == KEYCODE_A || e.keyCode == KEYCODE_LEFT)) {
        if (actualPlayer.position > actualPlayer.positions.min) actualPlayer.position--;
        actualPlayer.movingLeft = false;
    } else if (actualPlayer.movingRight && (e.keyCode == KEYCODE_D || e.keyCode == KEYCODE_RIGHT)) {
        if (actualPlayer.position < actualPlayer.positions.max) actualPlayer.position++;
        actualPlayer.movingRight = false;
    }
    actualPlayer.movingTime = 0;
    movePlayer(actualPlayer);
}

function handleJump() {
    actualPlayer.sprite.gotoAndPlay("jump");
}