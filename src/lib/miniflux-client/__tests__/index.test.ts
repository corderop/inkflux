
import { describe, it, expect, vi } from 'vitest';
import { MinifluxClient } from '..';
import { mockEntries } from './mocks';

describe('MinifluxClient', () => {
  it('should be defined', () => {
    const client = new MinifluxClient('https://example.com', 'testuser', 'testpassword');
    expect(client).toBeDefined();
  });

  it('should fetch entries', async () => {
    const client = new MinifluxClient('https://example.com', 'testuser', 'testpassword');
    const fetchSpy = vi.spyOn(client as any, 'fetch').mockResolvedValue(mockEntries);

    const entries = await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith('/v1/entries');
    expect(entries).toEqual(mockEntries);
  });
});
