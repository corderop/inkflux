import { describe, it, expect, vi, afterEach } from "vitest";
import { MinifluxClient } from "..";
import {
  MinifluxAuthError,
  MinifluxBadRequestError,
  MinifluxError,
  MinifluxNotFoundError,
  MinifluxServerError,
} from "../errors";
import { mockEntries, mockUser } from "./mocks";

const createMockStream = (data: object): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  return new ReadableStream({
    start(controller) {
      controller.enqueue(encodedData);
      controller.close();
    },
  });
};

function mockFetch({
  statusCode,
  json,
}: {
  statusCode: number;
  json: object | null;
}) {
  const mockedJsonFunctionOnValidJson = async () => json;
  const mockedJsonFunctionOnInvalidJson = async () => {
    throw new Error("Invalid JSON");
  };

  return vi.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      ok: statusCode >= 200 && statusCode < 300,
      status: statusCode,
      body: json ? createMockStream(json) : null,
      json: json
        ? mockedJsonFunctionOnValidJson
        : mockedJsonFunctionOnInvalidJson,
    } as Response),
  );
}

describe("MinifluxClient", () => {
  const fakeToken = "ZmFzZGZhZGZ3ZXIzNDI0MzI0MjM0MjM0MjM0MjM";
  const fakeUrl = "https://example.com";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should add the X-Auth-Token header for authentication", async () => {
    const fetchSpy = mockFetch({
      statusCode: 200,
      json: mockEntries,
    });

    const client = new MinifluxClient(fakeUrl, fakeToken);
    await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-Auth-Token": fakeToken,
        }),
      }),
    );
  });

  it("should add the application/json Content-Type header", async () => {
    const fetchSpy = mockFetch({
      statusCode: 200,
      json: mockEntries,
    });

    const client = new MinifluxClient(fakeUrl, fakeToken);
    await client.getEntries();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  describe("getEntries", () => {
    it("should call the proper URL", async () => {
      const fetchSpy = mockFetch({
        statusCode: 200,
        json: mockEntries,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.getEntries();

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/entries`,
        expect.any(Object),
      );
    });

    it("should return what's returned by the API", async () => {
      mockFetch({
        statusCode: 200,
        json: mockEntries,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      const entries = await client.getEntries();

      expect(entries).toBe(mockEntries);
    });

    it("should include query params for filters", async () => {
      const fetchSpy = mockFetch({
        statusCode: 200,
        json: mockEntries,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.getEntries({
        status: "read",
        offset: 1,
        limit: 10,
        order: "status",
        direction: "asc",
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/entries?status=read&offset=1&limit=10&order=status&direction=asc`,
        expect.any(Object),
      );
    });
  });

  describe("changeEntryStatus", () => {
    it("should call the proper URL", async () => {
      const fetchSpy = mockFetch({
        statusCode: 204,
        json: null,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.changeEntryStatus(123, "read");

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/entries`,
        expect.any(Object),
      );
    });

    it("should use put PUT", async () => {
      const fetchSpy = mockFetch({
        statusCode: 204,
        json: null,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.changeEntryStatus(123, "read");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PUT",
        }),
      );
    });

    it("should send the proper body", async () => {
      const fetchSpy = mockFetch({
        statusCode: 204,
        json: null,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.changeEntryStatus(123, "read");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ entry_ids: [123], status: "read" }),
        }),
      );
    });
  });

  describe("Error Handling", () => {
    it("should throw MinifluxAuthError on 401 status code", async () => {
      mockFetch({ statusCode: 401, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxAuthError);
    });

    it("should throw MinifluxAuthError on 403 status code", async () => {
      mockFetch({ statusCode: 403, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxAuthError);
    });

    it("should throw MinifluxBadRequestError on 400 status code", async () => {
      mockFetch({ statusCode: 400, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(
        MinifluxBadRequestError,
      );
    });

    it("should throw MinifluxNotFoundError on 404 status code", async () => {
      mockFetch({ statusCode: 404, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxNotFoundError);
    });

    it("should throw MinifluxServerError on 500 status code", async () => {
      mockFetch({ statusCode: 500, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxServerError);
    });

    it("should throw MinifluxError for other non-ok status codes", async () => {
      mockFetch({ statusCode: 418, json: {} });
      const client = new MinifluxClient(fakeUrl, fakeToken);
      await expect(client.getEntries()).rejects.toThrow(MinifluxError);
    });
  });

  describe("getCurrentUser", () => {
    it("should call the proper URL", async () => {
      const fetchSpy = mockFetch({
        statusCode: 200,
        json: mockUser,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      await client.getCurrentUser();

      expect(fetchSpy).toHaveBeenCalledWith(
        `${fakeUrl}/v1/me`,
        expect.any(Object),
      );
    });

    it("should return proper data", async () => {
      mockFetch({
        statusCode: 200,
        json: mockUser,
      });

      const client = new MinifluxClient(fakeUrl, fakeToken);
      const user = await client.getCurrentUser();

      expect(user).toBe(mockUser);
    });
  });
});
