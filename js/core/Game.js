import {GAME_WIDTH, GAME_HEIGHT, IMAGE_SMOOTHING_ENABLED} from "./constants.js";
import {RenderSystem} from "../systems/RenderSystem.js";
import {Player} from "../entities/Player.js";
import {InputManager} from "../managers/input/InputManager.js";
import {ImageManager} from "../managers/ImageManager.js";
import {ScenePhaseManager} from "../managers/ScenePhaseManager.js";
import {UiManager} from "../managers/UiManager.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = IMAGE_SMOOTHING_ENABLED;

        this.sceneManager = new ScenePhaseManager();
        this.uiManager = new UiManager(this);
        this.inputManager = new InputManager();
        this.imageManager = new ImageManager();

        this.renderSystem = new RenderSystem(this.canvas, this.imageManager);

        this.player = new Player();

        this.init()
    }

    async init() {
        await Promise.all([
            this.imageManager.loadAll()
        ]);
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.uiManager.hideAllPanels();
        this.uiManager.showMainMenu();
        this.configControls();
        this.lastTimestamp = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(timestamp) {
        const deltaTime = Math.min((timestamp - this.lastTimestamp) / 1000, 0.02);
        this.lastTimestamp = timestamp;
        this.update(deltaTime);
        this.render();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        if (!this.sceneManager.playingScenePhaseIsActive()) return;
        this.player.update(deltaTime, this.inputManager);
    }

    render() {
        if (this.sceneManager.menuScenePhaseIsActive()) {
            this.ctx.fillStyle = "#0f3460";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.renderSystem.render(this.player);
        }
    }

    startGame() {
        this.sceneManager.setScenePhaseToPlaying();
        this.uiManager.hideAllPanels();
        this.resetGame();
    }

    pauseGame() {
        this.sceneManager.setScenePhaseToPaused();
        this.uiManager.showPauseMenu();
    }

    resumeGame() {
        this.sceneManager.setScenePhaseToPlaying();
        this.uiManager.hidePauseMenu();
    }

    resetGame() {
        this.lastTimestamp = performance.now();
        this.player.reset();
    }

    returnToMainMenu() {
        this.sceneManager.setScenePhaseToMenu();
        this.uiManager.showMainMenu();
    }

    resizeCanvas() {
        let w, h;
        const ratio = 16 / 9;
        const margin = 5;
        const availableWidth = window.innerWidth - margin * 2;
        const availableHeight = window.innerHeight - margin * 2;

        if (availableWidth / availableHeight > ratio) {
            h = availableHeight;
            w = h * ratio
        } else {
            w = availableWidth;
            h = w / ratio;
        }

        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.canvas.style.margin = `${margin}px`;
    }

    configControls() {
        window.addEventListener('escape-pressed', () => {
            if (this.sceneManager.playingScenePhaseIsActive()) {
                this.pauseGame();
            } else if (this.sceneManager.pausedScenePhaseIsActive()) {
                this.resumeGame()
            }
        });
    }
}