namespace BomberMan {

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;
  
  let gameManager: GameManager;

  export function initGame(): void {
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(Data.cameraDistance);
    camera.pivot.rotateY(180);

    graph = new ƒ.Node("Graph");

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);
    viewport.draw();

    gameManager = new GameManager(viewport, graph);
    gameManager.startGame();
  }
}