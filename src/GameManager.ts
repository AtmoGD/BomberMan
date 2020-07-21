namespace BomberMan {
  export class GameManager {
    private viewport: ƒ.Viewport;
    public graph: ƒ.Node;
    private camera: ƒ.ComponentCamera;

    public map: Map = null;
    public mans: Man[] = [];
    public destroyables: Destroyable[] = [];
    public bomberman: BomberMan = null;

    private gameOver: boolean = false;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node, _camera: ƒ.ComponentCamera) {

      this.viewport = _viewport;
      this.graph = _graph;
      this.camera = _camera;
    }

    public startGame(): void {
      Map.loadImages();
      this.map = MapGenerator.generateRandomMap(21);
      this.graph.appendChild(this.map);

      this.loadSprites();
      this.bomberman = new BomberMan(this.map, this, "Bomberman");
      this.graph.appendChild(this.bomberman);

    }
    public checkCollisionAll(_target: ƒ.Vector3): Man | Destroyable | null {

      let restDest: Destroyable | null = this.checkCollisionDestroyables(_target);
      let restMan: Man | null = this.checkCollisionMans(_target);
      return restDest ? restDest : restMan;
    }

    public checkCollisionDestroyables(_pos: ƒ.Vector3): Destroyable | null {
      for (let dest of this.destroyables) {
        if (dest.mtxLocal.translation.isInsideSphere(_pos, 1)) {
          return dest;
        }
      }
      return null;
    }

    public checkCollisionMans(_pos: ƒ.Vector3): Man | null {
      for (let man of this.mans) {
        if (man.mtxLocal.translation.isInsideSphere(_pos, 1)) {
          return man;
        }
      }
      return null;
    }

    public getMap(): Map {
      return this.map;
    }

    private loadSprites(): void {
      let img: HTMLImageElement = document.querySelector("#spritesheet");
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
      coat.texture = new ƒ.TextureImage();
      coat.texture.image = img;
      BomberMan.generateSprites(coat);
      Bomb.takeCoat(coat);
      Explosion.generateSprites(coat);
    }
  }
}