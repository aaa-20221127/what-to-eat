const dishesByName = new Map(ALL_DISHES.map(dish => [dish.name, dish]));
const categoryButtons = document.getElementById("order-categories");
const dishGrid = document.getElementById("dish-grid");
const dishSearch = document.getElementById("dish-search");
const menuCount = document.getElementById("menu-count");
const cartToggle = document.getElementById("cart-toggle");
const cartCount = document.getElementById("cart-count");
const checkout = document.getElementById("checkout");
const cartSheet = document.getElementById("cart-sheet");
const cartLines = document.getElementById("cart-lines");
const cartSummary = document.getElementById("cart-summary");
const confirmOrder = document.getElementById("confirm-order");
const receipt = document.getElementById("receipt");
const receiptTitle = document.getElementById("receipt-title");
const receiptMeta = document.getElementById("receipt-meta");
const receiptLines = document.getElementById("receipt-lines");
const receiptNote = document.getElementById("receipt-note");
const orderStatus = document.getElementById("order-status");
const CART_KEY = "what-to-eat-cart";
const MAX_QUANTITY = 99;

const cart = new Map();
const dishCards = new Map();
let category = "全部";
let returnFocus = checkout;
let submitting = false;

function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(saved)) return;
    for (const entry of saved) {
      if (!Array.isArray(entry)) continue;
      const [name, quantity] = entry;
      if (dishesByName.has(name) && Number.isInteger(quantity) && quantity > 0 && quantity <= MAX_QUANTITY) {
        cart.set(name, quantity);
      }
    }
  } catch {
    // The cart still works when browser storage is unavailable.
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify([...cart]));
  } catch {
    // The on-screen cart is authoritative for this page.
  }
}

function makeButton(label, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  return button;
}

function makeImage(name, lazy = false) {
  const img = document.createElement("img");
  img.alt = "";
  img.width = 400;
  img.height = 400;
  img.decoding = "async";
  if (lazy) img.loading = "lazy";
  img.src = "./photos/" + DISH_PHOTOS.get(name) + ".webp";
  return img;
}

function quantityButton(name, delta, disabled = false) {
  const button = makeButton(delta > 0 ? "+" : "−", "");
  button.setAttribute("aria-label", (delta > 0 ? "增加" : "减少") + "一份" + name);
  button.dataset.quantityAction = String(delta);
  button.disabled = disabled || submitting;
  button.addEventListener("click", () => {
    const restore = document.activeElement === button;
    updateQuantity(name, delta);
    if (!restore) return;
    const host = cartSheet.open ? cartLines : dishCards.get(name)?.controls;
    const selector = '[data-quantity-action="' + delta + '"]';
    const row = cartSheet.open ? [...host.children].find(line => line.dataset.dish === name) : host;
    const next = row?.querySelector(selector + ":not(:disabled)") ||
      row?.querySelector("[data-quantity-action]:not(:disabled)") ||
      (cartSheet.open ? cartSheet.querySelector("[data-close]") : null);
    next?.focus({ preventScroll: true });
  });
  return button;
}

function makeStepper(name, quantity) {
  const stepper = document.createElement("div");
  stepper.className = "stepper";
  const count = document.createElement("output");
  count.value = String(quantity);
  count.setAttribute("aria-label", name + "已选份数");
  count.setAttribute("aria-live", "off");
  stepper.append(quantityButton(name, -1), count, quantityButton(name, 1, quantity >= MAX_QUANTITY));
  return stepper;
}

function renderCardQuantity(name) {
  const item = dishCards.get(name);
  if (!item) return;
  const quantity = cart.get(name) || 0;
  item.card.classList.toggle("is-selected", quantity > 0);
  if (quantity > 0) {
    item.controls.replaceChildren(makeStepper(name, quantity));
    return;
  }
  const add = quantityButton(name, 1);
  add.className = "add";
  add.textContent = "＋ 选择";
  add.setAttribute("aria-label", "选择" + name);
  item.controls.replaceChildren(add);
}

function makeDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish";
  const info = document.createElement("div");
  info.className = "dish-info";
  const heading = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = dish.name;
  const tags = document.createElement("p");
  tags.textContent = dish.categories.join(" · ");
  heading.append(title, tags);
  const controls = document.createElement("div");
  controls.className = "dish-controls";
  info.append(heading, controls);
  card.append(makeImage(dish.name, true), info);
  dishCards.set(dish.name, { card, controls });
  renderCardQuantity(dish.name);
  return card;
}

function renderDishes() {
  const query = dishSearch.value.trim().toLowerCase();
  const matches = ALL_DISHES.filter(dish =>
    (category === "全部" || dish.categories.includes(category)) &&
    dish.name.toLowerCase().includes(query)
  );
  menuCount.textContent = matches.length + " 道菜";
  dishCards.clear();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "这个分类里没有找到这道菜。试试其他菜名或分类。";
    dishGrid.replaceChildren(empty);
    return;
  }
  dishGrid.replaceChildren(...matches.map(makeDishCard));
}

function renderCategories() {
  for (const filter of FILTERS) {
    const button = makeButton(filter.name, "category");
    button.setAttribute("aria-pressed", String(filter.name === category));
    button.addEventListener("click", () => {
      category = filter.name;
      categoryButtons.querySelector('[aria-pressed="true"]')?.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-pressed", "true");
      renderDishes();
      if (categoryButtons.getBoundingClientRect().top <= 15) {
        document.getElementById("menu").scrollIntoView();
      }
    });
    categoryButtons.append(button);
  }
}

function totalPortions() {
  return [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
}

function renderCart() {
  const total = totalPortions();
  cartCount.textContent = total ? cart.size + " 道菜 · " + total + " 份" : "还未选菜";
  checkout.disabled = !total;
  if (!cartSheet.open) return;

  confirmOrder.disabled = submitting || !total;
  confirmOrder.textContent = submitting ? "通知发送中…" : ORDER_NOTIFICATION_ENDPOINT ? "确认下单" : "确认试单";
  cartSheet.querySelector("[data-close]").disabled = submitting;
  cartSummary.textContent = total ? "共 " + total + " 份" : "";
  if (!total) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "点一道想吃的菜，它就会出现在这里。";
    cartLines.replaceChildren(empty);
    return;
  }
  cartLines.replaceChildren(...[...cart].map(([name, quantity]) => {
    const line = document.createElement("div");
    line.className = "cart-line";
    line.dataset.dish = name;
    const label = document.createElement("strong");
    label.textContent = name;
    line.append(makeImage(name), label, makeStepper(name, quantity));
    return line;
  }));
}

function updateQuantity(name, delta) {
  if (submitting) return;
  const next = Math.min(MAX_QUANTITY, (cart.get(name) || 0) + delta);
  if (next > 0) cart.set(name, next);
  else cart.delete(name);
  saveCart();
  renderCardQuantity(name);
  renderCart();
}

function openCart(event) {
  returnFocus = event.currentTarget;
  cartSheet.showModal();
  orderStatus.hidden = Boolean(ORDER_NOTIFICATION_ENDPOINT);
  orderStatus.textContent = ORDER_NOTIFICATION_ENDPOINT ? "" : "微信通知待接通，可先体验试单。";
  renderCart();
}

async function placeOrder() {
  if (!cartSheet.open || !cart.size || submitting) return;
  const endpoint = ORDER_NOTIFICATION_ENDPOINT;
  const items = [...cart].map(([name, quantity]) => ({ name, quantity }));
  if (endpoint) {
    submitting = true;
    orderStatus.hidden = true;
    renderCart();
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok || (await response.json()).ok !== true) throw new Error("Notification failed");
    } catch {
      orderStatus.textContent = "暂时无法确认微信通知是否发出。菜品已保留，请先查看微信再决定是否重试。";
      orderStatus.hidden = false;
      return;
    } finally {
      submitting = false;
      renderCart();
    }
  }
  const now = new Date();
  receiptTitle.textContent = endpoint ? "下单成功" : "试单完成";
  receiptNote.textContent = endpoint ? "微信通知已提交" : "试单仅在当前页面生成，微信通知待接通。";
  const time = new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "short" }).format(now);
  receiptMeta.textContent = time + " · " + cart.size + " 道菜 · 共 " + totalPortions() + " 份";
  receiptLines.replaceChildren(...[...cart].map(([name, quantity]) => {
    const line = document.createElement("li");
    const dish = document.createElement("span");
    const count = document.createElement("span");
    dish.textContent = name;
    count.textContent = "× " + quantity;
    line.append(dish, count);
    return line;
  }));

  const orderedNames = [...cart.keys()];
  cart.clear();
  saveCart();
  cartSheet.close();
  for (const name of orderedNames) renderCardQuantity(name);
  renderCart();
  receipt.showModal();
}

restoreCart();
renderCategories();
renderDishes();
renderCart();
dishSearch.addEventListener("input", renderDishes);
cartToggle.addEventListener("click", openCart);
checkout.addEventListener("click", openCart);
confirmOrder.addEventListener("click", placeOrder);
cartSheet.addEventListener("cancel", event => {
  if (submitting) event.preventDefault();
});

for (const dialog of [cartSheet, receipt]) {
  dialog.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => dialog.close());
  });
  dialog.addEventListener("close", () => {
    if (cartSheet.open || receipt.open) return;
    (returnFocus.disabled ? cartToggle : returnFocus).focus({ preventScroll: true });
  });
}
