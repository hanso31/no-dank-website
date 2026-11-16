(function () {
  "use strict";

  function init() {
    document.querySelectorAll("model-viewer[data-product-3d]").forEach(function (model) {
      function loaded() {
        model.classList.add("webgl-ready");
      }
      if (model.loaded) loaded();
      model.addEventListener("load", loaded);
      model.addEventListener("error", function () {
        model.classList.remove("webgl-ready");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
