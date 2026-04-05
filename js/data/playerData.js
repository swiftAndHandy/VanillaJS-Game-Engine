export const playerData = {
    width: 64,
    height: 64,
    collisionRadius: 28,
    movement: {
        velocity: { x: 0, y: 0 },
        maxSpeed: 600,
        acceleration: {
            active: true,
            rate: .8,
            friction: 2,
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