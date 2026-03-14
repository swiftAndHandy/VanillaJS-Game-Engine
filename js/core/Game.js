import { GAME_WIDTH, GAME_HEIGHT, IMAGE_SMOOTHING_ENABLED } from "./constants.js";
import { RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";
import { InputManager } from "../managers/InputManager.js";
import { ImageManager } from "../managers/ImageManager.js";
import { ScenePhaseManager } from "../managers/ScenePhaseManager.js";
import { UiManager} from "../managers/UiManager.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = IMAGE_SMOOTHING_ENABLED;

        this.inputManager = new InputManager();
        this.imageManager = new ImageManager();
        this.uiManager = new UiManager(this);
        this.sceneManager = new ScenePhaseManager();

        this.renderSystem = new RenderSystem(this.canvas, this.imageManager);

        this.player = new Player();

        this.init()
    }

    init() {
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.lastTimestamp = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(timestamp) {
        const deltaTime = Math.min((timestamp - this.lastTimestamp)/1000, 0.02);
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
        if (this.sceneManager === this.sceneManager.Phase.MENU) {
            this.ctx.fillStyle = "#0f3460";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.renderSystem.render(this.player);
        }
    }

    startGame() {
        this.sceneManager.setScenePhaseToPlaying();
        this.uiManager.hideAllPanels();
    }

    pauseGame() {
        this.sceneManager.setScenePhaseToPaused();
    }

    resumeGame() {
        this.sceneManager.setScenePhaseToPlaying();
    }

    quitToMenu() {
        this.returnToMenu()
    }

    returnToMenu() {
        this.sceneManager.setScenePhaseToMenu();
    }

    resizeCanvas() {
        let w, h;
        const ratio = 16/9;
        const margin = 5;
        const availableWidth = window.innerWidth - margin * 2;
        const availableHeight = window.innerHeight - margin * 2;

        if (availableWidth/availableHeight > ratio) {
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
}