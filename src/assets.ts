import path from 'path';
import * as PIXI from 'pixi.js';

import assetsTree from './assets.json';

const assets: Record<string, string> = {};

interface FileAsset {
    path: string,
    name: string,
    size: number,
    extension: string,
    type: 'file',
}

interface DirectoryAsset {
    path: string,
    name: string,
    children: Asset[],
    size: number,
    type: 'directory',
}

type Asset = FileAsset | DirectoryAsset;

function processEntry(asset: Asset) {
    const unixPath = asset.path.replace(/\\/g, '/');
    if (asset.type === 'file') assets[unixPath.replace(/^assets\//, '')] = path.join('../', unixPath);
    else asset.children.forEach(processEntry);
}

processEntry(assetsTree as Asset);

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