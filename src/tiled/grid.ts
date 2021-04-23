/**
 * Specifies common grid settings used for tiles in a tileset.
 */
export interface Grid {
    /**
     * Cell height of tile grid
     */
    height: number;

    orientation: 'orthogonal' | 'isometric';
    /**
     * Cell width of tile grid
     */
    width: number;
}