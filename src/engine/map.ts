import * as PIXI from 'pixi.js';
import * as Tiled from '../tiled';

import Tileset from './tileset';
import GridTileLayer from './grid-tilelayer';

import * as Utils from '../lib/utils';

/**
 * A container of loaded resources, with keys being path names,
 * and values being the loaded resource.
 */
type Resources = Record<string, any>;

export default class Map extends PIXI.Container {
    /**
     * The width of the map in tiles.
     */
    public readonly mapWidth: number;
    /**
     * The height of the map in tiles.
     */
    public readonly mapHeight: number;
    /**
     * The width of a single tile in pixels.
     */
    public readonly tileWidth: number;
    /**
     * The height of a single tile in pixel.
     */
    public readonly tileHeight: number;
    /**
     * Whether the map is 'infinite' or not.
     */
    public readonly infinite: boolean;

    /**
     * The map's custom properties.
     */
    public readonly properties: Record<string, Readonly<Tiled.Property> | undefined> = {};

    /**
     * The map's loaded tilesets.
     */
    public readonly tilesets: Tileset[] = [];
    /**
     * A record storing the textures of tiles in the tilesets.
     * - Keys: The tile's global id (GID).
     * - Values: The tile's loaded texture.
     */
    public readonly textures: Record<number, PIXI.Texture> = [];
    /**
     * A record storing any metadata available for a tile.
     * - Keys: The tile's global id (GID).
     * - Values: The tile's metadata, undefiend when there's no data.
     */
    public readonly tilesMetadata: Record<number, Readonly<Tiled.Tile> | undefined> = {};
    /**
     * The map's loaded layers.
     */
    public readonly layers: GridTileLayer[] = [];

    /**
     * A 2-dimenional array with the dimensions of the map,
     * stores 'true' for each solid tile.
     */
    public readonly solidTiles: boolean[][] = [];

    /**
     * Load and create a new map instance.
     * The way it's loaded will process the paths relative to the path of the map itself.
     * 
     * @param resources The loaded resource available to the map,
     *  The keys should be path strings, and the values should be the loaded pixi.js resource data.
     * @param path The path (key) to the map resource data.
     * @throws on loading failure.
     */
    constructor(
        resources: Resources,
        public readonly path: string
    ) {
        super();

        const data = Map.resolveMapData(resources, path);

        //TODO: Support 'backgroundcolor'
        //TODO: Support 'compressionlevel'
        //TODO: Support 'hexsidelength'
        //TODO: Support 'orientation' values other than 'orthogonal'
        //TODO: Support 'renderorder' values other than 'right-down'
        //TODO: Support 'staggeraxis'
        //TODO: Support 'staggerindex'
        //TODO: Store 'tiledversion'
        //TODO: Check 'version' (the json format version)

        const {
            type,
            width, height,
            tilewidth, tileheight,
            properties, tilesets, layers,
            infinite, orientation, renderorder,
        } = data;

        if (type !== 'map') throw new Error(`Invalid map data type: ${type}`);

        // TODO: Support non-orthogonal maps.
        if (orientation !== 'orthogonal')
            throw new Error(`Only orthogonal maps are supported at the moment, attempted to load a ${orientation} map`);
        // TODO: Support non-right-down rendering.
        if (renderorder !== 'right-down')
            throw new Error(`Only right-down rendered maps are supported at the moment, attempted to load a ${renderorder} rended map`);

        this.mapWidth = width;
        this.mapHeight = height;

        this.tileWidth = tilewidth;
        this.tileHeight = tileheight;

        this.infinite = infinite;

        // Copy the properties
        if (properties !== undefined)
            for (const property of properties) this.properties[property.name] = property;

        // Load the tilesets, tiles textures and the tiles metadata.
        if (tilesets !== undefined) {
            for (const tilesetData of tilesets) {
                const tileset = new Tileset(this, tilesetData, resources);
                this.tilesets.push(tileset);

                // Copy the tile's textures and metadata.
                tileset.textures.forEach((texture, localId) => {
                    this.textures[tileset.firstGID + localId] = texture;
                    const metadata = tileset.tiles[localId];
                    if (metadata !== undefined) this.tilesMetadata[tileset.firstGID + localId] = metadata;
                });
            }
        }

        // Load the layers.
        for (const layer of layers) {
            if (layer.type === 'tilelayer') {
                const tileLayer = new GridTileLayer(this, layer);
                this.addChild(tileLayer);
                this.layers.push(tileLayer);
            } else {
                // TODO: Support layers types other than tile layers.
                console.warn(`Layer #${layer.id} '${layer.name}' has been ignored because it's not supported!\n(Only tile layers are supported)`);
            }
        }

        // Update the solid tiles matrix.
        this.updateSolid();
    }

    public updateSolid() {
        const { layers, mapWidth, mapHeight } = this;

        // Clear the existing data.
        this.solidTiles.length = 0;

        // Create the columns.
        for (let x = 0; x < mapWidth; x++) this.solidTiles[x] = [];

        // Scan the layers.
        for (const layer of layers) {
            if (!Utils.getProperty(layer.properties, 'Solid', 'bool')) continue;
            for (let x = 0; x < mapWidth; x++)
                for (let y = 0; y < mapHeight; y++)
                    if (layer.tiles[x][y].tileId !== 0)
                        this.solidTiles[x][y] = true;
        }
    }

    /**
     * Resolves the paths to the map file, and returns it's loaded data.
     * @param resources The available resources files.
     * @param mapPath The path to the map resource file.
     * @returns The map data.
     * @throws when not found, or from invalid type.
     */
    private static resolveMapData(resources: Resources, mapPath: string): Tiled.Map {
        const data = resources[mapPath.replace(/.tsx$/, '.json')];

        if (data === undefined || data === null) throw new Error(`Map resource file '${mapPath}' doesn't exist!`);
        if (typeof data !== 'object') throw new Error(`The map data should be a parsed JSON object, provided: ${typeof data}`);

        return data
    }
}