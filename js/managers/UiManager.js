export class UiManager {

    constructor(game) {
        this.game = game;
        this.setupUI();
    }

    setupUI() {
        document.getElementById("playBtn").onclick = () => {
            this.game.startGame();
        }
    }

    hideAllPanels() {
        document.querySelectorAll(".ui-panel").forEach(panel => {
            panel.classList.remove("active");
        })
    }
}