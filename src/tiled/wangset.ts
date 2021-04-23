import { Property } from './property';

export interface WangColor {
    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB)
     */
    color: string;
    /**
     * Name of the Wang color
     */
    name: string;
    /**
     * Probability used when randomizing
     */
    probability: number;
    /**
     * Local ID of tile representing the Wang color
     */
    tile: number;
}

export interface WangTile {
    /**
     * Tile is flipped diagonally
     */
    dflip: boolean;
    /**
     * Tile is flipped horizontally
     */
    hflip: boolean;
    /**
     * Local ID of tile
     */
    tileid: number;
    /**
     * Tile is flipped vertically
     */
    vflip: boolean;
    /**
     * Array of Wang color indexes
     */
    wangid: number[];
}

export interface WangSet {
    /**
     * Array of Wang colors
     */
    cornercolors?: WangColor[];
    /**
     * Array of Wang colors
     */
    edgecolors?: WangColor[];
    /**
     * Name of the Wang set
     */
    name: string;
    /**
     * Array of Properties
     */
    properties?: Property[];
    /**
     * Local ID of tile representing the Wang set
     */
    tile: number;
    /**
     * Array of Wang tiles
     */
    wangtiles?: WangTile[];
}