import {enemyData} from "../data/enemyData.js";
import {playerData} from "../data/playerData.js";

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
                console.log(`[DEV] Image loaded: ${name}: ${path}`);
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
        const spriteEntries = [
            ...Object.values(enemyData).map(e =>
                ({name: `enemy_${e.sprite}`, path: `./images/enemies/${e.sprite}/${e.sprite}.png`})
            ),
            { name: playerData.sprite, path: `./images/player/default.webp` },
        ]
        console.log(spriteEntries);
        await Promise.all(spriteEntries.map(({name, path}) => {
            this.load(name, path);
        }));

        // TODO: REMOVE BEFORE SHIPPING
        const DEBUG_LOAD_DELAY = 1000;
        await new Promise(resolve => setTimeout(resolve, DEBUG_LOAD_DELAY));
    }
}