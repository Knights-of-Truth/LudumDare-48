import { Entity, Tile, Tileset } from '../engine';
import Direction from '../lib/direction';

import { isPushable, Pushable } from './pushable';

export default class Crate extends Entity implements Pushable {

    push(direction: Direction, power = 1) {
        if (power < 1) return;

        const solidTiles = this.tile.layer.map.solidTiles;
        const targetTile = this.getTargetTile(direction);
        if (!targetTile || solidTiles[targetTile.tileX][targetTile.tileY]) return;

        const targetEntity = targetTile.entity;
        if (targetEntity) {
            if (!isPushable(targetEntity)) return;
            targetEntity.push(direction, power - 1);
            if (targetTile.entity !== undefined) return;
        }

        this.tile = targetTile.swapWith(this.tile);
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