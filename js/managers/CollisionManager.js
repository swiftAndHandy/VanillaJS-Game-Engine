import { EVENTS } from "../core/constants.js";

export class CollisionManager {
    constructor(collisionSystem, events) {
        this.collisionSystem = collisionSystem;
        this.events = events;
    }

    update(player, enemies) {
        this.checkPlayerVsEnemies(player, enemies);
    }

    checkPlayerVsEnemies(player, enemies) {
        for (const enemy of enemies) {
            if (!enemy.active) continue;
            if (!this.collisionSystem.check(enemy, player)) continue;
            if (!player.startIFrames()) continue;

            if (enemy.contactDamage.pushBack) player.applyKnockback(enemy);

            if (enemy.contactDamage.amount > 0) {
                player.takeDamage(enemy.contactDamage.amount);
                this.events.emit(EVENTS.PLAYER_DAMAGED, player.health.current, player.health.max);
            }

            enemy.active = false;
            this.events.emit(EVENTS.ENEMY_DIED, enemy);
        }
    }
}