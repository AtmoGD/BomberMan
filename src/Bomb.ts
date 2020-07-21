///<reference path="Main.ts"/>
namespace BomberMan {
  export class Bomb extends ƒAid.NodeSprite {
    protected static coat: ƒ.CoatTextured;

    protected animations: ƒAid.SpriteSheetAnimations;
    private gameManager: GameManager;
    private lifetime: number = 1000;
    private level: number;
    private position: ƒ.Vector2;
    private map: Map;
    private type: number = 3;

    constructor(_map: Map, _gameManager: GameManager, _position: ƒ.Vector2, _level: number) {
      super("Bomb");
      this.generateAnimations();
      this.level = _level;
      this.gameManager = _gameManager;
      this.map = _map;
      this.position = _position;

      this.addComponent(new ƒ.ComponentTransform());
      let pos: ƒ.Vector3 = this.map.mapElements[this.position.y][this.position.x].mtxLocal.translation;
      this.mtxLocal.translation = pos;
      this.mtxLocal.translate(new ƒ.Vector3(-0.5, -0.5, 1));

      this.map.data[this.position.y][this.position.x] = this.type;

      this.setAnimation(<ƒAid.SpriteSheetAnimation>this.animations["Explode"]);
      setTimeout(this.explode.bind(this), this.lifetime);
    }

    private explode(): void {
      this.map.data[this.position.y][this.position.x] = 0;
      let explosion: Explosion = new Explosion(this.gameManager, this.map, this.position, DIRECTION.UP, 3);
      this.gameManager.graph.appendChild(explosion);
      this.gameManager.graph.removeChild(this);
    }

    public generateAnimations(): void {
      this.animations = {};

      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Bomb", Bomb.coat);
      let startRect: ƒ.Rectangle = new ƒ.Rectangle(48, 0, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);

      sprite.frames.forEach(frame => {
        frame.timeScale = this.lifetime * 4 / 1000;
      });

      this.animations["Explode"] = sprite;
    }
    public static takeCoat(_coat: ƒ.CoatTextured): void {
      Bomb.coat = _coat;
    }
  }
}