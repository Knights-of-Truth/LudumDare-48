import * as PIXI from 'pixi.js';
import * as Tiled from '../tiled';

import Map from './map';
import Tile from './tile';
import TileSprite from './tile-sprite';

/**
 * Represents a tile in the GridTileLayer, supporting the tileId of 0.
 * 
 * Internally it automatically manages the tileSprite.
 */
class GridTile implements Tile {
    public readonly isZeroSupported = true;

    protected tileSprite: TileSprite | null;

    public constructor(
        public readonly tileLayer: GridTileLayer,
        public readonly tileX: number,
        public readonly tileY: number,
        rawTileId: number
    ) {
        if (rawTileId === 0) this.tileSprite = null;
        else this.tileSprite = this.createTileSprite(rawTileId);
    }

    private createTileSprite(rawTileId: number) {
        const { map, tint, opacity } = this.tileLayer;

        const tileSprite = new TileSprite(map, this.tileX, this.tileY, rawTileId);

        tileSprite.tint = tint;
        tileSprite.alpha = opacity;

        this.tileLayer.addChild(tileSprite);
        return tileSprite;
    }

    get tileId() {
        return this.tileSprite?.tileId ?? 0;
    }
    set tileId(id: number) {
        if (id === this.tileId) return;
        if (id === 0) {
            const tileSprite = this.tileSprite;
            if (tileSprite === null) return;

            this.tileLayer.removeChild(tileSprite);
            this.tileSprite = null;
        } else {
            const existingTileSprite = this.tileSprite;

            if (existingTileSprite !== null) existingTileSprite.tileId = id;
            else this.tileSprite = this.createTileSprite(id);
        }

        this.tileLayer.updateCachedBitmap();
    }

    get rawTileId() {
        return this.tileSprite?.rawTileId ?? 0;
    }
    set rawTileId(id: number) {
        if (id === this.rawTileId) return;

        if (id === 0) this.tileId = 0;
        else {
            const existingTileSprite = this.tileSprite;
            if (existingTileSprite !== null) existingTileSprite.rawTileId = id;
            else this.tileSprite = this.createTileSprite(id);
        }

        this.tileLayer.updateCachedBitmap();
    }

    get flippedHorizontally() {
        return this.tileSprite?.flippedHorizontally ?? false;
    }
    set flippedHorizontally(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedHorizontally = flipped;
        this.tileLayer.updateCachedBitmap();
    }

    get flippedVertically() {
        return this.tileSprite?.flippedVertically ?? false;
    }
    set flippedVertically(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedVertically = flipped;
        this.tileLayer.updateCachedBitmap();
    }

    get flippedDiagonally() {
        return this.tileSprite?.flippedDiagonally ?? false;
    }
    set flippedDiagonally(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedDiagonally = flipped;
        this.tileLayer.updateCachedBitmap();
    }
}

export default class GridTileLayer extends PIXI.Container {
    private _tint = 0xFFFFFF;
    private _opacity = 1;

    /**
     * A 2-dimentional array for accessing the tiles of the layer.
     * The tiles are instances of GridTile (an internal class), and so they support tileId of 0.
     */
    public readonly tiles: Tile[][] = [];

    /**
     * The properties of the layer, set in tiled.
     */
    public readonly properties: Record<string, Readonly<Tiled.Property> | undefined> = {};

    constructor(public readonly map: Map, tilelayer: Tiled.TileLayer) {
        super();

        const {
            data, chunks,
            width, height,
            offsetx, offsety,
            opacity, tintcolor, visible,
            properties
        } = tilelayer;

        // TODO: Infinite map layers support.
        if (data === undefined || chunks !== undefined)
            throw new Error('infinite map layers are not supported yet!');

        // TODO: Base64 encoding support.
        if (typeof data === 'string')
            throw new Error('base64 encoded layers are not supported yet!');

        // Set rendering options.

        this.visible = visible;
        if (offsetx !== undefined && offsety !== undefined)
            this.pivot.set(-offsetx, -offsety);

        if (tintcolor !== undefined) this._tint = PIXI.utils.string2hex(tintcolor);
        this._opacity = opacity;

        // Copy the properties into a readonly record.
        for (const property of (properties ?? []))
            this.properties[property.name] = property;

        // Construct the tiles.
        for (let y = 0; y < height; y++) {
            const column: Tile[] = [];
            this.tiles[y] = column;

            for (let x = 0; x < width; x++)
                column[y] = new GridTile(this, x, y, data[x + y * width]);
        }

        // Apply the cache property.
        const cacheProperty = this.properties['Cache'];
        if (cacheProperty !== undefined) {
            if (cacheProperty.type === 'bool') this.cacheAsBitmap = cacheProperty.value;
            else console.warn(`The 'Cache' tile layer property is set as ${cacheProperty.type}, it should be a boolean!`);
        }
    }

    /**
     * The tint color applied to the tilelayer.
     */
    get tint(): number {
        return this._tint;
    }

    /**
     * The opacity of the tilelayer.
     */
    get opacity(): number {
        return this._opacity;
    }

    /**
     * Updates the cached bitmap of the tilelayer, in-case it's enabled.
     */
    public updateCachedBitmap() {
        // It's not cached, no need to update it.
        if (!this.cacheAsBitmap) return;

        this.cacheAsBitmap = false;
        this.cacheAsBitmap = true;
    }
}