namespace BomberMan {
  export class Explosion extends ƒAid.NodeSprite {
    protected static animations: ƒAid.SpriteSheetAnimations;

    private gameManager: GameManager;
    private position: ƒ.Vector2;
    private map: Map;
    private type: number = 3;
    private dir: DIRECTION;
    private count: number;

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
      this.mtxLocal.translate(new ƒ.Vector3(-0.5, -0.5, 1));

      this.setAnimation(<ƒAid.SpriteSheetAnimation>Explosion.animations["Explosion"]);
    }


    public static generateSprites(_coat: ƒ.CoatTextured): void {
      Explosion.animations = {};

      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Explosion", _coat);
      let startRect: ƒ.Rectangle = new ƒ.Rectangle(0, 0, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      Explosion.animations["Explosion"] = sprite;
    }
  }
}