import { enemyData } from "../data/enemyData.js";
import {Enemy} from "../entities/Enemy.js";
import {ObjectPooler} from "../utils/ObjectPooler.js";

export class EnemyManager {
    constructor() {
        this.pools = {};
        const ENEMY_POOL_SIZE = 10;

        for (const enemyType in enemyData) {
            this.pools[enemyType] = new ObjectPooler(() => {
                const data = enemyData[enemyType];
                return new Enemy(data);
            }, ENEMY_POOL_SIZE);
        }

        // this.pool = new ObjectPooler(() => {
        //     const data = enemyData.drifter;
        //     const behaviours = BehaviourFactory.create(data.behaviours);
        //     return new Enemy(data, behaviours);
        // }, ENEMY_POOL_SIZE);
    }

    spawn(enemyType, x, y) {
        const pool = this.pools[enemyType];
        if (!pool) {
            console.warn(`Unknown enemy type: ${enemyType}`);
            return null;
        }
        const enemy = pool.get();
        enemy.spawn(x, y);
        return enemy;
    }

    getActiveEnemies() {
        const enemies = [];
        for (const enemyType in this.pools) {
            enemies.push(...this.pools[enemyType].active);
        }
        return enemies;
    }

    update(deltaTime, player) {
        for (const enemyType in this.pools) {
            this.pools[enemyType].updateAll(deltaTime, player);
        }
    }

    reset() {
        for (const enemyType in this.pools) {
            this.pools[enemyType].releaseAll();
        }
    }
}