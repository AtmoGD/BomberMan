namespace BomberMan {
  export class EnemyMan extends Man {
    private wait: boolean = false;

    constructor(_map: Map, _gameManager: GameManager, _name?: string) {
      super(_map, _gameManager, 5, _name ? _name : "BomberMan");
      this.speed = data.enemySpeed;
      this.bombSpeed = data.enemyBombSpeed;
    }

    protected update(): void {
      if (this.dead)
        return;

      super.update();

      if (this.distance == 0)
        this.decideAction();
    }

    public die(): void {
      this.dead = true;
      this.gameManager.graph.removeChild(this);
    }

    private decideAction(): void {
      if (this.wait)
        return;

      if (this.checkIfPlayerIsInRange())
        this.placeBomb();

      let rndDirection: number = Math.floor(Math.random() * 5);
      switch (rndDirection) {
        case 0:
          this.move(DIRECTION.UP);
          break;
        case 1:
          this.move(DIRECTION.DOWN);
          break;
        case 2:
          this.move(DIRECTION.LEFT);
          break;
        case 3:
          this.move(DIRECTION.RIGHT);
          break;
        case 4:
          this.wait = true;
          setTimeout(() => { this.wait = false }, Math.random() * 1000);
          break;
      }
    }

    private checkIfPlayerIsInRange(): boolean {
      let playerPosition: ƒ.Vector2 = this.gameManager.bomberman.getPosition();
      playerPosition.subtract(this.position);

      if (playerPosition.magnitude < data.enemyRange)
        return true;
      return false;
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