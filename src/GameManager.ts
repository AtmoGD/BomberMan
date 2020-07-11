namespace BomberMan {
  export class GameManager {

    private viewport: ƒ.Viewport;
    private graph: ƒ.Node;

    private map: Map = null;
    private bomberman: BomberMan = null;
    private destroyables: Destroyable[] = [];
    private gameOver: boolean = false;

    private spritesheet: ƒ.CoatTextured;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node) {
      this.viewport = _viewport;
      this.graph = _graph;
    }

    public startGame(): void {
      Map.loadImages();
      this.map = MapGenerator.generateRandomMap(21);
      this.graph.appendChild(this.map);

      this.loadSprites();
      this.bomberman = new BomberMan("Bomberman");
      this.graph.appendChild(this.bomberman);
    }

    public getMap(): Map {
      return this.map;
    }

    private loadSprites(): void {
      let img: HTMLImageElement = document.querySelector("spritesheet");
      let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Spritesheet", img);
      Man.generateSprites(spritesheet);
    }
  }
}