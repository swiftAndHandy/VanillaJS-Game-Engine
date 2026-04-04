export class UiManager {

    #mainMenu
    #timer
    #pauseMenu
    #loadingScreen
    #playButton
    #resumeButton
    #quitButton
    #uiPanels
    #buttons

    constructor(game) {
        this.game = game;
        this.#mainMenu = document.getElementById("mainMenu");
        this.#timer = document.getElementById("timer");
        this.#pauseMenu = document.getElementById('pauseMenu');
        this.#loadingScreen = document.getElementById('loadingScreen');
        this.#playButton = document.getElementById('playBtn');
        this.#resumeButton = document.getElementById('resumeBtn');
        this.#quitButton = document.getElementById('quitBtn');
        this.#uiPanels = document.querySelectorAll(".ui-panel");
        this.#buttons = document.querySelectorAll("button");
        this.setupUI();
    }



    setupUI() {
        this.#playButton.addEventListener('click', () => {
            this.game.startGame();
        });

        this.#resumeButton.addEventListener('click', () => {
            this.game.resumeGame();
        });

        this.#quitButton.addEventListener('click', () => {
            this.game.returnToMainMenu();
        });

        this.#buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.game.playSound('button_hover');
            });
        })
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

    showLoadingScreen() {
        this.#loadingScreen.classList.add('active');
    }

    hideLoadingScreen() {
        this.#loadingScreen.classList.remove('active');
    }

    showTimer() {
        this.#timer.classList.add('active');
    }

    hideTimer() {
        this.#timer.classList.remove('active');
    }

    updateTimer(time) {
        if (!this.#timer) return;
        const mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        this.#timer.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
    }
}