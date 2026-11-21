const MAX_BODY_BYTES = 16384;
const MAX_ITEMS = 128;
const MAX_QUANTITY = 99;
const DISH_NAME = /^\p{Script=Han}{1,24}$/u;

async function readOrder(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing order");
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("Order too large");
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}

function validItems(items) {
  if (!Array.isArray(items) || !items.length || items.length > MAX_ITEMS) return false;
  const names = new Set();
  return items.every(item => {
    if (!item || typeof item.name !== "string" || !DISH_NAME.test(item.name) ||
        !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY ||
        names.has(item.name)) return false;
    names.add(item.name);
    return true;
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (origin !== env.MENU_ORIGIN) return new Response(null, { status: 403 });
    const headers = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
      "Vary": "Origin",
    };
    const reply = (status, ok) => Response.json({ ok }, { status, headers });

    if (new URL(request.url).pathname !== "/order") return reply(404, false);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return reply(405, false);
    if (request.headers.get("Content-Type")?.split(";")[0] !== "application/json") return reply(415, false);
    if (!/^SCT[A-Za-z0-9]+$/.test(env.SERVERCHAN_SENDKEY || "")) return reply(503, false);

    let items;
    try {
      ({ items } = await readOrder(request));
    } catch {
      return reply(400, false);
    }
    if (!validItems(items)) return reply(400, false);
    const { success } = await env.ORDER_RATE_LIMIT.limit({ key: "wechat-orders" });
    if (!success) return reply(429, false);

    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    const body = new URLSearchParams({
      title: "香香公主点菜了",
      desp: [
        "新订单 · " + items.length + " 道菜 · 共 " + total + " 份",
        "",
        ...items.map(item => "- " + item.name + " × " + item.quantity),
      ].join("\n"),
    });

    try {
      const response = await fetch("https://sctapi.ftqq.com/" + env.SERVERCHAN_SENDKEY + ".send", {
        method: "POST",
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok || (await response.json()).code !== 0) return reply(502, false);
      return reply(200, true);
    } catch {
      return reply(502, false);
    }
  },
};
