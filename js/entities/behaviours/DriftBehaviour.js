export class DriftBehaviour {
    constructor() {
        this.reset();
        this.changeInterval = 2;
    }

    update(enemy, deltaTime, player) {
        this.changeTimer += deltaTime;
        if (this.changeTimer >= this.changeInterval) {
            this.reset();
        }

        const dx = Math.cos(this.angle);
        const dy = Math.sin(this.angle);

        const speedBonus = enemy.buffs.speed.duration > 0 ? enemy.buffs.speed.multiplier : 1;
        const maxSpeed = enemy.movement.maxSpeed * speedBonus;

        enemy.x += dx * maxSpeed * deltaTime;
        enemy.y += dy * maxSpeed * deltaTime;
    }

    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.changeTimer = 0;
    }
}