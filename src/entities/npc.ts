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
                case 0: {
                    const gotCoin = player.inventory.removeItem(348);
                    player.dialog.open(gotCoin ? 'maanex_04' : 'maanex_01');
                    this.logicState = gotCoin ? 2 : 1;
                    break;
                }
                case 1: {
                    const gotCoin = player.inventory.removeItem(348);
                    player.dialog.open(gotCoin ? 'maanex_03' : 'maanex_02');
                    if (gotCoin) this.logicState++;
                    break;
                }
                default:
                    player.dialog.open('maanex_00');
            }
        }

        if (this.npcId === 'john') {
            switch (this.logicState) {
                case 0: {
                    player.dialog.open('john_01');
                    break;
                }
            }
        }

        if (this.npcId === 'duck') {
            switch (this.logicState) {
                case 0: {
                    player.dialog.open('duck_01');
                    break;
                }
            }
        }

        if (this.npcId === 'glitch') {
            switch (this.logicState) {
                case 0: {
                    player.dialog.open('glitch_01');
                    break;
                }
            }
        }
    }
}