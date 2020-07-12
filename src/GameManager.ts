namespace BomberMan {
  export class GameManager {

    private viewport: ƒ.Viewport;
    private graph: ƒ.Node;
    private camera: ƒ.ComponentCamera;

    private map: Map = null;
    public bomberman: BomberMan = null;
    private destroyables: Destroyable[] = [];
    private gameOver: boolean = false;

    private spritesheet: ƒ.CoatTextured;

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
      this.bomberman = new BomberMan(this.map, "Bomberman");
      this.graph.appendChild(this.bomberman);

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
    }
  }
}