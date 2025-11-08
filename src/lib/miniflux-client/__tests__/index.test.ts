import { describe, it, expect, vi } from 'vitest';
import { MinifluxClient } from '..';
import {
  MinifluxAuthError,
  MinifluxBadRequestError,
  MinifluxError,
  MinifluxNotFoundError,
  MinifluxServerError,
} from '../errors';
import { mockEntries } from './mocks';

function mockFetch({ statusCode, json }: { statusCode: number, json: object }) {
  return vi.spyOn(global, 'fetch').mockImplementationOnce(
    () => Promise.resolve({
      ok: statusCode >= 200 && statusCode < 300,
      status: statusCode,
      json: async () => json
    } as Response)
  )
}

describe('MinifluxClient', () => {
  const fakeToken = "ZmFzZGZhZGZ3ZXIzNDI0MzI0MjM0MjM0MjM0MjM"
  const fakeUrl = "https://example.com"

  it('should add the X-Auth-Token header for authentication', async () => {
    const fetchSpy = mockFetch({
      statusCode: 200,
      json: mockEntries
    });

    const client = new MinifluxClient(fakeUrl, fakeToken);
    await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Auth-Token': fakeToken
        })
      })
    );
  });

  it('should add the application/json Content-Type header', async () => {
    const fetchSpy = mockFetch({
      statusCode: 200,
      json: mockEntries
    });

    const client = new MinifluxClient(fakeUrl, fakeToken);
    await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': "application/json"
        })
      })
    );
  });

  describe("getEntries", () => {
    it("should call the proper URL", async () => {
      const fetchSpy = mockFetch({
        statusCode: 200,
        json: mockEntries
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.getEntries();

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/entries`,
        expect.any(Object),
      );
    })

    it("should return what's returned by the API", async () => {
      mockFetch({
        statusCode: 200,
        json: mockEntries
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      const entries = await client.getEntries();

      expect(entries).toBe(mockEntries)
    })

    it("should include query params for filters", async () => {
      const fetchSpy = mockFetch({
        statusCode: 200,
        json: mockEntries
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.getEntries({
        status: "read",
        offset: 1,
        limit: 10,
        order: 'status',
        direction: 'asc'
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/entries?status=read&offset=1&limit=10&order=status&direction=asc`,
        expect.any(Object),
      );
    })
  })

  describe("Error Handling", () => {
    it('should throw MinifluxAuthError on 401 status code', async () => {
      mockFetch({ statusCode: 401, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxAuthError);
    });

    it('should throw MinifluxAuthError on 403 status code', async () => {
      mockFetch({ statusCode: 403, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxAuthError);
    });

    it('should throw MinifluxBadRequestError on 400 status code', async () => {
      mockFetch({ statusCode: 400, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxBadRequestError);
    });

    it('should throw MinifluxNotFoundError on 404 status code', async () => {
      mockFetch({ statusCode: 404, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxNotFoundError);
    });

    it('should throw MinifluxServerError on 500 status code', async () => {
      mockFetch({ statusCode: 500, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxServerError);
    });

    it('should throw MinifluxError for other non-ok status codes', async () => {
      mockFetch({ statusCode: 418, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxError);
    });
  });
});