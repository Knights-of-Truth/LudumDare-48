import * as PIXI from 'pixi.js';
import { Map } from '../engine';

const inventoryTemplate = `
<div class="inventory-top-row">
    <div class="inventory-title">Inventory</div>
    <button class="inventory-close" type="button">X</button>
</div>
<div class="inventory-content"></div>
`;

export default class InventoryUI {
    protected readonly element: HTMLElement = InventoryUI.createInventoryElement();

    constructor(
        protected readonly map: Map,
        public readonly slotsCount = 16
    ) {
        this.addInventorySlots(slotsCount);
        document.body.appendChild(this.element);

        this.element.querySelector('.inventory-close')?.addEventListener('click', () => this.hide());
    }

    public show() {
        this.element.classList.remove('closed');
    }

    public hide() {
        this.element.classList.add('closed');
    }

    public toggle() {
        this.element.classList.toggle('closed');
    }

    get isOpen() {
        return this.element.classList.contains('closed');
    }

    public addItem(tileId: number) {
        const slot = this.element.querySelector('.inventory-slot:empty');
        if (!slot) throw new Error('No empty inventory slots!');

        const texture = this.map.textures[tileId];
        const tileset = this.map.tilesets.find((tileset) =>
            tileset.firstGID <= tileId && tileId < tileset.firstGID + tileset.tileCount);
        
        if (!tileset) throw new Error('Can\'t find the tileset of the item!');


        const scale = slot.clientWidth / texture.width * 0.6;

        const element = document.createElement('div');
        element.style.width = `${texture.width}px`;
        element.style.height = `${texture.height}px`;
        element.style.imageRendering = 'optimizeSpeed';
        element.style.background = `url('${tileset.sourceImage.src}') ${-texture.frame.x}px ${-texture.frame.y}px`;
        element.style.transform = `scale(${Math.floor(scale + 0.5)})`;
        // element.style.filter = 'drop-shadow(.5px .5px 0 rgba(0,0,0, 0.5))';

        slot.appendChild(element);
    }

    private static createInventoryElement() {
        const element = document.createElement('div');
        element.className = 'inventory closed';
        element.innerHTML = inventoryTemplate;

        // // Hide the inventory by default.
        // element.style.opacity = '0';

        return element;
    }

    protected addInventorySlots(slots: number) {
        const container = this.element.querySelector('.inventory-content');

        if (!container) throw Error("Can't locate 'inventory-content' element!");
        for (let slot = 0; slot < slots; slot++) {
            const slotElement = document.createElement('div');
            slotElement.className = 'inventory-slot';

            container.appendChild(slotElement);
        }
    }
}