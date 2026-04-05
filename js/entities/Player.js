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

        this.handleDmgFeedback(deltaTime);

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
        this.velocity = structuredClone(playerData.velocity);
        this.knockback = structuredClone(playerData.knockback);
        this.iFrames = structuredClone(playerData.iFrames);
        this.buffs = structuredClone(playerData.buffs);
        this.x = (GAME_WIDTH - playerData.width) / 2;
        this.y = (GAME_HEIGHT - playerData.height) / 2;
    }

    receivesDmgFrom(dmgSrc, iFrameDuration = this.iFrames.baseDuration) {
        if (this.iFrames.timer > 0) return;
        let dx = this.x - dmgSrc.x;
        let dy = this.y - dmgSrc.y;

        const len = Math.sqrt(dx * dx + dy * dy);

        const normalizedDx = dx/len;
        const normalizedDy = dy/len;

        this.knockback.velocity.x = normalizedDx * this.knockback.force;
        this.knockback.velocity.y = normalizedDy * this.knockback.force;
        this.inboundsCheck();
        this.iFrames.timer = iFrameDuration;
        console.log(`${this.iFrames.timer}`);
    }

    handleDmgFeedback(deltaTime) {
        this.x += this.knockback.velocity.x * deltaTime;
        this.y += this.knockback.velocity.y * deltaTime;
        this.knockback.velocity.x *= Math.pow(this.knockback.decay/100, deltaTime);
        this.knockback.velocity.y *= Math.pow(this.knockback.decay/100, deltaTime);
        this.iFrames.timer = Math.max(this.iFrames.timer - deltaTime, 0);
    }
}