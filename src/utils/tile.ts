export default interface Tile {
    /**
     * Whether the tileId 0 is supported or not.
     */
    readonly isZeroSupported: boolean;
    
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
}