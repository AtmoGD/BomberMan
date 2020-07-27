///<reference path="Destroyable.ts"/>
namespace BomberMan {
  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk"
  }

  export enum DIRECTION {
    LEFT, RIGHT, UP, DOWN
  }

  export class Man extends ƒAid.NodeSprite {
    protected static animations: ƒAid.SpriteSheetAnimations;

    protected gameManager: GameManager;
    protected bombLevel: number = 3;
    protected bombSpeed: number = 1;
    protected canBomb: boolean = true;
    protected action: ACTION;
    protected map: Map;
    protected type: number;
    protected position: ƒ.Vector2 = ƒ.Vector2.ZERO();
    protected speed: number = 4;
    protected direc: DIRECTION = DIRECTION.DOWN;
    protected distance: number = 0;
    protected transform: ƒ.ComponentTransform;
    protected dead: boolean = false;

    constructor(_map: Map, _gameManager: GameManager, _type: number, _name?: string) {
      super(_name ? _name : "Man");
      this.map = _map;
      this.type = _type;
      this.gameManager = _gameManager;
      this.position = this.map.getRandomSpawnPoint(this.type);

      this.transform = new ƒ.ComponentTransform();
      this.addComponent(this.transform);
      this.transform.local.translation = this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
      this.mtxLocal.translate(new ƒ.Vector3(-0.5, -0.5, 1));

      this.show(ACTION.IDLE, DIRECTION.DOWN);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }


    protected update(): void {
      if (this.dead)
        return;
        
      this.movement();
    }

    public generateSprites(): void {
      console.log("generateSprites");
    }

    public die(): void {
      console.log("Wants to die");
    }

    public getPosition(): ƒ.Vector2 {
      return this.position.copy;
    }

    protected movement(): void {
      if (this.distance > 0) {
        let dist: number = (1 / data.fps) * this.speed;
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
      } else {
        this.show(ACTION.IDLE, this.direc);
      }
    }
    protected move(_dir: DIRECTION): void {

      if (this.distance > 0)
        return;

      let newPos: ƒ.Mutator = this.position.getMutator();
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

      let mapData: number = this.map.data[newPos.y][newPos.x];
      if (mapData != 0)
        return;

      this.map.data[this.position.y][this.position.x] = 0;
      this.position.mutate(newPos);
      this.map.data[this.position.y][this.position.x] = this.type;

      this.direc = _dir;
      this.distance = 1;
      this.show(ACTION.WALK, this.direc);
    }

    public placeBomb(): void {
      if (!this.canBomb)
        return;

      let bombPos: ƒ.Vector2 = this.position.copy;
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
      let mapData: number = this.map.data[bombPos.y][bombPos.x];
      if (mapData == 1 || mapData == 2)
        return;

      let bomb: Bomb = new Bomb(this.map, this.gameManager, bombPos, this.bombLevel);
      this.gameManager.graph.appendChild(bomb);

      this.canBomb = false;
      setTimeout(() => { this.canBomb = true }, this.bombSpeed * 1000);
    }

    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action + _direction]);
    }
  }

}