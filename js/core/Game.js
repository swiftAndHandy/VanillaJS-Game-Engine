import { GAME_WIDTH, GAME_HEIGHT, IMAGE_SMOOTHING_ENABLED } from "./constants.js";
import { RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";
import {InputManager} from "./InputManager.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = IMAGE_SMOOTHING_ENABLED;
        this.renderSystem = new RenderSystem(this.canvas);
        this.player = new Player();
        this.inputManager = new InputManager();

        this.init()
    }

    init() {
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update() {
        this.player.update(this.inputManager);
    }

    gameLoop(timestamp) {
        this.update();
        this.renderSystem.render(this.player)
        requestAnimationFrame((time) => this.gameLoop(time));
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