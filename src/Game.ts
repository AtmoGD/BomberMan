namespace BomberMan {

  interface Data {
    cameraDistance: number,
    fps: number,
    mapSize: number,
    boxRespawnTime: number,
    playerStartLives: number,
    playerStartLevel: number,
    playerMaxLevel: number,
    enemyStartLevel: number,
    enemyMaxLevel: number,
    enemyCount: number,
    enemySpeed: number,
    enemyRange: number,
    enemyBombSpeed: number,
    upgradeSpeed: number
  }

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;

  let gameManager: GameManager;
  let canvas: HTMLCanvasElement;

  let startOverlay: HTMLDivElement;
  let gameOverlay: HTMLDivElement;
  let gameOverOverlay: HTMLDivElement;

  let startButton: HTMLButtonElement;
  let playAgainButton: HTMLButtonElement;

  export let data: Data;

  // ƒ.RenderManager.initialize(true, true);

  export async function initGame(): Promise<void> {
    getReferences();
    installEventListener();

    await loadData();

    camera = new ƒ.ComponentCamera();
    camera.pivot.translate(new ƒ.Vector3(-0.5, 1, data.cameraDistance));
    camera.pivot.rotateY(180);

    //let cameraLookAt: ƒ.Vector3 = new ƒ.Vector3(1, 1, 0);
    //camera.pivot.lookAt(cameraLookAt);

    graph = new ƒ.Node("Graph");

    canvas = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);

    gameManager = new GameManager(viewport, graph, camera);
    viewport.draw();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, data.fps);
  }

  function update(): void {
    viewport.draw();
  }

  async function loadData(): Promise<void> {
    let rawData: Response = await fetch("../src/Data.json");
    data = JSON.parse(await rawData.text());
  }

  function getReferences(): void {
    startOverlay = document.querySelector("#startOverlay");
    gameOverlay = document.querySelector("#gameOverlay");
    gameOverOverlay = document.querySelector("#gameOverOverlay");
    startButton = document.querySelector("#startButton");
    playAgainButton = document.querySelector("#playAgain");
  }

  function installEventListener() {
    startButton.addEventListener("click", startGame);
    playAgainButton.addEventListener("click", () => {window.location.reload()});
    window.addEventListener("resize", updateGUI);
  }

  function updateGUI(): void {
    gameOverlay.style.width = canvas.width.toString() + "px";
    gameOverlay.style.height = canvas.height.toString() + "px";
    gameOverOverlay.style.width = canvas.width.toString() + "px";
    gameOverOverlay.style.height = canvas.height.toString() + "px";
  }

  function startGame(): void {
    startOverlay.style.display = "none";
    gameOverOverlay.style.display = "none";
    gameOverlay.style.display = "flex";

    gameOverlay.style.width = canvas.width.toString() + "px";
    gameOverlay.style.height = canvas.height.toString() + "px";

    gameOverOverlay.style.width = canvas.width.toString() + "px";
    gameOverOverlay.style.height = canvas.height.toString() + "px";

    gameManager.startGame();
    gameManager.playMusic(audioButtonClick, false);

    viewport.draw();
  }
  export function endGame(): void {
    gameManager.stopMusic(audioBackground);
    gameManager.playMusic(audioDie, false);

    startOverlay.style.display = "none";
    gameOverOverlay.style.display = "flex";
    gameOverlay.style.display = "none";
  }
}