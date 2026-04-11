import {
  MinifluxAuthError,
  MinifluxBadRequestError,
  MinifluxError,
  MinifluxNotFoundError,
  MinifluxServerError,
} from "./errors";
import type {
  EntriesResponse,
  Entry,
  EntryStatus,
  GetEntriesFilters,
  User,
} from "./types";

type QueryParams = { [key: string]: string | number | boolean };

/**
 * A client for interacting with the Miniflux API.
 * @see https://miniflux.app/docs/api.html
 */
export class MinifluxClient {
  private readonly apiUrl: string;
  private readonly token: string;

  /**
   * Creates a new MinifluxClient instance.
   * @param {string} apiUrl The URL of the Miniflux API.
   *  - It should not contain slash at the end
   *  - It should contain the port (https://)
   * @param {string} token The API token to use for authentication.
   */
  constructor(apiUrl: string, token: string) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  /**
   * A generic fetch method for making requests to the Miniflux API.
   * @template T The expected response type.
   * @param {object} params The request parameters.
   * @param {string} params.path The API path to request.
   * @param {RequestInit} [params.options={}] Additional fetch options.
   * @param {QueryParams} [params.queryParams={}] Query parameters for the request.
   *
   * @returns {Promise<T>} The JSON response from the API.
   *
   * @throws {MinifluxAuthError} When authentication fails (401, 403).
   * @throws {MinifluxBadRequestError} When the request is malformed (400).
   * @throws {MinifluxNotFoundError} When the requested resource is not found (404).
   * @throws {MinifluxServerError} When the server returns an error (5xx).
   * @throws {MinifluxError} For any other non-ok response.
   */
  private async fetch<T>({
    path,
    options = {},
    queryParams = {},
  }: {
    path: string;
    options?: RequestInit;
    queryParams?: QueryParams;
  }): Promise<T> {
    const query = this.getQueryParamsString(queryParams);
    const url = `${this.apiUrl}${path}${query ? `?${query}` : ""}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...this.getAuthorizationHeaders(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
        case 403:
          throw new MinifluxAuthError();
        case 400:
          throw new MinifluxBadRequestError();
        case 404:
          throw new MinifluxNotFoundError();
        default:
          if (response.status >= 500) {
            throw new MinifluxServerError();
          }
          throw new MinifluxError(`HTTP error! status: ${response.status}`);
      }
    }

    return response.body ? response.json() : (undefined as T);
  }

  private getQueryParamsString(queryParams: QueryParams): string {
    const urlParams = new URLSearchParams();
    Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        urlParams.append(key, String(value));
      });

    return urlParams.toString();
  }

  private getAuthorizationHeaders(): { [key: string]: string } {
    return {
      "X-Auth-Token": this.token,
    };
  }

  /**
   * Retrieves a list of entries from the Miniflux API.
   * @param {GetEntriesFilters} [filters={}] Filters to apply to the request.
   *
   * @returns {Promise<EntriesResponse>} The response from the API.
   *
   * @throws {MinifluxAuthError} When authentication fails (401, 403).
   * @throws {MinifluxBadRequestError} When the request is malformed (400).
   * @throws {MinifluxNotFoundError} When the requested resource is not found (404).
   * @throws {MinifluxServerError} When the server returns an error (5xx).
   * @throws {MinifluxError} For any other non-ok response.
   * @see https://miniflux.app/docs/api.html#get-entries
   */
  public async getEntries(
    filters: GetEntriesFilters = {},
  ): Promise<EntriesResponse> {
    return this.fetch<EntriesResponse>({
      path: "/v1/entries",
      queryParams: filters,
    });
  }

  /**
   * Retrieves a single entry from the Miniflux API.
   * @param {number} entryId The ID of the entry to retrieve.
   *
   * @returns {Promise<Entry>} The response from the API.
   *
   * @throws {MinifluxAuthError} When authentication fails (401, 403).
   * @throws {MinifluxBadRequestError} When the request is malformed (400).
   * @throws {MinifluxNotFoundError} When the requested resource is not found (404).
   * @throws {MinifluxServerError} When the server returns an error (5xx).
   * @throws {MinifluxError} For any other non-ok response.
   * @see https://miniflux.app/docs/api.html#endpoint-get-entry
   */
  public async getEntry(entryId: number): Promise<Entry> {
    return this.fetch<Entry>({
      path: `/v1/entries/${entryId}`,
    });
  }

  /**
   * Retrieves the current user's information from the Miniflux API.
   *
   * @returns {Promise<User>} The current user's information.
   *
   * @throws {MinifluxAuthError} When authentication fails (401, 403).
   * @throws {MinifluxBadRequestError} When the request is malformed (400).
   * @throws {MinifluxNotFoundError} When the requested resource is not found (404).
   * @throws {MinifluxServerError} When the server returns an error (5xx).
   * @throws {MinifluxError} For any other non-ok response.
   * @see https://miniflux.app/docs/api.html#endpoint-me
   */
  public async getCurrentUser(): Promise<User> {
    return this.fetch<User>({ path: "/v1/me" });
  }

  /**
   * Change the status of an specific entry.
   *
   * @returns {Promise<void>}
   *
   * @throws {MinifluxAuthError} When authentication fails (401, 403).
   * @throws {MinifluxBadRequestError} When the request is malformed (400).
   * @throws {MinifluxNotFoundError} When the entry is not found (404).
   * @throws {MinifluxServerError} When the server returns an error (5xx).
   * @throws {MinifluxError} For any other non-ok response.
   * @see https://miniflux.app/docs/api.html#endpoint-update-entry
   */
  public async changeEntryStatus(
    entryId: number,
    status: EntryStatus,
  ): Promise<void> {
    await this.fetch<void>({
      path: "/v1/entries",
      options: {
        method: "PUT",
        body: JSON.stringify({ entry_ids: [entryId], status }),
      },
    });
  }
}
