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
                "images": ["assets/skeleton2.png"],
                "frames": {
                    "regX": 150,
                    "regY": 0,
                    "width": 300,
                    "height": 500,
                    "count": 121
                },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "idle": [0, 20, "idle", 1],
                    "W": [21, 40, "idle"],
                    "Q": [41, 60, "idle"],
                    "S": [61, 80, "idle"],
                    "A": [81, 100, "idle"],
                    "jump": [101, 120, "idle"]
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
                "images": ["assets/girl.png"],
                "frames": {
                    "regX": 150,
                    "regY": 0,
                    "width": 300,
                    "height": 500,
                    "count": 121
                },
                "animations": {
                    "idle": [0, 20, "idle", 1],
                    "W": [21, 40, "idle"],
                    "Q": [41, 60, "idle"],
                    "S": [61, 80, "idle"],
                    "A": [81, 100, "idle"],
                    "jump": [101, 120, "idle"]
                }
            },
            positions: {
                default: 6,
                min: 3,
                max: 6
            },
            sprite: {}
        }
    ],
    buttons = [
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowRight.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: 80,
            yoffset: 80
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowLeft.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: 0,
            yoffset: 80
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowUp.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: 40,
            yoffset: 0
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowA.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: -160,
            yoffset: 80
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowQ.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: -160,
            yoffset: 0
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowS.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: -80,
            yoffset: 80
        },
        {
            data: {
                framerate: 30,
                "images": ["assets/arrowW.png"],
                "frames": {"regX": 0, "regY": 0, "width": 80, "height": 80, "count": 1}
            },
            sprite: {},
            xoffset: -80,
            yoffset: 0
        }
    ],
    regionParts = 8,
    regionWidth,
    stage,
    soundID1,
    soundID2;

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

    /*
    if(ratioX > ratioY && ratioX > 0) {
        bkg.scaleX = ratioX;
    } else if (ratioY > 0) {
        bkg.scaleY = bkg.scaleX = ratioY;
    } else {
        bkg.scaleX = ratioX;
        bkg.scaleY = ratioY;
    }
    */
    bkg.scaleY = ratioY;
    bkg.scaleX = ratioX;



    bkg.y = 0;
    stage.addChild(bkg);

    loadPlayer(0);
    loadPlayer(1);

    actualPlayer = players[0];
    players[1].sprite.scaleX = -1;
}


function loadButtons (player, index) {
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.spriteSheet = new createjs.SpriteSheet(button.data);

        button.sprite = new createjs.Sprite(button.spriteSheet);
        button.movingTime = 0;

        button.spriteSheet.on("complete", onLoadComplete);
        button.spriteSheet.on("error", onLoadError);
        stage.addChild(button.sprite);

        var xinit = player.sprite.x;
        button.sprite.x =  xinit + button.xoffset;
        button.sprite.y = (stage.canvas.height - 200) / 6 + button.yoffset;
    }
}

function loadGame() {
    var manifest = [
        { src: "bg.png", id: "bkg" }
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", init);
    loader.loadManifest(manifest, true, "assets/");
}

function loadPlayer(index) {
    var player = players[index];
    player.spriteSheet = new createjs.SpriteSheet(player.data);

    player.sprite = new createjs.Sprite(player.spriteSheet, "idle");
    player.position = player.positions.default;
    player.movingTime = 0;

    player.spriteSheet.on("complete", onLoadComplete);
    player.spriteSheet.on("error", onLoadError);
    stage.addChild(player.sprite);
    movePlayer(player);
    loadButtons(player, index);
}

function movePlayer(player) {
    player.sprite.x = regionWidth * (player.position + 0.5);
    player.sprite.y = (stage.canvas.height - player.sprite.spriteSheet._frameHeight) + 100;
}

function nextPlayer() {
    actualPlayerPosition++;
    if (actualPlayerPosition >= MAX_PLAYERS) actualPlayerPosition = 0;
    actualPlayer = players[actualPlayerPosition];
}

function onEnterFrame(event) {
    if (actualPlayer.movingRight || actualPlayer.movingLeft || actualPlayer.movingUp) {
        var deltaS = event.delta / 1000;
        actualPlayer.movingTime++;

        if (actualPlayer.movingTime < MAX_MOVING_TIME) {
            if (actualPlayer.movingRight) {
                actualPlayer.sprite.x += 150 * deltaS;
            }
            if (actualPlayer.movingLeft) {
                actualPlayer.sprite.x -= 150 * deltaS;
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