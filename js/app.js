console.log('loaded');

var MAX_PLAYERS = 2;

var stage,
    actualPlayer,
    actualPlayerPosition = 0,
    players = [
        {
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
            },
            positions: {
                default: 1,
                min: 0,
                max: 4
            },
            sprite: {}
        },
        {
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
            },
            positions: {
                default: 6,
                min: 4,
                max: 7
            },
            sprite: {}
        }
    ],
    regionParts = 8,
    regionWidth;

function init() {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    window.addEventListener('resize', resize, false);
    resize(stage);
    regionWidth = stage.canvas.width / regionParts;

    loadPlayer(players[0]);
    loadPlayer(players[1]);

    actualPlayer = players[0];
    players[1].sprite.scaleX = -1;
}

function loadPlayer(player) {
    var spriteSheet = new createjs.SpriteSheet(player.data);

    player.sprite = new createjs.Sprite(spriteSheet, "run");
    player.position = player.positions.default;

    spriteSheet.on("complete", onLoadComplete);
    spriteSheet.on("error", onLoadError);
    stage.addChild(player.sprite);
    movePlayer(player);
}

function movePlayer(player) {
    player.sprite.x = regionWidth * (player.position + 0.5);
    player.sprite.y = (stage.canvas.height - player.sprite.spriteSheet._frameHeight) / 2;
}

function nextPlayer() {
    actualPlayerPosition++;
    if (actualPlayerPosition >= MAX_PLAYERS) actualPlayerPosition = 0;
    actualPlayer = players[actualPlayerPosition];
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