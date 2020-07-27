namespace BomberMan {
  export class EnemyMan extends Man {
    constructor(_map: Map, _gameManager: GameManager, _name?: string) {
      super(_map, _gameManager, 5, _name ? _name : "BomberMan");
    }

    public static generateSprites(_coat: ƒ.CoatTextured): void {
      EnemyMan.animations = {};

      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.UP, _coat);
      let startRect: ƒ.Rectangle = new ƒ.Rectangle(0, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.IDLE + DIRECTION.UP] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.DOWN, _coat);
      startRect = new ƒ.Rectangle(16, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.IDLE + DIRECTION.DOWN] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.LEFT, _coat);
      startRect = new ƒ.Rectangle(208, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.IDLE + DIRECTION.LEFT] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.RIGHT, _coat);
      startRect = new ƒ.Rectangle(64, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.IDLE + DIRECTION.RIGHT] = sprite;



      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.UP, _coat);
      startRect = new ƒ.Rectangle(128, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 2, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.WALK + DIRECTION.UP] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.DOWN, _coat);
      startRect = new ƒ.Rectangle(32, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 2, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.WALK + DIRECTION.DOWN] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.LEFT, _coat);
      startRect = new ƒ.Rectangle(160, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.WALK + DIRECTION.LEFT] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.RIGHT, _coat);
      startRect = new ƒ.Rectangle(80, -64, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      EnemyMan.animations[ACTION.WALK + DIRECTION.RIGHT] = sprite;
    }
    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>EnemyMan.animations[_action + _direction]);
    }
  }
}