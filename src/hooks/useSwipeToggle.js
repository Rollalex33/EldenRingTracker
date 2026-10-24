import { useRef, useState } from 'react';

/**
 * Hook de gesto "deslizar a la derecha para marcar" para filas táctiles.
 * Bloquea el eje al detectar la intención del usuario para no interferir con
 * el scroll vertical de la lista (se espera `touch-action: pan-y` en la fila).
 *
 * @param {Function} onSwipe  Acción a ejecutar al superar el umbral.
 * @param {object}   options  { threshold, maxOffset }
 * @returns {{ dx: number, armed: boolean, handlers: object }}
 */
export function useSwipeToggle(onSwipe, { threshold = 80, maxOffset = 130 } = {}) {
  const startRef = useRef(null);
  const dxRef = useRef(0);
  const [dx, setDx] = useState(0);

  const reset = () => {
    startRef.current = null;
    dxRef.current = 0;
    setDx(0);
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY, axis: null };
  };

  const onTouchMove = (e) => {
    const s = startRef.current;
    if (!s) return;
    const t = e.touches[0];
    const ddx = t.clientX - s.x;
    const ddy = t.clientY - s.y;

    if (s.axis === null && (Math.abs(ddx) > 10 || Math.abs(ddy) > 10)) {
      s.axis = Math.abs(ddx) > Math.abs(ddy) * 1.5 ? 'x' : 'y';
    }
    if (s.axis === 'x') {
      const next = Math.max(0, Math.min(ddx, maxOffset));
      dxRef.current = next;
      setDx(next);
    }
  };

  const onTouchEnd = () => {
    const s = startRef.current;
    const finalDx = dxRef.current;
    reset();
    if (s?.axis === 'x' && finalDx >= threshold) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
      onSwipe();
    }
  };

  return {
    dx,
    armed: dx >= threshold,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: reset,
    },
  };
}
