import {audioData} from "../data/audioData.js";

export class AudioManager {
    constructor() {
        this.sounds = {};
    }

    load(name, path) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(path);
            this.sounds[name] = { audio, loaded: false};

            audio.onloadeddata = () => {
                this.sounds[name].loaded = true;
                console.log(`[DEV] Audio loaded: ${name}`);
                resolve();
            }

            audio.onerror = () => {
                console.log(`Audio error: ${name}`);
                resolve();
            }
        })
    }

    play(name) {
        const sound = this.sounds[name]?.loaded ? this.sounds[name] : null;
        if (sound) {
            sound.audio.currentTime = 0;
            sound.audio.play().catch((err) => {
                console.log(`Unable to play sound ${name}: ${err}`);
            });
        }
    }

    async loadAll() {
        await Promise.all(
            audioData.map(
                ({name, path}) => {
                    this.load(name, path)
                }
            )
        );
    }
}