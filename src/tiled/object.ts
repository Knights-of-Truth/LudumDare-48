import { Point } from './point';
import { Property } from './property';

export interface Object {
    /**
     * Used to mark an object as an ellipse.
     */
    ellipse?: boolean;

    /**
     * Global tile ID, only if object represents a tile
     */
    gid?: number;

    /**
     * Height in pixels.
     */
    height: number;

    /**
     * Incremental ID, unique across all objects.
     */
    id: number;

    /**
     * String assigned to name field in editor.
     */
    name: string;

    /**
     * Used to mark an object as a point.
     */
    point?: boolean;

    /**
     * Array of Points, in case the object is a polygon.
     */
    polygon?: Point[];

    /**
     * Array of Points, in case the object is a polyline.
     */
    polyline?: Point[];

    /**
     * Array of Properties.
     */
    properties?: Property[];

    /**
     * Angle in degrees clockwise.
     */
    rotation: number;

    /**
     * Reference to a template file, in case object is a template instance.
     */
    template?: string;

    /**
     * Only used for text objects.
     */
    text?: Text;

    /**
     * String assigned to type field in editor.
     */
    type: string;

    /**
     * Whether object is shown in editor.
     */
    visible: boolean;

    /**
     * Width in pixels.
     */
    width: number;

    /**
     * X coordinate in pixels.
     */
    x: number;

    /**
     * Y coordinates in pixels.
     */
    y: number;
}