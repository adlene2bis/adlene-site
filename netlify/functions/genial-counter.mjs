import { getStore } from "@netlify/blobs";

const store = getStore({
  name: "adlene-genial-counter",
  region: "eu-central-1",
  consistency: "strong",
});
const stateKey = "counter-state";
const cookieName = "adlene_genial_visitor";
const cookieLifetime = 60 * 60 * 24 * 365;

function jsonResponse(payload, status, cookie) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  };
  if (cookie) headers["set-cookie"] = cookie;
  return new Response(JSON.stringify(payload), { status, headers });
}

function readVisitorCookie(request) {
  const cookies = request.headers.get("cookie") || "";
  const item = cookies.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(cookieName + "="));
  const value = item ? item.slice(cookieName.length + 1) : "";
  return /^[a-f0-9]{64}$/.test(value) ? value : "";
}

function createCookie(value, secure) {
  return cookieName + "=" + value
    + "; Max-Age=" + cookieLifetime
    + "; Path=/; HttpOnly; SameSite=Lax"
    + (secure ? "; Secure" : "");
}

function emptyState() {
  return { count: 0, voters: {} };
}

export default async function handler(request) {
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).origin !== requestUrl.origin) {
    return jsonResponse({ error: "Origin not allowed" }, 403);
  }

  let visitorId = readVisitorCookie(request);
  let cookie = null;
  if (!visitorId) {
    visitorId = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
    cookie = createCookie(visitorId, requestUrl.protocol === "https:");
  }
  const visitorHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(visitorId),
  ).then((digest) =>
    Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(""),
  );

  try {
    const entry = await store.getWithMetadata(stateKey, {
      type: "json",
      consistency: "strong",
    });
    const state = entry?.data || emptyState();
    const alreadyVoted = Boolean(state.voters?.[visitorHash]);

    if (method === "GET") {
      return jsonResponse(
        { count: Number(state.count) || 0, voted: alreadyVoted },
        200,
        cookie,
      );
    }
    if (alreadyVoted) {
      return jsonResponse({ count: Number(state.count) || 0, voted: true, added: false }, 200, cookie);
    }

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const current = await store.getWithMetadata(stateKey, {
        type: "json",
        consistency: "strong",
      });
      const currentState = current?.data || emptyState();
      if (currentState.voters?.[visitorHash]) {
        return jsonResponse(
          { count: Number(currentState.count) || 0, voted: true, added: false },
          200,
          cookie,
        );
      }

      const nextState = {
        count: (Number(currentState.count) || 0) + 1,
        voters: { ...(currentState.voters || {}), [visitorHash]: true },
      };
      const result = current
        ? await store.setJSON(stateKey, nextState, { onlyIfMatch: current.etag })
        : await store.setJSON(stateKey, nextState, { onlyIfNew: true });

      if (result.modified) {
        return jsonResponse({ count: nextState.count, voted: true, added: true }, 200, cookie);
      }
    }
    return jsonResponse({ error: "Counter is busy; retry shortly" }, 503, cookie);
  } catch (error) {
    console.error("Shared counter error", error);
    return jsonResponse({ error: "Counter unavailable" }, 503, cookie);
  }
}

export const config = {
  path: "/api/genial-counter",
};
