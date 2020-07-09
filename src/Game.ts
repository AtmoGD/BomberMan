namespace BomberMan {

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;
  
  let gameManager: GameManager;

  let startOverlay: HTMLDivElement;
  let gameOverlay: HTMLDivElement;
  let gameOverOverlay: HTMLDivElement;

  let startButton: HTMLButtonElement;

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

    getReferences();
    installEventListener();
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
  }
}