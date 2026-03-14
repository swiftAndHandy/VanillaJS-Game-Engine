export class ImageManager {
    constructor() {
        this.images = {};
        this.loadAll();
    }

    load(name, path) {
        const img = new Image();
        img.src = path;

        this.images[name] = { img, loaded: false };

        img.onload = () => {
            this.images[name].loaded = true;
        };

        img.onerror = () => {
            console.error(`Image issue for "${name}". Fallback is used if possible.`);
        }
    }

    get(name) {
        return this.images[name]?.loaded ? this.images[name].img : null;
    }

    loadAll() {
        this.load('player', './images/player.png');
    }
}