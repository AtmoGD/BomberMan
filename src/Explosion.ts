namespace BomberMan {
  export class Explosion extends ƒAid.NodeSprite {
    protected static animations: ƒAid.SpriteSheetAnimations;

    private gameManager: GameManager;
    private position: ƒ.Vector2;
    private map: Map;
    private dir: DIRECTION;
    private count: number;
    private end: boolean = false;

    constructor(_gameManager: GameManager, _map: Map, _position: ƒ.Vector2, _dir: DIRECTION, _count: number) {
      super("Explosion");
      this.gameManager = _gameManager;
      this.map = _map;
      this.position = _position;
      this.dir = _dir;
      this.count = _count;

      this.addComponent(new ƒ.ComponentTransform());
      let pos: ƒ.Vector3 = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
      this.mtxLocal.translation = pos;
      this.mtxLocal.translate(new ƒ.Vector3(-0.5, -0.5, 0.1));

      this.setAnimation(<ƒAid.SpriteSheetAnimation>Explosion.animations["Explosion"]);

      setTimeout(this.breed.bind(this), 100);
      setTimeout(this.die.bind(this), 1000);

      let checkingType: number = this.map.data[this.position.y][this.position.x];
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
          let enemy: EnemyMan = this.gameManager.getEnemy(this.position);
          enemy.die();
          break;
      }
    }

    private breed(): void {
      if (this.count <= 0)
        return;

      let pos: ƒ.Vector2 = this.position.copy;

      switch (this.dir) {
        case DIRECTION.UP:
          if (this.map.data[this.position.y + 1][this.position.x] == 1)
            return;
          pos.y += 1;
          break;
        case DIRECTION.DOWN:
          if (this.map.data[this.position.y - 1][this.position.x] == 1)
            return;
          pos.y -= 1;
          break;
        case DIRECTION.LEFT:
          if (this.map.data[this.position.y][this.position.x - 1] == 1)
            return;
          pos.x -= 1;
          break;
        case DIRECTION.RIGHT:
          if (this.map.data[this.position.y][this.position.x + 1] == 1)
            return;
          pos.x += 1;
          break;
      }

      let explosion: Explosion = new Explosion(this.gameManager, this.map, pos, this.dir, this.count - 1);
      this.gameManager.graph.appendChild(explosion);
    }

    private die(): void {
      this.gameManager.graph.removeChild(this);
    }

    public static generateSprites(_coat: ƒ.CoatTextured): void {
      Explosion.animations = {};

      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Explosion", _coat);
      let startRect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);

      sprite.frames.forEach(frame => {
        frame.timeScale = 4;
      });

      Explosion.animations["Explosion"] = sprite;
    }
  }
}