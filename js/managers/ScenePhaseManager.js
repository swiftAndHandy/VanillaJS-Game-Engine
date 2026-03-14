export class ScenePhaseManager {
    Phase = Object.freeze({
        "MENU": "menu",
        "PLAYING": "playing",
        "PAUSED": "paused",
    });

    #scenePhase;

    constructor() {
        this.#scenePhase = this.Phase.MENU
    }

    playingScenePhaseIsActive() {
        return this.#scenePhase === this.Phase.PLAYING;
    }

    pausedScenePhaseIsActive() {
        return this.#scenePhase === this.Phase.PAUSED;
    }

    menuScenePhaseIsActive() {
        return this.#scenePhase === this.Phase.MENU;
    }

    setScenePhaseToPlaying() {
        this.#scenePhase = this.Phase.PLAYING;
    }

    setScenePhaseToPaused() {
        this.#scenePhase = this.Phase.PAUSED;
    }

    setScenePhaseToMenu() {
        this.#scenePhase = this.Phase.MENU;
    }
}