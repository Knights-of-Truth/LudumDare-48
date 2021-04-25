import Entity from './entity';
import GridTileLayer from './grid-tilelayer';

export default interface Tile {
    /**
     * The X-coordinates of the tile in grid units.
     */
    readonly tileX: number;
    /**
     * The Y-coordinates of the tile in grid units.
     */
    readonly tileY: number;

    /**
     * The tile layer which the tile belongs to.
     */
    readonly layer: GridTileLayer;
    
    /**
     * The global id of the tile's texture.
     */
    tileId: number;
    /**
     * The global id of the tile's texture,
     * with flipping bits included.
     */
    rawTileId: number;

    /**
     * Whether the tile is flipped horizontally or not.
     */
    flippedHorizontally: boolean;
    /**
     * Whether the tile is flipped vertically or not.
     */
    flippedVertically: boolean;
    /**
     * Whether the tile is flipped diagonally or not.
     */
    flippedDiagonally: boolean;

    /**
     * Entity logic assocciated with the tile.
     */
    entity: Entity | undefined;

    /**
     * Swaps 2 tiles, this tile, and the target tile.
     * 
     * Which is done by swapping their internal values,
     * including the raw tile id and the entity object (properly updating it's tile reference).
     * 
     * @param tile The target tile.
     * @returns The target tile after swapping (same reference).
     */
    swapWith(tile: Tile): Tile;
}