import { Entity } from '../engine';
import Direction from '../lib/direction';

export interface Pushable extends Entity {
    /**
     * Attempts to push an entity.
     * @param direction The direction to push with.
     * @param power The power pushing by, for ex: each crate consumes 1 to be pushed.
     * (defaults to 1).
     */
    push(direction: Direction, power?: number): void;
}

export function isPushable(entity: Entity): entity is Pushable {
    return (entity as unknown as Pushable).push !== undefined;
}