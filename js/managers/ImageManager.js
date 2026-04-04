export class ImageManager {
    constructor() {
        this.images = {};
    }

    load(name, path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;

            this.images[name] = { img, loaded: false };

            img.onload = () => {
                this.images[name].loaded = true;
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
        return this.images[name]?.loaded ? this.images[name].img : null;
    }

    async loadAll() {
        await Promise.all([
            this.load('player', './images/player.png'),
        ]);

        // TODO: REMOVE BEFORE SHIPPING
        const DEBUG_LOAD_DELAY = 1000;
        await new Promise(resolve => setTimeout(resolve, DEBUG_LOAD_DELAY));
    }
}