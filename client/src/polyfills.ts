/**
 * Buffer polyfill for browser environments
 *
 * This polyfill provides a minimal Buffer implementation for the browser
 * to support libraries that use Node.js Buffer API, like opaqueid.
 */

// Only add the polyfill if Buffer is not already defined
if (
  typeof window !== 'undefined' &&
  typeof (window as any).Buffer === 'undefined'
) {
  (window as any).Buffer = {
    from: (
      input: string,
      encoding?: string,
    ): { toString: (format: string) => string } => {
      // Simple implementation that handles the basic use case in opaqueid
      if (encoding === 'base64') {
        return {
          toString: (format: string): string => {
            if (format === 'binary') {
              // Decode base64 to binary string
              try {
                return atob(input);
              } catch (e) {
                console.error('Buffer polyfill error:', e);
                return '';
              }
            }
            return input;
          },
        };
      }

      // For binary to base64 encoding
      return {
        toString: (format: string): string => {
          if (format === 'base64') {
            // Encode binary string to base64
            try {
              return btoa(input);
            } catch (e) {
              console.error('Buffer polyfill error:', e);
              return '';
            }
          }
          return input;
        },
      };
    },
  };

  console.log('Buffer polyfill added for browser environment');
}

export {};
