import { GAME_WIDTH, GAME_HEIGHT } from "../core/constants.js";
import { playerData } from "../data/playerData.js";

export class Player {
    constructor() {
        this.reset();
    }

    update(deltaTime, inputManager) {
        this.handleMovement(deltaTime, inputManager);
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
        this.health = { ...playerData.health, current: playerData.health.max };
        this.collisionRadius = playerData.collisionRadius;
        this.movement = structuredClone(playerData.movement);
        this.knockback = structuredClone(playerData.knockback);
        this.iFrames = structuredClone(playerData.iFrames);
        this.buffs = structuredClone(playerData.buffs);
        this.x = (GAME_WIDTH - playerData.width) / 2;
        this.y = (GAME_HEIGHT - playerData.height) / 2;
    }

    receivesDmgFrom(dmgSrc, iFrameDuration = this.iFrames.baseDuration) {
        if (this.iFrames.timer > 0) return;
        this.iFrames.timer = iFrameDuration;

        if (dmgSrc.contactDamage.pushBack) {
            let dx = (this.x + this.width / 2) - (dmgSrc.x + dmgSrc.width / 2);
            let dy = (this.y + this.height / 2) - (dmgSrc.y + dmgSrc.height / 2);

            const len = Math.sqrt(dx * dx + dy * dy);

            const normalizedDx = dx/len;
            const normalizedDy = dy/len;

            this.knockback.velocity.x = normalizedDx * this.knockback.force;
            this.knockback.velocity.y = normalizedDy * this.knockback.force;
            this.inboundsCheck();
        }
        console.log(`${this.iFrames.timer}`);
    }

    handleDmgFeedback(deltaTime) {
        this.x += this.knockback.velocity.x * deltaTime;
        this.y += this.knockback.velocity.y * deltaTime;
        this.knockback.velocity.x *= Math.pow(this.knockback.decay/100, deltaTime);
        this.knockback.velocity.y *= Math.pow(this.knockback.decay/100, deltaTime);
        this.iFrames.timer = Math.max(this.iFrames.timer - deltaTime, 0);
    }

    handleMovement(deltaTime, inputManager) {
        let dx = inputManager.getAxis('horizontal');
        let dy = inputManager.getAxis('vertical');

        /**
         * Normalize diagonal movement speed and update player position
         **/
        const speedBonus = this.buffs.speed.duration > 0 ? this.buffs.speed.multiplier : 1;
        const maxSpeed = this.movement.maxSpeed * speedBonus;

        // Target full maxSpeed per axis — divide by √2 diagonally to keep consistent total speed
        const diagonalFactor = (dx && dy) ? Math.SQRT2 : 1;
        const targetVx = dx ? Math.sign(dx) * (maxSpeed / diagonalFactor) : 0;
        const targetVy = dy ? Math.sign(dy) * (maxSpeed / diagonalFactor) : 0;

        // Lerp each axis independently — friction only when axis has no input
        const lerpAccel = 1 - Math.pow(1 - this.movement.acceleration.rate, deltaTime);
        const lerpFriction = 1 - Math.pow(this.movement.acceleration.friction / 10000, deltaTime);

        this.movement.velocity.x += (targetVx - this.movement.velocity.x) * (dx ? lerpAccel : lerpFriction);
        this.movement.velocity.y += (targetVy - this.movement.velocity.y) * (dy ? lerpAccel : lerpFriction);

        this.x += this.movement.velocity.x * deltaTime;
        this.y += this.movement.velocity.y * deltaTime;
    }
}