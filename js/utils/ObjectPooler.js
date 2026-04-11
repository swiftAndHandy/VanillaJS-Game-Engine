export class ObjectPooler {
    constructor(factoryFn, inactiveSize) {
        this.factoryFn = factoryFn;
        this.inactive = [];
        this.active = [];

        for (let i = 0; i < inactiveSize; i++) {
            this.inactive.push(this.factoryFn());
        }
    }

    get() {
        let obj;
        if (this.inactive.length > 0) {
            obj = this.inactive.pop();
        } else {
            obj = this.factoryFn();
            console.log('[DEV] inactive pool expanded, create new object.');
        }
        this.active.push(obj);
        return obj;
    }

    updateAll(deltaTime, ...args) {
        for (let i = this.active.length - 1; i >= 0; i--) {
            const obj = this.active[i];
            obj.update(deltaTime, ...args);
            if (!obj.active) {
                this.release(obj);
            }
        }
    }

    release(obj) {
        const index = this.active.indexOf(obj);
        if (index >= 0) {
            this.active.splice(index, 1);
            obj.reset();
            this.inactive.push(obj);
        }
    }

    releaseAll() {
        for (let i = 0; i < this.active.length; i++) {
            this.active[i].reset();
            this.inactive.push(this.active[i]);
        }
        this.active = [];
    }
}