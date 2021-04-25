import { Entity } from '../engine';
import { Consumable } from './consumable';
import player from './player';

export default class Item extends Entity implements Consumable {
    consume(player: player): void {
        player.inventory.addItem(this.tile.tileId);
        this.tile.tileId = 0;
        this.tile.entity = undefined;
    }
}