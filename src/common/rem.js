function getRem(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 100 + "px";
};
getRem();
window.addEventListener("resize",getRem,false);