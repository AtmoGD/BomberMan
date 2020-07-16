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
    protected position: ƒ.Vector2;
    protected speed: number = 4;

    constructor(_map: Map, _gameManager: GameManager, _name?: string) {
      super(_name ? _name : "Man");
      this.map = _map; 
      this.gameManager = _gameManager;
      this.position = this.map.createSpawnPoint(3);

      this.addComponent(new ƒ.ComponentTransform());
      // this.mtxLocal.scaling = ƒ.Vector3.ONE();
      this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation.copy;
      this.mtxLocal.translateX(-0.5);
      this.mtxLocal.translateY(-0.5);
      this.mtxLocal.translateZ(1);

      console.log(this.position);
      console.log(this.mtxLocal);
      console.log(this.map);

      this.show(ACTION.IDLE, DIRECTION.DOWN);
    }


    public generateSprites(): void {
      console.log("generateSprites");
    }

    protected move(_dir: DIRECTION): void {

      console.log(this.mtxLocal);

      let pos: ƒ.Matrix4x4 = this.mtxLocal.copy;

      switch (_dir) {
        case DIRECTION.UP:
          pos.translateY(1 / Data.fps * this.speed);
          break;
        case DIRECTION.DOWN:
          pos.translateY(-1 / Data.fps * this.speed);
          break;
        case DIRECTION.LEFT:
          pos.translateX(-1 / Data.fps * this.speed);
          break;
        case DIRECTION.RIGHT:
          pos.translateX(1 / Data.fps * this.speed);
          break;
      }

      if (this.gameManager.checkCollisionAll(pos.translation))
        return;

      this.mtxLocal.translation = pos.translation;
      this.show(ACTION.WALK, _dir);
    }

    public checkCollision(_pos: ƒ.Mutator): boolean {

      return false;
    }

    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action + _direction]);
    }
  }

}