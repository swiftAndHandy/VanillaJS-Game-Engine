export const enemyData = {
    drifter: {
        behaviours: ['drift'],
        width: 20,
        height: 20,
        health: 1,
        movement: {
            velocity: { x: 0, y: 0 },
            maxSpeed: 50,
            acceleration: {
                rate: 1,
                friction: 1,
            }
        },
        damage: 1,
        collisionRadius: 24,
        contactDamage: {
            amount: 1,
            pushBack: true,
        },
        buffs: {
            speed: {
                multiplier: 1,
                duration: 300,
            }
        },
        fallbackColor: '#ff4444',
        sprite: 'drifter',
    },
    seeker: {
        behaviours: ['seek'],
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
            pushBack: true,
        },
        buffs: {
            speed: {
                multiplier: 1,
                duration: 300,
            }
        },
        fallbackColor: '#cc8800',
        sprite: 'seeker',
    }
}