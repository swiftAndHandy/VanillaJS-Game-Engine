import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";

export class Player {
    constructor() {
        this.width = 64;
        this.height = 64;
        this.x = (GAME_WIDTH - this.width) / 2;
        this.y = (GAME_HEIGHT - this.height) / 2;
        this.speed = 300;

        this.speedMultiplier = 1;
    }

    update(deltaTime, inputManager) {
        let dx = inputManager.getAxis('horizontal');
        let dy = inputManager.getAxis('vertical');

        /**
         * Normalize diagonal movement speed and update player position
         **/
        if (dx || dy) {
            const len = Math.sqrt(dx * dx + dy * dy);
            dx /= len;
            dy /= len;

            this.x += dx * this.speed * this.speedMultiplier * deltaTime;
            this.y += dy * this.speed * this.speedMultiplier * deltaTime;
        }

        this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));

    }
}