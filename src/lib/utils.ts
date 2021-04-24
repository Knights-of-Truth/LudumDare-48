import Map from '../engine/map';
import Tile from '../engine/tile';

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