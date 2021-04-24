import * as PIXI from 'pixi.js';

import * as Utils from './lib/utils';
import KeyboardHandler from './lib/keyboard-handler';

import { Map, Tile } from './engine';

import Player from './entities/player';

type Resources = Record<string, any>;

export default class Game {
    public readonly keyboardHandler = new KeyboardHandler();
    public readonly stage = new PIXI.Container();
    public readonly map: Map;

    private readonly solid: boolean[][] = [];

    constructor(resources: Resources) {
        this.map = new Map(resources, 'maps/playground.json');
        this.stage.addChild(this.map);

        this.updateSolid();

        const player = Game.findAndConstructPlayer(this.map, this.solid);
        if (!player) throw new Error("Can't find the player!");

        const focusOnPlayer = () => this.focusOnTile(player.tile);
        player.onMove = focusOnPlayer;

        this.keyboardHandler.onDirection = player.move.bind(player);

        focusOnPlayer();
    }

    private updateSolid() {
        const { layers, mapWidth, mapHeight } = this.map;

        // Clear the existing data.
        this.solid.length = 0;

        // Create the columns.
        for (let x = 0; x < mapWidth; x++) this.solid[x] = [];

        // Scan the layers.
        for (const layer of layers) {
            if (!Utils.getProperty(layer.properties, 'Solid', 'bool')) continue;
            for (let x = 0; x < mapWidth; x++)
                for (let y = 0; y < mapHeight; y++)
                    if (layer.tiles[x][y].tileId !== 0)
                        this.solid[x][y] = true;
        }
    }

    /**
     * Sets the pivot of the stage (which acts like a camera) to the center of a tile.
     * @param tile The tile to focus the camera on.
     */
    protected focusOnTile(tile: Tile) {
        const { tileX, tileY } = tile;
        const { tileWidth, tileHeight } = this.map;

        this.stage.pivot.set((tileX + .5) * tileWidth, (tileY + .5) * tileHeight);
    }

    /**
     * Searches for the first player tile it can find,
     * and constructs a player object out of it.
     * 
     * @param map The map to search for the player in.
     * @returns The constructed player.
     */
    static findAndConstructPlayer(map: Map, solid: boolean[][]) {
        const playerTile = Game.findFirstPlayerTile(map);
        return playerTile ? new Player(playerTile, solid) : null;
    }

    /**
     * Searchs the map for the first player tile it can find.
     * A player tile is a tile whose metadata has the type 'Player'.
     * 
     * @param map The map to search it's tiles.
     * @returns The first player tile found, or null if not found.
     */
    static findFirstPlayerTile(map: Map) {
        const playerTileIds = Utils.getTilesWithType(map, 'Player');
        return Utils.findFirstTileOfId(map, playerTileIds);
    }
}