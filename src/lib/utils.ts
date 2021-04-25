import * as PIXI from 'pixi.js';
import * as Tiled from '../tiled';
import { Entity, Map, Tile } from '../engine';

type Properties = Record<string, Readonly<Tiled.Property> | undefined>;

/**
 * Gets the value of a property in a record, validating it's type.
 * If the property is not set, undefined is returned.
 * If the property is from an unexpected type, an warning is logged, and undefined is returned.
 * 
 * @param properties The properties record to look in.
 * @param name The name of the property to get.
 * @param type The expected type of the property.
 * @returns The value of the property, undefined if unset or from invalid type.
 */
export function getProperty(properties: Properties, name: string, type: 'string'): string | undefined
export function getProperty(properties: Properties, name: string, type: 'int' | 'float'): number | undefined
export function getProperty(properties: Properties, name: string, type: 'bool'): boolean | undefined
export function getProperty(properties: Properties, name: string, type: 'color'): number | undefined
export function getProperty(properties: Properties, name: string, type: 'file'): string | undefined
export function getProperty(properties: Properties, name: string, type: Tiled.Property['type']): Tiled.Property['value'] | undefined {
    const property = properties[name];
    if (property === undefined) return undefined;
    if (property.type !== type) {
        console.warn(`The '${name}' property is set as '${property.type}', it should be instead '${type}'!`);
        return;
    }

    const value = property.value;

    // If it's a color, convert it into a number. 
    if (type === 'color' && typeof value === 'string')
        return PIXI.utils.string2hex(value);

    return value;
}

/**
 * Searches the tiles metadata of a map for tiles with a specific type.
 * 
 * @param map The map to search it's tiles metadata.
 * @param type The tile type to match for.
 * 
 * @returns An array with the global ids of the tiles matching the requested type.
 */
export function getTilesWithType(map: Map, type: string) {
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
export function findFirstTileOfId(map: Map, tileIds: number[]) {
    return map.layers.reduce<Tile | null>((mapTile, layer) =>
        mapTile ?? layer.tiles.reduce<Tile | null>((layerTile, column) =>
            layerTile ?? column.reduce<Tile | null>((columnTile, tile) =>
                columnTile ?? (tileIds.includes(tile.tileId) ? tile : null)
                , null)
            , null)
        , null);
}