import { Property } from './property';
import { Object } from './object';
import { Chunk } from './chunk';

interface BaseLayer {
    type: 'tilelayer' | 'objectgroup' | 'imagelayer' | 'group';

    /**
     * Incremental ID - unique across all layers.
     */
    id: number;

    /**
     * Name assigned to this layer.
     */
    name: string;

    /**
     * Horizontal layer offset in pixels (default: 0).
     */
    offsetx?: number;

    /**
     * Vertical layer offset in pixels (default: 0).
     */
    offsety?: number;

    /**
     * Value between 0 and 1.
     */
    opacity: number;

    /**
     * Array of properties.
     */
    properties?: Property[];

    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB) that is multiplied with any graphics drawn by this layer or any child layers.
     */
    tintcolor?: string;

    /**
     * Whether layer is shown or hidden in editor.
     */
    visible: boolean;

    /**
     * Horizontal layer offset in tiles. Always 0.
     */
    x: 0;

    /**
     * Vertical layer offset in tiles. Always 0.
     */
    y: 0;
}

export interface TileLayer extends BaseLayer {
    type: 'tilelayer';

    /**
     * Array of chunks, for infinite maps.
     */
    chunks?: Chunk[];

    compression: '' | 'zlib' | 'gzip' | 'zstd';

    /**
     * Array of `unsigned int` (GIDs) or base64-encoded data.
     */
    data?: number[] | string;

    encoding: 'csv' | 'base64';

    /**
     * Row count. Same as map height for fixed-size maps.
     */
    height: number;

    /**
     * X coordinate where layer content starts (for infinite maps).
     */
    startx?: number;

    /**
     * Y coordinate where layer content starts (for infinite maps).
     */
    starty?: number;

    /**
     * Column count. Same as map width for fixed-size maps.
     */
    width: number;
}

export interface ObjectGroup extends BaseLayer {
    type: 'objectgroup';

    draworder: 'topdown' | 'index';

    /**
     * Array of objects.
     */
    objects: Object[];
}

export interface ImageLayer extends BaseLayer {
    type: 'imagelayer';

    /**
     * Image used by this layer.
     */
    image: string;

    /**
     * Hex-formatted color (#RRGGBB) (optional).
     */
    transparentcolor?: string;
}

export interface Group extends BaseLayer {
    type: 'group';

    /**
     * Array of layers.
     */
    layers: Layer[];
}

export type Layer = TileLayer | ObjectGroup | ImageLayer | Group;