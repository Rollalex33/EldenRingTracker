import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { parseGuideHtml } from './src/utils/guideParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function guideDetailPlugin() {
  const handler = async (req, res, next) => {
    if (!req.url.startsWith('/api/guide-detail')) {
      return next();
    }
    try {
      const urlObj = new URL(req.url, 'http://localhost');
      const fileKey = urlObj.searchParams.get('file');
      if (!fileKey) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'file parameter is required' }));
        return;
      }

      const cleanKey = fileKey.replace(/[^a-zA-Z0-9_\-\.]/g, '');
      const cachePath = path.resolve(__dirname, 'public/guide-cache', `${cleanKey.endsWith('.php') ? cleanKey : cleanKey + '.php'}.json`);
      
      // Return cached version if exists
      if (fs.existsSync(cachePath)) {
        const data = fs.readFileSync(cachePath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
        return;
      }

      // Fetch on demand from EliteGuías
      const targetUrl = `https://www.eliteguias.com/guias/e/er/${cleanKey.endsWith('.php') ? cleanKey : cleanKey + '.php'}`;
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });

      if (!response.ok) {
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: `Eliteguías HTTP ${response.status}` }));
        return;
      }

      const buf = await response.arrayBuffer();
      const html = new TextDecoder('iso-8859-1').decode(buf);
      const parsed = parseGuideHtml(html, targetUrl);

      // Persist to cache folder for future instant loading
      try {
        fs.mkdirSync(path.dirname(cachePath), { recursive: true });
        fs.writeFileSync(cachePath, JSON.stringify(parsed, null, 2));
      } catch (writeErr) {
        console.warn('Cache write warning:', writeErr.message);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(parsed));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
  };

  return {
    name: 'guide-detail-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  // Rutas relativas para compatibilidad universal con GitHub Pages, Vercel y Netlify
  base: './',
  plugins: [react(), guideDetailPlugin()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'zustand'],
          'vendor-leaflet': ['leaflet', 'react-leaflet'],
          'vendor-icons': ['lucide-react'],
          'data-catalog': ['./src/data/checklistCatalog.json'],
          'data-locations': ['./src/data/locations.json', './src/data/questlines.json'],
        },
      },
    },
  },
});
