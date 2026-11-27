const SUPABASE_CONFIG = {
  url: "https://qousjrvywsizjkyjwjfi.supabase.co/rest/v1/",
  anonKey: "sb_publishable_roX4o-dnsY3frXVqLfXEsQ_42Y_EYiL",
  table: "menu_items",
  settingsTable: "store_settings",
  categoriesTable: "categories"
};

function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(u) {
  return /^https?:\/\//i.test(u || "") ? esc(u) : "";
}

const DEFAULT_SETTINGS = {
  name: "Oman Quick Burger",
  nameAr: "عمان كويك برجر",
  whatsappNumber: "96890000000",
  currency: "OMR",
  decimals: 3
};

const APP_META = {
  itemsPerPage: 24,
  categoriesKey: "oman_quick_burger_categories_v1",
  settingsKey: "oman_quick_burger_settings_v1",
  langKey: "oman_quick_burger_lang_v1"
};

const DEFAULT_CATEGORIES = [
  { id: "all", en: "All Items", ar: "جميع الأصناف", custom: false },
  { id: "burger", en: "Burger", ar: "برجر", custom: false },
  { id: "combo", en: "Combo", ar: "كومبو", custom: false },
  { id: "pizza", en: "Pizza", ar: "بيتزا", custom: false },
  { id: "arabic", en: "Arabic", ar: "راب عربي", custom: false },
  { id: "club", en: "Club", ar: "كلوب ساندويتش", custom: false },
  { id: "snacks", en: "Snacks", ar: "سناكس", custom: false },
  { id: "juice", en: "Juice", ar: "عصير", custom: false },
  { id: "tea-coffee", en: "Tea / Coffee", ar: "شاي / قهوة", custom: false },
  { id: "platter", en: "Platter", ar: "بلاتر", custom: false }
];

const TRANSLATIONS = {
  en: {
    subtitle: "Tap + to add items and order directly on WhatsApp",
    itemsCount: n => `${n} Items`,
    searchPlaceholder: "Search items...",
    sortDefault: "Default Order",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortNameAsc: "Name: A - Z",
    stockOutTag: "Stock Out",
    addBtn: "+ Add",
    customizeBtn: "Options",
    soldOutBtn: "Sold Out",
    loadMore: rem => `Load More (${rem} remaining)`,
    noItemsFound: "No items found.",
    loadError: "Could not load the menu. Please check your connection and refresh.",
    typeDelivery: "Delivery",
    typePickup: "Pickup",
    viewOrder: "Order Now",
    cartCount: n => `${n} Items Selected`,
    customizeTitle: "Customize Item",
    variantsHeading: "Select Price / Size",
    addonsHeading: "Extra Toppings / Sauces (Optional)",
    noAddons: "No extra add-ons for this item.",
    lblItemNote: "Special Instructions",
    itemNotePlaceholder: "e.g. No onions, extra garlic sauce...",
    addToOrder: "Add to Order",
    checkoutTitle: "Complete Your Order",
    emptyCart: "Your cart is empty.",
    lblOrderType: "Order Type",
    deliveryOption: "Delivery (Free)",
    pickupOption: "Pickup (Free)",
    lblCustomerAddress: "Delivery Location *",
    customerAddressPlaceholder: "Tap 'Share Live Location'...",
    shareLocation: "📍 Share Live Location",
    gettingLocation: "Fetching live GPS location...",
    locationCaptured: "Live GPS location attached!",
    locationDenied: "Location permission denied. Please allow GPS and tap again.",
    locationUnsupported: "GPS not supported on this browser.",
    lblOrderNote: "Notes (Optional)",
    orderNotePlaceholder: "Any extra note...",
    lblSubtotal: "Subtotal",
    lblDeliveryFee: "Delivery",
    freeText: "Free",
    lblGrandTotal: "Total Bill",
    sendWhatsapp: "Send Order on WhatsApp",
    alertLocationRequired: "Please tap 'Share Live Location' to attach your location.",
    waHeader: store => `*New Order - ${store}*`,
    waType: v => `*Order Type:* ${v}`,
    waAddress: v => `*Live Location:* ${v}`,
    waNote: v => `*Note:* ${v}`,
    waItems: "*Items:*",
    waSubtotal: v => `Subtotal: ${v}`,
    waDelivery: "Delivery: Free",
    waTotal: v => `*Total Bill: ${v}*`
  },
  ar: {
    subtitle: "اضغط + لإضافة الأصناف وأرسل طلبك مباشرة عبر واتساب",
    itemsCount: n => `${n} أصناف`,
    searchPlaceholder: "ابحث عن صنف...",
    sortDefault: "الترتيب الافتراضي",
    sortPriceAsc: "السعر: من الأقل إلى الأعلى",
    sortPriceDesc: "السعر: من الأعلى إلى الأقل",
    sortNameAsc: "الاسم: أ - ي",
    stockOutTag: "نفذت الكمية",
    addBtn: "+ أضف",
    customizeBtn: "خيارات",
    soldOutBtn: "غير متوفر",
    loadMore: rem => `عرض المزيد (${rem} متبقي)`,
    noItemsFound: "لا توجد أصناف مطابقة.",
    loadError: "تعذر تحميل القائمة. تحقق من الاتصال وأعد تحميل الصفحة.",
    typeDelivery: "توصيل",
    typePickup: "استلام من الفرع",
    viewOrder: "اطلب الآن",
    cartCount: n => `${n} أصناف مختارة`,
    customizeTitle: "تخصيص الصنف",
    variantsHeading: "اختر السعر / الحجم",
    addonsHeading: "إضافات / صوص إضافي (اختياري)",
    noAddons: "لا توجد إضافات لهذا الصنف.",
    lblItemNote: "ملاحظات خاصة",
    itemNotePlaceholder: "مثال: بدون بصل، صوص ثوم إضافي...",
    addToOrder: "أضف إلى الطلب",
    checkoutTitle: "إتمام طلبك",
    emptyCart: "السلة فارغة.",
    lblOrderType: "نوع الطلب",
    deliveryOption: "توصيل (مجاني)",
    pickupOption: "استلام من الفرع (مجاني)",
    lblCustomerAddress: "الموقع المباشر *",
    customerAddressPlaceholder: "اضغط 'إرسال الموقع المباشر'...",
    shareLocation: "📍 إرسال الموقع المباشر",
    gettingLocation: "جاري تحديد الموقع عبر GPS...",
    locationCaptured: "تم إرفاق الموقع المباشر بنجاح!",
    locationDenied: "تم رفض إذن الموقع. يرجى السماح بالوصول للموقع والمحاولة مرة أخرى.",
    locationUnsupported: "المتصفح لا يدعم تحديد الموقع GPS.",
    lblOrderNote: "ملاحظات (اختياري)",
    orderNotePlaceholder: "أي ملاحظة إضافية...",
    lblSubtotal: "المجموع الفرعي",
    lblDeliveryFee: "التوصيل",
    freeText: "مجاني",
    lblGrandTotal: "الإجمالي النهائي",
    sendWhatsapp: "إرسال الطلب عبر واتساب",
    alertLocationRequired: "يرجى الضغط على 'إرسال الموقع المباشر' لإرفاق موقعك.",
    waHeader: store => `*طلب جديد - ${store}*`,
    waType: v => `*نوع الطلب:* ${v}`,
    waAddress: v => `*الموقع المباشر:* ${v}`,
    waNote: v => `*ملاحظة:* ${v}`,
    waItems: "*الأصناف:*",
    waSubtotal: v => `المجموع الفرعي: ${v}`,
    waDelivery: "التوصيل: مجاني",
    waTotal: v => `*الإجمالي النهائي: ${v}*`
  }
};

function isSupabaseConfigured() {
  return (
    SUPABASE_CONFIG.url &&
    !SUPABASE_CONFIG.url.includes("YOUR-PROJECT-ID") &&
    SUPABASE_CONFIG.anonKey &&
    !SUPABASE_CONFIG.anonKey.includes("YOUR-SUPABASE-ANON-KEY")
  );
}

function mapRowToItem(row) {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar || row.name,
    category: row.category,
    tag: row.tag || "",
    tagAr: row.tag_ar || row.tag || "",
    price: Number(row.price || 0),
    variants: Array.isArray(row.variants) ? row.variants : [],
    addons: Array.isArray(row.addons) ? row.addons : [],
    desc: row.desc_en || "",
    descAr: row.desc_ar || row.desc_en || "",
    image: row.image_url || "",
    available: row.available !== false
  };
}

async function sbFetchItems() {
  if (!isSupabaseConfigured()) return [];
  const res = await fetch(
    `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?select=*&order=id.asc`,
    {
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`
      }
    }
  );
  if (!res.ok) throw new Error("Failed to fetch menu items");
  const rows = await res.json();
  return Array.isArray(rows) ? rows.map(mapRowToItem) : [];
}

async function sbGet(path) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`
    }
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

async function sbLoadStoreConfig() {
  if (!isSupabaseConfigured()) return;
  try {
    const rows = await sbGet(`${SUPABASE_CONFIG.settingsTable}?select=*&id=eq.1`);
    if (Array.isArray(rows) && rows[0]) {
      const r = rows[0];
      storeSettings = {
        ...storeSettings,
        name: r.name || storeSettings.name,
        nameAr: r.name_ar || storeSettings.nameAr,
        whatsappNumber: r.whatsapp_number || storeSettings.whatsappNumber
      };
      localStorage.setItem(APP_META.settingsKey, JSON.stringify(storeSettings));
    }
  } catch {}
  try {
    const rows = await sbGet(`${SUPABASE_CONFIG.categoriesTable}?select=*&order=sort_order.asc,created_at.asc`);
    if (Array.isArray(rows) && rows.length) {
      categoriesList = [
        DEFAULT_CATEGORIES[0],
        ...rows.map(r => ({ id: r.id, en: r.name_en, ar: r.name_ar || r.name_en, custom: !!r.custom }))
      ];
      localStorage.setItem(APP_META.categoriesKey, JSON.stringify(categoriesList));
    }
  } catch {}
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(APP_META.settingsKey);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function loadCategories() {
  try {
    const raw = localStorage.getItem(APP_META.categoriesKey);
    if (!raw) return [...DEFAULT_CATEGORIES];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_CATEGORIES];
  } catch {
    return [...DEFAULT_CATEGORIES];
  }
}

function loadSavedLang() {
  return localStorage.getItem(APP_META.langKey) === "ar" ? "ar" : "en";
}

let storeSettings = loadSettings();
let categoriesList = loadCategories();
let currentLang = loadSavedLang();
let allItems = [];
let filteredItems = [];
let visibleLimit = APP_META.itemsPerPage;
let cart = [];
let selectedVariantByItem = {};
let activeCategory = "all";
let searchQuery = "";
let sortMode = "default";
let currentModalItem = null;
let modalQty = 1;

const menuGrid = document.getElementById("menuGrid");
const itemCounterBadge = document.getElementById("itemCounterBadge");
const loadMoreWrap = document.getElementById("loadMoreWrap");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const categoryTabs = document.getElementById("categoryTabs");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const floatingCartBar = document.getElementById("floatingCartBar");
const cartItemCount = document.getElementById("cartItemCount");
const cartTotalPreview = document.getElementById("cartTotalPreview");

function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const val = dict[key];
  return typeof val === "function" ? val(...args) : val;
}

function getStoreTitle() {
  return currentLang === "ar" && storeSettings.nameAr ? storeSettings.nameAr : storeSettings.name;
}

function getLocalizedCatName(cat) {
  return currentLang === "ar" && cat.ar ? cat.ar : cat.en;
}

function getLocalizedName(item) {
  return currentLang === "ar" && item.nameAr ? item.nameAr : item.name;
}

function getLocalizedDesc(item) {
  return currentLang === "ar" && item.descAr ? item.descAr : item.desc || "";
}

function getLocalizedTag(item) {
  return currentLang === "ar" && item.tagAr ? item.tagAr : item.tag || "";
}

function formatPrice(amount) {
  return `${Number(amount).toFixed(storeSettings.decimals)} ${storeSettings.currency}`;
}

function getSortPrice(item) {
  if (Array.isArray(item.variants) && item.variants.length) {
    return Math.min(...item.variants.map(v => Number(v.price) || 0));
  }
  return Number(item.price) || 0;
}

function hasDualOrMultiPrice(item) {
  return Array.isArray(item.variants) && item.variants.length >= 2;
}

function getActiveVariant(item) {
  if (!hasDualOrMultiPrice(item)) return null;
  const chosenId = selectedVariantByItem[item.id];
  return item.variants.find(v => v.id === chosenId) || item.variants[0];
}

function renderCategoriesUI() {
  if (!categoriesList.some(c => c.id === activeCategory)) {
    activeCategory = "all";
  }
  categoryTabs.innerHTML = categoriesList
    .map(cat => {
      const isActive = activeCategory === cat.id ? "active" : "";
      return `<button type="button" class="tab ${isActive}" data-category="${esc(cat.id)}">${esc(getLocalizedCatName(cat))}</button>`;
    })
    .join("");
}

function applyLanguage(lang) {
  currentLang = lang === "ar" ? "ar" : "en";
  localStorage.setItem(APP_META.langKey, currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  document.getElementById("storeName").textContent = getStoreTitle();
  document.getElementById("storeSubtitle").textContent = t("subtitle");
  searchInput.placeholder = t("searchPlaceholder");

  sortSelect.options[0].textContent = t("sortDefault");
  sortSelect.options[1].textContent = t("sortPriceAsc");
  sortSelect.options[2].textContent = t("sortPriceDesc");
  sortSelect.options[3].textContent = t("sortNameAsc");

  document.getElementById("openCartBtn").textContent = t("viewOrder");
  document.getElementById("modalItemTitle").textContent = t("customizeTitle");
  document.getElementById("variantsHeading").textContent = t("variantsHeading");
  document.getElementById("addonsHeading").textContent = t("addonsHeading");
  document.getElementById("lblItemNote").textContent = t("lblItemNote");
  document.getElementById("itemNote").placeholder = t("itemNotePlaceholder");
  document.getElementById("confirmAddBtn").textContent = t("addToOrder");

  document.getElementById("checkoutTitle").textContent = t("checkoutTitle");
  document.getElementById("lblOrderType").textContent = t("lblOrderType");
  document.getElementById("lblDeliveryOption").textContent = t("deliveryOption");
  document.getElementById("lblPickupOption").textContent = t("pickupOption");
  document.getElementById("lblCustomerAddress").textContent = t("lblCustomerAddress");
  document.getElementById("customerAddress").placeholder = t("customerAddressPlaceholder");
  document.getElementById("shareLocationBtn").textContent = t("shareLocation");
  document.getElementById("lblOrderNote").textContent = t("lblOrderNote");
  document.getElementById("orderNote").placeholder = t("orderNotePlaceholder");
  document.getElementById("lblSubtotal").textContent = t("lblSubtotal");
  document.getElementById("lblDeliveryFee").textContent = t("lblDeliveryFee");
  document.getElementById("deliveryAmount").textContent = t("freeText");
  document.getElementById("lblGrandTotal").textContent = t("lblGrandTotal");
  document.getElementById("sendWhatsappBtn").textContent = t("sendWhatsapp");

  renderCategoriesUI();
  refreshCatalog(false);
  updateCartUI();
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

window.selectCardVariant = function (itemId, variantId) {
  selectedVariantByItem[itemId] = variantId;
  renderGrid();
};

function getItemVariantCartQty(itemId, variantId = "") {
  return cart
    .filter(c => c.itemId === itemId && (c.variantId || "") === (variantId || ""))
    .reduce((sum, c) => sum + c.qty, 0);
}

window.quickAddItem = function (itemId) {
  const item = allItems.find(x => String(x.id) === String(itemId));
  if (!item || item.available === false) return;

  if (Array.isArray(item.addons) && item.addons.length > 0) {
    openCustomizeModal(itemId);
    return;
  }

  const activeVar = getActiveVariant(item);
  const variantId = activeVar ? activeVar.id : "";
  const variantName = activeVar ? activeVar.name : "";
  const basePrice = activeVar ? Number(activeVar.price) : Number(item.price);

  const key = `${item.id}_${variantId || "default"}`;
  const idx = cart.findIndex(c => c.key === key);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({
      key,
      itemId: item.id,
      variantId,
      variantName,
      name: item.name,
      nameAr: item.nameAr || item.name,
      addons: [],
      note: "",
      unitPrice: basePrice,
      qty: 1
    });
  }

  updateCartUI();
  renderGrid();
};

window.quickChangeItemQty = function (itemId, delta) {
  const item = allItems.find(x => String(x.id) === String(itemId));
  const activeVar = item ? getActiveVariant(item) : null;
  const targetVarId = activeVar ? activeVar.id : "";

  for (let i = cart.length - 1; i >= 0; i--) {
    if (String(cart[i].itemId) === String(itemId) && (cart[i].variantId || "") === targetVarId) {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      break;
    }
  }
  updateCartUI();
  renderGrid();
};

function refreshCatalog(resetLimit = true) {
  if (resetLimit) visibleLimit = APP_META.itemsPerPage;
  itemCounterBadge.textContent = t("itemsCount", allItems.length);

  filteredItems = allItems.filter(item => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchText =
      (item.name || "").toLowerCase().includes(q) ||
      (item.nameAr || "").toLowerCase().includes(q) ||
      (item.desc || "").toLowerCase().includes(q) ||
      (item.descAr || "").toLowerCase().includes(q);
    return matchCat && matchText;
  });

  if (sortMode === "price-asc") {
    filteredItems.sort((a, b) => getSortPrice(a) - getSortPrice(b));
  } else if (sortMode === "price-desc") {
    filteredItems.sort((a, b) => getSortPrice(b) - getSortPrice(a));
  } else if (sortMode === "name-asc") {
    filteredItems.sort((a, b) => getLocalizedName(a).localeCompare(getLocalizedName(b)));
  }

  renderGrid();
}

function renderGrid() {
  if (!filteredItems.length) {
    menuGrid.innerHTML = `<p style="color:#9ca3af; grid-column:1/-1; text-align:center; padding:32px 0;">${t("noItemsFound")}</p>`;
    loadMoreWrap.classList.add("hidden");
    return;
  }

  const slice = filteredItems.slice(0, visibleLimit);
  menuGrid.innerHTML = slice
    .map(item => {
      const available = item.available !== false;
      const tagText = getLocalizedTag(item);
      const badge = !available
        ? `<span class="card-tag out-tag">${t("stockOutTag")}</span>`
        : tagText
        ? `<span class="card-tag">${esc(tagText)}</span>`
        : "";

      const title = esc(getLocalizedName(item));
      const desc = esc(getLocalizedDesc(item));
      const img = safeUrl(item.image)
        ? `<img src="${safeUrl(item.image)}" alt="${title}" class="menu-card-img" loading="lazy" />`
        : "";

      const dualPrices = hasDualOrMultiPrice(item);
      const activeVar = getActiveVariant(item);

      const variantPillsHtml = dualPrices
        ? `<div class="variant-pills">
            ${item.variants
              .map(
                v => `
                <button type="button" class="variant-pill ${activeVar && activeVar.id === v.id ? "active" : ""}" onclick="selectCardVariant('${esc(item.id)}', '${esc(v.id)}')">
                  ${esc(v.name)} • ${formatPrice(v.price)}
                </button>
              `
              )
              .join("")}
          </div>`
        : "";

      const priceHtml = dualPrices ? "" : `<span class="price">${formatPrice(item.price)}</span>`;
      const qtyInCart = getItemVariantCartQty(item.id, activeVar ? activeVar.id : "");
      const hasOptions = Array.isArray(item.addons) && item.addons.length > 0;

      let actionHtml = "";
      if (!available) {
        actionHtml = `<button type="button" class="btn-add" disabled>${t("soldOutBtn")}</button>`;
      } else if (qtyInCart > 0) {
        actionHtml = `
          <div class="card-qty-stepper">
            <button type="button" onclick="quickChangeItemQty('${item.id}', -1)">-</button>
            <span>${qtyInCart}</span>
            <button type="button" onclick="quickAddItem('${item.id}')">+</button>
          </div>
        `;
      } else {
        const optBtn = hasOptions
          ? `<button type="button" class="btn-customize" onclick="openCustomizeModal('${item.id}')">${t("customizeBtn")}</button>`
          : "";
        actionHtml = `
          <div class="card-action-group">
            ${optBtn}
            <button type="button" class="btn-add" onclick="quickAddItem('${item.id}')">${t("addBtn")}</button>
          </div>
        `;
      }

      return `
        <article class="menu-card ${!available ? "unavailable" : ""}">
          ${img}
          <div class="menu-card-body">
            <div>
              ${badge}
              <h3>${title}</h3>
              <p>${desc}</p>
              ${variantPillsHtml}
            </div>
            <div class="card-footer">
              ${priceHtml}
              ${actionHtml}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (visibleLimit < filteredItems.length) {
    loadMoreWrap.classList.remove("hidden");
    loadMoreBtn.textContent = t("loadMore", filteredItems.length - visibleLimit);
  } else {
    loadMoreWrap.classList.add("hidden");
  }
}

loadMoreBtn.onclick = () => {
  visibleLimit += APP_META.itemsPerPage;
  renderGrid();
};

categoryTabs.addEventListener("click", e => {
  if (!e.target.classList.contains("tab")) return;
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  e.target.classList.add("active");
  activeCategory = e.target.dataset.category;
  refreshCatalog(true);
});

searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.trim();
  refreshCatalog(true);
});

sortSelect.addEventListener("change", e => {
  sortMode = e.target.value;
  refreshCatalog(true);
});

const customModal = document.getElementById("customModal");
const modalItemTitle = document.getElementById("modalItemTitle");
const modalItemImg = document.getElementById("modalItemImg");
const modalItemDesc = document.getElementById("modalItemDesc");
const modalVariantsSection = document.getElementById("modalVariantsSection");
const modalVariantsList = document.getElementById("modalVariantsList");
const addonsList = document.getElementById("addonsList");
const itemNoteInput = document.getElementById("itemNote");
const modalQtyValue = document.getElementById("modalQtyValue");

window.openCustomizeModal = function (id) {
  currentModalItem = allItems.find(x => String(x.id) === String(id));
  if (!currentModalItem) return;

  modalQty = 1;
  modalQtyValue.textContent = modalQty;
  modalItemTitle.textContent = getLocalizedName(currentModalItem);
  modalItemDesc.textContent = getLocalizedDesc(currentModalItem);
  itemNoteInput.value = "";

  if (safeUrl(currentModalItem.image)) {
    modalItemImg.src = currentModalItem.image;
    modalItemImg.classList.remove("hidden");
  } else {
    modalItemImg.src = "";
    modalItemImg.classList.add("hidden");
  }

  if (hasDualOrMultiPrice(currentModalItem)) {
    const activeVar = getActiveVariant(currentModalItem);
    modalVariantsSection.classList.remove("hidden");
    modalVariantsList.innerHTML = currentModalItem.variants
      .map(
        v => `
        <label class="addon-item">
          <span>
            <input type="radio" name="modalVariant" value="${esc(v.id)}" data-name="${esc(v.name)}" data-price="${esc(v.price)}" ${activeVar && activeVar.id === v.id ? "checked" : ""} />
            ${esc(v.name)}
          </span>
          <span>${formatPrice(v.price)}</span>
        </label>
      `
      )
      .join("");
  } else {
    modalVariantsSection.classList.add("hidden");
    modalVariantsList.innerHTML = "";
  }

  if (currentModalItem.addons && currentModalItem.addons.length) {
    addonsList.innerHTML = currentModalItem.addons
      .map(
        a => `
        <label class="addon-item">
          <span>
            <input type="checkbox" value="${esc(a.id)}" data-name="${esc(a.name)}" data-price="${esc(a.price)}" />
            ${esc(a.name)}
          </span>
          <span>+${formatPrice(a.price)}</span>
        </label>
      `
      )
      .join("");
  } else {
    addonsList.innerHTML = `<p style="font-size:0.82rem; color:#9ca3af;">${t("noAddons")}</p>`;
  }

  customModal.classList.remove("hidden");
};

document.getElementById("closeCustomModal").onclick = () => customModal.classList.add("hidden");
document.getElementById("modalQtyMinus").onclick = () => {
  if (modalQty > 1) {
    modalQty--;
    modalQtyValue.textContent = modalQty;
  }
};
document.getElementById("modalQtyPlus").onclick = () => {
  modalQty++;
  modalQtyValue.textContent = modalQty;
};

document.getElementById("confirmAddBtn").onclick = () => {
  const selectedVarRadio = modalVariantsList.querySelector('input[name="modalVariant"]:checked');
  const variantId = selectedVarRadio ? selectedVarRadio.value : "";
  const variantName = selectedVarRadio ? selectedVarRadio.dataset.name : "";
  const basePrice = selectedVarRadio ? parseFloat(selectedVarRadio.dataset.price) : Number(currentModalItem.price);

  if (variantId) selectedVariantByItem[currentModalItem.id] = variantId;

  const checked = Array.from(addonsList.querySelectorAll("input:checked")).map(cb => ({
    id: cb.value,
    name: cb.dataset.name,
    price: parseFloat(cb.dataset.price)
  }));
  const addonsSum = checked.reduce((s, a) => s + a.price, 0);
  const unitPrice = basePrice + addonsSum;
  const note = itemNoteInput.value.trim();
  const key = `${currentModalItem.id}_${variantId || "default"}_${checked.map(a => a.id).sort().join("-")}_${note}`;

  const existing = cart.findIndex(c => c.key === key);
  if (existing > -1) {
    cart[existing].qty += modalQty;
  } else {
    cart.push({
      key,
      itemId: currentModalItem.id,
      variantId,
      variantName,
      name: currentModalItem.name,
      nameAr: currentModalItem.nameAr || currentModalItem.name,
      addons: checked,
      note,
      unitPrice,
      qty: modalQty
    });
  }

  customModal.classList.add("hidden");
  updateCartUI();
  renderGrid();
};

const checkoutModal = document.getElementById("checkoutModal");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const subtotalAmount = document.getElementById("subtotalAmount");
const deliveryAmount = document.getElementById("deliveryAmount");
const grandTotalAmount = document.getElementById("grandTotalAmount");
const addressGroup = document.getElementById("addressGroup");
const customerAddressInput = document.getElementById("customerAddress");
const locationStatus = document.getElementById("locationStatus");

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);

  if (!count) {
    floatingCartBar.classList.add("hidden");
  } else {
    floatingCartBar.classList.remove("hidden");
    cartItemCount.textContent = t("cartCount", count);
    cartTotalPreview.textContent = formatPrice(subtotal);
  }
  renderCheckout();
}

document.getElementById("openCartBtn").onclick = () => {
  renderCheckout();
  checkoutModal.classList.remove("hidden");
};
document.getElementById("closeCheckoutModal").onclick = () => checkoutModal.classList.add("hidden");

document.querySelectorAll('input[name="orderType"]').forEach(r => {
  r.addEventListener("change", e => {
    addressGroup.classList.toggle("hidden", e.target.value === "Pickup");
    renderCheckout();
  });
});

document.getElementById("shareLocationBtn").onclick = () => {
  if (!navigator.geolocation) {
    locationStatus.textContent = t("locationUnsupported");
    locationStatus.className = "location-status error";
    return;
  }

  locationStatus.textContent = t("gettingLocation");
  locationStatus.className = "location-status";

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(6);
      const lng = pos.coords.longitude.toFixed(6);
      customerAddressInput.value = `https://maps.google.com/?q=${lat},${lng}`;
      locationStatus.textContent = t("locationCaptured");
      locationStatus.className = "location-status";
    },
    () => {
      locationStatus.textContent = t("locationDenied");
      locationStatus.className = "location-status error";
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
};

function renderCheckout() {
  if (!cart.length) {
    cartItemsContainer.innerHTML = `<p style="color:#9ca3af; text-align:center; padding:14px 0;">${t("emptyCart")}</p>`;
  } else {
    cartItemsContainer.innerHTML = cart
      .map((item, idx) => {
        const baseName = currentLang === "ar" && item.nameAr ? item.nameAr : item.name;
        const displayName = item.variantName ? `${baseName} (${item.variantName})` : baseName;
        return `
        <div class="cart-item-row">
          <div class="cart-item-details">
            <h4>${esc(displayName)}</h4>
            ${item.addons.length ? `<div class="cart-item-meta">+ ${esc(item.addons.map(a => a.name).join(", "))}</div>` : ""}
            ${item.note ? `<div class="cart-item-meta">${esc(item.note)}</div>` : ""}
            <div class="cart-item-meta">${formatPrice(item.unitPrice)} × ${item.qty} = <strong>${formatPrice(item.unitPrice * item.qty)}</strong></div>
          </div>
          <div class="cart-item-actions">
            <button type="button" class="mini-btn" onclick="changeCartQty(${idx}, -1)">-</button>
            <span>${item.qty}</span>
            <button type="button" class="mini-btn" onclick="changeCartQty(${idx}, 1)">+</button>
          </div>
        </div>
      `;
      })
      .join("");
  }

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  subtotalAmount.textContent = formatPrice(subtotal);
  deliveryAmount.textContent = t("freeText");
  grandTotalAmount.textContent = formatPrice(subtotal);
}

window.changeCartQty = function (idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
  renderGrid();
  if (!cart.length) checkoutModal.classList.add("hidden");
};

document.getElementById("sendWhatsappBtn").onclick = () => {
  if (!cart.length) return;
  const type = document.querySelector('input[name="orderType"]:checked').value;
  const address = customerAddressInput.value.trim();
  const note = document.getElementById("orderNote").value.trim();

  if (type === "Delivery" && !address) return alert(t("alertLocationRequired"));

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const storeTitle = getStoreTitle();
  const cleanPhone = (storeSettings.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber).replace(/[^\d]/g, "");

  const lines = [
    t("waHeader", storeTitle),
    `-------------------------`,
    t("waType", type === "Pickup" ? t("typePickup") : t("typeDelivery"))
  ];
  if (type === "Delivery") lines.push(t("waAddress", address));
  if (note) lines.push(t("waNote", note));
  lines.push(`-------------------------`, t("waItems"));

  cart.forEach((item, i) => {
    const baseLabel = currentLang === "ar" && item.nameAr ? item.nameAr : item.name;
    const itemLabel = item.variantName ? `${baseLabel} [${item.variantName}]` : baseLabel;
    lines.push(`${i + 1}. *${itemLabel}* × ${item.qty} — ${formatPrice(item.unitPrice * item.qty)}`);
    if (item.addons.length) lines.push(`   ↳ ${item.addons.map(a => a.name).join(", ")}`);
    if (item.note) lines.push(`   ↳ ${item.note}`);
  });

  lines.push(
    `-------------------------`,
    t("waSubtotal", formatPrice(subtotal)),
    t("waDelivery"),
    t("waTotal", formatPrice(subtotal))
  );

  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
};

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

async function initStore() {
  registerServiceWorker();
  applyLanguage(currentLang);
  if (isSupabaseConfigured()) {
    await sbLoadStoreConfig();
    applyLanguage(currentLang);
    try {
      allItems = await sbFetchItems();
      refreshCatalog(true);
    } catch {
      allItems = [];
      refreshCatalog(true);
      menuGrid.innerHTML = `<p style="color:#f87171; grid-column:1/-1; text-align:center; padding:32px 0;">${t("loadError")}</p>`;
      loadMoreWrap.classList.add("hidden");
    }
  } else {
    allItems = [];
    refreshCatalog(true);
  }
}

initStore();
