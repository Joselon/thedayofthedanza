var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_Q = 81;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;


function handleKeyDown(e) {
    //cross browser issues exist
    
    if (!e) {
        var e = window.event;
    }
    
    if (e.keyCode == KEYCODE_LEFT||e.target.id==5) {
        actualPlayer.movingLeft = true;
        e.target.alpha=0.5;
    } else if (e.keyCode == KEYCODE_RIGHT||e.target.id==4) {
        actualPlayer.movingRight = true;
    } else if (e.keyCode == KEYCODE_UP||e.target.id==6) {
        handleJump();
        actualPlayer.dance.push("SALTO");
    }  else if (e.keyCode == KEYCODE_Q||e.target.id==8) {
        actualPlayer.sprite.gotoAndPlay("Q");
        actualPlayer.dance.push("Q");
    } else if (e.keyCode == KEYCODE_W||e.target.id==10) {
        actualPlayer.sprite.gotoAndPlay("W");
        actualPlayer.dance.push("W");
    } else if (e.keyCode == KEYCODE_A||e.target.id==7) {
        actualPlayer.sprite.gotoAndPlay("A");
         actualPlayer.dance.push("A");
    } else if (e.keyCode == KEYCODE_S||e.target.id==9) {
        actualPlayer.sprite.gotoAndPlay("S");
         actualPlayer.dance.push("S");
    }
    
    // Checking if the steps of the last dancing player has reached the mandatory current dance steps
    if(currentDanceSteps>=3){
        
        if((actualPlayer.dance.length)===currentDanceSteps-1){
            var imitated=false;
            for (x=0;x<actualPlayer.dance.length;x++){
                if (ritualDance[x] == actualPlayer.dance[x])
                {
                imitated=true;
                }
                else imitated=false;
         } 
         if(imitated) textTurno.text="Bien!...Un pasito mas!";
         else textTurno.text="Mal...Cambio de Baile.Un pasito mas!";
        }
    }
    if (actualPlayer.dance.length === currentDanceSteps/*e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE*/) {
        console.log('dance array of player '+actualPlayerPosition+' has the following values: ', actualPlayer.dance);
        nextPlayer();
        
    }
    e.target.alpha=1;
    //movePlayer(actualPlayer);
     
}

function handleKeyUp(e) {
    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }
    if (actualPlayer.movingLeft && e.keyCode == KEYCODE_LEFT) {
        if (actualPlayer.position > actualPlayer.positions.min) actualPlayer.position--;
        actualPlayer.movingLeft = false;
    } else if (actualPlayer.movingRight && e.keyCode == KEYCODE_RIGHT) {
        if (actualPlayer.position < actualPlayer.positions.max) actualPlayer.position++;
        actualPlayer.movingRight = false;
    }
    actualPlayer.movingTime = 0;
    movePlayer(actualPlayer);
}

function handleJump() {
    actualPlayer.sprite.gotoAndPlay("jump");
}