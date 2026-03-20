import {KeyboardSource} from "./KeyboardSource.js";
import {GamepadSource} from "./GamepadSource.js";

export class InputManager {
    #keyboard = new KeyboardSource();
    #gamepad = new GamepadSource();

    getAxis(axis) {
        const gpValue = this.#gamepad.getAxis(axis);
        if (gpValue !== 0) return gpValue;
        return this.#keyboard.getAxis(axis);
    }

    pressed(action) {
        return this.#gamepad.pressed(action) || this.#keyboard.pressed(action);
    }
}