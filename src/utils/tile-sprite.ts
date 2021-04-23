import { Sprite } from 'pixi.js';
import Tileset from './tileset.old';

const FLIPPED_HORIZONTALLY_FLAG = 0x8000_0000;
const FLIPPED_VERTICALLY_FLAG = 0x4000_0000;
const FLIPPED_DIAGONALLY_FLAG = 0x2000_0000;

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

export default class TileSprite extends Sprite {
    private _tileId!: number;
    private _flippedHorizontally = false;
    private _flippedVertically = false;
    private _flippedDiagonally = false;

    /**
     * Creates a new tile sprite.
     * @param tileset The tileset to use (temporary, should use a tilesets system).
     * @param rawTileId The raw id of the tile, including the flipping bits.
     */
    constructor(private tileset: Tileset, rawTileId: number) {
        super();

        this.anchor.set(0.5, 0.5);
        this.rawTileId = rawTileId;
        this.angle
    }

    /**
     * The global id of the tile's texture.
     */
    get tileId() { return this._tileId }
    set tileId(value: number) {
        if (value <= 0) throw new Error('tileId must be a positive integer');
        this._tileId = value;
        this.texture = this.tileset.textures[value - 1];
    }

    /**
     * The global id of the tile's texture, with flipping bits included.
     */
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

    /**
     * Whether the tile is flipped horizontally or not.
     */
    get flippedHorizontally() { return this._flippedHorizontally }
    set flippedHorizontally(value: boolean) {
        this._flippedHorizontally = value;
        this._updateFlipping();
    }

    /**
     * Whether the tile is flipped vertically or not.
     */
    get flippedVertically() { return this._flippedVertically }
    set flippedVertically(value: boolean) {
        this._flippedVertically = value;
        this._updateFlipping();
    }

    /**
     * Whether the tile is flipped diagonally or not.
     */
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