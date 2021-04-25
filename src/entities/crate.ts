import { Entity, Tile, Tileset } from '../engine';
import Direction from '../lib/direction';
import * as Utils from '../lib/utils';

import { isPushable, Pushable } from './pushable';

export default class Crate extends Entity implements Pushable {
    push(direction: Direction, power = 1) {
        if (power < this.weight) return;

        const solidTiles = this.tile.layer.map.solidTiles;
        const targetTile = this.getTargetTile(direction);
        if (!targetTile || solidTiles[targetTile.tileX][targetTile.tileY]) return;

        const targetEntity = targetTile.entity;
        if (targetEntity) {
            if (!isPushable(targetEntity)) return;
            targetEntity.push(direction, power - this.weight);
            if (targetTile.entity !== undefined) return;
        }

        this.tile = targetTile.swapWith(this.tile);
    }

    get weight() {
        return Utils.getProperty(
            this.tile.layer.map.tilesMetadata[this.tile.tileId]?.properties,
            'Weight',
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
}