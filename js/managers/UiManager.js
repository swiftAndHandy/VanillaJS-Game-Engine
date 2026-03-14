export class UiManager {

    constructor(game) {
        this.game = game;
        this.setupUI();
    }

    #mainMenu = document.getElementById("mainMenu");
    #pauseMenu = document.getElementById('pauseMenu');

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

    showMainMenu() {
        this.hideAllPanels();
        this.#mainMenu.classList.add("active");
    }

    showPauseMenu() {
        this.#pauseMenu.classList.add('active');
    }

    hidePauseMenu() {
        this.#pauseMenu.classList.remove('active');
    }
}