import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MofaApiSource } from './mofa-api';

// Mock fetch
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('MofaApiSource', () => {
  let source: MofaApiSource;

  beforeEach(() => {
    source = new MofaApiSource();
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return dangerLevel 0 when no danger level is found in XML', async () => {
    // Mock successful XML response with no danger level info
    // This represents a safe country where MOFA returns data but no specific danger warning
    const safeXml = `
      <country>
        <code>0001</code>
        <name>アメリカ</name>
        <info>
          Some general info but no danger level keywords.
          Have a nice trip.
        </info>
      </country>
    `;

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(safeXml),
    });

    const result = await source.fetch('アメリカ');

    if (!result.success) {
      throw new Error('Fetch failed');
    }

    // Expect Level 0 (Safe)
    expect(result.data.dangerLevel).toBe(0);
  });

  it('should return failure for unknown destination', async () => {
    // Unknown destination that is not in the map
    const result = await source.fetch('未知の国');

    expect(result.success).toBe(false);
    expect(result.error).toContain('Unknown destination');
  });

  it('should return failure for network error', async () => {
    // Known destination but network fails
    fetchMock.mockRejectedValue(new Error('Network error'));

    const result = await source.fetch('アメリカ');

    expect(result.success).toBe(false);
    expect(result.error).toContain('Failed to fetch MOFA data');
  });

  it('should return failure for 404', async () => {
    // Known destination but API returns 404 (e.g. data missing)
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await source.fetch('アメリカ');

    expect(result.success).toBe(false);
    // 404 case returns null from fetchFromOpenData, so fetch returns "Safety info not found"
    expect(result.error).toContain('Safety info not found');
  });
});
