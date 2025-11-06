
import { Buffer } from 'buffer';
import type { EntriesResponse } from './types';

export class MinifluxClient {
  private readonly apiUrl: string;
  private readonly username: string;
  private readonly password: string;

  constructor(apiUrl: string, username: string, password: string) {
    this.apiUrl = apiUrl;
    this.username = username;
    this.password = password;
  }

  private getAuthorizationHeader(): string {
    return `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    console.log(this.getAuthorizationHeader())
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': this.getAuthorizationHeader(),
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public async getEntries(): Promise<EntriesResponse> {
    return this.fetch<EntriesResponse>('/v1/entries');
  }
}
