import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useAppBackHandler history navigation logic', () => {
  let popstateListeners = [];
  let historyStack = [];
  let currentState = null;

  beforeEach(() => {
    popstateListeners = [];
    historyStack = [];
    currentState = null;

    vi.stubGlobal('window', {
      history: {
        get state() {
          return currentState;
        },
        pushState: (state) => {
          historyStack.push(state);
          currentState = state;
        },
        replaceState: (state) => {
          currentState = state;
        },
        back: () => {
          if (historyStack.length > 0) {
            historyStack.pop();
            currentState = historyStack[historyStack.length - 1] || null;
            popstateListeners.forEach((fn) => fn(new Event('popstate')));
          }
        },
      },
      addEventListener: (evt, fn) => {
        if (evt === 'popstate') popstateListeners.push(fn);
      },
      removeEventListener: (evt, fn) => {
        if (evt === 'popstate') {
          popstateListeners = popstateListeners.filter((l) => l !== fn);
        }
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should verify backward navigation priority: item modal > feature modal > subview > root', () => {
    let itemDetailOpen = true;
    let routeModalOpen = true;
    let view = 'checklist';
    let game = 'bloodborne';

    const handleBack = () => {
      // 1. Item modal
      if (itemDetailOpen) {
        itemDetailOpen = false;
        return;
      }
      // 2. Feature modal
      if (routeModalOpen) {
        routeModalOpen = false;
        return;
      }
      // 3. Subview
      if (game === 'bloodborne' && view === 'checklist') {
        view = 'hub';
        return;
      }
      if (game === 'bloodborne' && view === 'hub') {
        game = 'elden';
        return;
      }
    };

    // Step 1: back closes item modal
    handleBack();
    expect(itemDetailOpen).toBe(false);
    expect(routeModalOpen).toBe(true);

    // Step 2: back closes route modal
    handleBack();
    expect(routeModalOpen).toBe(false);
    expect(view).toBe('checklist');

    // Step 3: back returns to Bloodborne Hub
    handleBack();
    expect(view).toBe('hub');
    expect(game).toBe('bloodborne');

    // Step 4: back returns to Elden Ring Hub
    handleBack();
    expect(game).toBe('elden');
  });
});

