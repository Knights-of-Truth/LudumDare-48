import path from 'path';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import * as Tiled from '../tiled';
import { Map } from './map';

/**
 * A container of loaded resources, with keys being path names,
 * and values being the loaded resource.
 */
type Resources = Record<string, any>;

/**
 * Represents the loaded data of a Tiled tileset.
 * Which can be used for rendering maps.
 * 
 * Contains the textures for each tile, sharing the same BaseTexture (so they don't hit the GPU).
 * And the metadata available for each tile, so advanced game logic can be written.
 */
export default class Tileset {
    /**
     * The path of the tileset data (can be a map file path).
     */
    public readonly path: string;

    /**
     * The base texture of the tileset's tiles.
     */
    public readonly baseTexture: BaseTexture;

    /**
     * GID corresponding to the first tile in the set
     */
    public readonly firstGID: number;
    /**
     * The array of tiles textures included in this tileset.
     * The key is a 'local tile id', which is 0-based.
     */
    public readonly textures: Texture[] = [];
    /**
     * A record storing any metadata available for a tile.
     * - Keys: The tile's local id, which is 0-based.
     * - Values: The tile's metadata, undefined when there's no data.
     */
    public readonly tiles: Record<number, Tiled.Tile | undefined> = {};

    /**
     * The number of columns in this tileset's image.
     */
    public readonly columns: number;
    /**
     * The number of rows in this tileset's image.
     */
    public readonly rows: number;

    /**
     * The width of a single tile in pixels.
     */
    public readonly tileWidth: number;
    /**
     * The height of a single tile in pixels.
     */
    public readonly tileHeight: number;
    /**
     * The total number of tiles in this tileset.
     */
    public readonly tileCount: number;
    /**
     * The alignment used for tile objects (`unspecified` default).
     */
    public readonly objectAlignment: Tiled.ObjectAlignment;

    /**
     * Resolves and loads a tileset.
     * @param map The map which the tileset belongs to.
     * @param tileset The tileset's definition (from the map's data).
     * @param resources The available loaded resources.
     */
    constructor(
        public readonly map: Map,
        tileset: Tiled.Tileset,
        resources: Resources
    ) {
        // Resolve the tileset's path.
        this.path = Tiled.isEmbeddedTileset(tileset)
            ? map.path
            : path.join(path.dirname(map.path), tileset.source.replace(/.tsx$/, '.json'));

        // Set the tileset's first tile GID.
        this.firstGID = tileset.firstgid;

        // Resolve the tileset's data.
        const data: Tiled.TilesetData = Tiled.isEmbeddedTileset(tileset) ? tileset
            : Tileset.resolveTilesetData(resources, this.path);

        // Resolve the tileset's image.
        const tilesetImage = Tileset.resolveImage(resources, data.image, this.path);

        // Load the tileset's base texture.
        this.baseTexture = new BaseTexture(tilesetImage);

        //Note: {grid} is for tileset of multiple images.

        //TODO: Support {terrains, transparentcolor, wangsets}.
        const {
            columns,
            margin, spacing,
            objectalignment,
            tilecount,
            tilewidth, tileheight,
            tiles,
        } = data;

        const rows = tilecount / columns;

        this.columns = columns;
        this.rows = columns;

        this.tileWidth = tilewidth;
        this.tileHeight = tileheight;
        this.tileCount = tilecount;

        this.objectAlignment = objectalignment;

        // Create the textures.
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                const localTileId = column + row * columns;
                this.textures[localTileId] = new Texture(
                    this.baseTexture,
                    new Rectangle(
                        margin + column * (tilewidth + spacing),
                        margin + row * (tileheight + spacing),
                        tilewidth, tileheight
                    )
                );
            }
        }

        // Process the tiles metadata.
        if (tiles !== undefined)
            for (const tile of tiles) this.tiles[tile.id] = tile;
    }

    /**
     * Resolves the tileset's data resource.
     * @param resources The available loaded resources.
     * @param tilesetPath The absolute path of the tileset resource.
     * @returns The tileset's data resource.
     * @throws when not found, or from invalid type.
     */
    private static resolveTilesetData(resources: Resources, tilesetPath: string): Tiled.TilesetData {
        const data = resources[tilesetPath];

        if (data === undefined || data === null) throw new Error(`Tileset resource file '${tilesetPath}' doesn't exist!`);
        if (typeof data !== 'object') throw new Error(`The tileset data should be a parsed JSON object, provided: ${typeof data}`);

        return data;
    }

    /**
     * Resolves the image's resource.
     * @param resources The available loaded resources.
     * @param imagePath The relative path of the image resource.
     * @param parentPath The path of the parent resource (the tileset or the map).
     * @returns The image's data resource.
     * @throws when not found, or from invalid type.
     */
    private static resolveImage(resources: Resources, imagePath: string, parentPath: string): HTMLImageElement {
        const absolutePath = path.join(path.dirname(parentPath), imagePath);
        const image = resources[absolutePath];

        if (image === undefined || image === null) throw new Error(`Image resource file '${absolutePath}' doesn't exist!`);
        if (!(image instanceof HTMLImageElement)) throw new Error(`Invalid image resource (${absolutePath})`);

        return image;
    }
}