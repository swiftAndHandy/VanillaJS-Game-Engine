export class SeekBehaviour {
    update(enemy, deltaTime, player) {
        const dx = player.x + player.width/2 - (enemy.x + enemy.width/2);
        const dy = player.y + player.height/2 - (enemy.y + enemy.height/2);
        const len = Math.sqrt(dx * dx + dy * dy);
        // if (len > player.collisionRadius) {
            const speedBonus = enemy.buffs.speed.duration > 0 ? enemy.buffs.speed.multiplier : 1;
            const maxSpeed = enemy.movement.maxSpeed * speedBonus;

            // Axis lock — stop moving on an axis when hitboxes are adjacent on it
            const ehb = enemy.getHitbox();
            const phb = player.getHitbox();
            const centerDx = (ehb.x + ehb.width / 2) - (phb.x + phb.width / 2);
            const centerDy = (ehb.y + ehb.height / 2) - (phb.y + phb.height / 2);
            const lockX = ehb.width / 2 + phb.width / 2;
            const lockY = ehb.height / 2 + phb.height / 2;
            const activeDx = Math.abs(centerDx) > lockX ? dx : 0;
            const activeDy = Math.abs(centerDy) > lockY ? dy : 0;

            // Target full maxSpeed per axis — divide by √2 diagonally to keep consistent total speed
            const diagonalFactor = (activeDx && activeDy) ? Math.SQRT2 : 1;
            const targetVx = activeDx ? Math.sign(activeDx) * (maxSpeed / diagonalFactor) : 0;
            const targetVy = activeDy ? Math.sign(activeDy) * (maxSpeed / diagonalFactor) : 0;

            // Lerp each axis independently — responseTime only when axis has no input
            const lerpAccel = 1 - Math.pow(1 - enemy.movement.acceleration.rate, deltaTime);
            const lerpFactor = 1 - Math.exp(-deltaTime / enemy.movement.acceleration.responseTime);

            enemy.movement.velocity.x += (targetVx - enemy.movement.velocity.x) * (activeDx ? lerpAccel : lerpFactor);
            enemy.movement.velocity.y += (targetVy - enemy.movement.velocity.y) * (activeDy ? lerpAccel : lerpFactor);

            enemy.x += enemy.movement.velocity.x * deltaTime;
            enemy.y += enemy.movement.velocity.y * deltaTime;
        // }
    }
}