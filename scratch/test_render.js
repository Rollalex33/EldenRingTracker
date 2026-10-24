globalThis.window = {
  location: { href: 'http://localhost' },
  addEventListener: () => {},
  removeEventListener: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  },
  navigator: globalThis.navigator,
  requestAnimationFrame: (cb) => setTimeout(cb, 0),
  cancelAnimationFrame: (id) => clearTimeout(id)
};
globalThis.document = {
  createElement: () => ({ style: {} }),
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.localStorage = globalThis.window.localStorage;

import React from 'react';
import ReactDOMServer from 'react-dom/server';

async function main() {
  const { default: App } = await import('../src/App.jsx');
  const { useTrackerStore } = await import('../src/store/useTrackerStore.js');

  console.log('Testing App in checklist mode...');
  useTrackerStore.setState({ viewMode: 'checklist' });
  const htmlChecklist = ReactDOMServer.renderToString(React.createElement(App));
  console.log('✓ Checklist mode rendered successfully! Length:', htmlChecklist.length);
}

main().catch(err => {
  console.error('App render error:', err);
  process.exit(1);
});
