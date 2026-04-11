export const playerData = {
    width: 64,
    height: 64,
    collisionRadius: 28,
    health: {
        max: 100
    },
    movement: {
        velocity: { x: 0, y: 0 },
        maxSpeed: 400,
        acceleration: {
            rate: .9,
            friction: 0.1,
        }
    },
    knockback: {
        force: 800,
        decay: 0.1,
        velocity: { x: 0, y: 0 }
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