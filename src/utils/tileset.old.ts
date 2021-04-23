import { BaseTexture, Texture, Rectangle, Sprite } from 'pixi.js';

export default class Tileset {
    /**
     * The width of the tileset in tiles.
     */
    width: number;
    /**
     * The height of the tileset in tiles.
     */
    height: number;
    /**
     * The base texture of the tileset.
     */
    baseTexture: BaseTexture;
    /**
     * The tiles' textures.
     */
    textures: Texture[];

    /**
     * Creates a new tileset object.
     * @param resource The base resource of the tileset.
     * @param tileWidth The width of a single tile.
     * @param tileHeight The height of a single tile.
     */
    constructor(resource: any, public tileWidth: number, public tileHeight: number) {
        this.baseTexture = new BaseTexture(resource);

        this.width = this.baseTexture.width / this.tileWidth;
        this.height = this.baseTexture.height / this.tileWidth;

        this.textures = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.textures[x + y * this.width] = new Texture(
                    this.baseTexture, new Rectangle(
                        x * this.tileWidth, y * this.tileHeight,
                        this.tileWidth, this.tileHeight
                    )
                );
            }
        }
    }

    /**
     * Creates a new sprite with a tile's texture.
     * @param tileId The ID of the tile (The titles are 0-indexed starting from the top-left and going right)
     * @returns The created sprite.
     */
    createSprite(tileId: number) {
        return new Sprite(this.textures[tileId]);
    }
}