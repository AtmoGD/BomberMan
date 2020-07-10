namespace BomberMan {
  export class GameManager {

    private viewport: ƒ.Viewport;
    private graph: ƒ.Node;

    private map: Map = null;
    private destroyables: Destroyable[] = [];
    private gameOver: boolean = false;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node) {
      this.viewport = _viewport;
      this.graph = _graph;
    }

    public startGame(): void {
      Map.loadImages();
      this.map = MapGenerator.generateWorld();
      this.graph.appendChild(this.map);
    }

    public getMap(): Map {
      return this.map;
    }
  }
}