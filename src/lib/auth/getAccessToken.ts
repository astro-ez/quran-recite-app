import { endpoints } from "@/lib/api/endpoints";

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const authToken = Buffer.from(
    process.env.NEXT_CLIENT_ID + ":" + process.env.NEXT_CLIENT_SECRET
  ).toString("base64");

  const response = await fetch(
    process.env.NEXT_PUBLIC_AUTH_API_URL + endpoints.auth.login,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authToken}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "content",
      }),
    }
  );

  const { access_token, expires_in } = await response.json();

  cachedToken = {
    token: access_token,
    expiresAt: Date.now() + (expires_in - 60) * 1000,
  };

  return access_token;
}
