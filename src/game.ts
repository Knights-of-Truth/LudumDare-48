import * as PIXI from 'pixi.js';

import Map from './utils/map';
import Tile from './utils/tile';
import KeyboardHandler from './utils/keyboard-handler';

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
     * Searches the tiles metadata of a map for tiles with a specific type.
     * 
     * @param map The map to search it's tiles metadata.
     * @param type The tile type to match for.
     * 
     * @returns An array with the global ids of the tiles matching the requested type.
     */
    static getTilesWithType(map: Map, type: string) {
        return Object.entries(map.tilesMetadata)
            .reduce<number[]>((matchedTiles, [tileId, metadata]) => {
                if (metadata?.type === type) matchedTiles.push(Number.parseInt(tileId));
                return matchedTiles;
            }, []);
    }

    /**
     * Searches the map for the first tile matching a group of tileIds.
     * 
     * @param map The map to search it's tiles.
     * @param tileIds A list of ids to match any of them.
     * 
     * @returns The first tile found, or null if not found.
     */
    static findFirstTileOfId(map: Map, tileIds: number[]) {
        return map.layers.reduce<Tile | null>((mapTile, layer) =>
            mapTile ?? layer.tiles.reduce<Tile | null>((layerTile, column) =>
                layerTile ?? column.reduce<Tile | null>((columnTile, tile) =>
                    columnTile ?? (tileIds.includes(tile.tileId) ? tile : null)
                    , null)
                , null)
            , null);
    }

    /**
     * Searchs the map for the first player tile it can find.
     * A player tile is a tile whose metadata has the type 'Player'.
     * 
     * @param map The map to search it's tiles.
     * @returns The first player tile found, or null if not found.
     */
    static findFirstPlayerTile(map: Map) {
        const playerTileIds = Game.getTilesWithType(map, 'Player');
        return Game.findFirstTileOfId(map, playerTileIds);
    }
}