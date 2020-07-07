namespace BomberMan {
  export class GameManager {

    private viewport: ƒ.Viewport;
    private graph: ƒ.Node;

    private destroyables: Destroyable[] = [];
    private gameOver: boolean = false;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node) {
      this.viewport = _viewport;
      this.graph = _graph;

    }

    public startGame(): void {
      let bomberMan: BomberMan = new BomberMan();
      this.destroyables.push(bomberMan);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
      ƒ.Loop.start(Data.loopMode, Data.fps);
    }

    private update(): void {

    }
  }
}