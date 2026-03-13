import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";

export class Player {
    constructor() {
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2;
        this.width = 64;
        this.height = 64;
        this.speed = 10;
    }

    update(inputManager) {
        const dx = inputManager.getAxis('horizontal');
        const dy = inputManager.getAxis('vertical');

        if (dx || dy) {
            this.x += dx * this.speed;
            this.y += dy * this.speed;
        }
    }
}