import KeyboardHandler from "../lib/keyboard-handler";

type Resources = Record<string, any>;
type DialogContent = string | string[];

export default class Dialog {
    protected readonly element: HTMLElement = Dialog.createDialogElement();
    protected readonly dialogs: Record<string, DialogContent | undefined>;

    protected transitionLock = false;
    protected readonly queue: string[] = [];

    constructor(
        protected readonly keyboardHandler: KeyboardHandler,
        resources: Resources
    ) {
        this.dialogs = resources['dialogs.json'] ?? {};

        document.body.appendChild(this.element);
        keyboardHandler.onDialog = () => {
            if (this.transitionLock) return;
            this.hide();
        };

        this.element.addEventListener('transitionstart', this.onTransitionStart.bind(this));
        this.element.addEventListener('transitionend', this.onTransitionEnd.bind(this));
    }

    public open(dialogId: string) {
        const content = this.dialogs[dialogId] ?? '<i>undefined</i>';
        if (typeof content === 'string') this.queue.push(content);
        else this.queue.push(...content);

        this.show();
    }

    public show() {
        const dialog = this.queue.shift();
        this.element.innerHTML = dialog ?? '<b>NO DIALOG TO SHOW</b>';

        this.keyboardHandler.mode = 'dialog';
        this.element.classList.remove('closed');
    }

    public hide() {
        this.keyboardHandler.mode = 'player';
        this.element.classList.add('closed');
    }

    public isOpen() {
        return !this.element.classList.contains('closed');
    }

    private onTransitionStart() {
        this.transitionLock = true;
    }

    private onTransitionEnd() {
        this.transitionLock = false;
        if (!this.isOpen() && this.queue.length > 0)
            this.show();
    }

    private static createDialogElement(): HTMLElement {
        const element = document.createElement('div');
        element.className = 'dialog closed';

        return element;
    }
}