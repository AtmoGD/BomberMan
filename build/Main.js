"use strict";
var BomberMan;
(function (BomberMan) {
    function createGameManager() {
    }
    BomberMan.createGameManager = createGameManager;
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page)
            return;
        switch (page) {
            case "index.html":
                BomberMan.initStartScreen();
                break;
            case "Game.html":
                break;
            default:
                return;
        }
    }
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    function initStartScreen() {
    }
    BomberMan.initStartScreen = initStartScreen;
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map