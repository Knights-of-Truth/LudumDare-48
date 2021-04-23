/**
 * Chunks are used to store the tile layer data for **infinite maps**.
 */
export interface Chunk {
    /**
     * Array of `unsigned int` (GIDs) or base64-encoded data.
     */
    data: number[] | string;

    /**
     * Height in tiles.
     */
    height: number;

    /**
     * Width in tiles.
     */
    width: number;

    /**
     * X coordinates in tiles.
     */
    x: number;

    /**
     * Y coordinates in tiles.
     */
    y: number;
}