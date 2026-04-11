import { enemyData } from "../data/enemyData.js";
import {Enemy} from "../entities/Enemy.js";
import {ObjectPooler} from "../utils/ObjectPooler.js";

export class EnemyManager {
    constructor() {
        const ENEMY_POOL_SIZE = 10;

        this.pool = new ObjectPooler(() => {
            return new Enemy(enemyData.drifter)
        }, ENEMY_POOL_SIZE);
    }

    spawn(x, y) {
        const enemy = this.pool.get();
        enemy.spawn(x, y);
        return enemy;
    }

    getActiveEnemies() {
        return this.pool.active;
    }

    update(deltaTime, player) {
        this.pool.updateAll(deltaTime, player);
    }

    reset() {
        this.pool.releaseAll();
    }
}