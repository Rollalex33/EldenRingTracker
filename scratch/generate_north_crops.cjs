const fs = require('fs');
const jpeg = require('jpeg-js');

const jpegData = fs.readFileSync('public/elden_ring_map.jpg');
const raw = jpeg.decode(jpegData, { useTArray: true, formatAsRGBA: true });
const w = raw.width;
const h = raw.height;
const data = raw.data;

function makeGridCrop(minX, maxX, minY, maxY, filename) {
  const cropW = maxX - minX;
  const cropH = maxY - minY;
  const cropBuf = Buffer.alloc(cropW * cropH * 4);

  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const srcIdx = (y * w + x) * 4;
      const destX = x - minX;
      const destY = y - minY;
      const destIdx = (destY * cropW + destX) * 4;
      
      let r = data[srcIdx];
      let g = data[srcIdx+1];
      let b = data[srcIdx+2];
      
      if (x % 100 === 0 || y % 100 === 0) {
        r = 255; g = 0; b = 0;
      } else if (x % 50 === 0 && y % 50 === 0) {
        r = 255; g = 255; b = 0;
      }
      
      cropBuf[destIdx] = r;
      cropBuf[destIdx+1] = g;
      cropBuf[destIdx+2] = b;
      cropBuf[destIdx+3] = 255;
    }
  }

  const encoded = jpeg.encode({ data: cropBuf, width: cropW, height: cropH }, 85);
  fs.writeFileSync('scratch/' + filename, encoded.data);
  console.log('Saved scratch/' + filename);
}

// 1. North Liurnia & Caria: x: 1100-1800, y: 1600-2400 (lat: 2600 to 3400)
makeGridCrop(1100, 1800, 1600, 2400, 'north_liurnia_grid.jpg');

// 2. Mt Gelmir: x: 1300-2000, y: 1100-1800 (lat: 3200 to 3900)
makeGridCrop(1300, 2000, 1100, 1800, 'gelmir_grid.jpg');

// 3. Mountaintops: x: 2700-3600, y: 800-1800 (lat: 3200 to 4200)
makeGridCrop(2700, 3600, 800, 1800, 'mountaintops_grid.jpg');
