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
        this.collisionRadius = this.data.collisionRadius;
        this.contactDamage = structuredClone(this.data.contactDamage);
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

        // Contact damage check — behaviour-agnostic
        if (this.contactDamage.amount > 0) {
            const dx = player.x + player.width / 2 - (this.x + this.width / 2);
            const dy = player.y + player.height / 2 - (this.y + this.height / 2);
            const len = Math.sqrt(dx * dx + dy * dy);
            if (len <= this.collisionRadius) {
                this.dealContactDamage(player);
            }
        }

    }

    dealContactDamage(player) {
        player.receivesDmgFrom(this);
    }
}