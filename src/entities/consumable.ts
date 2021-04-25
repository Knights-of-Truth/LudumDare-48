import { Entity } from '../engine';
import Player from './player';

export interface Consumable extends Entity {
    /**
     * Attempt to consume the entity by a player.
     * @param player The player attempting to consume the entity.
     */
    consume(player: Player): void;
}

export function isConsumable(entity: Entity): entity is Consumable {
    return (entity as unknown as Consumable).consume !== undefined;
}