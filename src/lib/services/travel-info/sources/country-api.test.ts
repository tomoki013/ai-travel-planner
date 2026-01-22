import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCountryApiSource } from './country-api';

describe('CountryApiSource', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should fetch country data successfully', async () => {
    const source = createCountryApiSource();
    const mockResponseData = [{
      name: { common: 'Japan', official: 'Japan' },
      currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
      languages: { jpn: 'Japanese' },
      timezones: ['UTC+09:00'],
      region: 'Asia',
      subregion: 'Eastern Asia'
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await source.fetch('Japan');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('https://restcountries.com/v3.1/name/Japan')
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.currency.code).toBe('JPY');
      expect(result.data.timezone).toBe('UTC+09:00');
      expect(result.data.timeDifference).toBe('時差なし');
    }
  });

  it('should use options.country when provided', async () => {
    const source = createCountryApiSource();
    const mockResponseData = [{
      name: { common: 'Japan', official: 'Japan' },
      currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
      languages: { jpn: 'Japanese' },
      timezones: ['UTC+09:00'],
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    // Destination is irrelevant if country option is provided
    await source.fetch('UnknownCity', { country: 'Japan' });

    // Should call with fullText=true
    expect(mockFetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/name/Japan?fullText=true'
    );
  });

  it('should calculate time difference correctly for negative offsets', async () => {
    const source = createCountryApiSource();
    const mockResponseData = [{
      name: { common: 'USA', official: 'United States' },
      currencies: { USD: { name: 'Dollar', symbol: '$' } },
      languages: { eng: 'English' },
      timezones: ['UTC-05:00'], // EST
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await source.fetch('USA');

    expect(result.success).toBe(true);
    if (result.success) {
      // UTC-5 vs UTC+9 -> Difference is -14
      expect(result.data.timeDifference).toBe('-14時間');
    }
  });

  it('should handle time difference with minutes', async () => {
    const source = createCountryApiSource();
    // India is UTC+05:30
    const mockResponseData = [{
      name: { common: 'India', official: 'Republic of India' },
      currencies: { INR: { name: 'Rupee', symbol: '₹' } },
      languages: { hin: 'Hindi', eng: 'English' },
      timezones: ['UTC+05:30'],
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await source.fetch('India');

    expect(result.success).toBe(true);
    if (result.success) {
      // UTC+5.5 vs UTC+9 -> Diff -3.5
      expect(result.data.timeDifference).toBe('-3.5時間');
    }
  });

  it('should handle negative time difference with minutes', async () => {
    const source = createCountryApiSource();
    // Newfoundland is UTC-03:30
    const mockResponseData = [{
      name: { common: 'Canada', official: 'Canada' },
      timezones: ['UTC-03:30'],
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await source.fetch('Canada');

    expect(result.success).toBe(true);
    if (result.success) {
      // UTC-3.5 vs UTC+9 -> Diff -12.5
      expect(result.data.timeDifference).toBe('-12.5時間');
    }
  });

  it('should fallback to partial search if full text fails (404)', async () => {
    const source = createCountryApiSource();
    const mockResponseData = [{
      name: { common: 'United Kingdom', official: 'United Kingdom' },
      timezones: ['UTC'],
    }];

    // First call fails (fullText)
    mockFetch.mockImplementationOnce(async () => ({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    }));

    // Second call succeeds (partial)
    mockFetch.mockImplementationOnce(async () => ({
      ok: true,
      json: async () => mockResponseData
    }));

    await source.fetch('UK', { country: 'United Kingdom' });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://restcountries.com/v3.1/name/United%20Kingdom?fullText=true');
    expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://restcountries.com/v3.1/name/United%20Kingdom');
  });

  it('should handle 404 Not Found', async () => {
    const source = createCountryApiSource();

    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await source.fetch('NonExistentCountry');

    expect(mockFetch).toHaveBeenCalled();
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('国情報が見つかりませんでした');
    }
  });

  it('should handle API errors (non-404)', async () => {
    const source = createCountryApiSource();

    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const result = await source.fetch('Japan');

    expect(mockFetch).toHaveBeenCalled();
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('API error');
    }
  });
});
