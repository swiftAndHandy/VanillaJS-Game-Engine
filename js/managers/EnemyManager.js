import { enemyData } from "../data/enemyData.js";
import {Enemy} from "../entities/Enemy.js";
import {ObjectPooler} from "../utils/ObjectPooler.js";
import {BehaviourFactory} from "../entities/behaviours/BehaviourFactory.js";

export class EnemyManager {
    constructor() {
        const ENEMY_POOL_SIZE = 10;

        this.pool = new ObjectPooler(() => {
            const data = enemyData.drifter;
            const behaviours = BehaviourFactory.create(data.behaviours);
            return new Enemy(data, behaviours);
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