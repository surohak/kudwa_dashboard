import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { delay } from 'utils/helpers';

describe('helpers', () => {
  describe('delay', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should resolve after the specified time', async () => {
      // Fast-forward time
      vi.advanceTimersByTime(500);

      // Wait for any pending promises to resolve
      await Promise.resolve();

      // The promise should now be resolved
      expect(vi.getTimerCount()).toBe(0);
    });

    it('should use default delay time if no value provided', async () => {
      // Default time is 300ms
      vi.advanceTimersByTime(299);

      // Promise shouldn't be resolved yet
      expect(vi.getTimerCount()).toBe(1);

      // Advance the remaining time
      vi.advanceTimersByTime(1);

      // Wait for any pending promises to resolve
      await Promise.resolve();

      // The promise should now be resolved
      expect(vi.getTimerCount()).toBe(0);
    });

    it('can be awaited in async functions', async () => {
      const mockFn = vi.fn();

      // Create an async function that uses delay
      const asyncFunction = async () => {
        await delay(100);
        mockFn();
      };

      // Start the function but don't await it
      const promise = asyncFunction();

      // Function shouldn't have called mockFn yet
      expect(mockFn).not.toHaveBeenCalled();

      // Fast-forward time
      vi.advanceTimersByTime(100);

      // Wait for the promise to resolve
      await promise;

      // Now mockFn should have been called
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
