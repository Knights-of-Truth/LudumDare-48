import { Entity, Tile } from '../engine';
import Dialog from '../interface/dialog';
import * as Utils from '../lib/utils';

import { Consumable } from './consumable';
import player from './player';

export default class StaticDialog extends Entity implements Consumable {
    protected readonly dialogId = Utils.getProperty(
        this.tile.layer.map.tilesMetadata[this.tile.tileId]?.properties,
        'DialogID',
        'string'
    );

    constructor( tile: Tile) {
        super(tile);
        if (this.dialogId === undefined)
            console.warn(`DialogID is not set for tile ${this.tile.tileId} ⚠`);
    }

    consume(player: player): void {
        if (this.dialogId === undefined) return;
        player.dialog.open(this.dialogId);
    }
}