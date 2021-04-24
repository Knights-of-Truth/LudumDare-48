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

    constructor(resources: Resources) {
        this.map = new Map(resources, 'maps/playground.json');
        this.stage.addChild(this.map);

        const player = Game.findAndConstructPlayer(this.map);
        if (!player) throw new Error("Can't find the player!");

        const focusOnPlayer = () => this.focusOnTile(player.tile);
        player.onMove = focusOnPlayer;

        this.keyboardHandler.onDirection = player.move.bind(player);

        focusOnPlayer();
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
    static findAndConstructPlayer(map: Map) {
        const playerTile = Game.findFirstPlayerTile(map);
        return playerTile ? new Player(playerTile) : null;
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