export const playerData = {
    sprite: 'player',
    width: 60,
    height: 74,
    hitbox: {
        margin: { top: 40, right: 8, bottom: 8, left: 8 }
    },
    health: {
        max: 100
    },
    movement: {
        velocity: { x: 0, y: 0 },
        maxSpeed: 200,
        acceleration: {
            rate: .9,
            responseTime: 0.1,
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
    },
}