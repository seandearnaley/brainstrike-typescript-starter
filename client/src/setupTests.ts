import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi available globally for any legacy code that might reference it
Object.assign(globalThis, { vi });

// Mock matchMedia for tests
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };
