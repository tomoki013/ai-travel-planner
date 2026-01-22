
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  encodeTravelInfoUrl,
  decodeTravelInfoUrl,
  parseCategoriesParam,
  parseDatesParam,
  generateShareableUrl,
  generateTwitterShareUrl,
  generateLineShareUrl,
  copyShareUrlToClipboard,
} from './travel-info-url';

describe('travelInfoUrlUtils', () => {
  describe('encodeTravelInfoUrl', () => {
    it('should encode URL with destination only', () => {
      const url = encodeTravelInfoUrl('Paris', []);
      expect(url).toBe('/travel-info/Paris');
    });

    it('should encode URL with categories', () => {
      const url = encodeTravelInfoUrl('Paris', ['basic', 'local_food']);
      expect(url).toContain('/travel-info/Paris');
      expect(url).toContain('categories=basic%2Clocal_food');
    });

    it('should encode URL with dates', () => {
      const url = encodeTravelInfoUrl('Paris', [], { start: '2024-01-01', end: '2024-01-05' });
      expect(url).toContain('/travel-info/Paris');
      expect(url).toContain('dates=2024-01-01%2C2024-01-05');
    });

    it('should encode URL with both categories and dates', () => {
      const url = encodeTravelInfoUrl('Tokyo', ['safety', 'basic'], { start: '2024-06-01', end: '2024-06-10' });
      expect(url).toContain('/travel-info/Tokyo');
      expect(url).toContain('categories=safety%2Cbasic');
      expect(url).toContain('dates=2024-06-01%2C2024-06-10');
    });

    it('should encode Japanese destination', () => {
      const url = encodeTravelInfoUrl('東京', ['basic']);
      expect(url).toContain('/travel-info/%E6%9D%B1%E4%BA%AC');
    });
  });

  describe('decodeTravelInfoUrl', () => {
    it('should decode URL with destination only and return default categories', () => {
      const params = new URLSearchParams();
      const result = decodeTravelInfoUrl('Paris', params);
      expect(result.destination).toBe('Paris');
      expect(result.categories).toEqual(['basic', 'safety']);
      expect(result.dates).toBeUndefined();
    });

    it('should decode URL with valid categories including new ones', () => {
      const params = new URLSearchParams('categories=basic,local_food,events');
      const result = decodeTravelInfoUrl('Paris', params);
      expect(result.categories).toEqual(['basic', 'local_food', 'events']);
    });

    it('should filter out invalid categories', () => {
      const params = new URLSearchParams('categories=basic,invalid_cat,events');
      const result = decodeTravelInfoUrl('Paris', params);
      expect(result.categories).toEqual(['basic', 'events']);
    });

    it('should decode URL with dates', () => {
      const params = new URLSearchParams('dates=2024-01-01,2024-01-05');
      const result = decodeTravelInfoUrl('Paris', params);
      expect(result.dates).toEqual({ start: '2024-01-01', end: '2024-01-05' });
    });

    it('should handle incomplete dates', () => {
      const params = new URLSearchParams('dates=2024-01-01');
      const result = decodeTravelInfoUrl('Paris', params);
      expect(result.dates).toBeUndefined();
    });

    it('should decode encoded destination', () => {
      const params = new URLSearchParams();
      const result = decodeTravelInfoUrl('%E6%9D%B1%E4%BA%AC', params);
      expect(result.destination).toBe('東京');
    });
  });

  describe('parseCategoriesParam', () => {
    it('should return default categories when param is null', () => {
      expect(parseCategoriesParam(null)).toEqual(['basic', 'safety']);
    });

    it('should return default categories when param is undefined', () => {
      expect(parseCategoriesParam(undefined)).toEqual(['basic', 'safety']);
    });

    it('should return valid categories including new ones', () => {
      expect(parseCategoriesParam('basic,local_food,events')).toEqual(['basic', 'local_food', 'events']);
    });

    it('should filter invalid categories', () => {
      expect(parseCategoriesParam('basic,invalid,events')).toEqual(['basic', 'events']);
    });
  });

  describe('parseDatesParam', () => {
    it('should return undefined when param is null', () => {
      expect(parseDatesParam(null)).toBeUndefined();
    });

    it('should return undefined when param is undefined', () => {
      expect(parseDatesParam(undefined)).toBeUndefined();
    });

    it('should parse valid date range', () => {
      expect(parseDatesParam('2024-01-01,2024-01-15')).toEqual({
        start: '2024-01-01',
        end: '2024-01-15',
      });
    });

    it('should return undefined for invalid date format', () => {
      expect(parseDatesParam('01-01-2024,01-15-2024')).toBeUndefined();
    });

    it('should return undefined for incomplete date range', () => {
      expect(parseDatesParam('2024-01-01')).toBeUndefined();
    });

    it('should return undefined for malformed dates', () => {
      expect(parseDatesParam('2024-1-1,2024-1-15')).toBeUndefined();
    });
  });

  describe('generateShareableUrl', () => {
    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(global, 'window', {
        value: {
          location: {
            origin: 'https://example.com',
          },
        },
        writable: true,
      });
    });

    afterEach(() => {
      // Reset window
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });
    });

    it('should generate full URL with origin', () => {
      const url = generateShareableUrl('Paris', ['basic']);
      expect(url).toBe('https://example.com/travel-info/Paris?categories=basic');
    });

    it('should generate full URL with dates', () => {
      const url = generateShareableUrl('Tokyo', ['safety'], { start: '2024-01-01', end: '2024-01-05' });
      expect(url).toContain('https://example.com/travel-info/Tokyo');
      expect(url).toContain('dates=2024-01-01%2C2024-01-05');
    });
  });

  describe('generateShareableUrl (SSR)', () => {
    it('should return relative URL when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - intentionally setting window to undefined
      delete global.window;

      const url = generateShareableUrl('Paris', ['basic']);
      expect(url).toBe('/travel-info/Paris?categories=basic');

      global.window = originalWindow;
    });
  });

  describe('generateTwitterShareUrl', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'window', {
        value: {
          location: {
            origin: 'https://example.com',
          },
        },
        writable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });
    });

    it('should generate Twitter share URL', () => {
      const url = generateTwitterShareUrl('Paris', ['basic']);
      expect(url).toContain('https://twitter.com/intent/tweet');
      expect(url).toContain('url=');
      expect(url).toContain('text=');
      expect(url).toContain('hashtags=');
    });

    it('should include destination in text', () => {
      const url = generateTwitterShareUrl('東京', ['basic']);
      expect(decodeURIComponent(url)).toContain('東京の渡航情報をチェック');
    });
  });

  describe('generateLineShareUrl', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'window', {
        value: {
          location: {
            origin: 'https://example.com',
          },
        },
        writable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });
    });

    it('should generate LINE share URL', () => {
      const url = generateLineShareUrl('Paris', ['basic']);
      expect(url).toContain('https://social-plugins.line.me/lineit/share');
      expect(url).toContain('url=');
      expect(url).toContain('text=');
    });

    it('should include destination in text', () => {
      const url = generateLineShareUrl('東京', ['basic']);
      expect(decodeURIComponent(url)).toContain('東京の渡航情報');
    });
  });

  describe('copyShareUrlToClipboard', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'window', {
        value: {
          location: {
            origin: 'https://example.com',
          },
        },
        writable: true,
      });

      Object.defineProperty(global, 'navigator', {
        value: {
          clipboard: {
            writeText: vi.fn().mockResolvedValue(undefined),
          },
        },
        writable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });
      vi.restoreAllMocks();
    });

    it('should copy URL to clipboard and return true on success', async () => {
      const result = await copyShareUrlToClipboard('Paris', ['basic']);
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('should return false on clipboard error', async () => {
      vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Clipboard error'));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await copyShareUrlToClipboard('Paris', ['basic']);
      expect(result).toBe(false);

      consoleSpy.mockRestore();
    });
  });
});
