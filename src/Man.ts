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
    private static animations: ƒAid.SpriteSheetAnimations;

    private bombLevel: number = 1;
    private bombSpeed: number = 1;
    private canBomb: boolean = true;
    private action: ACTION;

    constructor(_name?: string) {
      super(_name ? _name : "Man");
      this.addComponent(new ƒ.ComponentTransform());
      this.show(ACTION.IDLE);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      
      Man.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(1, 1, 1, 1), 6, ƒ.Vector2.ZERO(), 2, ƒ.ORIGIN2D.CENTER);
      Man.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(1, 20, 45, 72), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Man.animations[ACTION.IDLE] = sprite;
      sprite.frames[2].timeScale = 10;
    }

    private update = (_event: ƒ.Eventƒ): void => {
    }

    public show(_action: ACTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Man.animations[_action]);
    }
  }
  
}