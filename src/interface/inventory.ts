import * as PIXI from 'pixi.js';
import { Map } from '../engine';

const inventoryTemplate = `
<div class="inventory-top-row">
    <div class="inventory-title">Inventory</div>
    <button class="inventory-close" type="button">X</button>
</div>
<div class="inventory-content"></div>
`;

export default class Inventory {
    protected readonly element: HTMLElement = Inventory.createInventoryElement();

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

    public get isOpen() {
        return this.element.classList.contains('closed');
    }

    /**
     * Adds an item to the player's inventory.
     * @param itemId The ID of the item to add.
     */
    public addItem(itemId: number) {
        const slot = this.element.querySelector('.inventory-slot:empty');
        if (!slot) throw new Error('No empty inventory slots!');

        const texture = this.map.textures[itemId];
        const tileset = this.map.tilesets.find((tileset) =>
            tileset.firstGID <= itemId && itemId < tileset.firstGID + tileset.tileCount);

        if (!tileset) throw new Error('Can\'t find the tileset of the item!');


        const scale = slot.clientWidth / texture.width * 0.6;

        const element = document.createElement('div');
        element.className = 'inventory-item';

        element.style.width = `${texture.width}px`;
        element.style.height = `${texture.height}px`;
        element.style.imageRendering = 'optimizeSpeed';
        element.style.background = `url('${tileset.sourceImage.src}') ${-texture.frame.x}px ${-texture.frame.y}px`;
        element.style.transform = `scale(${Math.floor(scale + 0.5)})`;
        // element.style.filter = 'drop-shadow(.5px .5px 0 rgba(0,0,0, 0.5))';

        element.setAttribute('data-item-id', itemId.toString());

        slot.appendChild(element);
    }

    /**
     * Checks whether the inventory contains an item or not.
     * @param itemId The ID of the item to test for.
     * @returns Whether there's an copy of the item in the inventory or not.
     */
    public hasItem(itemId: number) {
        return !!this.element.querySelector(`.inventory-item[data-item-id=${itemId.toString()}]`);
    }

    /**
     * Counts the number of an item in the inventory.
     * @param itemId The ID of the item to count.
     * @returns The count of the item in the inventory.
     */
    public countItem(itemId: number) {
        return this.element.querySelectorAll(`.inventory-item[data-item-id=${itemId.toString()}]`).length;
    }

    /**
     * Attempts to find and remove an item from the inventory.
     * @param itemId The ID of the item to remove.
     * @returns Whether the item was found and removed, or not.
     */
    public removeItem(itemId: number) {
        const item = this.element.querySelector(`.inventory-item[data-item-id=${itemId.toString()}]`);
        item?.remove();
        return !!item;
    }

    /**
     * Clears all the items in the inventory.
     */
    public clearItems() {
        this.element.querySelectorAll('.inventory-item').forEach((item) => item.remove());
    }

    /**
     * Gets a list of all the current items in the inventory.
     * @returns A list of all the items in the inventory.
     */
    public getItems() {
        const items: number[] = [];

        this.element.querySelectorAll('.inventory-item')
            .forEach((slot) => items.push(Number.parseInt(slot.getAttribute('data-item-id') ?? '-1', 10)));

        return items;
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