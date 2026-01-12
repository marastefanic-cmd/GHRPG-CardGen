const fs = require('fs');
const path = require('path');

const AOE_DIR = '/home/coder/assets/assets/aoe';
const OUTPUT_DIR = '/home/coder/assets/assets/aoe_svg';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Hex dimensions - pointy-top hexagons
const HEX_SIZE = 20;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;  // width of pointy-top hex
const HEX_HEIGHT = HEX_SIZE * 2;             // height of pointy-top hex

// Convert offset coordinates to pixel position (odd-r offset: odd rows shifted right)
function hexToPixel(col, row) {
    const x = HEX_WIDTH * (col + 0.5 * (row % 2));
    const y = HEX_SIZE * 1.5 * row;
    return { x, y };
}

// Generate hexagon path (pointy-top)
function hexPath(cx, cy, size) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        // Start at top vertex, go clockwise
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        points.push(px.toFixed(2) + ',' + py.toFixed(2));
    }
    return 'M' + points.join('L') + 'Z';
}

// Parse .aoe file
function parseAoeFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const hexes = [];

    content.split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;

        const parts = line.split(/\s+/);
        if (parts.length >= 3) {
            const col = parseInt(parts[0]);
            const row = parseInt(parts[1]);
            const color = parts[2];
            const rgb = color.split(',').map(Number);
            const r = rgb[0], g = rgb[1], b = rgb[2];

            // Determine if this is attacker (gray ~83,84,86) or target (red 255,0,0)
            const isAttacker = (r < 100 && g < 100 && b < 100);

            hexes.push({ col, row, isAttacker });
        }
    });

    return hexes;
}

// Generate SVG from hexes
function generateSvg(hexes, name) {
    // Calculate bounds (for pointy-top hexes)
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    hexes.forEach(hex => {
        const pos = hexToPixel(hex.col, hex.row);
        minX = Math.min(minX, pos.x - HEX_WIDTH / 2);
        minY = Math.min(minY, pos.y - HEX_SIZE);
        maxX = Math.max(maxX, pos.x + HEX_WIDTH / 2);
        maxY = Math.max(maxY, pos.y + HEX_SIZE);
    });

    const padding = 4;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const offsetX = -minX + padding;
    const offsetY = -minY + padding;

    let svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width.toFixed(2) + ' ' + height.toFixed(2) + '" width="' + width.toFixed(2) + '" height="' + height.toFixed(2) + '">\n';
    svgContent += '  <defs>\n';
    svgContent += '    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">\n';
    svgContent += '      <feDropShadow dx="1" dy="1" stdDeviation="1" flood-opacity="0.5"/>\n';
    svgContent += '    </filter>\n';
    svgContent += '  </defs>\n';
    svgContent += '  <g filter="url(#shadow)">\n';

    hexes.forEach(hex => {
        const pos = hexToPixel(hex.col, hex.row);
        const cx = pos.x + offsetX;
        const cy = pos.y + offsetY;
        const pathD = hexPath(cx, cy, HEX_SIZE - 1);

        if (hex.isAttacker) {
            // Gray attacker hex
            svgContent += '    <path d="' + pathD + '" fill="#505254" stroke="#303030" stroke-width="1.5"/>\n';
        } else {
            // Red target hex with X
            svgContent += '    <path d="' + pathD + '" fill="#c41e3a" stroke="#ffffff" stroke-width="2"/>\n';
            // Add X mark
            const xSize = HEX_SIZE * 0.4;
            svgContent += '    <line x1="' + (cx - xSize) + '" y1="' + (cy - xSize) + '" x2="' + (cx + xSize) + '" y2="' + (cy + xSize) + '" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>\n';
            svgContent += '    <line x1="' + (cx + xSize) + '" y1="' + (cy - xSize) + '" x2="' + (cx - xSize) + '" y2="' + (cy + xSize) + '" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>\n';
        }
    });

    svgContent += '  </g>\n';
    svgContent += '</svg>';

    return svgContent;
}

// Process all .aoe files
const files = fs.readdirSync(AOE_DIR).filter(f => f.endsWith('.aoe'));

files.forEach(file => {
    const filepath = path.join(AOE_DIR, file);
    const name = path.basename(file, '.aoe');
    const hexes = parseAoeFile(filepath);
    const svg = generateSvg(hexes, name);

    const outputPath = path.join(OUTPUT_DIR, name + '.svg');
    fs.writeFileSync(outputPath, svg);
    console.log('Generated: ' + name + '.svg');
});

console.log('Done!');
