console.log('loaded');

var MAX_PLAYERS = 2;
var MAX_MOVING_TIME = 20;
var actualPlayer,
    actualPlayerPosition = 0,
    prevPlayerPosition = 1,
    loader,
    preload,
    currentDanceSteps = 2,
    textTurno,
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
                default: 2,
                min: 2,
                max: 4
            },
            sprite: {},
            dance:[]
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
                default: 5,
                min: 3,
                max: 5
            },
            sprite: {},
            dance:[]
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
    textfontart = {
			"animations": {
				"V": {"frames": [21]},
				"A": {"frames": [0]},
				",": {"frames": [26]},
				"W": {"frames": [22]},
				"B": {"frames": [1]},
				"X": {"frames": [23]},
				"C": {"frames": [2]},
				".": {"frames": [29]},
				"Y": {"frames": [24]},
				"D": {"frames": [3]},
				"Z": {"frames": [25]},
				"E": {"frames": [4]},
				"F": {"frames": [5]},
				"G": {"frames": [6]},
				"H": {"frames": [7]},
				"I": {"frames": [8]},
				"J": {"frames": [9]},
				"K": {"frames": [10]},
				"!": {"frames": [27]},
				"L": {"frames": [11]},
				"M": {"frames": [12]},
				"N": {"frames": [13]},
				"O": {"frames": [14]},
				"P": {"frames": [15]},
				"Q": {"frames": [16]},
				"R": {"frames": [17]},
				"S": {"frames": [18]},
				"T": {"frames": [19]},
				"?": {"frames": [28]},
				"U": {"frames": [20]}
			},
			"images": ["assets/font.png"],
			"frames": [
				[155, 2, 25, 41, 0, -10, -3],
				[72, 2, 28, 43, 0, -8, -1],
				[599, 2, 28, 38, 0, -8, -4],
				[41, 2, 27, 44, 0, -8, -1],
				[728, 2, 32, 38, 0, -6, -4],
				[184, 2, 35, 41, 0, -4, -2],
				[409, 2, 30, 39, 0, -7, -3],
				[443, 2, 29, 39, 0, -7, -3],
				[901, 2, 13, 35, 0, -8, -5],
				[698, 2, 26, 38, 0, -9, -4],
				[666, 2, 28, 38, 0, -8, -4],
				[764, 2, 23, 38, 0, -10, -4],
				[828, 2, 37, 36, 0, -3, -5],
				[567, 2, 28, 38, 0, -8, -4],
				[519, 2, 44, 38, 0, 1, -4],
				[869, 2, 28, 36, 0, -8, -5],
				[476, 2, 39, 38, 0, -2, -4],
				[371, 2, 34, 39, 0, -5, -3],
				[631, 2, 31, 38, 0, -6, -4],
				[289, 2, 39, 40, 0, -2, -3],
				[918, 2, 31, 32, 0, -6, -7],
				[791, 2, 33, 37, 0, -5, -4],
				[2, 2, 35, 46, 0, -4, 1],
				[253, 2, 32, 40, 0, -6, -3],
				[104, 2, 32, 43, 0, -6, -1],
				[332, 2, 35, 39, 0, -5, -4],
				[953, 2, 9, 16, 0, -17, -29],
				[140, 2, 11, 41, 0, -16, -1],
				[223, 2, 26, 41, 0, -7, -1],
				[966, 2, 9, 10, 0, -17, -31]
			]
    },
    regionParts = 8,
    regionWidth,
    ss,
    textPlayer=["Player Uno!!","Player Dos!!"],
    ritualDance=[],
    textImitated="Te toca",
    stage;

function init() {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));
    stage.addEventListener("stagemousedown", handleJump);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", onEnterFrame);
    if (!createjs.Sound.initializeDefaultPlugins()) {
			//document.getElementById("error").style.display = "block";
			document.getElementById("content").style.display = "none";
			return;
    }
    var assetsPath = "assets/audio/";
    var sounds = [
		{src: "El_Patron_Asesino.mp3", id: 1},
		{src: "Reggae_de_los_muertos.mp3", id: 2}
    ];
    createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerSounds(sounds, assetsPath);
    
    var img = new Image();
		img.onload = function () {
			ss = new createjs.SpriteSheet(textfontart);

			textTurno = new createjs.BitmapText("Let's Start the DANZA", ss);

			// Center the text
			var bounds = textTurno.getBounds();
			textTurno.x = stage.canvas.width - bounds.width >> 1;
			textTurno.y = stage.canvas.height - bounds.height >> 1;

			stage.addChild(textTurno);
			stage.update();
		};
    img.src = "assets/font.png";
    
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
function soundLoaded(event) {
		//examples.hideDistractor();
    var div = document.getElementById(event.id);
    div.style.backgroundImage = "url('./assets/audioButtonSheet.png')";
}

function stop() {
    if (preload != null) {
	preload.close();
    }
    createjs.Sound.stop();
}
function playSound(target) {
		//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
		var instance = createjs.Sound.play(target.id);
		if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
			return;
		}
		target.className = "gridBox active";
		instance.addEventListener("complete", function (instance) {
			target.className = "gridBox";
		});
}       
function movePlayer(player) {
    player.sprite.x = regionWidth * (player.position + 0.5);
    player.sprite.y = (stage.canvas.height - player.sprite.spriteSheet._frameHeight) + 100;
}

function nextPlayer() {
    actualPlayerPosition++;
    prevPlayerPosition=actualPlayerPosition-1;
    if (actualPlayerPosition >= MAX_PLAYERS){
        actualPlayerPosition = 0;
        prevPlayerPosition =1;
    }
   /* for(var j=0; actualPlayer.dance.length;j++){
    ritualDance[j]=actualPlayer.dance[j];
    }*/
    ritualDance=actualPlayer.dance.slice(0);
    console.log("Baile a imitar:"+ritualDance);
    actualPlayer.dance.length=0;
    actualPlayer = players[actualPlayerPosition];
    
    
    currentDanceSteps++;
    
    textTurno.text=textImitated+"...Turno"+textPlayer[actualPlayerPosition];
    //textTurno.text+(currentDanceSteps.toString()); //comentado hasta que haya font de numeros
    console.log("Pasos del turno: "+currentDanceSteps);
    
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

function resize(escenario) {
    escenario.canvas.width = window.innerWidth;
    escenario.canvas.height = window.innerHeight;
}
