
import type { EntriesResponse } from './types';

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

  public async getEntries(): Promise<EntriesResponse> {
    return this.fetch<EntriesResponse>('/v1/entries');
  }
}
