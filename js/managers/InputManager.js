const AXIS_KEYS = {
    "horizontal": ['a', 'arrowleft', 'd', 'arrowright'],
    "vertical": ['w', 'arrowup', 's', 'arrowdown'],
}

const KEY_TO_VALUE = {
    "a": -1, "arrowleft": -1,
    "d": 1, "arrowright": 1,
    "w": -1, "arrowup": -1,
    "s": 1, "arrowdown": 1,
}

export class InputManager {
    #order = { "horizontal": [], "vertical": [] };
    #keys = {};

    constructor() {
        this.#setupInput();
    }

    #setupInput() {
        window.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            this.#keys[key] = true;
            for (const axis in AXIS_KEYS) {
                if (AXIS_KEYS[axis].includes(key) && !this.#order[axis].includes(key)) {
                    this.#order[axis].push(key);
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            this.#keys[key] = false;
            for (const axis in AXIS_KEYS) {
                this.#order[axis] = this.#order[axis].filter(k => k !== key);
            }
        });

        window.addEventListener("contextmenu", () => this.#clearInput());
        window.addEventListener("blur", () => this.#clearInput());
    }

    #clearInput() {
        this.#keys = {};
        this.#order = { "horizontal": [], "vertical": [] };
    }

    getAxis(axis) {
        const order = this.#order[axis];
        if (!order.length) return 0;
        return KEY_TO_VALUE[order.at(-1)] ?? 0;
    }

    pressedKey(key) {
        return this.#keys[key.toLowerCase()] === true;
    }
}

