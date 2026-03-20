import {KeyboardSource} from "./KeyboardSource.js";
import {GamepadSource} from "./GamepadSource.js";

export class InputManager {
    #keyboard = new KeyboardSource();
    #gamepad = new GamepadSource();
    #prevPressed = {};

    justPressed(action) {
        const current = this.pressed(action);
        const prev = this.#prevPressed[action] ?? false;
        this.#prevPressed[action] = current;
        return current && !prev;
    }

    update() {
        for (const action in this.#prevPressed) {
            this.#prevPressed[action] = this.pressed(action);
        }
    }

    getAxis(axis) {
        const gpValue = this.#gamepad.getAxis(axis);
        if (gpValue !== 0) return gpValue;
        return this.#keyboard.getAxis(axis);
    }

    pressed(action) {
        return this.#gamepad.pressed(action) || this.#keyboard.pressed(action);
    }

    triggerRumble(delay, duration, weak, strong) {
        this.#gamepad.triggerRumble(delay, duration, weak, strong);
    }
}