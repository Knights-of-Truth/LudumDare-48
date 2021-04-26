import * as PIXI from 'pixi.js';

import * as Utils from './lib/utils';
import KeyboardHandler from './lib/keyboard-handler';

import { Map, Tile } from './engine';
import { Crate, Item, NPC, Player, StaticDialog } from './entities';

import Dialog from './interface/dialog';

type Resources = Record<string, any>;

export default class Game {
    public readonly keyboardHandler = new KeyboardHandler();
    public readonly stage = new PIXI.Container();
    public readonly map: Map;
    public readonly dialog: Dialog;

    constructor(resources: Resources) {
        this.dialog = new Dialog(this.keyboardHandler, resources);

        const urlMap = document.location.hash;
        const mapPath = urlMap.startsWith('#') ? `maps/${urlMap.substring(1)}.json` : 'maps/grounds.json';

        this.map = new Map(resources, mapPath);
        this.stage.addChild(this.map);

        this.spawnEntities();

        const player = Game.findFirstPlayerEntity(this.map);
        if (!player) throw new Error("Can't find the player!");

        const focusOnPlayer = () => this.focusOnTile(player.tile);
        player.onMove = focusOnPlayer;

        this.keyboardHandler.onDirection = player.move.bind(player);
        this.keyboardHandler.onInventory = () => player.inventory.toggle();

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


    protected spawnEntities() {
        this.map.layers.forEach((layer) => layer.tiles.forEach((column) => column.forEach((tile) => {
            const tileMetadata = this.map.tilesMetadata[tile.tileId];
            if (tileMetadata === undefined) return;

            const { type } = tileMetadata;

            if (type === 'Crate') tile.entity = new Crate(tile);
            if (type === 'Item') tile.entity = new Item(tile);
            if (type === 'NPC') tile.entity = new NPC(tile);
            if (type === 'Player') tile.entity = new Player(tile, this.dialog);
            if (type === 'StaticDialog') tile.entity = new StaticDialog(tile);
        })));
    }
}