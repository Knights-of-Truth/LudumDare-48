interface BaseProperty {
    /**
     * Name of the property.
     */
    name: string;

    /**
     * Type of the property.
     */
    type: 'string' | 'int' | 'float' | 'bool' | 'color' | 'file';

    /**
     * Value of the property.
     */
    value: number | string | boolean;
}

interface StringProperty extends BaseProperty {
    type: 'string' | 'color' | 'file';
    value: string;
}

interface NumberProperty extends BaseProperty {
    type: 'int' | 'float';
    value: number;
}

interface BooleanProperty extends BaseProperty {
    type: 'bool';
    value: boolean;
}

export type Property = StringProperty | NumberProperty | BooleanProperty;
