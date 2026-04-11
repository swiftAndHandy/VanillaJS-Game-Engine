import {GAME_HEIGHT, GAME_WIDTH, ENEMY_DESPAWN_MARGIN} from "../core/constants.js";
export class Enemy {
    constructor(data) {
        this.data = data;
        this.reset();
    }

    spawn(x, y) {
        this.x = x;
        this.y = y;
        this.health = this.data.health;
        this.active = true;
    }

    reset() {
        this.active = false;
        // Position and dimensions
        this.x = 0;
        this.y = 0;
        this.width = this.data.width;
        this.height = this.data.height;

        // Stats
        this.health = this.data.health;
        this.movement = structuredClone(this.data.movement);
        this.damage = this.data.damage;
        this.collisionRadius = this.data.collisionRadius;
        this.contactDamage = structuredClone(this.data.contactDamage);
        this.buffs = structuredClone(this.data.buffs);
    }

    update(deltaTime, player) {
        if (!this.active) return;

        if (this.x < -ENEMY_DESPAWN_MARGIN ||
            this.x > GAME_WIDTH + ENEMY_DESPAWN_MARGIN ||
            this.y < -ENEMY_DESPAWN_MARGIN ||
            this.y > GAME_HEIGHT + ENEMY_DESPAWN_MARGIN
        ) {
            this.active = false;
            return;
        }

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len > player.collisionRadius) {
            const normalizedDx = dx/len;
            const normalizedDy = dy/len;
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
        } else if (this.contactDamage.amount) {
            this.dealContactDamage(player);
        }
    }

    dealContactDamage(player) {
        player.receivesDmgFrom(this);
    }
}