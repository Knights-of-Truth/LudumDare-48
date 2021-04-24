import Direction from './direction';

let keyboardBindings: {[keyName: string]: Direction} = {
    ArrowUp: Direction.TOP,
    ArrowRight: Direction.RIGHT,
    ArrowDown: Direction.BOTTOM,
    ArrowLeft: Direction.LEFT,

    w: Direction.TOP, W: Direction.TOP,
    d: Direction.RIGHT, D: Direction.RIGHT,
    s: Direction.BOTTOM, S: Direction.BOTTOM,
    a: Direction.LEFT, A: Direction.LEFT
}

export default class KeyboardHandler {
    /**
     * A callback to be triggered when a direction button is pressed.
     */
    public onDirection: (direction: Direction) => void = () => {};

    constructor() {
        document.addEventListener("keydown", this.onkeydown.bind(this));
    }

    onkeydown(ev: KeyboardEvent) {
        if (ev.key in keyboardBindings)
            this.onDirection(keyboardBindings[ev.key]);
    }
}