const _WYRDHORD_APPS = [
  "ablawung",
  "afindan",
  "bloma",
  "bryne",
  "ceorf",
  "druh",
  "freosan",
  "gimcynn",
  "ginung",
  "gleobeam",
  "hearg",
  "hlof",
  "hrinan",
  "hrisian",
  "mynd",
  "organistre",
  "sceacel",
  "sceo",
  "tocnyssan",
  "wudubora",
];

function _navigateTo(url) {
  const curtain = document.createElement("div");
  curtain.style.cssText =
    "position:fixed;inset:0;background:#000;opacity:0;z-index:99999;pointer-events:none;transition:opacity 0.15s ease;";
  document.body.appendChild(curtain);
  requestAnimationFrame(() => {
    curtain.style.opacity = "1";
    setTimeout(() => {
      window.location.href = url;
    }, 160);
  });
}

// Inject style synchronously so body is hidden before first paint
const _navHideStyle = document.createElement("style");
_navHideStyle.textContent = "body{opacity:0!important;}";
document.head.appendChild(_navHideStyle);

// Fade in once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  _navHideStyle.remove();
  document.body.style.transition = "opacity 0.2s ease";
  document.body.style.opacity = "0";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  });
});

function goToMenu() {
  _navigateTo("../index.html");
}

function goToRandom() {
  let next;
  do {
    next = _WYRDHORD_APPS[Math.floor(Math.random() * _WYRDHORD_APPS.length)];
  } while (window.location.href.includes("/" + next + "/"));
  _navigateTo("../" + next + "/");
}

document.addEventListener("contextmenu", (e) => e.preventDefault());
