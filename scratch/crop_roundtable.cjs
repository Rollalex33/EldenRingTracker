const fs = require('fs');
const jpeg = require('jpeg-js');

const jpegData = fs.readFileSync('public/elden_ring_map.jpg');
const raw = jpeg.decode(jpegData, { useTArray: true, formatAsRGBA: true });
const w = raw.width;
const h = raw.height;
const data = raw.data;

// Crop bottom-left corner: x: 200-800, y: 4100-4700 (lat: 300-900)
const minX = 200, maxX = 800;
const minY = 4100, maxY = 4700;
const cropW = maxX - minX;
const cropH = maxY - minY;
const cropBuf = Buffer.alloc(cropW * cropH * 4);

for (let y = minY; y < maxY; y++) {
  for (let x = minX; x < maxX; x++) {
    const srcIdx = (y * w + x) * 4;
    const destIdx = ((y - minY) * cropW + (x - minX)) * 4;
    let r = data[srcIdx], g = data[srcIdx+1], b = data[srcIdx+2];
    if (x % 100 === 0 || y % 100 === 0) { r = 255; g = 0; b = 0; }
    cropBuf[destIdx] = r;
    cropBuf[destIdx+1] = g;
    cropBuf[destIdx+2] = b;
    cropBuf[destIdx+3] = 255;
  }
}

const encoded = jpeg.encode({ data: cropBuf, width: cropW, height: cropH }, 85);
fs.writeFileSync('scratch/roundtable_corner.jpg', encoded.data);
console.log('Saved scratch/roundtable_corner.jpg');
