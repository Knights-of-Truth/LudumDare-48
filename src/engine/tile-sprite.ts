import * as PIXI from 'pixi.js';
import Tile from './tile';
import GridTileLayer from './grid-tilelayer';

const FLIPPED_HORIZONTALLY_FLAG = 0x8000_0000;
const FLIPPED_VERTICALLY_FLAG = 0x4000_0000;
const FLIPPED_DIAGONALLY_FLAG = 0x2000_0000;

export default class TileSprite extends PIXI.Sprite implements Tile {
    private _tileId!: number;
    private _flippedHorizontally = false;
    private _flippedVertically = false;
    private _flippedDiagonally = false;

    public readonly isZeroSupported = false;

    /**
     * Creates a new tile sprite.
     * @param layer The tile layer which the tile belongs to.
     * @param tileX The X-coordinates of the tile in grid units.
     * @param tileY The Y-coordinates of the tile in grid units.
     * @param rawTileId The raw id of the tile, including the flipping bits.
     */
    constructor(
        public layer: GridTileLayer,
        public readonly tileX: number,
        public readonly tileY: number,
        rawTileId: number
    ) {
        super();
        const { map } = this.layer;

        this.anchor.set(0.5, 0.5);
        this.position.set((tileX + .5) * map.tileWidth, (tileY + .5) * map.tileHeight);
        this.rawTileId = rawTileId;
    }

    get tileId() { return this._tileId }
    set tileId(value: number) {
        if (value <= 0) throw new Error('tileId must be a positive integer');
        this._tileId = value;
        this.texture = this.layer.map.textures[value];
    }

    get rawTileId() {
        let value = this.tileId;

        if (this._flippedHorizontally) value |= FLIPPED_HORIZONTALLY_FLAG;
        if (this._flippedVertically) value |= FLIPPED_VERTICALLY_FLAG;
        if (this._flippedDiagonally) value |= FLIPPED_DIAGONALLY_FLAG;

        return value;
    }
    set rawTileId(value: number) {
        if (value === 0) throw new Error('rawTileId can\'t be 0');

        this.tileId = value & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);

        this._flippedHorizontally = (value & FLIPPED_HORIZONTALLY_FLAG) !== 0;
        this._flippedVertically = (value & FLIPPED_VERTICALLY_FLAG) !== 0;
        this._flippedDiagonally = (value & FLIPPED_DIAGONALLY_FLAG) !== 0;
        this._updateFlipping();
    }

    get flippedHorizontally() { return this._flippedHorizontally }
    set flippedHorizontally(value: boolean) {
        this._flippedHorizontally = value;
        this._updateFlipping();
    }

    get flippedVertically() { return this._flippedVertically }
    set flippedVertically(value: boolean) {
        this._flippedVertically = value;
        this._updateFlipping();
    }

    get flippedDiagonally() { return this._flippedDiagonally }
    set flippedDiagonally(value: boolean) {
        this._flippedDiagonally = value;
        this._updateFlipping();
    }

    /**
     * Updates the rotation and scale transformations based on the tile's flipping.
     */
    private _updateFlipping() {
        this.rotation = this._flippedDiagonally ? Math.PI / 2 : 0;
        this.scale.set(
            (this._flippedDiagonally ? this._flippedVertically : this._flippedHorizontally) ? -1 : 1,
            (this._flippedDiagonally ? !this._flippedHorizontally : this._flippedVertically) ? -1 : 1
        );
    }
}