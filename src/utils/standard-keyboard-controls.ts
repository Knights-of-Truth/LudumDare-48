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

export default class StandardKeyboardControls {
    constructor(public onInput: (direction: Direction) => void) {
        document.addEventListener("keydown", this.onkeydown.bind(this));
    }

    onkeydown(ev: KeyboardEvent) {
        if (ev.key in keyboardBindings)
            this.onInput(keyboardBindings[ev.key]);
    }
}