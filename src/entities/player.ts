import { Entity, Tile } from '../engine';
import Direction from '../lib/direction';
import * as Utils from '../lib/utils';

import Inventory from '../interface/inventory';
import Dialog from '../interface/dialog';

import { isPushable } from './pushable';
import { isConsumable } from './consumable';

export default class Player extends Entity {
    public readonly inventory = new Inventory(this.tile.layer.map);
    public onMove = () => { };

    constructor(tile: Tile) {
        super(tile);
    }

    get power() {
        return Utils.getProperty(
            this.tile.layer.map.tilesMetadata[this.tile.tileId]?.properties,
            'Power',
            'int'
        ) ?? 1;
    }

    private getTargetTile(direction: Direction): Tile | undefined {
        const {
            tileX: x,
            tileY: y,
            layer: { tiles },
        } = this.tile;

        switch (direction) {
            case Direction.TOP:
                return tiles[x]?.[y - 1];
            case Direction.BOTTOM:
                return tiles[x]?.[y + 1];
            case Direction.LEFT:
                return tiles[x - 1]?.[y];
            case Direction.RIGHT:
                return tiles[x + 1]?.[y];
        }
    }

    move(direction: Direction) {
        const solidTiles = this.tile.layer.map.solidTiles;
        let targetTile = this.getTargetTile(direction);
        if (!targetTile || solidTiles[targetTile.tileX][targetTile.tileY]) return;

        const targetEntity = targetTile.entity;
        if (targetEntity
            && !this.attemptToConsume(targetEntity)
            && !this.attemptToPush(targetEntity, direction)
        ) return;

        this.tile = targetTile.swapWith(this.tile);

        this.onMove();
    }

    private attemptToConsume(entity: Entity) {
        const { tile } = entity;
        if (!isConsumable(entity)) return false;

        entity.consume(this);
        if (tile.entity !== undefined) return false;

        return true;
    }

    private attemptToPush(entity: Entity, direction: Direction) {
        const { tile } = entity;
        if (!isPushable(entity)) return false;

        entity.push(direction, this.power);
        if (tile.entity !== undefined) return false;

        return true;
    }
}
