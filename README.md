# 🗡️ Elden Ring Interactive Tracker & Guía de Questlines

Un mapa interactivo y rastreador de misiones paso a paso para **The Lands Between (Las Tierras Intermedias)**, diseñado para jugadores completistas con sincronización bidireccional y vinculación directa a las guías oficiales de **EliteGuías** y **MapGenie**.

---

## ✨ Características Principales

### 1. 🗺️ Mapa Interactivo en Tiempo Real (Leaflet)
* **Planos de alta resolución (5000x5000 px):** Mapas completos de Superficie (*Surface*), Subterráneo (*Underground*) y Tierras Sombrías DLC (*Shadow of the Erdtree*).
* **Proyección plana nativa:** `L.CRS.Simple` con cuadrícula de coordenadas `[0, 0]` a `[5000, 5000]` y delimitación por `maxBounds` para rendimiento óptimo sin consumo de APIs externas.
* **Marcadores clasificados por categorías:**
  * 🌟 **Sitios de Gracia** (`graces`)
  * 💀 **Jefes y Mazmorras** (`bosses`)
  * ⚔️ **Armas Legendarias** (`weapons`)
  * 👻 **Cenizas de Invocación** (`ashes`)
  * 👤 **Misiones de NPCs** (`npcs`)
  * 🗝️ **Objetos Clave** (`key_items`)

### 2. 📜 Sincronización Bidireccional Guía <-> Mapa (`flyTo`)
* **De la Guía al Mapa:** Pulsa *"Ver en el mapa"* en cualquier paso para que la cámara vuele suavemente (`flyTo`) a la coordenada exacta con resplandor dorado.
* **Del Mapa a la Guía:** Al hacer clic en un marcador de misión en el mapa, la guía cambia automáticamente al NPC correspondiente y resalta el paso activo.

### 3. ⚠️ Filtro Avanzado de Contenido Perdible (*Missable Focus*)
* Activa el switch **"⚠️ Solo pasos perdibles"** para ocultar todo el contenido secundario y centrarte exclusivamente en los pasos críticos con riesgo de bloqueo antes de cruzar puntos de no retorno.

### 4. 💾 Persistencia en LocalStorage y Backup JSON
* **Guardado automático continuo:** Todo el progreso de misiones y marcadores se preserva en `localStorage` mediante middleware de Zustand (`Set` serializado a `Array`).
* **Exportar Partida (`elden_ring_progress.json`):** Descarga una copia de seguridad portátil con timestamp y lista de ítems completados.
* **Importar Partida:** Restaura tu progreso al instante en cualquier navegador o dispositivo.
* **Reinicio seguro:** Opción de reinicio total con modal de doble confirmación.

### 5. 🛠️ Herramienta de Desarrollador: *Coordinate Picker*
* Disponible en entorno de desarrollo (`import.meta.env.DEV`).
* Activa el modo retícula para hacer clic en cualquier punto del mapa y copiar automáticamente las coordenadas `[lat, lng]` o un snippet JSON listo para añadir a la base de datos.

---

## 🏛️ Questlines Incluidas en la Base de Datos

El tracker incluye **24 questlines** completas y **91 pasos** georreferenciados (con más de 30 marcadores de contenido perdible):

| NPC | Misión Principal | Pasos Totales | Pasos Perdibles |
| :--- | :--- | :---: | :---: |
| **Ranni la Bruja** | Era de las Estrellas y Espadón de la Luna Llena | 5 | 1 |
| **Millicent** | La podredumbre roja y Aguja de Miquella | 7 | 3 |
| **Alexander, Puño de Hierro** | El guerrero tarro y Fragmento de Alexander | 6 | 1 |
| **Blaidd el Semilobo** | Destino de los Dos Dedos y Armadura Regia | 6 | 2 |
| **Yura, Cazador de Dedos** | Nagakiba, Eleonora y Shabriri | 5 | 2 |
| **Fia, Compañera de Muerte** | Runa del Príncipe de la Muerte | 5 | 1 |
| **Rogier el Hechicero** | Muerte negra y marca en el Castillo Velo Tormentoso | 4 | 2 |
| **Hechicera Sellen** | Restauración del linaje de Raya Lucaria | 5 | 1 |
| **Nepheli Loux** | Señor de Necrolimbo y Cenizas del Halcón | 5 | 2 |
| *+ 15 NPCs adicionales* | Diallos, Boc, Kenneth Haight, Volcano Manor, etc. | 43 | 16 |

---

## 🚀 Tecnologías Utilizadas

* **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
* **Estilos:** [Vanilla CSS](https://developer.mozilla.org/es/docs/Web/CSS) + [Tailwind CSS 3](https://tailwindcss.com/)
* **Mapas GIS:** [Leaflet 1.9](https://leafletjs.com/) + [React-Leaflet 4](https://react-leaflet.js.org/)
* **Gestión de Estado:** [Zustand 5](https://github.com/pmndrs/zustand) (con middleware `persist`)
* **Iconografía:** [Lucide React](https://lucide.dev/)
* **Tipografía:** [Google Fonts](https://fonts.google.com/) (*Cinzel* & *Inter*)

---

## 📦 Instalación y Ejecución Local

### Prerrequisitos
* Node.js >= 18.0.0
* Gestor de paquetes `pnpm` (recomendado) o `npm`

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/elden-ring-tracker.git
cd elden-ring-tracker

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo con HMR
pnpm dev
```

El servidor local estará disponible en: `http://localhost:5173/`

### Comandos Disponibles

```bash
pnpm dev          # Inicia el entorno local de desarrollo
pnpm test         # Ejecuta la suite de pruebas unitarias con Vitest (29 tests)
pnpm verify:data  # Verificación SHA-256 e integridad de catálogo, marcadores y quests
pnpm build        # Compila y genera el bundle optimizado en dist/
pnpm preview      # Previsualiza la build de producción localmente
```

---

## ⚙️ Ingesta de Datos con `scripts/parseGuideData.js`

El proyecto incluye un script automatizado para extraer y formatear datos copiados directamente de las páginas de **EliteGuías**:

```bash
# Ejecutar demostración con datos de prueba
node scripts/parseGuideData.js --demo

# Parsear un archivo HTML o texto local
node scripts/parseGuideData.js entrada_guia.html --npc "Millicent"
```

El script detecta de forma autónoma:
* Pasos e hitos numerados.
* Regiones geográficas y coordenadas aproximadas de inicio.
* Palabras de alerta (*"Cuidado"*, *"Importante"*, *"Punto de no retorno"*) para marcar `missable: true`.
* Estructuras compatibles con `questlines.json` y `locations.json`.

---

## 🌐 Despliegue en Producción

El proyecto está configurado con rutas relativas (`base: './'`) y *code splitting* modular en `vite.config.js` para compatibilidad universal con cualquier proveedor de hosting estático:

### Vercel
1. Conecta tu repositorio de GitHub en [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Build Command: `pnpm run build` o `npm run build`.
4. Output Directory: `dist`.

### Netlify
1. Conecta tu repositorio en [Netlify](https://www.netlify.com/).
2. Build Command: `pnpm run build`.
3. Publish Directory: `dist`.

### GitHub Pages
1. Asegúrate de compilar la carpeta `dist/` o utilizar GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## ⚖️ Licencia y Atribución

Este proyecto es una herramienta para la comunidad de aficionados sin fines de lucro.
* **Contenido y universo:** Elden Ring es una marca registrada de **FromSoftware** y **Bandai Namco Entertainment**.
* **Guías y referencias textuales:** Textos basados en la documentación pública de [EliteGuías](https://www.eliteguias.com/).
* **Cartografía:** Mosaicos base provistos por [CartoDB](https://carto.com/) y [OpenStreetMap](https://www.openstreetmap.org/).
