declare module '*.png' {
    const content: string;
    export default content;
}

/**
 * Whether the game is running under development environment or not.
 */
declare const DEVELOPMENT: boolean;

/**
 * Whether the game is packaged (in build folder) or not.
 */
declare const PACKAGED: boolean;