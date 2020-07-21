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
    class Bomb extends BomberMan.ƒAid.NodeSprite {
        constructor(_map, _gameManager, _position, _level) {
            super("Bomb");
            this.lifetime = 100;
            this.type = 3;
            this.generateAnimations();
            this.level = _level;
            this.gameManager = _gameManager;
            this.map = _map;
            this.position = _position;
            this.addComponent(new BomberMan.ƒ.ComponentTransform());
            let pos = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translation = pos;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 1));
            this.map.data[this.position.y][this.position.x] = this.type;
            this.setAnimation(this.animations["Explode"]);
            BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update() {
            this.lifetime--;
            if (this.lifetime <= 0)
                this.explode();
        }
        explode() {
            let explosion = new BomberMan.Explosion(this.gameManager, this.map, this.position, BomberMan.DIRECTION.UP, 3);
            this.gameManager.graph.appendChild(explosion);
            this.gameManager.graph.removeChild(this);
        }
        generateAnimations() {
            this.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation("Bomb", Bomb.coat);
            let startRect = new BomberMan.ƒ.Rectangle(48, 0, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.frames.forEach(frame => {
                frame.timeScale = 10;
            });
            this.animations["Explode"] = sprite;
        }
        static takeCoat(_coat) {
            Bomb.coat = _coat;
        }
    }
    BomberMan.Bomb = Bomb;
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
        constructor(_map, _gameManager, _type, _name) {
            super(_name ? _name : "Man");
            this.bombLevel = 1;
            this.bombSpeed = 1;
            this.canBomb = true;
            this.position = BomberMan.ƒ.Vector2.ZERO();
            this.speed = 4;
            this.direc = DIRECTION.DOWN;
            this.distance = 0;
            this.map = _map;
            this.type = _type;
            this.gameManager = _gameManager;
            this.position = this.map.createSpawnPoint(this.type);
            this.transform = new BomberMan.ƒ.ComponentTransform();
            this.addComponent(this.transform);
            this.transform.local.translation = this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 1));
            this.show(ACTION.IDLE, DIRECTION.DOWN);
            BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update() {
            if (this.distance > 0) {
                let dist = (1 / BomberMan.Data.fps) * this.speed;
                dist = dist > this.distance ? this.distance : dist;
                switch (this.direc) {
                    case DIRECTION.UP:
                        this.mtxLocal.translateY(dist);
                        break;
                    case DIRECTION.DOWN:
                        this.mtxLocal.translateY(-dist);
                        break;
                    case DIRECTION.LEFT:
                        this.mtxLocal.translateX(-dist);
                        break;
                    case DIRECTION.RIGHT:
                        this.mtxLocal.translateX(dist);
                        break;
                }
                this.distance -= dist;
            }
            else {
                this.show(ACTION.IDLE, this.direc);
            }
        }
        generateSprites() {
            console.log("generateSprites");
        }
        move(_dir) {
            if (this.distance > 0)
                return;
            let newPos = this.position.getMutator();
            switch (_dir) {
                case DIRECTION.UP:
                case DIRECTION.DOWN:
                    newPos.y = _dir == DIRECTION.UP ? this.position.y - 1 : this.position.y + 1;
                    break;
                case DIRECTION.LEFT:
                case DIRECTION.RIGHT:
                    newPos.x = _dir == DIRECTION.RIGHT ? this.position.x + 1 : this.position.x - 1;
                    break;
            }
            let mapData = this.map.data[newPos.y][newPos.x];
            if (mapData == 1 || mapData == 2 || mapData == 3)
                return;
            this.map.data[this.position.y][this.position.x] = 0;
            this.position.mutate(newPos);
            this.map.data[this.position.y][this.position.x] = this.type;
            this.direc = _dir;
            this.distance = 1;
            this.show(ACTION.WALK, this.direc);
        }
        placeBomb() {
            console.log("Want to place a bomb");
            let bombPos = this.position.copy;
            switch (this.direc) {
                case DIRECTION.UP:
                case DIRECTION.DOWN:
                    bombPos.y = this.direc == DIRECTION.UP ? this.position.y - 1 : this.position.y + 1;
                    break;
                case DIRECTION.LEFT:
                case DIRECTION.RIGHT:
                    bombPos.x = this.direc == DIRECTION.RIGHT ? this.position.x + 1 : this.position.x - 1;
                    break;
            }
            let mapData = this.map.data[bombPos.y][bombPos.x];
            if (mapData == 1 || mapData == 2)
                return;
            let bomb = new BomberMan.Bomb(this.map, this.gameManager, bombPos, 1);
            this.gameManager.graph.appendChild(bomb);
        }
        checkCollision(_pos) {
            return false;
        }
        show(_action, _direction) {
            this.setAnimation(Man.animations[_action + _direction]);
        }
    }
    BomberMan.Man = Man;
})(BomberMan || (BomberMan = {}));
///<reference path="Man.ts"/>
var BomberMan;
///<reference path="Man.ts"/>
(function (BomberMan_1) {
    class BomberMan extends BomberMan_1.Man {
        constructor(_map, _gameManager, _name) {
            super(_map, _gameManager, 4, _name ? _name : "BomberMan");
            this.lives = 3;
            this.score = 0;
            this.initKeyEvent();
        }
        initKeyEvent() {
            window.addEventListener("keydown", this.handleKeyPress.bind(this));
        }
        handleKeyPress(_event) {
            switch (_event.code) {
                case BomberMan_1.ƒ.KEYBOARD_CODE.W:
                    super.move(BomberMan_1.DIRECTION.UP);
                    break;
                case BomberMan_1.ƒ.KEYBOARD_CODE.S:
                    super.move(BomberMan_1.DIRECTION.DOWN);
                    break;
                case BomberMan_1.ƒ.KEYBOARD_CODE.A:
                    super.move(BomberMan_1.DIRECTION.LEFT);
                    break;
                case BomberMan_1.ƒ.KEYBOARD_CODE.D:
                    super.move(BomberMan_1.DIRECTION.RIGHT);
                    break;
                case BomberMan_1.ƒ.KEYBOARD_CODE.SPACE:
                    super.placeBomb();
                    break;
            }
        }
        // protected move(): void {
        //   this.show(ACTION.IDLE, this.dir);
        // }
        static generateSprites(_coat) {
            BomberMan.animations = {};
            let sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.UP, _coat);
            let startRect = new BomberMan_1.ƒ.Rectangle(0, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.UP] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.DOWN, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(16, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.DOWN] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.LEFT, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(208, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.LEFT] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.RIGHT, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(64, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.IDLE + BomberMan_1.DIRECTION.RIGHT] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.UP, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(128, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 2, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.UP] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.DOWN, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(32, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 2, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.DOWN] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.LEFT, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(192, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.LEFT] = sprite;
            sprite = new BomberMan_1.ƒAid.SpriteSheetAnimation(BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.RIGHT, _coat);
            startRect = new BomberMan_1.ƒ.Rectangle(80, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan_1.ƒ.Vector2.ZERO(), 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
            BomberMan.animations[BomberMan_1.ACTION.WALK + BomberMan_1.DIRECTION.RIGHT] = sprite;
        }
        show(_action, _direction) {
            this.setAnimation(BomberMan.animations[_action + _direction]);
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
    class Explosion extends BomberMan.ƒAid.NodeSprite {
        constructor(_gameManager, _map, _position, _dir, _count) {
            super("Explosion");
            this.type = 3;
            this.gameManager = _gameManager;
            this.map = _map;
            this.position = _position;
            this.dir = _dir;
            this.count = _count;
            this.addComponent(new BomberMan.ƒ.ComponentTransform());
            let pos = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translation = pos;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 1));
            this.setAnimation(Explosion.animations["Explosion"]);
        }
        static generateSprites(_coat) {
            Explosion.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation("Explosion", _coat);
            let startRect = new BomberMan.ƒ.Rectangle(0, 0, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            Explosion.animations["Explosion"] = sprite;
        }
    }
    BomberMan.Explosion = Explosion;
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
    // ƒ.RenderManager.initialize(true, true);
    function initGame() {
        getReferences();
        installEventListener();
        camera = new BomberMan.ƒ.ComponentCamera();
        camera.pivot.translateZ(BomberMan.Data.cameraDistance);
        camera.pivot.rotateY(180);
        let cameraLookAt = new BomberMan.ƒ.Vector3(1, 1, 0);
        camera.pivot.lookAt(cameraLookAt);
        graph = new BomberMan.ƒ.Node("Graph");
        const canvas = document.querySelector("canvas");
        viewport = new BomberMan.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        gameManager = new BomberMan.GameManager(viewport, graph, camera);
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
        viewport.draw();
    }
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class GameManager {
        constructor(_viewport, _graph, _camera) {
            this.map = null;
            this.mans = [];
            this.destroyables = [];
            this.bomberman = null;
            this.gameOver = false;
            this.viewport = _viewport;
            this.graph = _graph;
            this.camera = _camera;
        }
        startGame() {
            BomberMan.Map.loadImages();
            this.map = BomberMan.MapGenerator.generateRandomMap(21);
            this.graph.appendChild(this.map);
            this.loadSprites();
            this.bomberman = new BomberMan.BomberMan(this.map, this, "Bomberman");
            this.graph.appendChild(this.bomberman);
        }
        checkCollisionAll(_target) {
            let restDest = this.checkCollisionDestroyables(_target);
            let restMan = this.checkCollisionMans(_target);
            return restDest ? restDest : restMan;
        }
        checkCollisionDestroyables(_pos) {
            for (let dest of this.destroyables) {
                if (dest.mtxLocal.translation.isInsideSphere(_pos, 1)) {
                    return dest;
                }
            }
            return null;
        }
        checkCollisionMans(_pos) {
            for (let man of this.mans) {
                if (man.mtxLocal.translation.isInsideSphere(_pos, 1)) {
                    return man;
                }
            }
            return null;
        }
        getMap() {
            return this.map;
        }
        loadSprites() {
            let img = document.querySelector("#spritesheet");
            let coat = new BomberMan.ƒ.CoatTextured();
            coat.texture = new BomberMan.ƒ.TextureImage();
            coat.texture.image = img;
            BomberMan.BomberMan.generateSprites(coat);
            BomberMan.Bomb.takeCoat(coat);
            BomberMan.Explosion.generateSprites(coat);
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
            for (let y = 0; y < this.data.length; y++) {
                for (let x = 0; x < this.data[y].length; x++) {
                    let pos = new BomberMan.ƒ.Vector3(x - Math.floor((this.data[0].length / 2)), -Math.floor((y - (this.data.length / 2))), 0);
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
                default:
                    tile = this.createGras(_pos);
                    break;
            }
            if (tile) {
                this.appendChild(tile);
                this.mapElements[_y][_x] = tile;
            }
        }
        createSpawnPoint(_type) {
            for (let y = 0; y < this.data.length; y++) {
                for (let x = 0; x < this.data[y].length; x++) {
                    if (this.data[y][x] == 0 && this.data[y][x + 1] == 0 && this.data[y + 1][x] == 0) {
                        this.data[y][x] = _type;
                        return new BomberMan.ƒ.Vector2(x, y);
                    }
                }
            }
            return null;
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
        let coatTxt = new BomberMan.ƒ.CoatTextured();
        coatTxt.texture = new BomberMan.ƒ.TextureImage();
        coatTxt.texture.image = _img;
        return new BomberMan.ƒ.Material(_name, BomberMan.ƒ.ShaderTexture, coatTxt);
    }
    BomberMan.getTextureMaterial = getTextureMaterial;
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map