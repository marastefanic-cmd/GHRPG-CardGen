# Gloomhaven Card Creator

A browser-based tool for creating custom Gloomhaven RPG ability cards.

## Features

- Create custom ability cards with top and bottom actions
- Support for 50+ Gloomhaven icons (actions, elements, conditions, etc.)
- Area of Effect (AOE) pattern support with drag and rotate functionality
- 16 character class themes
- Full color customization (card background, header, initiative, level hex)
- Card collection management
- PDF export for printing (300 DPI, standard Gloomhaven card size)

## Quick Start

1. Start a local web server:
   ```bash
   python3 -m http.server 5000 --bind 0.0.0.0
   ```

2. Open `http://localhost:5000` in your browser

## Usage

### Creating a Card

1. **Settings Panel** (left): Select character class, level, and customize colors
2. **Card Editor**: Enter card name, flavor text, and ability descriptions
3. **Toggle Options**: Set Loss, Round Bonus, or Persistent indicators for each ability
4. **Side Values**: Add optional numbers to the left/right of initiative
5. **Preview**: See your card update in real-time

### Icon Syntax

Insert icons in ability text using square brackets: `[icon_name]`

| Category | Icons |
|----------|-------|
| Actions | `[attack]`, `[move]`, `[range]`, `[heal]`, `[shield]`, `[retaliate]`, `[target]`, `[jump]`, `[flying]`, `[teleport]`, `[loot]` |
| Elements | `[fire]`, `[ice]`, `[earth]`, `[wind]`, `[light]`, `[dark]`, `[any_element]` |
| Consume | `[consume_fire]`, `[consume_ice]`, `[consume_earth]`, `[consume_wind]`, `[consume_light]`, `[consume_dark]`, `[consume_any_element]` |
| Conditions | `[poison]`, `[wound]`, `[stun]`, `[immobilize]`, `[disarm]`, `[muddle]`, `[curse]`, `[bless]`, `[strengthen]`, `[invisible]`, `[ward]` |
| Modifiers | `[push]`, `[pull]`, `[pierce]`, `[add_target]`, `[taunt]`, `[dmg]` |
| Card States | `[lost]`, `[spent]`, `[round_bonus]`, `[persistent_bonus]`, `[recover_card]`, `[advantage]`, `[disadvantage]` |
| Equipment | `[head]`, `[body]`, `[one_hand]`, `[two_hands]`, `[feet]`, `[small]` |

### Text Formatting

- **Bold**: `[b]text[/b]`
- **Italic**: `[i]text[/i]`
- **Font Size**: `[s:16]text[/s]` (pixel size)

### Example Card Text

```
[b]Attack[/b] [attack] 3
[range] 4
Add [push] 2
[fire]: +2 [attack]
```

### Color Customization

The Settings Panel includes color pickers for:
- **Header**: Top banner with card name
- **Flavor**: Flavor text background area
- **Top Action**: Upper ability section color
- **Bottom Action**: Lower ability section color
- **Hex Inner**: Initiative and side hex fill color
- **Hex Rim**: Initiative and side hex border color
- **Frame**: Outer gray card frame/border color

Each character class has preset colors that are automatically applied when selected. These can be further customized using the color pickers.

### AOE Patterns

1. Select target ability section (Top or Bottom)
2. Click an AOE pattern button to add it
3. **Drag** the pattern to position it
4. **Rotate** using the circular handle
5. Click **X** to remove

Available patterns: Triangle, 2/3 Adjacent Hexes, Skewer, Long Skewer, Full Hexagon, Big Smash, Single Target/Attacker

### Managing Cards

- **Add Card**: Saves current card to collection
- **Clear**: Resets the form
- **Clear All**: Removes all cards from collection
- **Export PDF**: Generates a printable PDF (A4, 9 cards per page)

## File Structure

```
├── index.html              # Main application
├── generate_aoe_svgs.js    # AOE SVG generator utility
├── assets/
│   └── assets/
│       ├── *.png/svg       # Icon assets
│       ├── aoe/            # AOE pattern source files (.aoe)
│       ├── aoe_svg/        # Generated AOE pattern SVGs
│       ├── classes/        # Character class icons
│       └── fonts/          # Custom fonts
```

## Character Classes

Bruiser, Tinkerer, Spellweaver, Silent Knife, Cragheart, Mindthief, Sun, Three Spears, Cthulhu, Lightning Bolts, Music Note, Angry Face, Saw, Triangles, Two Minis, Crossed Swords

## Generating Custom AOE Patterns

1. Create a `.aoe` file in `assets/assets/aoe/`:
   ```
   # Format: column row r,g,b
   0 0 255,0,0      # Red = target hex
   1 0 83,84,86     # Gray = attacker hex
   ```

2. Run the generator:
   ```bash
   node generate_aoe_svgs.js
   ```

3. The SVG will be created in `assets/assets/aoe_svg/`

## Dependencies

- [html2canvas](https://html2canvas.hertzen.com/) - For card rendering
- [jsPDF](https://github.com/parallax/jsPDF) - For PDF export
- Google Fonts (Cinzel, Crimson Text)

## Browser Support

Works in modern browsers (Chrome, Firefox, Edge, Safari).

## PDF Specifications

- Page size: A4 (portrait)
- Card dimensions: 63.5mm x 88mm (standard Gloomhaven)
- Resolution: 300 DPI
- Layout: 3x3 grid (9 cards per page)
- Margins: 10mm

## License

For personal use. Gloomhaven is a trademark of Cephalofair Games.
