import {ENEMY_SPAWN_INTERVAL, ENEMY_SPAWN_MARGIN, GAME_HEIGHT, GAME_WIDTH} from "../core/constants.js";
import {enemyData} from "../data/enemyData.js";

export class EnemySpawner {
    constructor(enemyManager) {
        this.enemyManager = enemyManager;
        this.spawnTimer = 0;
        this.spawnInterval = ENEMY_SPAWN_INTERVAL;
        this.enemyTypes = [];
        for (const enemyType in enemyData) {
            this.enemyTypes.push(enemyType);
        }
    }

    update(deltaTime) {
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnWave();
            this.reset();
        }
    }

    spawnWave() {
        //TODO: Add Spawn methods: enemyAmount
        const enemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        const edge = Math.floor(Math.random() * 4);
        let x, y;

        switch (edge) {
            case 0: //top
                x = Math.random() * GAME_WIDTH;
                y = -ENEMY_SPAWN_MARGIN;
                break;
            case 1: //right
                x = GAME_WIDTH + ENEMY_SPAWN_MARGIN;
                y = Math.random() * GAME_HEIGHT;
                break;
            case 2: //bottom
                x = Math.random() * GAME_WIDTH;
                y = GAME_HEIGHT + ENEMY_SPAWN_MARGIN;
                break;
            case 3: //left
                x = -ENEMY_SPAWN_MARGIN;
                y = Math.random() * GAME_HEIGHT;
                break;
        }
        this.enemyManager.spawn(enemyType, x, y);
    }

    reset() {
        this.spawnTimer = 0;
    }
}