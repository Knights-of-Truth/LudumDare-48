import { Consumable } from './consumable';
import player from './player';
import Crate from './crate';

export default class Item extends Crate implements Consumable {
    consume(player: player): void {
        player.inventory.addItem(this.tile.tileId);
        this.tile.tileId = 0;
        this.tile.entity = undefined;
    }
}