namespace BomberMan {

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;

  let gameManager: GameManager;

  let startOverlay: HTMLDivElement;
  let gameOverlay: HTMLDivElement;
  let gameOverOverlay: HTMLDivElement;

  let startButton: HTMLButtonElement;

  // ƒ.RenderManager.initialize(true, true);

  export function initGame(): void {

    getReferences();
    installEventListener();

    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(Data.cameraDistance);
    camera.pivot.rotateY(180);

    let cameraLookAt: ƒ.Vector3 = new ƒ.Vector3(1, 1, 0);
    camera.pivot.lookAt(cameraLookAt);

    graph = new ƒ.Node("Graph");

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);

    gameManager = new GameManager(viewport, graph, camera);
    viewport.draw();

    let gizmo = new ƒAid.NodeCoordinateSystem("ControlSystem");
    graph.addChild(gizmo);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(Data.loopMode, Data.fps);
  }

  function update(): void {
    viewport.draw();
  }

  function getReferences(): void {
    startOverlay = document.querySelector("#startOverlay");
    gameOverlay = document.querySelector("#gameOverlay");
    gameOverOverlay = document.querySelector("#gameOverOverlay");
    startButton = document.querySelector("#startButton");
  }

  function installEventListener() {
    startButton.addEventListener("click", startGame);
  }

  function startGame(): void {
    startOverlay.style.display = "none";
    gameOverlay.style.display = "flex";
    gameOverOverlay.style.display = "none";

    gameManager.startGame();

    viewport.draw();
  }
}