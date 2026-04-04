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
    }

    spawn(x, y) {
        this.x = x;
        this.y = y;
        this.health = this.data.health;
    }
}