import Tile from './tile';

export default class Entity {
    private _tile: Tile;

    constructor (tile: Tile) {
        this._tile = tile;

        tile.entity = this;
    }

    /**
     * The tile associated with the entity.
     */
    get tile() {
        return this._tile;
    }
    set tile(newTile) {
        newTile.entity = this;
        this.tile.entity = undefined;
        this._tile = newTile;
    }
}