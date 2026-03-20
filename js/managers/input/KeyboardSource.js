export class KeyboardSource {
    static #AXIS_KEYS = {
        "horizontal": ['a', 'arrowleft', 'd', 'arrowright'],
        "vertical": ['w', 'arrowup', 's', 'arrowdown'],
    }

    static #KEY_TO_VALUE = {
        "a": -1, "arrowleft": -1,
        "d": 1, "arrowright": 1,
        "w": -1, "arrowup": -1,
        "s": 1, "arrowdown": 1,
    }

    static #ACTION_KEYS = {
        'jump': ' ',
        'attack': 'e',
        'run': 'shift',
        'pause': 'esc',
    }

    #order = { "horizontal": [], "vertical": [] };
    #keys = {};

    constructor() {
        this.#setupInput();
    }

    #setupInput() {
        window.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            this.#keys[key] = true;
            for (const axis in KeyboardSource.#AXIS_KEYS) {
                if (KeyboardSource.#AXIS_KEYS[axis].includes(key) && !this.#order[axis].includes(key)) {
                    this.#order[axis].push(key);
                }
            }

            if (e.key === 'Escape') {
                window.dispatchEvent(new CustomEvent('escape-pressed'));
            }
        });

        window.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            this.#keys[key] = false;
            for (const axis in KeyboardSource.#AXIS_KEYS) {
                this.#order[axis] = this.#order[axis].filter(k => k !== key);
            }
        });

        window.addEventListener("contextmenu", () => this.#clearInput());
        window.addEventListener("blur", () => this.#clearInput());
    }

    getAxis(axis) {
        const order = this.#order[axis];
        if (!order.length) return 0;
        return KeyboardSource.#KEY_TO_VALUE[order.at(-1)] ?? 0;
    }

    #clearInput() {
        this.#keys = {};
        this.#order = { "horizontal": [], "vertical": [] };
    }

    pressed(action) {
        const key = KeyboardSource.#ACTION_KEYS[action];
        return key ? this.#keys[key] === true : false;
    }
}