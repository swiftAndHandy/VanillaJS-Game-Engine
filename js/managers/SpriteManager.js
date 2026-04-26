export class SpriteManager {
    constructor() {
        this.sprites = {};
    }

    load(name, path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;

            this.sprites[name] = { img, loaded: false };

            img.onload = () => {
                this.sprites[name].loaded = true;
                console.log(`[DEV] Image loaded: ${name}`);
                resolve();
            };

            img.onerror = () => {
                console.error(`Image issue for "${name}". Fallback is used if possible.`);
                resolve();
            }
        });
    }

    get(name) {
        return this.sprites[name]?.loaded ? this.sprites[name].img : null;
    }

    async loadAll() {
        await Promise.all([
            this.load('player', './images/player.png'),
            this.load('enemy_drifter', './images/enemies/drifter/drifter.png'),
            this.load('enemy_seeker', './images/enemies/seeker/seeker.png'),
        ]);

        // TODO: REMOVE BEFORE SHIPPING
        const DEBUG_LOAD_DELAY = 1000;
        await new Promise(resolve => setTimeout(resolve, DEBUG_LOAD_DELAY));
    }
}