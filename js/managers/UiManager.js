import { EVENTS } from "../core/constants.js";

export class UiManager {
    #mainMenu
    #hud
    #healthBar
    #timer
    #pauseMenu
    #loadingScreen
    #playButton
    #resumeButton
    #quitButton
    #uiPanels
    #buttons

    constructor(events) {
        this.events = events;
        this.#mainMenu = document.getElementById("mainMenu");
        this.#hud = document.getElementById("hud");
        this.#healthBar= document.getElementById("healthBarFill");
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
            this.events.emit(EVENTS.GAME_START);
        });

        this.#resumeButton.addEventListener('click', () => {
            this.events.emit(EVENTS.GAME_RESUME);
        });

        this.#quitButton.addEventListener('click', () => {
            this.events.emit(EVENTS.GAME_RETURN_TO_MENU);
        });

        this.#buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.events.emit(EVENTS.SOUND, 'button_hover');
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

    showHUD() {
        this.#hud.classList.add('active');
    }

    hideHUD() {
        this.#hud.classList.remove('active');
    }

    updateTimer(time) {
        if (!this.#timer) return;
        const mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        this.#timer.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
    }
}