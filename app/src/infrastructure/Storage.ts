export class Storage {
  public static clear() {
    localStorage.clear();
  }

  public static storeSessionToken(sessionToken: string) {
    localStorage.setItem(this.Keys.sessionToken, sessionToken);
  }

  public static restoreSessionToken(): string | undefined {
    return localStorage.getItem(this.Keys.sessionToken) || undefined;
  }

  private static Keys = {
    sessionToken: "session_token",
  };
}
