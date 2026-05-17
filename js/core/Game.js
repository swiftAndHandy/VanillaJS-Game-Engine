import { ASPECT_RATIO, CANVAS_MARGIN, GAME_HEIGHT, GAME_WIDTH, EVENTS } from "./constants.js";
import { RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";
import { InputManager } from "../managers/input/InputManager.js";
import { SpriteManager } from "../managers/SpriteManager.js";
import { AudioManager } from "../managers/AudioManager.js";
import { ScenePhaseManager } from "../managers/ScenePhaseManager.js";
import { UiManager } from "../managers/UiManager.js";
import { EnemyManager } from "../managers/EnemyManager.js";
import { EnemySpawner } from "../managers/EnemySpawner.js";
import { EventEmitter } from "./EventEmitter.js";
import { CollisionSystem } from "../systems/CollisionSystem.js";
import {CollisionManager} from "../managers/CollisionManager.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.events = new EventEmitter();
        this.sceneManager = new ScenePhaseManager();
        this.uiManager = new UiManager(this.events);
        this.inputManager = new InputManager();
        this.spriteManager = new SpriteManager();
        this.audioManager = new AudioManager();
        this.renderSystem = new RenderSystem(this.canvas, this.spriteManager);
        this.player = new Player();
        this.enemyManager = new EnemyManager();
        this.enemySpawner = new EnemySpawner(this.enemyManager);
        this.collisionSystem = new CollisionSystem();
        this.collisionManager = new CollisionManager(this.collisionSystem, this.events);

        this.init()
    }

    async init() {
        await Promise.all([
            this.spriteManager.loadAll(),
            this.audioManager.loadAll()
        ]);

        // Sound events
        this.events.on(EVENTS.SOUND, (name) => this.audioManager.play(name));

        // Game state events
        this.events.on(EVENTS.GAME_START, () => this.startGame());
        this.events.on(EVENTS.GAME_PAUSED, () => this.pauseGame());
        this.events.on(EVENTS.GAME_RESUME, () => this.resumeGame());
        this.events.on(EVENTS.GAME_RETURN_TO_MENU, () => this.returnToMainMenu());

        // Player related events
        this.events.on(EVENTS.PLAYER_DAMAGED, (health, maxHealth) => {
            this.events.emit(EVENTS.SOUND, 'player_hurt');
            this.uiManager.updateHealthBar(health, maxHealth);
        })

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.uiManager.showMainMenu();
        this.lastTimestamp = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    gameLoop(timestamp) {
        const deltaTime = Math.min((timestamp - this.lastTimestamp) / 1000, 0.02);
        this.lastTimestamp = timestamp;

        if (this.sceneManager.playingScenePhaseIsActive()) {
            this.time += deltaTime;
            this.uiManager.updateTimer(this.time);
        }

        if (this.inputManager.justPressed('pause')) {
            if (this.sceneManager.playingScenePhaseIsActive()) this.pauseGame();
            else if (this.sceneManager.pausedScenePhaseIsActive()) this.resumeGame();
        }

        const activeEnemies = this.enemyManager.getActiveEnemies();
        this.update(deltaTime, activeEnemies);
        if (!this.sceneManager.menuScenePhaseIsActive()) {
            this.renderSystem.render(this.player, activeEnemies);
        } else {
            this.renderSystem.renderMenuBackground();
        }
        this.inputManager.update();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime, activeEnemies) {
        if (!this.sceneManager.playingScenePhaseIsActive()) return;
        this.player.update(deltaTime, this.inputManager);
        this.enemyManager.update(deltaTime, this.player);
        this.enemySpawner.update(deltaTime);
        this.collisionManager.update(this.player, activeEnemies);
    }

    startGame() {
        this.events.emit(EVENTS.SOUND, 'button_click');
        this.sceneManager.setScenePhaseToPlaying();
        this.uiManager.hideAllPanels();
        this.uiManager.showHUD();
        this.time = 0;
        this.resetGame();
    }

    pauseGame() {
        this.sceneManager.setScenePhaseToPaused();
        this.events.emit(EVENTS.SOUND, 'pause');
        this.uiManager.showPauseMenu();
    }

    resumeGame() {
        this.sceneManager.setScenePhaseToPlaying();
        this.events.emit(EVENTS.SOUND, 'unpause');
        this.uiManager.hidePauseMenu();
    }

    resetGame() {
        this.lastTimestamp = performance.now();
        this.player.reset();
        this.uiManager.updateHealthBar(this.player.health.current, this.player.health.max);
        this.enemyManager.reset();
        this.enemySpawner.reset();
    }

    returnToMainMenu() {
        this.sceneManager.setScenePhaseToMenu();
        this.events.emit(EVENTS.SOUND, 'button_click');
        this.uiManager.hideHUD();
        this.uiManager.showMainMenu();
    }

    resizeCanvas() {
        let w, h;
        const availableWidth = window.innerWidth - CANVAS_MARGIN * 2;
        const availableHeight = window.innerHeight - CANVAS_MARGIN * 2;

        if (availableWidth / availableHeight > ASPECT_RATIO) {
            h = availableHeight;
            w = h * ASPECT_RATIO
        } else {
            w = availableWidth;
            h = w / ASPECT_RATIO;
        }

        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.canvas.style.margin = `${CANVAS_MARGIN}px`;
    }
}