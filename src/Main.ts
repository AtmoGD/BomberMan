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
    console.log(page);

    switch (page) {
      case "index.html":
      case "":
        initStartScreen();
        break;
      case "Game":
      case "Game.html":
        initGame();
        break;
      default:
        return;
    }
  }
}