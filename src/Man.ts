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
    protected bombLevel: number = 1;
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

    constructor(_map: Map, _gameManager: GameManager, _type: number, _name?: string) {
      super(_name ? _name : "Man");
      this.map = _map;
      this.type = _type;
      this.gameManager = _gameManager;
      this.position = this.map.createSpawnPoint(this.type);

      this.transform = new ƒ.ComponentTransform();
      this.addComponent(this.transform);
      this.transform.local.translation = this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
      this.mtxLocal.translateX(-0.5);
      this.mtxLocal.translateY(-0.5);
      this.mtxLocal.translateZ(1);

      this.show(ACTION.IDLE, DIRECTION.DOWN);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }


    public update(): void {

      if (this.distance > 0) {

        switch (this.direc) {
          case DIRECTION.UP:
            this.mtxLocal.translateY((1 / Data.fps) * this.speed);
            break;
          case DIRECTION.DOWN:
            this.mtxLocal.translateY(-(1 / Data.fps) * this.speed);
            break;
          case DIRECTION.LEFT:
            this.mtxLocal.translateX(-(1 / Data.fps) * this.speed);
            break;
          case DIRECTION.RIGHT:
            this.mtxLocal.translateX((1 / Data.fps) * this.speed);
            break;
        }
        this.distance -= (1 / Data.fps) * this.speed;
      }else {
        this.show(ACTION.IDLE, this.direc);
      }
    }

    public generateSprites(): void {
      console.log("generateSprites");
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
      if (mapData == 1 || mapData == 2)
        return;

      this.map.data[this.position.y][this.position.x] = 0;
      this.position.mutate(newPos);
      this.map.data[this.position.y][this.position.x] = this.type;

      this.direc = _dir;
      this.distance = 1;
      this.show(ACTION.WALK, this.direc);
    }

    public checkCollision(_pos: ƒ.Mutator): boolean {

      return false;
    }

    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action + _direction]);
    }
  }

}