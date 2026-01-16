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

  describe('危険レベル抽出（外務省オープンデータ仕様）', () => {
    it('riskLevel1〜4が全てNの場合はレベル0を返す', async () => {
      // 外務省オープンデータ仕様に基づくXML（全てN=危険情報なし）
      const safeXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <area>
            <cd>01</cd>
            <name>アジア</name>
          </area>
          <country areaCd="01">
            <cd>0066</cd>
            <name>タイ</name>
          </country>
          <riskLevel4>N</riskLevel4>
          <riskLevel3>N</riskLevel3>
          <riskLevel2>N</riskLevel2>
          <riskLevel1>N</riskLevel1>
          <infectionLevel4>N</infectionLevel4>
          <infectionLevel3>N</infectionLevel3>
          <infectionLevel2>N</infectionLevel2>
          <infectionLevel1>N</infectionLevel1>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(safeXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(0);
      expect(result.data.dangerLevelDescription).toBe('危険情報なし');
    });

    it('riskLevel1がYの場合はレベル1を返す', async () => {
      const cautionXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel4>N</riskLevel4>
          <riskLevel3>N</riskLevel3>
          <riskLevel2>N</riskLevel2>
          <riskLevel1>Y</riskLevel1>
          <riskLead>一部地域で十分注意が必要です。</riskLead>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(cautionXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(1);
      expect(result.data.dangerLevelDescription).toBe('十分注意してください');
    });

    it('riskLevel2がYの場合はレベル2を返す', async () => {
      const avoidNonEssentialXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel4>N</riskLevel4>
          <riskLevel3>N</riskLevel3>
          <riskLevel2>Y</riskLevel2>
          <riskLevel1>Y</riskLevel1>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(avoidNonEssentialXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(2);
      expect(result.data.dangerLevelDescription).toBe('不要不急の渡航は止めてください');
    });

    it('riskLevel3がYの場合はレベル3を返す', async () => {
      const doNotTravelXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel4>N</riskLevel4>
          <riskLevel3>Y</riskLevel3>
          <riskLevel2>Y</riskLevel2>
          <riskLevel1>Y</riskLevel1>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(doNotTravelXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(3);
      expect(result.data.dangerLevelDescription).toBe('渡航は止めてください（渡航中止勧告）');
    });

    it('riskLevel4がYの場合はレベル4を返す', async () => {
      const evacuateXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel4>Y</riskLevel4>
          <riskLevel3>Y</riskLevel3>
          <riskLevel2>Y</riskLevel2>
          <riskLevel1>Y</riskLevel1>
          <riskLead>退避勧告が発出されています。</riskLead>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(evacuateXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(4);
      expect(result.data.dangerLevelDescription).toBe('退避してください（退避勧告）');
    });

    it('最も高い危険レベルを返す（レベル4優先）', async () => {
      // 複数のレベルがYの場合、最も高いレベルを返す
      const mixedXml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel4>Y</riskLevel4>
          <riskLevel3>N</riskLevel3>
          <riskLevel2>Y</riskLevel2>
          <riskLevel1>N</riskLevel1>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(mixedXml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(4);
    });
  });

  describe('警告情報抽出', () => {
    it('riskLeadから警告を抽出する', async () => {
      const xml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel1>Y</riskLevel1>
          <riskLead>首都バンコク及びその周辺地域では、一般犯罪に注意してください。</riskLead>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(xml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.warnings).toContain('首都バンコク及びその周辺地域では、一般犯罪に注意してください。');
    });

    it('広域・スポット情報のタイトルを抽出する', async () => {
      const xml = `
        <opendata dataType="A" odType="04" lastModified="2025/01/16 00:00:00">
          <riskLevel1>Y</riskLevel1>
          <wideareaSpot>
            <title>タイ：デモ・集会に関する注意喚起</title>
            <lead>バンコク市内でデモが予定されています。</lead>
          </wideareaSpot>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(xml),
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.warnings).toContain('タイ：デモ・集会に関する注意喚起');
    });
  });

  describe('デフォルト安全情報', () => {
    it('未対応の目的地では危険レベル0のデフォルト情報を返す', async () => {
      const result = await source.fetch('未知の国');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(0);
      expect(result.data.dangerLevelDescription).toBe('危険情報なし');
      expect(result.source.sourceName).toContain('デフォルト');
    });

    it('404エラーの場合は危険レベル0のデフォルト情報を返す', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const result = await source.fetch('タイ');

      if (!result.success) {
        throw new Error('Fetch failed');
      }

      expect(result.data.dangerLevel).toBe(0);
    });
  });

  describe('国コード解決', () => {
    it('都市名から国コードを解決できる', async () => {
      const xml = `
        <opendata dataType="A" odType="04">
          <riskLevel1>Y</riskLevel1>
        </opendata>
      `;

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(xml),
      });

      await source.fetch('バンコク');

      // バンコク → タイ (0066) のURLでfetchが呼ばれることを確認
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('0066A.xml'),
        expect.any(Object)
      );
    });
  });
});
