export const enemyData = {
    drifter: {
        width: 48,
        height: 48,
        health: 1,
        movement: {
            velocity: { x: 0, y: 0 },
            maxSpeed: 150,
            acceleration: {
                rate: 1,
                friction: 1,
            }
        },
        damage: 1,
        collisionRadius: 24,
        contactDamage: {
            amount: 1,
            pushBack: false,
        },
        buffs: {
            speed: {
                multiplier: 1,
                duration: 300,
            }
        }
    }
}