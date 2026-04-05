export class Enemy {
    constructor(data) {
        this.data = data;

        // Position and dimensions
        this.x = 0;
        this.y = 0;
        this.width = data.width;
        this.height = data.height;

        // Stats
        this.health = data.health;
        this.speed = data.speed;
        this.damage = data.damage;
        this.collisionRadius = data.collisionRadius;
        this.contactDamage = data.contactDamage;
        this.buffs = data.buffs;
    }

    spawn(x, y) {
        this.x = x;
        this.y = y;
        this.health = this.data.health;
    }

    update(deltaTime, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len > player.collisionRadius) {
            const normalizedDx = dx/len;
            const normalizedDy = dy/len;
            const speedBonus = this.buffs.speed.duration > 0 ? this.buffs.speed.multiplier : 1;
            this.x += normalizedDx * this.speed * speedBonus * deltaTime;
            this.y += normalizedDy * this.speed * speedBonus * deltaTime;
        } else {
            this.dealsContactDamage(player);
        }
    }

    dealsContactDamage(player) {
        player.receivesDmgFrom(this);
    }
}