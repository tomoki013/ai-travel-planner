import { describe, it, expect } from 'vitest';
import {
  CACHE_TTL_CONFIG,
  EXCHANGE_RATE_TTL,
  CACHE_KEY_PREFIX,
  CACHE_KEY_SEPARATOR,
  MEMORY_CACHE_DEFAULTS,
  FILE_CACHE_DEFAULTS,
  generateCacheKey,
  generateCompositeCacheKey,
  generateCacheKeyPattern,
  normalizeDestination,
  getCategoryTtl,
  getCategoryTtlSeconds,
  createEmptyCacheStats,
  calculateHitRate,
} from './cache-config';

describe('cache-config', () => {
  describe('constants', () => {
    it('should have correct CACHE_KEY_PREFIX', () => {
      expect(CACHE_KEY_PREFIX).toBe('travel-info');
    });

    it('should have correct CACHE_KEY_SEPARATOR', () => {
      expect(CACHE_KEY_SEPARATOR).toBe(':');
    });

    it('should have EXCHANGE_RATE_TTL set to 1 hour', () => {
      expect(EXCHANGE_RATE_TTL).toBe(60 * 60 * 1000);
    });

    it('should have correct MEMORY_CACHE_DEFAULTS', () => {
      expect(MEMORY_CACHE_DEFAULTS.maxEntries).toBe(1000);
      expect(MEMORY_CACHE_DEFAULTS.cleanupIntervalMs).toBe(60 * 1000);
      expect(MEMORY_CACHE_DEFAULTS.defaultTtlMs).toBe(60 * 60 * 1000);
    });

    it('should have correct FILE_CACHE_DEFAULTS', () => {
      expect(FILE_CACHE_DEFAULTS.cacheDir).toBe('.cache/travel-info');
      expect(FILE_CACHE_DEFAULTS.defaultTtlMs).toBe(60 * 60 * 1000);
    });

    it('should have TTL config for all categories', () => {
      const categories = [
        'basic', 'safety', 'climate', 'visa', 'manner', 'transport',
        'local_food', 'souvenir', 'events', 'technology', 'healthcare',
        'restrooms', 'smoking', 'alcohol'
      ];

      for (const category of categories) {
        expect(CACHE_TTL_CONFIG[category as keyof typeof CACHE_TTL_CONFIG]).toBeGreaterThan(0);
      }
    });
  });

  describe('normalizeDestination', () => {
    it('should convert to lowercase', () => {
      expect(normalizeDestination('PARIS')).toBe('paris');
    });

    it('should trim whitespace', () => {
      expect(normalizeDestination('  tokyo  ')).toBe('tokyo');
    });

    it('should replace spaces with hyphens', () => {
      expect(normalizeDestination('New York')).toBe('new-york');
    });

    it('should remove special characters except allowed ones', () => {
      expect(normalizeDestination('paris!')).toBe('paris');
      expect(normalizeDestination('tokyo@123')).toBe('tokyo123');
    });

    it('should preserve Japanese characters', () => {
      expect(normalizeDestination('東京')).toBe('東京');
      expect(normalizeDestination('大阪市')).toBe('大阪市');
    });

    it('should handle multiple spaces', () => {
      expect(normalizeDestination('Los   Angeles')).toBe('los-angeles');
    });
  });

  describe('generateCacheKey', () => {
    it('should generate key with destination and category', () => {
      const key = generateCacheKey('Paris', 'safety');
      expect(key).toBe('travel-info:paris:safety');
    });

    it('should normalize destination in key', () => {
      const key = generateCacheKey('NEW YORK', 'basic');
      expect(key).toBe('travel-info:new-york:basic');
    });

    it('should include sorted options in key', () => {
      const key = generateCacheKey('Tokyo', 'climate', { month: '03', year: '2024' });
      expect(key).toBe('travel-info:tokyo:climate:month=03:year=2024');
    });

    it('should handle Japanese destination', () => {
      const key = generateCacheKey('東京', 'basic');
      expect(key).toBe('travel-info:東京:basic');
    });
  });

  describe('generateCompositeCacheKey', () => {
    it('should generate key with sorted categories', () => {
      const key = generateCompositeCacheKey('Paris', ['safety', 'basic', 'visa']);
      expect(key).toBe('travel-info:paris:basic,safety,visa');
    });

    it('should handle single category', () => {
      const key = generateCompositeCacheKey('Tokyo', ['climate']);
      expect(key).toBe('travel-info:tokyo:climate');
    });
  });

  describe('generateCacheKeyPattern', () => {
    it('should generate pattern with wildcards when no params', () => {
      const pattern = generateCacheKeyPattern();
      expect(pattern).toBe('travel-info:*:*');
    });

    it('should generate pattern with destination only', () => {
      const pattern = generateCacheKeyPattern('Paris');
      expect(pattern).toBe('travel-info:paris:*');
    });

    it('should generate pattern with category only', () => {
      const pattern = generateCacheKeyPattern(undefined, 'safety');
      expect(pattern).toBe('travel-info:*:safety');
    });

    it('should generate pattern with both params', () => {
      const pattern = generateCacheKeyPattern('Tokyo', 'basic');
      expect(pattern).toBe('travel-info:tokyo:basic');
    });
  });

  describe('getCategoryTtl', () => {
    it('should return correct TTL for basic category', () => {
      expect(getCategoryTtl('basic')).toBe(24 * 60 * 60 * 1000);
    });

    it('should return correct TTL for safety category', () => {
      expect(getCategoryTtl('safety')).toBe(6 * 60 * 60 * 1000);
    });

    it('should return correct TTL for climate category', () => {
      expect(getCategoryTtl('climate')).toBe(30 * 60 * 1000);
    });
  });

  describe('getCategoryTtlSeconds', () => {
    it('should return TTL in seconds', () => {
      expect(getCategoryTtlSeconds('basic')).toBe(24 * 60 * 60);
    });

    it('should floor the result', () => {
      // Climate TTL is 30 minutes = 1800 seconds
      expect(getCategoryTtlSeconds('climate')).toBe(30 * 60);
    });
  });

  describe('createEmptyCacheStats', () => {
    it('should create empty stats object', () => {
      const stats = createEmptyCacheStats();

      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.size).toBe(0);
      expect(stats.oldestEntry).toBeNull();
      expect(stats.newestEntry).toBeNull();
      expect(stats.hitRate).toBe(0);
      expect(stats.estimatedMemoryBytes).toBe(0);
    });
  });

  describe('calculateHitRate', () => {
    it('should return 0 when total is 0', () => {
      expect(calculateHitRate(0, 0)).toBe(0);
    });

    it('should calculate correct hit rate', () => {
      expect(calculateHitRate(80, 20)).toBe(0.8);
      expect(calculateHitRate(50, 50)).toBe(0.5);
      expect(calculateHitRate(100, 0)).toBe(1);
      expect(calculateHitRate(0, 100)).toBe(0);
    });
  });
});
