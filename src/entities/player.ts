import { Entity, Tile } from '../engine';
import Direction from '../lib/direction';

import { isPushable } from './pushable';

export default class Player extends Entity {
    public onMove = () => { };

    constructor(tile: Tile) {
        super(tile);
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
        if (targetEntity) {
            if (!isPushable(targetEntity)) return;
            targetEntity.push(direction, 2);
            if (targetTile.entity !== undefined) return;
        }

        this.tile = targetTile.swapWith(this.tile);

        this.onMove();
    }
}
