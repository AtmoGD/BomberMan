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
    let startButton;
    let volumeInput;
    function initStartScreen() {
        startButton = document.querySelector("#startGameButton");
        if (startButton)
            startButton.addEventListener("click", startGame);
        volumeInput = document.querySelector("#volumeInput");
        if (volumeInput) {
            volumeInput.addEventListener("change", updateVolume);
            let volume = BomberMan.getCookie("Volume");
            console.log(document.cookie);
            if (volume != undefined) {
                volumeInput.value = volume;
            }
        }
    }
    BomberMan.initStartScreen = initStartScreen;
    function startGame() {
        window.location.href = "./html/Game.html";
    }
    function updateVolume() {
        let volume = volumeInput?.value;
        if (!volume)
            return;
        BomberMan.setCookie("Volume", volume);
        console.log(document.cookie);
    }
})(BomberMan || (BomberMan = {}));
var BomberMan;
(function (BomberMan) {
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop()?.split(";").shift();
        }
        return undefined;
    }
    BomberMan.getCookie = getCookie;
    function setCookie(_name, _val) {
        const date = new Date();
        const value = _val;
        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = _name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }
    BomberMan.setCookie = setCookie;
    function deleteCookie(_name) {
        const date = new Date();
        date.setTime(date.getTime() - 1000);
        document.cookie = _name + "=" + "; expires=" + date.toUTCString() + "; path=/";
    }
    BomberMan.deleteCookie = deleteCookie;
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map