import { Frame } from './frame';
import { Property } from './property';
import { ObjectGroup } from './layers';

/**
 * A tileset that associates information with each tile,
 * like its image path or terrain type, may include a tiles array property.
 * Each tile has an id property, which specifies the local ID within the tileset.
 * 
 * For the terrain information,
 * each value is a length-4 array where each element is the index of a terrain on one corner of the tile.
 * The order of indices is: top-left, top-right, bottom-left, bottom-right.
 */
export interface Tile {
    /**
     * Array of Frames
     */
    animation?: Frame[];
    /**
     * Local ID of the tile
     */
    id: number;
    /**
     * Image representing this tile (optional)
     */
    image?: string;
    /**
     * Height of the tile image in pixels
     */
    imageheight?: number;
    /**
     * Width of the tile image in pixels
     */
    imagewidth?: number;
    /**
     * Layer with type objectgroup, when collision shapes are specified (optional)
     */
    objectgroup?: ObjectGroup;
    /**
     * Percentage chance this tile is chosen when competing with others in the editor (optional)
     */
    probability: number;
    /**
     * Array of Properties
     */
    properties?: Property[];
    /**
     * Index of terrain for each corner of tile (optional)
     */
    terrain?: [topLeft: number, topRight: number, bottomLeft: number, bottomRight: number][];
    /**
     * The type of the tile (optional)
     */
    type?: string;
}