namespace BomberMan {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", handleLoad);

  function handleLoad(): void {
    let path: string = window.location.pathname;
    let page: string | undefined = path.split("/").pop();
    console.log(page);
    if (!page) {
      initStartScreen();
      return;
    }

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