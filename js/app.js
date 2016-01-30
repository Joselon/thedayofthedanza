console.log('loaded');

var stage;

function init() {

    stage = new createjs.Stage(document.getElementById("gameCanvas"));

    var spriteSheet = new createjs.SpriteSheet({
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
    });

    spriteSheet.on("complete", function(event) {
        console.log("Complete", event);
    });
    spriteSheet.on("error", function(event) {
        console.log("Error", event);
    });

    var grant = new createjs.Sprite(spriteSheet, "run");
    grant.x = stage.canvas.width / 2;
    grant.y = 22;

    // Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
    stage.addChild(grant);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
}