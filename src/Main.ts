namespace BomberMan {
  export import ƒ = FudgeCore;
  
  window.addEventListener("load", handleLoad);

  function handleLoad(): void {
    let path: string = window.location.pathname;
    let page: string | undefined = path.split("/").pop();

    if (!page)
      return;

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