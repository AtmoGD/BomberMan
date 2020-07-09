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
    BomberMan.ƒ.RenderManager.initialize(true, true);
    function initGame() {
        getReferences();
        installEventListener();
        camera = new BomberMan.ƒ.ComponentCamera();
        camera.pivot.translateZ(BomberMan.Data.cameraDistance);
        let cameraLookAt = new BomberMan.ƒ.Vector3(0, 0, 0);
        camera.pivot.lookAt(cameraLookAt);
        graph = new BomberMan.ƒ.Node("Graph");
        const canvas = document.querySelector("canvas");
        viewport = new BomberMan.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        gameManager = new BomberMan.GameManager(viewport, graph);
        viewport.draw();
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
            this.destroyables = [];
            this.gameOver = false;
            this.viewport = _viewport;
            this.graph = _graph;
        }
        startGame() {
            this.map = BomberMan.MapGenerator.generateWorld();
            this.graph.appendChild(this.map);
            for (let node of this.graph.getChildren()) {
                console.log(node);
            }
        }
        getMap() {
            return this.map;
        }
    }
    BomberMan.GameManager = GameManager;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class Map extends BomberMan.ƒAid.Node {
        constructor(_data) {
            super("Map");
            Map.loadImages();
            this.data = _data;
            this.generateMap();
        }
        generateMap() {
            for (let x = 0; x <= this.data.length; x++) {
                for (let y = 0; y < this.data[0].length; y++) {
                    let pos = new BomberMan.ƒ.Vector3(x, y, 0);
                    this.appendChild(this.createTerrainNode(Map.floorImg));
                }
            }
        }
        createFloor(_position) {
            let floor = new BomberMan.ƒ.Node("Floor");
            // let groundMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            // let groundMeshComp: ƒ.ComponentMesh = new ƒ.ComponentMesh(groundMesh);
            // groundMeshComp.pivot.scaleY(30);
            // groundMeshComp.pivot.scaleX(30);
            // let groundIMG: HTMLImageElement = <HTMLImageElement>document.getElementById("ground");
            // let groundTextureIMG: ƒ.TextureImage = new ƒ.TextureImage();
            // groundTextureIMG.image = groundIMG;
            // let groundTextureCoat: ƒ.CoatTextured = new ƒ.CoatTextured();
            // groundTextureCoat.texture = groundTextureIMG;
            // groundTextureCoat.repetition = true;
            // groundTextureCoat.tilingX = 30;
            // groundTextureCoat.tilingY = 30;
            // let groundMaterial: ƒ.Material = new ƒ.Material("ground", ƒ.ShaderTexture, groundTextureCoat);
            // let groundComponentMat: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(groundMaterial);
            // let groundTransformComp: ƒ.ComponentTransform = new ƒ.ComponentTransform(
            //   ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, -1)))
            // floor.addComponent(groundTransformComp);
            // floor.addComponent(groundMeshComp);
            // floor.addComponent(groundComponentMat);
            // return floor;
            let cmpTransform = new BomberMan.ƒ.ComponentTransform();
            cmpTransform.local.translate(new BomberMan.ƒ.Vector3(_position.x, _position.y, 0));
            let mesh = new BomberMan.ƒ.MeshCube();
            let cmpMesh = new BomberMan.ƒ.ComponentMesh(mesh);
            let material = new BomberMan.ƒ.Material("SolidWhite", BomberMan.ƒ.ShaderFlat, new BomberMan.ƒ.CoatColored(BomberMan.ƒ.Color.CSS("WHITE")));
            let cmpMaterial = new BomberMan.ƒ.ComponentMaterial(material);
            floor.addComponent(cmpTransform);
            floor.addComponent(cmpMesh);
            floor.addComponent(cmpMaterial);
            console.log("Here");
            return floor;
        }
        static loadImages() {
            Map.floorImg = document.querySelector("#floor");
        }
        createTerrainNode(_img) {
            let txt = new BomberMan.ƒ.TextureImage();
            let coat = new BomberMan.ƒ.CoatTextured();
            txt.image = _img;
            coat.texture = txt;
            let mesh = new BomberMan.ƒ.MeshSprite();
            let mtr = new BomberMan.ƒ.Material("mtrTerrain", BomberMan.ƒ.ShaderTexture, coat);
            let terrain = new BomberMan.ƒAid.Node("Terrain", BomberMan.ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
            let terrainsCmpMesh = terrain.getComponent(BomberMan.ƒ.ComponentMesh);
            terrainsCmpMesh.pivot.scale(new BomberMan.ƒ.Vector3(20, 20, 0));
            return terrain;
        }
        getTextureMaterial(_name, _img) {
            let txt = new BomberMan.ƒ.TextureImage();
            let coatTxt = new BomberMan.ƒ.CoatTextured();
            txt.image = _img;
            coatTxt.texture = txt;
            return new BomberMan.ƒ.Material(_name, BomberMan.ƒ.ShaderTexture, coatTxt);
        }
        createGround() {
            let floor = new BomberMan.ƒ.Node("Floor");
            return floor;
        }
        createBox() {
            let floor = new BomberMan.ƒ.Node("Floor");
            return floor;
        }
    }
    BomberMan.Map = Map;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    BomberMan.firstMap = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ];
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class MapGenerator {
        static generateWorld() {
            return new BomberMan.Map(BomberMan.firstMap);
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
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map