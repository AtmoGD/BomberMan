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
        console.log(page);
        switch (page) {
            case "index.html":
            case "":
                BomberMan.initStartScreen();
                break;
            case "Game":
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
    class Bomb extends BomberMan.ƒAid.NodeSprite {
        constructor(_map, _gameManager, _position, _level) {
            super("Bomb");
            this.lifetime = 1000;
            this.type = 3;
            this.generateAnimations();
            this.level = _level;
            this.gameManager = _gameManager;
            this.map = _map;
            this.position = _position;
            this.addComponent(new BomberMan.ƒ.ComponentTransform());
            let pos = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translation = pos;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 0.1));
            this.map.data[this.position.y][this.position.x] = this.type;
            this.setAnimation(this.animations["Explode"]);
            setTimeout(this.explode.bind(this), this.lifetime);
        }
        explode() {
            this.map.data[this.position.y][this.position.x] = 0;
            let up = new BomberMan.Explosion(this.gameManager, this.map, this.position, BomberMan.DIRECTION.UP, this.level);
            this.gameManager.graph.appendChild(up);
            let down = new BomberMan.Explosion(this.gameManager, this.map, this.position, BomberMan.DIRECTION.DOWN, this.level);
            this.gameManager.graph.appendChild(down);
            let left = new BomberMan.Explosion(this.gameManager, this.map, this.position, BomberMan.DIRECTION.LEFT, this.level);
            this.gameManager.graph.appendChild(left);
            let right = new BomberMan.Explosion(this.gameManager, this.map, this.position, BomberMan.DIRECTION.RIGHT, this.level);
            this.gameManager.graph.appendChild(right);
            this.gameManager.graph.removeChild(this);
        }
        generateAnimations() {
            this.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation("Bomb", Bomb.coat);
            let startRect = new BomberMan.ƒ.Rectangle(48, 0, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.frames.forEach(frame => {
                frame.timeScale = this.lifetime * 4 / 1000;
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
        constructor(_map, _gameManager, _type, _level, _maxLevel, _name) {
            super(_name ? _name : "Man");
            this.maxLevel = 1;
            this.bombLevel = 1;
            this.bombSpeed = 3;
            this.speed = 2;
            this.canBomb = true;
            this.dead = false;
            this.position = BomberMan.ƒ.Vector2.ZERO();
            this.direc = DIRECTION.DOWN;
            this.distance = 0;
            this.map = _map;
            this.type = _type;
            this.gameManager = _gameManager;
            this.maxLevel = _maxLevel;
            this.position = this.map.getRandomSpawnPoint(this.type);
            for (let i = 0; i < _level - this.bombLevel; i++) {
                this.upgrade();
            }
            this.transform = new BomberMan.ƒ.ComponentTransform();
            this.addComponent(this.transform);
            this.transform.local.translation = this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 0.1));
            this.addEventListener("upgrade", this.upgrade.bind(this), true);
            this.show(ACTION.IDLE, DIRECTION.DOWN);
            BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update() {
            if (this.dead)
                return;
            this.movement();
        }
        upgrade() {
            if (this.bombLevel >= this.maxLevel)
                return;
            this.bombLevel++;
            this.bombSpeed *= 0.9;
            this.speed *= 1.1;
        }
        generateSprites() {
            console.log("generateSprites");
        }
        die() {
            console.log("Wants to die");
        }
        getPosition() {
            return this.position.copy;
        }
        movement() {
            if (this.distance > 0) {
                let dist = (1 / BomberMan.data.fps) * this.speed;
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
            if (mapData != 0)
                return;
            this.map.data[this.position.y][this.position.x] = 0;
            this.position.mutate(newPos);
            this.map.data[this.position.y][this.position.x] = this.type;
            this.direc = _dir;
            this.distance = 1;
            this.show(ACTION.WALK, this.direc);
        }
        placeBomb() {
            if (!this.canBomb)
                return;
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
            let bomb = new BomberMan.Bomb(this.map, this.gameManager, bombPos, this.bombLevel);
            this.gameManager.graph.appendChild(bomb);
            this.canBomb = false;
            setTimeout(() => { this.canBomb = true; }, this.bombSpeed * 1000);
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
            super(_map, _gameManager, 4, BomberMan_1.data.playerStartLevel, BomberMan_1.data.playerMaxLevel, _name ? _name : "BomberMan");
            this.lives = 3;
            this.score = 0;
            this.lives = BomberMan_1.data.playerStartLives;
            this.speed *= 2;
            this.initKeyEvent();
            this.liveElement = document.querySelector("#lives");
            this.liveElement.innerText = this.lives.toString();
            this.scoreElement = document.querySelector("#score");
            this.endScoreElement = document.querySelector("#endScore");
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
        takeScore(_amount) {
            this.score += _amount;
            if (this.scoreElement)
                this.scoreElement.innerText = this.score.toString();
        }
        getScore() {
            return this.score;
        }
        die() {
            this.lives--;
            if (this.liveElement)
                this.liveElement.innerText = this.lives.toString();
            if (this.endScoreElement)
                this.endScoreElement.innerText = this.score.toString();
            if (this.lives <= 0) {
                setTimeout(() => {
                    let gameOver = new CustomEvent("gameOver", { bubbles: true });
                    this.dispatchEvent(gameOver);
                }, 100);
            }
        }
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
            startRect = new BomberMan_1.ƒ.Rectangle(160, -16, 16, 16, BomberMan_1.ƒ.ORIGIN2D.BOTTOMLEFT);
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
    class Box extends BomberMan.ƒAid.Node {
        constructor(_y, _x, _map, _trans, _mesh) {
            super("Box", BomberMan.ƒ.Matrix4x4.IDENTITY(), _map.getBoxMaterial(), _mesh);
            this.map = _map;
            this.trans = _trans;
            this.x = _x;
            this.y = _y;
            this.pos = new BomberMan.ƒ.Vector2(_y, _x);
            this.mat = this.getComponent(BomberMan.ƒ.ComponentMaterial);
            let cmpTransform = this.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(this.trans);
        }
        die() {
            this.map.data[this.pos.x][this.pos.y] = 0;
            this.mat.material = this.map.getGrasMaterial();
            setTimeout(this.respawn.bind(this), BomberMan.data.boxRespawnTime);
        }
        respawn() {
            if (this.map.data[this.pos.x][this.pos.y] != 0) {
                setTimeout(this.respawn.bind(this), BomberMan.data.boxRespawnTime);
                return;
            }
            this.map.data[this.pos.x][this.pos.y] = 2;
            this.mat.material = this.map.getBoxMaterial();
        }
    }
    BomberMan.Box = Box;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class EnemyMan extends BomberMan.Man {
        constructor(_map, _gameManager, _name) {
            super(_map, _gameManager, 5, BomberMan.data.enemyStartLevel, BomberMan.data.enemyMaxLevel, _name ? _name : "BomberMan");
            this.wait = false;
            this.speed = BomberMan.data.enemySpeed;
            this.bombSpeed = BomberMan.data.enemyBombSpeed;
        }
        update() {
            if (this.dead)
                return;
            super.update();
            if (this.distance == 0)
                this.decideAction();
        }
        die() {
            this.gameManager.bomberman.takeScore(this.bombLevel * 100);
            this.dead = true;
            this.map.data[this.position.y][this.position.x] = 0;
            this.gameManager.graph.removeChild(this);
            setTimeout(() => { this.gameManager.createEnemy(); }, 2000);
        }
        decideAction() {
            if (this.wait)
                return;
            if (this.checkIfPlayerIsInRange())
                this.placeBomb();
            let rndDirection = Math.floor(Math.random() * 5);
            switch (rndDirection) {
                case 0:
                    this.move(BomberMan.DIRECTION.UP);
                    break;
                case 1:
                    this.move(BomberMan.DIRECTION.DOWN);
                    break;
                case 2:
                    this.move(BomberMan.DIRECTION.LEFT);
                    break;
                case 3:
                    this.move(BomberMan.DIRECTION.RIGHT);
                    break;
                case 4:
                    this.wait = true;
                    setTimeout(() => { this.wait = false; }, Math.random() * 1000);
                    break;
            }
        }
        checkIfPlayerIsInRange() {
            let playerPosition = this.gameManager.bomberman.getPosition();
            playerPosition.subtract(this.position);
            if (playerPosition.magnitude < BomberMan.data.enemyRange)
                return true;
            return false;
        }
        static generateSprites(_coat) {
            EnemyMan.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.IDLE + BomberMan.DIRECTION.UP, _coat);
            let startRect = new BomberMan.ƒ.Rectangle(0, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.IDLE + BomberMan.DIRECTION.UP] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.IDLE + BomberMan.DIRECTION.DOWN, _coat);
            startRect = new BomberMan.ƒ.Rectangle(16, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.IDLE + BomberMan.DIRECTION.DOWN] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.IDLE + BomberMan.DIRECTION.LEFT, _coat);
            startRect = new BomberMan.ƒ.Rectangle(208, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.IDLE + BomberMan.DIRECTION.LEFT] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.IDLE + BomberMan.DIRECTION.RIGHT, _coat);
            startRect = new BomberMan.ƒ.Rectangle(64, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 1, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.IDLE + BomberMan.DIRECTION.RIGHT] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.WALK + BomberMan.DIRECTION.UP, _coat);
            startRect = new BomberMan.ƒ.Rectangle(128, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 2, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.WALK + BomberMan.DIRECTION.UP] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.WALK + BomberMan.DIRECTION.DOWN, _coat);
            startRect = new BomberMan.ƒ.Rectangle(32, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 2, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.WALK + BomberMan.DIRECTION.DOWN] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.WALK + BomberMan.DIRECTION.LEFT, _coat);
            startRect = new BomberMan.ƒ.Rectangle(160, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.WALK + BomberMan.DIRECTION.LEFT] = sprite;
            sprite = new BomberMan.ƒAid.SpriteSheetAnimation(BomberMan.ACTION.WALK + BomberMan.DIRECTION.RIGHT, _coat);
            startRect = new BomberMan.ƒ.Rectangle(80, -64, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            EnemyMan.animations[BomberMan.ACTION.WALK + BomberMan.DIRECTION.RIGHT] = sprite;
        }
        show(_action, _direction) {
            this.setAnimation(EnemyMan.animations[_action + _direction]);
        }
    }
    BomberMan.EnemyMan = EnemyMan;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class Explosion extends BomberMan.ƒAid.NodeSprite {
        constructor(_gameManager, _map, _position, _dir, _count) {
            super("Explosion");
            this.end = false;
            this.gameManager = _gameManager;
            this.map = _map;
            this.position = _position;
            this.dir = _dir;
            this.count = _count;
            this.addComponent(new BomberMan.ƒ.ComponentTransform());
            let pos = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
            this.mtxLocal.translation = pos;
            this.mtxLocal.translate(new BomberMan.ƒ.Vector3(-0.5, -0.5, 0.1));
            this.setAnimation(Explosion.animations["Explosion"]);
            setTimeout(this.breed.bind(this), 100);
            setTimeout(this.die.bind(this), 1000);
            let checkingType = this.map.data[this.position.y][this.position.x];
            switch (checkingType) {
                case 2:
                    this.map.destroyBox(this.position);
                    this.end = true;
                    break;
                case 4:
                    this.gameManager.bomberman.die();
                    this.end = true;
                    break;
                case 5:
                    let enemy = this.gameManager.getEnemy(this.position);
                    enemy.die();
                    break;
            }
        }
        breed() {
            if (this.count <= 0)
                return;
            let pos = this.position.copy;
            switch (this.dir) {
                case BomberMan.DIRECTION.UP:
                    if (this.map.data[this.position.y + 1][this.position.x] == 1)
                        return;
                    pos.y += 1;
                    break;
                case BomberMan.DIRECTION.DOWN:
                    if (this.map.data[this.position.y - 1][this.position.x] == 1)
                        return;
                    pos.y -= 1;
                    break;
                case BomberMan.DIRECTION.LEFT:
                    if (this.map.data[this.position.y][this.position.x - 1] == 1)
                        return;
                    pos.x -= 1;
                    break;
                case BomberMan.DIRECTION.RIGHT:
                    if (this.map.data[this.position.y][this.position.x + 1] == 1)
                        return;
                    pos.x += 1;
                    break;
            }
            let explosion = new Explosion(this.gameManager, this.map, pos, this.dir, this.count - 1);
            this.gameManager.graph.appendChild(explosion);
        }
        die() {
            this.gameManager.graph.removeChild(this);
        }
        static generateSprites(_coat) {
            Explosion.animations = {};
            let sprite = new BomberMan.ƒAid.SpriteSheetAnimation("Explosion", _coat);
            let startRect = new BomberMan.ƒ.Rectangle(0, 0, 16, 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.generateByGrid(startRect, 3, BomberMan.ƒ.Vector2.ZERO(), 16, BomberMan.ƒ.ORIGIN2D.BOTTOMLEFT);
            sprite.frames.forEach(frame => {
                frame.timeScale = 4;
            });
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
    let canvas;
    let startOverlay;
    let gameOverlay;
    let gameOverOverlay;
    let startButton;
    let playAgainButton;
    // ƒ.RenderManager.initialize(true, true);
    async function initGame() {
        getReferences();
        installEventListener();
        await loadData();
        camera = new BomberMan.ƒ.ComponentCamera();
        camera.pivot.translateZ(BomberMan.data.cameraDistance);
        camera.pivot.rotateY(180);
        let cameraLookAt = new BomberMan.ƒ.Vector3(1, 1, 0);
        camera.pivot.lookAt(cameraLookAt);
        graph = new BomberMan.ƒ.Node("Graph");
        canvas = document.querySelector("canvas");
        viewport = new BomberMan.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        gameManager = new BomberMan.GameManager(viewport, graph, camera);
        viewport.draw();
        BomberMan.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        BomberMan.ƒ.Loop.start(BomberMan.ƒ.LOOP_MODE.TIME_REAL, BomberMan.data.fps);
    }
    BomberMan.initGame = initGame;
    function update() {
        viewport.draw();
    }
    async function loadData() {
        let rawData = await fetch("../src/Data.json");
        BomberMan.data = JSON.parse(await rawData.text());
    }
    function getReferences() {
        startOverlay = document.querySelector("#startOverlay");
        gameOverlay = document.querySelector("#gameOverlay");
        gameOverOverlay = document.querySelector("#gameOverOverlay");
        startButton = document.querySelector("#startButton");
        playAgainButton = document.querySelector("#playAgain");
    }
    function installEventListener() {
        startButton.addEventListener("click", startGame);
        playAgainButton.addEventListener("click", () => { window.location.reload(); });
        window.addEventListener("resize", updateGUI);
    }
    function updateGUI() {
        gameOverlay.style.width = canvas.width.toString() + "px";
        gameOverlay.style.height = canvas.height.toString() + "px";
        gameOverOverlay.style.width = canvas.width.toString() + "px";
        gameOverOverlay.style.height = canvas.height.toString() + "px";
    }
    function startGame() {
        startOverlay.style.display = "none";
        gameOverOverlay.style.display = "none";
        gameOverlay.style.display = "flex";
        gameOverlay.style.width = canvas.width.toString() + "px";
        gameOverlay.style.height = canvas.height.toString() + "px";
        gameOverOverlay.style.width = canvas.width.toString() + "px";
        gameOverOverlay.style.height = canvas.height.toString() + "px";
        gameManager.startGame();
        viewport.draw();
    }
    function endGame() {
        startOverlay.style.display = "none";
        gameOverOverlay.style.display = "flex";
        gameOverlay.style.display = "none";
    }
    BomberMan.endGame = endGame;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class GameManager {
        constructor(_viewport, _graph, _camera) {
            this.map = null;
            this.mans = [];
            this.bomberman = null;
            this.enemys = [];
            this.gameOver = false;
            this.viewport = _viewport;
            this.graph = _graph;
            this.camera = _camera;
            this.upgrade = new CustomEvent("upgrade", { bubbles: true });
        }
        startGame() {
            BomberMan.Map.loadImages();
            this.loadSprites();
            this.map = BomberMan.MapGenerator.generateRandomMap(BomberMan.data.mapSize);
            this.bomberman = new BomberMan.BomberMan(this.map, this, "Bomberman");
            for (let i = 0; i < BomberMan.data.enemyCount; i++) {
                this.createEnemy();
            }
            this.graph.appendChild(this.map);
            this.graph.appendChild(this.bomberman);
            this.graph.addEventListener("gameOver", () => {
                BomberMan.ƒ.Loop.stop();
                BomberMan.endGame();
            });
            setInterval(() => {
                this.graph.broadcastEvent(this.upgrade);
            }, BomberMan.data.upgradeSpeed);
        }
        getMap() {
            return this.map;
        }
        createEnemy() {
            let newEnemy = new BomberMan.EnemyMan(this.map, this, "EnemyMan");
            this.enemys.push(newEnemy);
            this.graph.appendChild(newEnemy);
        }
        getEnemy(_position) {
            for (let enemy of this.enemys) {
                let enemyPos = enemy.getPosition();
                if (_position.x == enemyPos.x && _position.y == enemyPos.y)
                    return enemy;
            }
            return null;
        }
        loadSprites() {
            let img = document.querySelector("#spritesheet");
            let coat = new BomberMan.ƒ.CoatTextured();
            coat.texture = new BomberMan.ƒ.TextureImage();
            coat.texture.image = img;
            BomberMan.BomberMan.generateSprites(coat);
            BomberMan.EnemyMan.generateSprites(coat);
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
            this.boxes = [];
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
                    tile = this.createBox(_y, _x, _pos);
                    this.boxes.push(tile);
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
        getRandomSpawnPoint(_type) {
            let x = Math.floor(Math.random() * this.data[0].length);
            let y = Math.floor(Math.random() * this.data.length);
            if (this.data[y][x] == 0) {
                this.data[y][x] = _type;
                return new BomberMan.ƒ.Vector2(x, y);
            }
            else
                return this.getRandomSpawnPoint(_type);
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
            let gras = new BomberMan.ƒAid.Node("gras", BomberMan.ƒ.Matrix4x4.IDENTITY(), this.getGrasMaterial(), mesh);
            let cmpTransform = gras.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(_pos);
            return gras;
        }
        getGrasMaterial() {
            return BomberMan.getTextureMaterial("Gras", Map.grasImg);
        }
        createWallTop(_pos) {
            let mesh = new BomberMan.ƒ.MeshSprite();
            let mtr = BomberMan.getTextureMaterial("WallTop", Map.walltImg);
            let wallt = new BomberMan.ƒAid.Node("walltop", BomberMan.ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
            let cmpTransform = wallt.getComponent(BomberMan.ƒ.ComponentTransform);
            cmpTransform.local.translate(_pos);
            return wallt;
        }
        createBox(_y, _x, _pos) {
            let mesh = new BomberMan.ƒ.MeshSprite();
            return new BomberMan.Box(_y, _x, this, _pos, mesh);
        }
        destroyBox(_pos) {
            this.boxes.forEach(box => {
                if (box.x == _pos.x && box.y == _pos.y) {
                    box.die();
                }
            });
        }
        getBoxMaterial() {
            return BomberMan.getTextureMaterial("Box", Map.boxImg);
        }
    }
    BomberMan.Map = Map;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    class MapGenerator {
        static generateRandomMap(_size, _mode) {
            if (!_size)
                _size = Math.floor((Math.random() * 5) + 5);
            let mode = _mode;
            if (!mode)
                mode = Math.floor(Math.random() * 3);
            switch (mode) {
                case 0:
                    return new BomberMan.Map(this.randomGrid(_size));
                case 1:
                //return new Map(this.randomCross(_size));
                default:
                    return new BomberMan.Map(this.standardMap(_size));
            }
        }
        static standardMap(_size) {
            let _data = [];
            for (let i = 0; i < _size; i++)
                _data[i] = [];
            for (let y = 0; y < _size; y++) {
                for (let x = 0; x < _size; x++) {
                    if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
                        _data[y][x] = 1;
                    }
                    else {
                        if (x % 2 == 0 && y % 2 == 0) {
                            _data[y][x] = 1;
                        }
                        else {
                            _data[y][x] = 0;
                        }
                    }
                }
            }
            _data = MapGenerator.addBoxes(_data, _size);
            return _data;
        }
        static addBoxes(_data, _count) {
            let x = Math.floor(Math.random() * _data[0].length);
            let y = Math.floor(Math.random() * _data.length);
            if (_data[y][x] == 0) {
                _data[y][x] = 2;
                _count--;
            }
            if (_count <= 0)
                return _data;
            else
                return MapGenerator.addBoxes(_data, _count);
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
                        if (x % rndSize == 0 || y % rndSize == 0) {
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