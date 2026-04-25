export class SeekBehaviour {
    update(enemy, deltaTime, player) {
        const dx = player.x + player.width/2 - (enemy.x + enemy.width/2);
        const dy = player.y + player.height/2 - (enemy.y + enemy.height/2);
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > player.collisionRadius) {
            const speedBonus = enemy.buffs.speed.duration > 0 ? enemy.buffs.speed.multiplier : 1;
            const maxSpeed = enemy.movement.maxSpeed * speedBonus;

            // Target full maxSpeed per axis — divide by √2 diagonally to keep consistent total speed
            const diagonalFactor = (dx && dy) ? Math.SQRT2 : 1;
            const targetVx = dx ? Math.sign(dx) * (maxSpeed / diagonalFactor) : 0;
            const targetVy = dy ? Math.sign(dy) * (maxSpeed / diagonalFactor) : 0;

            // Lerp each axis independently — friction only when axis has no input
            const lerpAccel = 1 - Math.pow(1 - enemy.movement.acceleration.rate, deltaTime);
            const lerpFriction = 1 - Math.pow(enemy.movement.acceleration.friction / 10000, deltaTime);

            enemy.movement.velocity.x += (targetVx - enemy.movement.velocity.x) * (dx ? lerpAccel : lerpFriction);
            enemy.movement.velocity.y += (targetVy - enemy.movement.velocity.y) * (dy ? lerpAccel : lerpFriction);

            enemy.x += enemy.movement.velocity.x * deltaTime;
            enemy.y += enemy.movement.velocity.y * deltaTime;
        } else if (enemy.contactDamage.amount) {
            enemy.dealContactDamage(player);
        }
    }
}