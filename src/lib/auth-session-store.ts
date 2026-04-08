export interface AuthSession {
  status: "pending" | "authenticated";
  server?: string;
  apiToken?: string;
  expiresAt: number;
}

class AuthSessionStore {
  private sessions = new Map<string, AuthSession>();

  constructor() {
    // Cleanup expired sessions every minute
    setInterval(() => {
      const now = Date.now();
      for (const [id, session] of this.sessions.entries()) {
        if (session.expiresAt < now) {
          this.sessions.delete(id);
        }
      }
    }, 60000);
  }

  createSession(id: string): void {
    // 5 minutes expiration
    const expiresAt = Date.now() + 5 * 60 * 1000;
    this.sessions.set(id, { status: "pending", expiresAt });
  }

  getSession(id: string): AuthSession | undefined {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    if (session.expiresAt < Date.now()) {
      this.sessions.delete(id);
      return undefined;
    }
    return session;
  }

  authenticateSession(id: string, server: string, apiToken: string): boolean {
    const session = this.getSession(id);
    if (!session) return false;

    session.status = "authenticated";
    session.server = server;
    session.apiToken = apiToken;
    return true;
  }

  deleteSession(id: string): void {
    this.sessions.delete(id);
  }
}

export const authSessionStore = new AuthSessionStore();
