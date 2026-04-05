export const playerData = {
    width: 64,
    height: 64,
    collisionRadius: 28,
    movement: {
        maxSpeed: 300,
        acceleration: {
            active: false,
            friction: 0.5,
            acceleration: 200,
        }
    },
    knockback: {
        force: 800,
        decay: 0.1,
        velocity: {
            x: 0,
            y: 0,
        }
    },
    iFrames: {
        baseDuration: .4,
        timer: 0,
    },
    buffs: {
        speed: {
            multiplier: 1,
            duration: 500,
        }
    }
}