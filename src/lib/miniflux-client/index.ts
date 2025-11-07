
import type { EntriesResponse, GetEntriesFilters } from './types';

export class MinifluxClient {
  private readonly apiUrl: string;
  private readonly token: string;

  constructor(apiUrl: string, token: string) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  private getAuthorizationHeaders(): { [key: string]: string } {
    return {
      'X-Auth-Token': this.token
    }
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...this.getAuthorizationHeaders(),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public async getEntries(filters: GetEntriesFilters = {}): Promise<EntriesResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).filter(([_, value]) => value !== undefined).forEach(([key, value]) => {
      queryParams.append(key, String(value))
    })

    const queryString = queryParams.toString();
    const path = queryString ? `/v1/entries?${queryString}` : '/v1/entries';
    return this.fetch<EntriesResponse>(path);
  }
}
