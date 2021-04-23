import * as PIXI from 'pixi.js';

/* ==-- Tilesets --== */
import PrototypeTilesetData from '../assets/tilesets/prototype.json';
import PrototypeTilesetImage from '../assets/tilesets/prototype.png';

/* ==-- Maps --== */
import PlaygroundMapData from '../assets/maps/playground.json';

export const assets: Record<string, string> = {
    ['tilesets/prototype.json']: PrototypeTilesetData,
    ['tilesets/prototype.png']: PrototypeTilesetImage,
    ['maps/playground.json']: PlaygroundMapData,
};

/* ==-- Loader Logic --== */

/**
 * The PIXI.Loader used to load the assets.
 */
const loader = new PIXI.Loader();

// Queue the assets for loading
for (const resourcePath in assets) loader.add(resourcePath, assets[resourcePath]);

/**
 * A promise which resolves once the resources are loaded.
 */
const loadingPromise = new Promise<Record<string, any>>((resolve) => {
    function onAssetsLoaded() {
        const resources: Record<string, any> = {};

        for (const resourcePath in loader.resources)
            resources[resourcePath] = loader.resources[resourcePath].data;
        
        resolve(resources);
    }

    loader.load(onAssetsLoaded);
});

/**
 * Loads the resources of the game for a single time,
 * and returns them for all the callers.
 * 
 * @returns The loaded resources of the game.
 */
export async function getResources() {
    return await loadingPromise;
}