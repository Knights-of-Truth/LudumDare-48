import Direction from './direction';

const keyboardBindings: { [keyName: string]: Direction } = {
    ArrowUp: Direction.TOP,
    ArrowRight: Direction.RIGHT,
    ArrowDown: Direction.BOTTOM,
    ArrowLeft: Direction.LEFT,

    KeyW: Direction.TOP,
    KeyD: Direction.RIGHT,
    KeyS: Direction.BOTTOM,
    KeyA: Direction.LEFT
}

const inventoryBindings = ['KeyE', 'KeyI'];
const dialogBindings = ['Enter', 'Space', 'Tab', 'KeyZ', 'KeyX', 'KeyE'];

export default class KeyboardHandler {
    /**
     * A callback to be triggered when a direction button is pressed.
     */
    public onDirection: (direction: Direction) => void = () => { };

    /**
     * A callback to be triggered when the inventory button ispressed.
     */
    public onInventory = () => { };

    public onDialog = () => { };

    public mode: 'player' | 'dialog' = 'player';

    constructor() {
        document.addEventListener("keydown", this.onkeydown.bind(this));
    }

    onkeydown(ev: KeyboardEvent) {
        if (this.mode === 'dialog') {
            if (dialogBindings.includes(ev.code))
                this.onDialog();
            return;
        }

        if (this.mode === 'player') {
            if (ev.code in keyboardBindings)
                this.onDirection(keyboardBindings[ev.code]);

            if (inventoryBindings.includes(ev.code))
                this.onInventory();
            return;
        }
    }
}