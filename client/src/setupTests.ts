import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi available globally
// This allows tests to use vi directly or through the jest global
window.jest = window.jest || vi;

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
