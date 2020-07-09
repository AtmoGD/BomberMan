"use strict";
var BomberMan;
(function (BomberMan) {
    BomberMan.ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page)
            return;
        switch (page) {
            case "index.html":
                BomberMan.initStartScreen();
                break;
            case "Game.html":
                BomberMan.initGame();
                break;
            default:
                return;
        }
    }
})(BomberMan || (BomberMan = {}));
///<reference path="Main.ts"/>
var BomberMan;
///<reference path="Main.ts"/>
(function (BomberMan) {
    class Destroyable extends BomberMan.ƒ.Node {
        constructor(_name) {
            super(_name ? name : "Destroyable");
        }
        checkCollision(_position) {
            return this.mtxLocal.translation.isInsideSphere(_position, 1);
        }
        die() {
            let eventDie = new Event("die");
            this.dispatchEvent(eventDie);
        }
    }
    BomberMan.Destroyable = Destroyable;
})(BomberMan || (BomberMan = {}));
///<reference path="Destroyable.ts"/>
var BomberMan;
///<reference path="Destroyable.ts"/>
(function (BomberMan) {
    class Man extends BomberMan.Destroyable {
        constructor(_name) {
            super(_name ? _name : "Man");
            this.bombLevel = 1;
            this.bombSpeed = 1;
            this.canBomb = true;
        }
    }
    BomberMan.Man = Man;
})(BomberMan || (BomberMan = {}));
///<reference path="Man.ts"/>
var BomberMan;
///<reference path="Man.ts"/>
(function (BomberMan_1) {
    class BomberMan extends BomberMan_1.Man {
        constructor(_name) {
            super(_name ? _name : "BomberMan");
            this.lives = 3;
            this.score = 0;
        }
    }
    BomberMan_1.BomberMan = BomberMan;
})(BomberMan || (BomberMan = {}));
///<reference path="Destroyable.ts"/>
var BomberMan;
///<reference path="Destroyable.ts"/>
(function (BomberMan) {
    class Box extends BomberMan.Destroyable {
        constructor() {
            super("Box");
        }
    }
    BomberMan.Box = Box;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    BomberMan.Data = {
        cameraDistance: 50,
        loopMode: BomberMan.ƒ.LOOP_MODE.TIME_REAL,
        fps: 30
    };
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    let camera;
    let viewport;
    let graph;
    let gameManager;
    let startOverlay;
    let gameOverlay;
    let gameOverOverlay;
    let startButton;
    function initGame() {
        camera = new BomberMan.ƒ.ComponentCamera();
        camera.pivot.translateZ(BomberMan.Data.cameraDistance);
        camera.pivot.rotateY(180);
        graph = new BomberMan.ƒ.Node("Graph");
        const canvas = document.querySelector("canvas");
        viewport = new BomberMan.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        viewport.draw();
        gameManager = new BomberMan.GameManager(viewport, graph);
        getReferences();
        installEventListener();
    }
    BomberMan.initGame = initGame;
    function getReferences() {
        startOverlay = document.querySelector("#startOverlay");
        gameOverlay = document.querySelector("#gameOverlay");
        gameOverOverlay = document.querySelector("#gameOverOverlay");
        startButton = document.querySelector("#startButton");
    }
    function installEventListener() {
        startButton.addEventListener("click", startGame);
    }
    function startGame() {
        startOverlay.style.display = "none";
        gameOverlay.style.display = "flex";
        gameOverOverlay.style.display = "none";
        gameManager.startGame();
    }
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class GameManager {
        constructor(_viewport, _graph) {
            this.map = null;
            this.destroyables = [];
            this.gameOver = false;
            this.viewport = _viewport;
            this.graph = _graph;
        }
        startGame() {
            this.map = BomberMan.MapGenerator.generateWorld();
            this.graph.appendChild(this.map);
            BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            BomberMan.ƒ.Loop.start(BomberMan.Data.loopMode, BomberMan.Data.fps);
        }
        update() {
        }
    }
    BomberMan.GameManager = GameManager;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class Map extends BomberMan.ƒ.Node {
        constructor() {
            super("Map");
        }
    }
    BomberMan.Map = Map;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class MapGenerator {
        static generateWorld() {
            return new BomberMan.Map();
        }
    }
    BomberMan.MapGenerator = MapGenerator;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    let startButton;
    let volumeInput;
    function initStartScreen() {
        startButton = document.querySelector("#startGameButton");
        if (startButton)
            startButton.addEventListener("click", startGame);
        volumeInput = document.querySelector("#volumeInput");
        if (volumeInput) {
            volumeInput.addEventListener("change", updateVolume);
            let volume = BomberMan.getCookie("Volume");
            console.log(document.cookie);
            if (volume != undefined) {
                volumeInput.value = volume;
            }
        }
    }
    BomberMan.initStartScreen = initStartScreen;
    function startGame() {
        window.location.href = "./html/Game.html";
    }
    function updateVolume() {
        let volume = volumeInput?.value;
        if (!volume)
            return;
        BomberMan.setCookie("Volume", volume);
        console.log(document.cookie);
    }
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop()?.split(";").shift();
        }
        return undefined;
    }
    BomberMan.getCookie = getCookie;
    function setCookie(_name, _val) {
        const date = new Date();
        const value = _val;
        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = _name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }
    BomberMan.setCookie = setCookie;
    function deleteCookie(_name) {
        const date = new Date();
        date.setTime(date.getTime() - 1000);
        document.cookie = _name + "=" + "; expires=" + date.toUTCString() + "; path=/";
    }
    BomberMan.deleteCookie = deleteCookie;
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map