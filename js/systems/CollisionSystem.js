export class CollisionSystem {
    check(a, b) {
        for (const sa of a.getHitboxes()) {
            for (const sb of b.getHitboxes()) {
                if (this._checkShapes(sa, sb)) return true;
            }
        }
        return false;
    }

    _checkShapes(a, b) {
        if (a.type === 'circle' && b.type === 'circle') return this._circleCircle(a, b);
        if (a.type === 'rect'   && b.type === 'rect')   return this._rectRect(a, b);
        if (a.type === 'circle' && b.type === 'rect')   return this._circleRect(a, b);
        if (a.type === 'rect'   && b.type === 'circle') return this._circleRect(b, a);
    }

    _circleCircle(a, b) {
        const dx = a.x - b.x, dy = a.y - b.y;
        const r = a.radius + b.radius;
        return dx * dx + dy * dy < r * r;
    }

    _rectRect(a, b) {
        return a.x < b.x + b.width  &&
               a.x + a.width  > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    _circleRect(circle, rect) {
        const cx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const cy = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        const dx = circle.x - cx, dy = circle.y - cy;
        return dx * dx + dy * dy < circle.radius * circle.radius;
    }
}
