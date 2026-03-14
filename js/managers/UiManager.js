export class UiManager {

    constructor(game) {
        this.game = game;
        this.setupUI();
    }

    #mainMenu = document.getElementById("mainMenu");
    #pauseMenu = document.getElementById('pauseMenu');
    #playButton = document.getElementById('playBtn');
    #resumeButton = document.getElementById('resumeBtn');
    #quitButton = document.getElementById('quitBtn');
    #uiPanels = document.querySelectorAll(".ui-panel");

    setupUI() {
        this.#playButton.onclick = () => {
            this.game.startGame();
        }

        this.#resumeButton.onclick = () => {
            this.game.resumeGame();
        }

        this.#quitButton.onclick = () => {
            this.game.quitToMainMenu();
        }
    }

    hideAllPanels() {
        this.#uiPanels.forEach(panel => {
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