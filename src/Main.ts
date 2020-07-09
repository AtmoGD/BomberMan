namespace BomberMan {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", handleLoad);

  function handleLoad(): void {
    let path: string = window.location.pathname;
    let page: string | undefined = path.split("/").pop();

    if (!page) {
      initStartScreen();
      return;
    }

    switch (page) {
      case "index.html":
        initStartScreen();
        break;
      case "Game.html":
        initGame();
        break;
      default:
        return;
    }
  }
}