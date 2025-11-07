
import { describe, it, expect, vi } from 'vitest';
import { MinifluxClient } from '..';
import { mockEntries } from './mocks';

describe('MinifluxClient', () => {
  it('should be defined', () => {
    const client = new MinifluxClient('https://example.com', 'test-token');
    expect(client).toBeDefined();
  });

  it('should fetch entries', async () => {
    const client = new MinifluxClient('https://example.com', 'test-token');
    const fetchSpy = vi.spyOn(client as any, 'fetch').mockResolvedValue(mockEntries);

    const entries = await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith('/v1/entries');
    expect(entries).toEqual(mockEntries);
  });

  it('should fetch entries with filters', async () => {
    const client = new MinifluxClient('https://example.com', 'test-token');
    const fetchSpy = vi.spyOn(client as any, 'fetch').mockResolvedValue(mockEntries);

    const entries = await client.getEntries({
      status: 'unread',
      limit: 10,
      offset: 20,
    });

    expect(fetchSpy).toHaveBeenCalledWith('/v1/entries?status=unread&limit=10&offset=20');
    expect(entries).toEqual(mockEntries);
  });
});
