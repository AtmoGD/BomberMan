"use strict";
var BomberMan;
(function (BomberMan) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page)
            return;
        switch (page) {
        }
    }
})(BomberMan || (BomberMan = {}));
//# sourceMappingURL=Main.js.map