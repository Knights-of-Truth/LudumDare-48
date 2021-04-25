import * as PIXI from 'pixi.js';

import * as Utils from './lib/utils';
import KeyboardHandler from './lib/keyboard-handler';

import { Map, Tile } from './engine';
import { Crate, Player } from './entities';

type Resources = Record<string, any>;

export default class Game {
    public readonly keyboardHandler = new KeyboardHandler();
    public readonly stage = new PIXI.Container();
    public readonly map: Map;

    constructor(resources: Resources) {
        const urlMap = document.location.hash;
        const mapPath = urlMap.startsWith('#') ? `maps/${urlMap.substring(1)}.json` : 'maps/playground.json';

        this.map = new Map(resources, mapPath);
        this.stage.addChild(this.map);

        Game.spawnEntities(this.map);

        const player = Game.findFirstPlayerEntity(this.map);
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
    public focusOnTile(tile: Tile) {
        const { tileX, tileY } = tile;
        const { tileWidth, tileHeight } = this.map;

        this.stage.pivot.set((tileX + .5) * tileWidth, (tileY + .5) * tileHeight);
    }

    /**
     * Searches for the first player entity it can find.
     * 
     * @param map The map to search for the player in.
     * @returns The player entity.
     */
    protected static findFirstPlayerEntity(map: Map) {
        const player = Game.findFirstPlayerTile(map)?.entity;
        return player instanceof Player ? player : null;
    }

    /**
     * Searchs the map for the first player tile it can find.
     * A player tile is a tile whose metadata has the type 'Player'.
     * 
     * @param map The map to search it's tiles.
     * @returns The first player tile found, or null if not found.
     */
    protected static findFirstPlayerTile(map: Map) {
        const playerTileIds = Utils.getTilesWithType(map, 'Player');
        return Utils.findFirstTileOfId(map, playerTileIds);
    }


    protected static spawnEntities(map: Map) {
        map.layers.forEach((layer) => layer.tiles.forEach((column) => column.forEach((tile) => {
            const tileMetadata = map.tilesMetadata[tile.tileId];
            if (tileMetadata === undefined) return;

            const { type } = tileMetadata;

            if (type === 'Player') tile.entity = new Player(tile);
            if (type === 'Crate') tile.entity = new Crate(tile);
        })));
    }
}