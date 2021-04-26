import KeyboardHandler from "../lib/keyboard-handler";

type Resources = Record<string, any>;
type DialogContent = string;

export default class Dialog {
    protected readonly element: HTMLElement = Dialog.createDialogElement();
    protected readonly dialogs: Record<string, DialogContent | undefined>;

    constructor(
        protected readonly keyboardHandler: KeyboardHandler,
        resources: Resources
    ) {
        this.dialogs = resources['dialogs.json'] ?? {};
        document.body.appendChild(this.element);
        keyboardHandler.onDialog = this.hide.bind(this);
    }

    get content() {
        return this.element.innerHTML;
    }
    set content(value) {
        this.element.innerHTML = value;
    }

    public open(dialogId: string) {
        const content = this.dialogs[dialogId];
        this.content = content ?? '<i>undefined</i>';

        this.show();
    }

    public show() {
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

    private static createDialogElement(): HTMLElement {
        const element = document.createElement('div');
        element.className = 'dialog closed';

        return element;
    }
}