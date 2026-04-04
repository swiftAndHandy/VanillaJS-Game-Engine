import { enemyData } from "../data/enemyData.js";
import {Enemy} from "../entities/Enemy.js";

export class EnemyManager {
    constructor() {
        this.enemy = new Enemy(enemyData.drifter);
    }

    spawn(x, y) {
        this.enemy.spawn(x, y);
    }

    getActiveEnemies() {
        return [this.enemy];
    }
}