import {GAME_HEIGHT, GAME_WIDTH, GRID_SIZE, IMAGE_SMOOTHING_ENABLED} from "../core/constants.js";

export class RenderSystem {
    constructor(canvas, imageManager) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = IMAGE_SMOOTHING_ENABLED;
        this.imageManager = imageManager;
    }

    render(player, enemies = []) {
        this.ctx.fillStyle = "#0f3460";
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.renderGrid();
        this.renderEnemies(enemies);
        this.renderPlayer(player);
    }

    renderEnemies(enemies = []) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            this.ctx.fillStyle = "#ff3460";
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }

    renderPlayer(player) {
        const playerImage = this.imageManager.get('player');
        if (playerImage) {
            this.ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
        } else {
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(player.x, player.y, player.width, player.height);
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(player.x, player.y, player.width, player.height);
        }

    }

    renderGrid() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        for (let i = 0; i < GAME_WIDTH; i += GRID_SIZE) {
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, GAME_HEIGHT);
        }

        for (let i = 0; i < GAME_HEIGHT; i += GRID_SIZE) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(GAME_WIDTH, i);
        }
        this.ctx.stroke()
    }

    renderMenuBackground() {
        this.ctx.fillStyle = "#0f3460";
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
}