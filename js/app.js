console.log('loaded');

var MAX_PLAYERS = 2;
var MAX_MOVING_TIME = 20;
var actualPlayer,
    actualPlayerPosition = 0,
    loader,
    players = [
        {
            data: {
                framerate: 30,
                "images": ["assets/skeleton.png"],
                "frames": {
                    "regX": 150,
                    "regY": 0,
                    "width": 300,
                    "height": 440,
                    "count": 101
                },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "idle": [0, 20, "walk", 1],
                    "W": [21, 40, "W"],
                    "Q": [41, 60, "Q"],
                    "S": [61, 80, "S"],
                    "A": [81, 100, "A"]
                }
            },
            positions: {
                default: 1,
                min: 1,
                max: 4
            },
            sprite: {}
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/skeleton.png"],
                "frames": {
                    "regX": 150,
                    "regY": 0,
                    "width": 300,
                    "height": 440,
                    "count": 101
                },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "idle": [0, 20, "idle", 1],
                    "W": [21, 40, "W"],
                    "Q": [41, 60, "Q"],
                    "S": [61, 80, "S"],
                    "A": [81, 100, "A"]
                }
            },
            positions: {
                default: 6  ,
                min: 3,
                max: 6
            },
            sprite: {}
        }
    ],
    regionParts = 8,
    regionWidth,
    stage;

function init() {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));
    stage.addEventListener("stagemousedown", handleJump);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", onEnterFrame);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    window.addEventListener('resize', resize, false);

    resize(stage);
    regionWidth = stage.canvas.width / regionParts;

    var bkgFile = loader.getResult("bkg");
    bkg = new createjs.Shape();
    bkg.graphics.beginBitmapFill(bkgFile).drawRect(0, 0, bkgFile.width, bkgFile.height);
    var ratioX = stage.canvas.width/bkgFile.width;
    var ratioY = stage.canvas.height/bkgFile.height;

    if(ratioX > ratioY && ratioX > 0) {
        bkg.scaleX = ratioX;
    } else if (ratioY > 0) {
        bkg.scaleY = bkg.scaleX = ratioY;
    } else {
        bkg.scaleX = ratioX;
        bkg.scaleY = ratioY;
    }

    bkg.y = 0;
    stage.addChild(bkg);

    loadPlayer(players[0]);
    loadPlayer(players[1]);

    actualPlayer = players[0];
    players[1].sprite.scaleX = -1;
}

function loadGame() {
    var manifest = [
        { src: "bkg1.png", id: "bkg" },
        { src: "arrowUp.png", id: "arrowUp"},
        { src: "arrowRight.png", id: "arrowRight"},
        { src: "arrowLeft.png", id: "arrowLeft"},
        { src: "arrowQ.png", id: "arrowQ"},
        { src: "arrowW.png", id: "arrowW"},
        { src: "arrowS.png", id: "arrowS"},
        { src: "arrowA.png", id: "arrowA"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", init);
    loader.loadManifest(manifest, true, "assets/");
}

function loadPlayer(player) {
    player.spriteSheet = new createjs.SpriteSheet(player.data);

    player.sprite = new createjs.Sprite(player.spriteSheet, "run");
    player.position = player.positions.default;
    player.movingTime = 0;

    player.spriteSheet.on("complete", onLoadComplete);
    player.spriteSheet.on("error", onLoadError);
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
    //debugger;
}

function onEnterFrame(event) {
    if (actualPlayer.movingRight || actualPlayer.movingLeft || actualPlayer.movingUp) {
        var deltaS = event.delta / 1000;
        actualPlayer.movingTime++;

        if (actualPlayer.movingTime < MAX_MOVING_TIME) {
            if (actualPlayer.movingRight) {
                actualPlayer.sprite.x += 150*deltaS;
            }
            if (actualPlayer.movingLeft) {
                actualPlayer.sprite.x -= 150*deltaS;
            }
        }
    }
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