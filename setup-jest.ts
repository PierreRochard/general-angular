import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Minimal polyfills for animation support in JSDOM
if (!(global as any).CSS) {
  (global as any).CSS = { supports: () => false };
}

if (!(Element.prototype as any).animate) {
  (Element.prototype as any).animate = () => ({
    cancel: () => {},
    finish: () => {},
    onfinish: null as (() => void) | null,
    play: () => {},
    pause: () => {},
    reverse: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    finished: Promise.resolve(),
  });
}
