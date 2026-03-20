export class GamepadSource {
    static #DEADZONE = 0.15;
    static #MAPPING = {
        jump: 0,
        attack: 3,
        run: 2,
        pause: 9,
        dpadLeft: 14,
        dpadRight: 15,
    }

    #index = null;

    constructor() {
        window.addEventListener('gamepadconnected', (event) => {
            this.#index = event.gamepad.index;
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            this.#index = null;
        });
    }

    isConnected() {
        return this.#index !== null;
    }

    #gamepad() {
        return this.isConnected() ? navigator.getGamepads()[this.#index] : null;
    }

    getAxis(axis) {
        const gp = this.#gamepad();
        if (!gp) return 0;
        const raw = axis === 'horizontal' ? gp.axes[0] : gp.axes[1];
        return Math.abs(raw) > GamepadSource.#DEADZONE ? raw : 0;
    }

    pressed(action) {
        if (!this.isConnected()) return false;
        const gp = this.#gamepad();
        const idx = GamepadSource.#MAPPING[action];
        return idx !== undefined ? gp.buttons[idx]?.pressed ?? false : false;
    }

    triggerRumble(delay, duration, weak, strong) {
        if (!this.isConnected()) return;
        navigator.getGamepads()[this.#index]
            ?.vibrationActuator
            ?.playEffect('dual-rumble', {
                startDelay: delay,
                duration: duration,
                weakMagnitude: weak,
                strongMagnitude: strong,
            })
    }
}