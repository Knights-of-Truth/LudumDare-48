
# Tile layers properties

## Standard supported properties

- `Visible`
- `Opacity`
- `Tint Color`

## Custom properties

### `Cache` (bool) property

When enabled, the engine renders the layer into an image,
and stores it, and then at each game frame, the image is rendered.

This provides a good performance benefit, but that's only if the layer's content is not changing (it could change with tiles animations or "Active Tiles").

### `Solid` (bool) property

When enabled, all the tiles in the layer are treated as solid immovable walls.

#### How it works

When the game initializes, it creates an internal 'Boolean Layer', and then iterates on each Tile Layer with the `Solid` property checked.

Whenever a tile in a Solid layer is found, the 'Boolean Layer' is set to `true` at the tile's location.

The 'Active Tiles' then (like the player) can use this boolean layer to detect solid tiles where they shouldn't move to.
