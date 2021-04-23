import { Grid } from './grid';
import { Property } from './property';
import { Terrain } from './terrain';
import { Tile } from './tile';
import { TileOffset } from './tileoffset';
import { WangSet } from './wangset';

/**
 * Alignment to use for tile objects.
 */
export enum ObjectAlignment {
    Unspecified = 'unspecified',
    TopLeft = 'topleft',
    Top = 'top',
    TopRight = 'topRight',
    Left = 'left',
    Center = 'center',
    Right = 'right',
    BottomLeft = 'bottomleft',
    Bottom = 'bottom',
    BottomRight = 'bottomright',
}

/**
 * Each tileset has a `firstgid` (first global ID) property which tells you the global ID of its first tile (the one with local tile ID 0).
 * This allows you to map the global IDs back to the right tileset,
 * and then calculate the local tile ID by subtracting the `firstgid` from the global tile ID.
 * The first tileset always has a `firstgid` value of 1.
 */
export interface TilesetData {
    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB) (optional)
     */
    backgroundcolor?: string;
    /**
     * The number of tile columns in the tileset
     */
    columns: number;
    /**
     * (optional)
     */
    grid?: Grid;
    /**
     * Image used for tiles in this set
     */
    image: string;
    /**
     * Height of source image in pixels
     */
    imageheight: number;
    /**
     * Width of source image in pixels
     */
    imagewidth: number;
    /**
     * Buffer between image edge and first tile (pixels)
     */
    margin: number;
    /**
     * Name given to this tileset
     */
    name: string;
    /**
     * Alignment to use for tile objects (`unspecified` default)
     */
    objectalignment: ObjectAlignment;
    /**
     * Array of Properties
     */
    properties?: Property[];
    /**
     * Spacing between adjacent tiles in image (pixels)
     */
    spacing: number;
    /**
     * Array of Terrains (optional)
     */
    terrains?: Terrain[];
    /**
     * The number of tiles in this tileset
     */
    tilecount: number;
    /**
     * The Tiled version used to save the file
     */
    tiledversion: string;
    /**
     * Maximum height of tiles in this set
     */
    tileheight: number;
    /**
     * (optional)
     */
    tileoffset?: TileOffset;
    /**
     * Array of Tiles (optional)
     */
    tiles?: Tile[];
    /**
     * Maximum width of tiles in this set
     */
    tilewidth: number;
    /**
     * Hex-formatted color (#RRGGBB) (optional)
     */
    transparentcolor?: string;
    /**
     * (for tileset files, since 1.0)
     */
    type: 'tileset';
    /**
     * The JSON format version
     */
    version: number;
    /**
     * Array of Wang sets (since 1.1.5)
     */
    wangsets?: WangSet[];
}

/**
 * An imported tileset, is a tileset whose data is in an external file, pointed by the field 'source'.
 */
export interface ImportedTileset {
    /**
     * GID corresponding to the first tile in the set
     */
    firstgid: number;
    /**
     * The external file that contains this tilesets data
     */
    source: string;
}

/**
 * An embedded tileset, is a tileset whose data is included in the map data file.
 */
export interface EmbeddedTileset extends TilesetData {
    /**
     * GID corresponding to the first tile in the set
     */
    firstgid: number;
};

/**
 * Representation of a tileset, either embedded or imported from external file.
 */
export type Tileset = EmbeddedTileset | ImportedTileset;

export function isEmbeddedTileset(tileset: Tileset): tileset is EmbeddedTileset {
    return (tileset as ImportedTileset).source === undefined;
}