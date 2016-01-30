console.log('loaded');

var stage,
    playerA = {
        sprite: {},
        data: {
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
        }
    },
    regionParts = 8,
    regionWidth;


function init() {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));
    regionWidth = stage.canvas.width / regionParts;

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);

    window.addEventListener('resize', resize, false);
    resize(stage);

    loadPlayer(playerA);
    moveSprite(playerA.sprite, 0);
}

function loadPlayer(player) {
    var spriteSheet = new createjs.SpriteSheet(player.data);

    player.sprite = new createjs.Sprite(spriteSheet, "run");

    spriteSheet.on("complete", onLoadComplete);
    spriteSheet.on("error", onLoadError);
    stage.addChild(player.sprite);
}

function moveSprite(sprite, pos) {
    sprite.x = regionWidth * (pos+0.5);
    sprite.y = (stage.canvas.height - sprite.spriteSheet._frameHeight) / 2;
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