"use strict";
var BomberMan;
(function (BomberMan) {
    BomberMan.ƒ = FudgeCore;
    BomberMan.ƒAid = FudgeAid;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page) {
            BomberMan.initStartScreen();
            return;
        }
        switch (page) {
            case "index.html":
                BomberMan.initStartScreen();
                break;
            case "Game":
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
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
    })(ACTION = BomberMan.ACTION || (BomberMan.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
        DIRECTION[DIRECTION["UP"] = 2] = "UP";
        DIRECTION[DIRECTION["DOWN"] = 3] = "DOWN";
    })(DIRECTION = BomberMan.DIRECTION || (BomberMan.DIRECTION = {}));
    class Man extends BomberMan.ƒAid.NodeSprite {
        constructor(_name) {
            super(_name ? _name : "Man");
            this.bombLevel = 1;
            this.bombSpeed = 1;
            this.canBomb = true;
            this.update = (_event) => {
            };
            this.addComponent(new BomberMan.ƒ.ComponentTransform());
            this.show(ACTION.IDLE);
            BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Man.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            sprite.generateByGrid(BomberMan.ƒ.Rectangle.GET(1, 1, 1, 1), 6, BomberMan.ƒ.Vector2.ZERO(), 2, BomberMan.ƒ.ORIGIN2D.CENTER);
            Man.animations[ACTION.WALK] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(BomberMan.ƒ.Rectangle.GET(1, 20, 45, 72), 4, BomberMan.ƒ.Vector2.ZERO(), 64, BomberMan.ƒ.ORIGIN2D.BOTTOMCENTER);
            Man.animations[ACTION.IDLE] = sprite;
            sprite.frames[2].timeScale = 10;
        }
        show(_action) {
            this.setAnimation(Man.animations[_action]);
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
        cameraDistance: 40,
        loopMode: BomberMan.ƒ.LOOP_MODE.TIME_REAL,
        fps: 30
    };
    BomberMan.firstMap = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
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
    BomberMan.ƒ.RenderManager.initialize(true, true);
    function initGame() {
        getReferences();
        installEventListener();
        camera = new BomberMan.ƒ.ComponentCamera();
        camera.pivot.translateZ(BomberMan.Data.cameraDistance);
        camera.pivot.rotateY(180);
        let cameraLookAt = new BomberMan.ƒ.Vector3(0, 0, 0);
        camera.pivot.lookAt(cameraLookAt);
        graph = new BomberMan.ƒ.Node("Graph");
        const canvas = document.querySelector("canvas");
        viewport = new BomberMan.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        gameManager = new BomberMan.GameManager(viewport, graph);
        viewport.draw();
        let gizmo = new BomberMan.ƒAid.NodeCoordinateSystem("ControlSystem");
        graph.addChild(gizmo);
        BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        BomberMan.ƒ.Loop.start(BomberMan.Data.loopMode, BomberMan.Data.fps);
    }
    BomberMan.initGame = initGame;
    function update() {
        viewport.draw();
    }
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
            this.bomberman = null;
            this.destroyables = [];
            this.gameOver = false;
            this.viewport = _viewport;
            this.graph = _graph;
        }
        startGame() {
            BomberMan.Map.loadImages();
            this.map = BomberMan.MapGenerator.generateRandomMap(21);
            this.graph.appendChild(this.map);
            this.loadSprites();
            this.bomberman = new BomberMan.BomberMan("Bomberman");
            this.graph.appendChild(this.bomberman);
        }
        getMap() {
            return this.map;
        }
        loadSprites() {
            let img = document.querySelector("spritesheet");
            let spritesheet = BomberMan.ƒAid.createSpriteSheet("Spritesheet", img);
            BomberMan.Man.generateSprites(spritesheet);
        }
    }
    BomberMan.GameManager = GameManager;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class Map extends BomberMan.ƒAid.Node {
        constructor(_data) {
            super("Map");
            this.mapElements = [];
            this.data = _data;
            for (let i = 0; i < this.data[0].length; i++)
                this.mapElements[i] = [];
            this.generateMap();
        }
        generateMap() {
            // <-------------------------------------------TODO make map appear in middle--------->
            for (let y = 0; y < this.data.length; y++) {
                for (let x = 0; x < this.data[y].length; x++) {
                    let pos = new BomberMan.ƒ.Vector3(x - (this.data[0].length / 2) + 0.5, -(y - (this.data.length / 2) + 0.5), 0);
                    this.createTile(y, x, pos);
                }
            }
        }
        static loadImages() {
            Map.grasImg = document.querySelector("#gras");
            Map.boxImg = document.querySelector("#box");
            Map.wallsImg = document.querySelector("#walls");
            Map.walltImg = document.querySelector("#wallt");
        }
        createTile(_y, _x, _pos) {
            let tile = null;
            switch (this.data[_y][_x]) {
                case 0:
                    tile = this.createGras(_pos);
                    break;
                case 1:
                    tile = this.createWallTop(_pos);
                    break;
                case 2:
                    tile = this.createBox(_pos);
                    break;
                case 3:
                    break;
                default:
                    break;
            }
            if (tile) {
                this.appendChild(tile);
                this.mapElements[_y][_x] = tile;
            }
        }
        createGras(_pos) {
            let mesh = new BomberMan.ƒ.MeshSprite();
            let mtr = BomberMan.getTextureMaterial("Gras", Map.grasImg);
            let gras = new BomberMan.ƒAid.Node("gras", BomberMan.ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
            let cmpTransform = gras.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(_pos);
            return gras;
        }
        createWallTop(_pos) {
            let mesh = new BomberMan.ƒ.MeshSprite();
            let mtr = BomberMan.getTextureMaterial("WallTop", Map.walltImg);
            let wallt = new BomberMan.ƒAid.Node("walltop", BomberMan.ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
            let cmpTransform = wallt.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(_pos);
            return wallt;
        }
        createBox(_pos) {
            let mesh = new BomberMan.ƒ.MeshSprite();
            let mtr = BomberMan.getTextureMaterial("Box", Map.boxImg);
            let box = new BomberMan.ƒAid.Node("box", BomberMan.ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
            let cmpTransform = box.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(_pos);
            return box;
        }
        createWallSide() {
            let floor = new BomberMan.ƒ.Node("Floor");
            return floor;
        }
    }
    BomberMan.Map = Map;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class MapGenerator {
        static generateRandomMap(_size) {
            if (!_size)
                _size = Math.floor((Math.random() * 5) + 5);
            let mode = Math.floor(Math.random() * 1);
            switch (mode) {
                default:
                    return new BomberMan.Map(this.randomGrid(_size));
            }
        }
        static randomGrid(_size) {
            let _data = [];
            for (let i = 0; i < _size; i++)
                _data[i] = [];
            let rndSize = Math.floor(Math.random() * 7) + 4;
            for (let y = 0; y < _size; y++) {
                for (let x = 0; x < _size; x++) {
                    if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
                        _data[y][x] = 1;
                    }
                    else {
                        if ((x % rndSize == 0) || y % rndSize == 0) {
                            _data[y][x] = 2;
                        }
                        else {
                            _data[y][x] = 0;
                        }
                    }
                }
            }
            return _data;
        }
        static randomCross(_size) {
            let _data = [];
            for (let i = 0; i < _size; i++)
                _data[i] = [];
            let rndSize = Math.floor(Math.random() * 5) + 4;
            for (let y = 0; y < _size; y++) {
                for (let x = 0; x < _size; x++) {
                    if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
                        _data[y][x] = 1;
                    }
                    else {
                        if (_data[y][x] != undefined)
                            continue;
                        if (x % rndSize - 1 == 0 && y % rndSize == 0) {
                            _data[y + 1][x] = 2;
                            _data[y - 1][x] = 2;
                            _data[y][x] = 2;
                            _data[y][x + 1] = 2;
                            _data[y][x - 1] = 2;
                        }
                        else
                            _data[y][x] = 0;
                    }
                }
            }
            return _data;
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
    function getTextureMaterial(_name, _img) {
        let txt = new BomberMan.ƒ.TextureImage();
        let coatTxt = new BomberMan.ƒ.CoatTextured();
        txt.image = _img;
        coatTxt.texture = txt;
        return new BomberMan.ƒ.Material(_name, BomberMan.ƒ.ShaderTexture, coatTxt);
    }
    BomberMan.getTextureMaterial = getTextureMaterial;
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map