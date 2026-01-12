# Gloomhaven Card Creator - AI Context

## Project Overview
A browser-based Gloomhaven RPG card creator. Single-page HTML application with embedded CSS and JavaScript. Allows users to create custom ability cards with icons, AOE patterns, color customization, and PDF export.

## File Structure
```
/home/coder/
├── index.html                    # Main application (2041 lines, single file app)
├── gloomhaven-card-creator.html  # Alternate/older version (36285 bytes)
├── generate_aoe_svgs.js          # Node.js script for generating AOE pattern SVGs from .aoe files
├── CLAUDE.md                     # AI context documentation (this file)
├── README.md                     # User-facing documentation
└── assets/
    └── assets/
        ├── *.png, *.svg          # Game icons (attack, heal, move, elements, etc.)
        ├── aoe/                  # AOE pattern source files (.aoe format)
        ├── aoe_svg/              # Generated AOE patterns as SVG (10 patterns)
        ├── background_assets/    # Card background images
        ├── classes/              # Character class icons (18 classes)
        ├── classes_2/            # Additional class icons
        ├── fonts/                # Custom fonts
        └── example_card/         # Example card assets
```

## index.html Structure (~2845 lines total)

### Section Breakdown
| Section | Lines | Description |
|---------|-------|-------------|
| Head & Dependencies | 1-9 | html2canvas, jspdf, Google Fonts |
| CSS Styles | 10-1200 | Embedded `<style>` block |
| Settings Panel HTML | 1201-1280 | Class select, level, colors (including frame color) |
| Card Editor HTML | 1282-1400 | Name, flavor, abilities, toggles, summon box |
| Preview Card HTML | 1402-1500 | Live card preview structure with SVG frame mask |
| Icon/AOE Panels HTML | 1502-1550 | Icon grid, AOE grid, collection |
| JavaScript | 1553-2845 | All application logic including CLASS_COLORS

### Key JavaScript Functions

| Function | Line | Purpose |
|----------|------|---------|
| `getIconPath(name)` | 1226 | Returns asset path (PNG or SVG) for icon name |
| `addAoeToCard(patternName)` | 1273 | Adds AOE pattern to card preview |
| `renderAoeOnCard(container, aoeData, pattern, target)` | 1302 | Renders AOE visual element |
| `makeRotatable(el, aoeData)` | 1319 | Enables rotation via drag handle |
| `removeAoe(aoeId, target)` | 1352 | Removes AOE pattern from card |
| `makeDraggable(el, aoeData, target)` | 1359 | Enables drag positioning for AOE |
| `clearAoePatterns()` | 1389 | Clears all AOE patterns from preview |
| `insertIcon(name)` | 1402 | Inserts icon markup `[name]` into active text field |
| `formatText(fieldId, tag)` | 1413 | Applies bold/italic formatting |
| `formatSize(fieldId, size)` | 1436 | Applies font size to selection |
| `parseFormatting(text, fontScale)` | 1460 | Parses formatting tags (no icons) |
| `parse(text, scale, fontScale)` | 1503 | Parses card text including icons |
| `getIconRightPosition(...)` | 1531 | Calculates icon positioning |
| `positionIcons(...)` | 1541 | Positions loss/bonus icons dynamically |
| `toggleBonus(section, type)` | 1563 | Handles mutual exclusivity for Round Bonus/Persistent |
| `update()` | 1577 | Main update function - syncs form to preview |
| `lightenColor(hex, percent)` | 1651 | Helper to lighten hex colors |
| `darkenColor(hex, percent)` | 1660 | Helper to darken hex colors |
| `addCard()` | 1675 | Adds current card to collection |
| `removeCard(i)` | 1704 | Removes card from collection |
| `renderAoeHtml(aoeList, scale)` | 1710 | Generates AOE HTML for collection/PDF |
| `renderCollection()` | 1725 | Renders all cards in collection view |
| `clearForm()` | 1806 | Resets form to defaults |
| `clearAll()` | 1826 | Clears entire collection |
| `exportPDF()` | 1833 | Exports collection as PDF (300 DPI, 63.5x88mm cards) |
| `animateBadge()` | 1996 | Bouncing easter egg badge animation |

### Important Constants

| Constant | Line | Description |
|----------|------|-------------|
| `ICONS` | ~1560 | Array of all available icon names (50+ icons) |
| `PATH` | ~1570 | Base path for assets: `'assets/assets/'` |
| `PNG_ICONS` | ~1575 | Icons that use PNG instead of SVG |
| `INVERT_ICONS` | ~1590 | Icons that need CSS invert filter |
| `AOE_PATTERNS` | ~1600 | Array of 10 AOE pattern definitions |
| `AOE_PATH` | ~1615 | Path to AOE SVGs: `'assets/assets/aoe_svg/'` |
| `AOE_SCALE` | ~1660 | Default AOE scale factor: 0.7 |
| `CLASS_COLORS` | ~1730 | Class-specific color presets (header, topAction, bottomAction, hexInner, hexRim, frame) |
| `CLASS_ICONS` | ~1850 | Mapping of class names to icon filenames |
| `ICON_SCALE` | ~1870 | Scale adjustments for oversized icons |

### DOM Element IDs

**Form Inputs:**
- `name`, `level`, `initiative`, `flavor` - Card metadata
- `top`, `bottom` - Ability text areas
- `topLoss`, `bottomLoss` - Loss checkboxes
- `topRoundBonus`, `bottomRoundBonus` - Round bonus checkboxes
- `topPersistent`, `bottomPersistent` - Persistent checkboxes
- `classSelect` - Character class dropdown
- `leftVal`, `rightVal` - Side hex number values
- `aoeTarget` - AOE placement target (top/bottom)

**Color Inputs:**
- `colorHeader` - Header/banner color (default: #808080)
- `colorFlavor` - Flavor text background (default: #3a4a56)
- `colorTopAction` - Top ability section color (default: #4a5a6a)
- `colorBottomAction` - Bottom ability section color (default: #1a2a3a)
- `colorHexInner` - Initiative/side hex inner color (default: #2a3a4a)
- `colorHexRim` - Initiative/side hex rim color (default: #5a6a7a)
- `colorFrame` - Card frame/border color (default: #4a4a4a)

**Preview Elements (prefixed with 'p'):**
- `pName`, `pLevel`, `pInit`, `pFlavor` - Preview text
- `pTop`, `pBottom` - Ability preview areas
- `pTopLoss`, `pBottomLoss` - Loss indicator images
- `pTopRoundBonus`, `pBottomRoundBonus` - Round bonus indicator images
- `pTopPersistent`, `pBottomPersistent` - Persistent indicator images
- `pTopAoeContainer`, `pBottomAoeContainer` - AOE pattern containers
- `pCardBg` - Card background element
- `pClassIcon` - Class icon container
- `pLeft`, `pRight`, `pLeftBox`, `pRightBox` - Side value elements
- `pInitBox` - Initiative main box
- `pBanner` - Name banner element

**Grids:**
- `iconGrid` - Icon button grid container
- `aoeGrid` - AOE pattern button grid container
- `collection` - Card collection container

## Icon Syntax in Card Text

Icons are inserted using **square bracket** syntax: `[icon_name]`

### Available Icons (50+)
| Category | Icons |
|----------|-------|
| Actions | `[attack]`, `[move]`, `[shield]`, `[heal]`, `[range]`, `[target]`, `[jump]`, `[flying]`, `[teleport]`, `[retaliate]`, `[loot]` |
| Modifiers | `[push]`, `[pull]`, `[pierce]`, `[add_target]`, `[taunt]`, `[dmg]` |
| Elements | `[fire]`, `[ice]`, `[wind]`, `[earth]`, `[light]`, `[dark]`, `[any_element]` |
| Consume Elements | `[consume_fire]`, `[consume_ice]`, `[consume_light]`, `[consume_dark]`, `[consume_earth]`, `[consume_wind]`, `[consume_any_element]` |
| Conditions | `[poison]`, `[wound]`, `[stun]`, `[immobilize]`, `[disarm]`, `[muddle]`, `[curse]`, `[bless]`, `[strengthen]`, `[invisible]`, `[ward]` |
| Card States | `[lost]`, `[spent]`, `[round_bonus]`, `[persistent_bonus]`, `[recover_card]`, `[advantage]`, `[disadvantage]` |
| Equipment Slots | `[head]`, `[body]`, `[one_hand]`, `[two_hands]`, `[feet]`, `[small]` |

## Text Formatting Syntax

- **Bold**: `[b]text[/b]`
- **Italic**: `[i]text[/i]`
- **Font Size**: `[s:14]text[/s]` (where 14 is pixel size)

## AOE Patterns Available

| Name | File | Description |
|------|------|-------------|
| `triangle` | triangle.svg | 3-hex triangle |
| `adjacent_two_hexes` | adjacent_two_hexes.svg | 2 adjacent hexes |
| `adjacent_three_hexes` | adjacent_three_hexes.svg | 3 adjacent hexes |
| `adjacent_triangle` | adjacent_triangle.svg | Adjacent triangle pattern |
| `skewer` | skewer.svg | 2-hex line |
| `long_skewer` | long_skewer.svg | 3-hex line |
| `full_hexagon` | full_hexagon.svg | 7-hex full hexagon |
| `big_smash` | big_smash.svg | Large smash pattern |
| `single_target` | single_target.svg | Single red target hex |
| `single_attacker` | single_attacker.svg | Single grey attacker hex |

## Character Classes

| Key | Icon File |
|-----|-----------|
| `bruiser` | 01_bruiser.png |
| `tinkerer` | 02_tinkerer.png |
| `spellweaver` | 03_spellweaver.png |
| `silent_knife` | 04_silent_knife.png |
| `cragheart` | 05_cragheart.png |
| `mindthief` | 06_mindthief.png |
| `sun` | 07_sun.png |
| `three_spears` | 08_three_spears.png |
| `cthulhu` | 11_cthulhu.png |
| `lightning_bolts` | 12_lightning_bolts.png |
| `music_note` | 13_music_note.png |
| `angry_face` | 14_angry_face.png |
| `saw` | 15_saw.png |
| `triangles` | 16_triangles.png |
| `two_minis` | 17_two_minis.png |
| `crossed_swords` | 18_crossed_swords.png |

## generate_aoe_svgs.js

Node.js utility script that converts `.aoe` files to SVG format.

**Usage:**
```bash
node generate_aoe_svgs.js
```

**Input:** `/home/coder/assets/assets/aoe/*.aoe`
**Output:** `/home/coder/assets/assets/aoe_svg/*.svg`

**.aoe File Format:**
```
col row r,g,b
0 0 255,0,0      # Red target hex
1 0 83,84,86    # Gray attacker hex
```

## Common Modification Patterns

### Adding a new icon:
1. Add asset file (PNG or SVG) to `assets/assets/`
2. Add icon name to `ICONS` array (~line 1205)
3. If PNG, add to `PNG_ICONS` array (~line 1220)
4. If needs inversion, add to `INVERT_ICONS` array (~line 1232)
5. If oversized, add scale factor to `ICON_SCALE` (~line 1494)
6. Icon available via `[icon_name]` syntax

### Adding a new checkbox toggle:
1. Add HTML checkbox in ability-toggles div (~line 1076-1080 for top, ~line 1113-1117 for bottom)
2. Add preview element in card structure (~line 1143-1149 for top, ~line 1159-1165 for bottom)
3. Update `update()` function to sync checkbox to preview element (~line 1596-1601)
4. If mutually exclusive, update `toggleBonus()` function (~line 1563)
5. Update `addCard()` to save state (~line 1675)
6. Update `renderCollection()` to display in collection (~line 1725)
7. Update `exportPDF()` for PDF rendering (~line 1833)

### Adding a new character class:
1. Add class icon PNG to `assets/assets/classes/`
2. Add mapping to `CLASS_ICONS` object (~line 1474)
3. Add `<option>` to class select dropdown (~line 971-988)
4. Optionally add CSS class for custom styling in `<style>` block

### Adding a new AOE pattern:
1. Create `.aoe` file in `assets/assets/aoe/`
2. Run `node generate_aoe_svgs.js` to generate SVG
3. Add pattern definition to `AOE_PATTERNS` array (~line 1247)

### Adding a new color customization:
1. Add color input in settings panel HTML (~line 1002-1032)
2. Add to event listener array (~line 1669)
3. Update `update()` function to apply color (~line 1619-1648)
4. Update `addCard()` to save color (~line 1692-1696)
5. Update `renderCollection()` to display color (~line 1745-1755)
6. Update `exportPDF()` for PDF rendering (~line 1874-1884)

## Notes

- File is large (~2845 lines). Use offset/limit when reading specific sections.
- All CSS and JS are embedded in single HTML file.
- Uses html2canvas for rendering and jspdf for PDF export.
- PDF exports at 300 DPI with Gloomhaven card dimensions (63.5mm x 88mm).
- Collection scale factor is 0.59 (190px / 320px original).
- Card frame uses SVG mask for complex shape with bulge indentations.
- CLASS_COLORS provides per-class color presets including frame color.
- Frame color uses CSS gradient (--frame-gradient) for 3D metallic effect.
