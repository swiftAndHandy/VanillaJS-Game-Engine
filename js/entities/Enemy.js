import {GAME_HEIGHT, GAME_WIDTH, ENEMY_DESPAWN_MARGIN} from "../core/constants.js";
import {BehaviourFactory} from "./behaviours/BehaviourFactory.js";
export class Enemy {
    constructor(data, behaviours) {
        this.data = data;
        this.behaviours = BehaviourFactory.create(data.behaviours);
        this.reset();
    }

    spawn(x, y) {
        this.x = x;
        this.y = y;
        this.health = this.data.health;
        this.active = true;
    }

    reset() {
        this.active = false;
        this.behaviours = BehaviourFactory.create(this.data.behaviours);

        // Position and dimensions
        this.x = 0;
        this.y = 0;
        this.width = this.data.width;
        this.height = this.data.height;

        // Stats
        this.health = this.data.health;
        this.movement = structuredClone(this.data.movement);
        this.damage = this.data.damage;
        this.hitboxes = structuredClone(this.data.hitboxes);
        this.contactDamage = structuredClone(this.data.contactDamage);
        this.orientation = structuredClone(this.data.orientation);
        this.buffs = structuredClone(this.data.buffs);

        this.behaviours.forEach(behaviour => {
           if (behaviour.reset) {
               behaviour.reset();
           }
        });
    }

    update(deltaTime, player) {
        if (!this.active) return;

        //Despawn if to far offscreen
        if (this.x < -ENEMY_DESPAWN_MARGIN ||
            this.x > GAME_WIDTH + ENEMY_DESPAWN_MARGIN ||
            this.y < -ENEMY_DESPAWN_MARGIN ||
            this.y > GAME_HEIGHT + ENEMY_DESPAWN_MARGIN
        ) {
            this.active = false;
            return;
        }

        this.behaviours.forEach(behaviour => {
            behaviour.update(this, deltaTime, player);
        });

        if (Math.abs(this.movement.velocity.x) > 0.5) this.orientation.facingWest = this.movement.velocity.x < 0;
        if (Math.abs(this.movement.velocity.y) > 0.5) this.orientation.facingNorth = this.movement.velocity.y < 0;

    }

    getHitboxes() {
        const facingWest = this.orientation?.facingWest ?? false;
        return this.hitboxes.map(hb => {
            if (hb.type === 'rect') {
                const mL = facingWest ? hb.margin.right : hb.margin.left;
                const mR = facingWest ? hb.margin.left  : hb.margin.right;
                return {
                    type: 'rect',
                    x:      this.x + mL,
                    y:      this.y + hb.margin.top,
                    width:  this.width  - mL - mR,
                    height: this.height - hb.margin.top - hb.margin.bottom,
                };
            }
            if (hb.type === 'circle') {
                return {
                    type: 'circle',
                    x: this.x + this.width  / 2 + (hb.offsetX ?? 0),
                    y: this.y + this.height / 2 + (hb.offsetY ?? 0),
                    radius: hb.radius,
                };
            }
        });
    }

    dealContactDamage(player) {
        player.receivesDmgFrom(this, this.damage);
    }
}