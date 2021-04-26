import { Entity } from '../engine';
import * as Utils from '../lib/utils';

import { Consumable } from './consumable';
import player from './player';

export default class NPC extends Entity implements Consumable {
    protected readonly npcId = Utils.getProperty(
        this.tile.layer.map.tilesMetadata[this.tile.tileId]?.properties,
        'NPCID',
        'string'
    ) ?? '';

    protected logicState = 0;

    consume(player: player): void {
        if (this.npcId === 'maanex') {
            switch (this.logicState) {
                case 0:
                    player.dialog.open('maanex_01');
                    this.logicState++;
                    break;
                case 1:
                    const gotCoin = player.inventory.removeItem(348);
                    player.dialog.open(gotCoin ? 'maanex_03' : 'maanex_02');
                    if (gotCoin) this.logicState++;
                    break;
                default:
                    player.dialog.open('maanex_00');
            }
        }
    }
}