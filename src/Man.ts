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

    protected bombLevel: number = 1;
    protected bombSpeed: number = 1;
    protected canBomb: boolean = true;
    protected action: ACTION;
    protected map: Map;
    protected position: ƒ.Vector2;
    protected destiny: ƒ.Vector2;

    constructor(_map: Map, _name?: string) {
      super(_name ? _name : "Man");
      this.map = _map;
      this.position = this.map.createSpawnPoint(3);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translation = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
      this.mtxLocal.translateX(-0.5);
      this.mtxLocal.translateY(-0.5);
      this.mtxLocal.translateZ(1);
      this.destiny = this.position;

      console.log(this.position);
      this.show(ACTION.IDLE, DIRECTION.DOWN);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public update(_event: ƒ.Eventƒ): void {

    }

    public generateSprites(): void {
      console.log("generateSprites");
    }

    protected move(_dir: DIRECTION): void {
      let newPos: ƒ.Mutator = this.position.getMutator();

      switch (_dir) {
        case DIRECTION.UP:
          newPos.y -= 1;
          break;
        case DIRECTION.DOWN:
          newPos.y += 1;
          break;
        case DIRECTION.LEFT:
          newPos.x -= 1;
          break;
        case DIRECTION.RIGHT:
          newPos.x += 1;
          break;
      }

      if (this.map.data[newPos.y][newPos.x] != 0)
        return;
      
      this.position.mutate(newPos);
      this.mtxLocal.translation = this.map.mapElements[newPos.y][newPos.x].mtxLocal.translation;
      this.mtxLocal.translateX(-0.5);
      this.mtxLocal.translateY(-0.5);
      this.mtxLocal.translateZ(1);
      this.show(ACTION.IDLE, _dir);
    }

    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action + _direction]);
    }
  }

}