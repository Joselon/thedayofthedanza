console.log('loaded');

var stage,
    playerA = {
        framerate: 30,
        "images": ["assets/grant.png"],
        "frames": {
            "regX": 82,
            "regY": 0,
            "width": 165,
            "height": 292,
            "count": 64
        },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "run": [0, 25, "run", 1.5],
            "jump": [26, 63, "run"]
        }
    };


function init() {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);

    window.addEventListener('resize', resize, false);
    resize(stage);

    loadPlayer(playerA);
}

function loadPlayer(spriteData) {
    var spriteSheet = new createjs.SpriteSheet(spriteData),
        sprite = new createjs.Sprite(spriteSheet, "run");

    spriteSheet.on("complete", onLoadComplete);
    spriteSheet.on("error", onLoadError);

    sprite.x = stage.canvas.width / 2;
    sprite.y = 22;

    stage.addChild(sprite);
}

function onLoadError(event) {
    console.log("Error", event);
}

function onLoadComplete(event) {
    console.log("Complete", event);
}

function resize(stage) {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;


}