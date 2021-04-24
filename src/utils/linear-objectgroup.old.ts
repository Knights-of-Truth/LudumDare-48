// import { Container, DisplayObject, Graphics, utils, Ticker } from 'pixi.js';
// import * as Tiled from '../tiled';
// import Tileset from './tileset.old';
// import TileSprite from './tile-sprite';

// class Spinner {
//     constructor(
//         object: Tiled.Object,
//         tileset: Tileset,
//         layerContainer: Container,
//         opacity: number,
//         tintcolor: string | undefined
//     ) {
//         const rawTileId = object.gid;
//         if (rawTileId === undefined) return;

//         const sprite = new TileSprite(tileset, rawTileId);
//         if (tintcolor !== undefined) sprite.tint = utils.string2hex(tintcolor);
//         sprite.alpha = opacity;

//         sprite.position.set(object.x, object.y);
//         sprite.angle = object.rotation;

//         layerContainer.addChild(sprite);

//         let speed = 1;

//         const properties = object.properties;
//         if (properties !== undefined)
//             for (const property of properties)
//                 if (property.name.toLowerCase() === 'speed' && typeof property.value === 'number')
//                     speed = property.value;


//         Ticker.shared.add((dt) => {
//             sprite.angle += speed * dt;
//         });
//     }
// }

// export default class LinearObjectGroup extends Container {

//     constructor(tileset: Tileset, layer: Tiled.ObjectGroup) {
//         super();

//         const {
//             objects,
//             offsetx, offsety,
//             opacity, tintcolor, visible,
//             properties
//         } = layer;

//         this.visible = visible;
//         if (offsetx !== undefined && offsety !== undefined)
//             this.pivot.set(-offsetx, -offsety);

//         for (const object of objects) {
//             if (object.type === 'spinner') {
//                 new Spinner(object, tileset, this, opacity, tintcolor);
//             }
//         }

//         if (properties !== undefined)
//             for (const property of properties)
//                 if (property.name.toLowerCase() === 'cache' && property.type === 'bool')
//                     this.cacheAsBitmap = property.value;
//     }
// }