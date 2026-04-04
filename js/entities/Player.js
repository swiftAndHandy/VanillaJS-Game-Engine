import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";
import { playerData } from "../data/playerData.js";

export class Player {
    constructor() {
        this.reset();
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

            const speedBonus = this.buffs.speed.duration > 0 ? this.buffs.speed.multiplier : 1;

            this.x += dx * this.speed * speedBonus * deltaTime;
            this.y += dy * this.speed * speedBonus * deltaTime;
        }

        this.inboundsCheck();

        if (inputManager.pressed('jump')) console.log('jump');
    }

    inboundsCheck() {
        this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));
    }

    reset() {
        this.width = playerData.width;
        this.height = playerData.height;
        this.speed = playerData.speed;
        this.collisionRadius = playerData.collisionRadius;
        this.collisionPushback = playerData.collisionPushback;
        this.buffs = playerData.buffs;
        this.x = (GAME_WIDTH - playerData.width) / 2;
        this.y = (GAME_HEIGHT - playerData.height) / 2;
    }

    receivesContactDamageFrom(dmgSrc, deltaTime) {
        let dx = this.x - dmgSrc.x;
        let dy = this.y - dmgSrc.y;

        const len = Math.sqrt(dx * dx + dy * dy);

        const normalizedDx = dx/len;
        const normalizedDy = dy/len;

        this.x += normalizedDx * this.speed * this.collisionPushback * deltaTime;
        this.y += normalizedDy * this.speed * this.collisionPushback * deltaTime;

        this.inboundsCheck();
    }
}