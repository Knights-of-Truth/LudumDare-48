import { Property } from './property';

export interface Terrain {
    /**
     * Name of terrain
     */
    name: string;
    /**
     * Array of Properties
     */
    properties?: Property[];
    /**
     * Local ID of tile representing terrain
     */
    tile: number;
}