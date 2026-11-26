// ===== ১. কনফিগারেশন =====
const DEFAULT_SETTINGS = {
  name: "Velvet Crumb & Treats",
  nameAr: "فيلفيت كرامب وتريتس",
  whatsappNumber: "96890000000", // এডমিন প্যানেল থেকেও পরিবর্তন করা যাবে
  currency: "OMR",
  decimals: 3,
  adminPin: "1234" // এডমিন পিন কোড
};

const APP_META = {
  itemsPerPage: 24,
  catalogKey: "frontend_catalog_v2",
  settingsKey: "frontend_store_settings_v1",
  langKey: "frontend_catalog_lang_v1",
  maxImageWidth: 500,
  imageQuality: 0.68
};

// ===== ২. ইংরেজি ও আরবি অনুবাদ (EN / AR) =====
const TRANSLATIONS = {
  en: {
    subtitle: "Tap + to add items and order directly on WhatsApp",
    itemsCount: n => `${n} Items`,
    adminBtn: unlocked => (unlocked ? "🔓 Admin" : "🔒 Admin"),
    lockAdmin: "Lock Admin",
    pinPrompt: "Enter Admin PIN:",
    wrongPin: "Incorrect PIN!",
    settingsHeading: "Store & WhatsApp Settings",
    lblCfgNameEn: "Store Name (EN)",
    lblCfgNameAr: "Store Name (AR)",
    lblCfgWhatsapp: "WhatsApp Number (with country code)",
    saveSettings: "Save Settings",
    settingsSaved: "Settings saved!",
    invalidWhatsapp: "Please enter a valid WhatsApp number (digits only).",
    searchPlaceholder: "Search items...",
    sortDefault: "Default Order",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortNameAsc: "Name: A - Z",
    catAll: "All Items",
    catDessert: "Desserts & Chocolate",
    catDrinks: "Drinks & Coffee",
    catCombo: "Combo Packs",
    catSnacks: "Snacks",
    hideSoldOut: "Hide Stock Out",
    editorTitle: "Admin Panel & Menu Editor",
    editorSubtitle: "Configure WhatsApp number, manage menu items, and test 300+ items.",
    load300: "Load 300 Demo Items",
    exportJson: "Export JSON",
    importJson: "Import JSON",
    lblItemName: "Item Name *",
    lblItemPrice: "Price *",
    lblItemCategory: "Category",
    lblItemTag: "Badge / Tag",
    lblItemImage: "Photo (Gallery or Camera — UI Preview)",
    removePhoto: "Remove Photo",
    lblItemDesc: "Short Description",
    lblItemAddons: "Add-ons (Format: Name:Price, comma separated)",
    addItemBtn: "+ Add Item",
    updateItemBtn: "Save Changes",
    cancelBtn: "Cancel",
    adminSearchPlaceholder: "Search items in editor list...",
    stockOutTag: "Stock Out",
    addBtn: "+ Add",
    customizeBtn: "Options",
    soldOutBtn: "Sold Out",
    loadMore: rem => `Load More (${rem} remaining)`,
    noItemsFound: "No items found.",
    viewOrder: "Order Now",
    cartCount: n => `${n} Items Selected`,
    customizeTitle: "Customize Item",
    addonsHeading: "Extra Toppings / Sauces (Optional)",
    noAddons: "No extra add-ons for this item.",
    lblItemNote: "Special Instructions",
    itemNotePlaceholder: "e.g. Less sweet, extra sauce on the side...",
    addToOrder: "Add to Order",
    checkoutTitle: "Complete Your Order",
    emptyCart: "Your cart is empty.",
    lblOrderType: "Order Type",
    deliveryOption: "Delivery (Free)",
    pickupOption: "Pickup (Free)",
    lblCustomerName: "Your Name *",
    customerNamePlaceholder: "Enter your name",
    lblCustomerAddress: "Delivery Location / Address *",
    customerAddressPlaceholder: "Tap 'Share Live Location' or type address",
    shareLocation: "📍 Share Live Location",
    gettingLocation: "Fetching live GPS location...",
    locationCaptured: "Live GPS location attached!",
    locationDenied: "Location permission denied. Type address manually.",
    locationUnsupported: "GPS not supported on this browser.",
    lblOrderNote: "Notes (Optional)",
    orderNotePlaceholder: "Any extra note...",
    lblSubtotal: "Subtotal",
    lblDeliveryFee: "Delivery",
    freeText: "Free",
    lblGrandTotal: "Total Bill",
    sendWhatsapp: "Send Order on WhatsApp",
    alertNameRequired: "Please enter your name.",
    alertAddressRequired: "Please share live location or enter delivery address.",
    alertInvalidJson: "Please select a valid JSON array file.",
    alertReadJsonError: "Unable to read the JSON file.",
    previewSize: kb => `Preview size: ~${kb} KB`,
    editBtn: "Edit",
    deleteBtn: "Delete",
    markSoldOut: "Stock Out",
    markAvailable: "Available",
    waHeader: store => `*New Order - ${store}*`,
    waCustomer: v => `*Name:* ${v}`,
    waType: v => `*Order Type:* ${v}`,
    waAddress: v => `*Location / Address:* ${v}`,
    waNote: v => `*Note:* ${v}`,
    waItems: "*Items:*",
    waSubtotal: v => `Subtotal: ${v}`,
    waDelivery: "Delivery: Free",
    waTotal: v => `*Total Bill: ${v}*`
  },
  ar: {
    subtitle: "اضغط + لإضافة الأصناف وأرسل طلبك مباشرة عبر واتساب",
    itemsCount: n => `${n} أصناف`,
    adminBtn: unlocked => (unlocked ? "🔓 الإدارة" : "🔒 الإدارة"),
    lockAdmin: "قفل الإدارة",
    pinPrompt: "أدخل رمز الدخول الخاص بالإدارة:",
    wrongPin: "رمز الدخول غير صحيح!",
    settingsHeading: "إعدادات المتجر وواتساب",
    lblCfgNameEn: "اسم المتجر (إنجليزي)",
    lblCfgNameAr: "اسم المتجر (عربي)",
    lblCfgWhatsapp: "رقم واتساب (مع رمز الدولة)",
    saveSettings: "حفظ الإعدادات",
    settingsSaved: "تم حفظ الإعدادات!",
    invalidWhatsapp: "يرجى إدخال رقم واتساب صحيح (أرقام فقط).",
    searchPlaceholder: "ابحث عن صنف...",
    sortDefault: "الترتيب الافتراضي",
    sortPriceAsc: "السعر: من الأقل إلى الأعلى",
    sortPriceDesc: "السعر: من الأعلى إلى الأقل",
    sortNameAsc: "الاسم: أ - ي",
    catAll: "جميع الأصناف",
    catDessert: "حلويات وشوكولاتة",
    catDrinks: "مشروبات وقهوة",
    catCombo: "باقات كومبو",
    catSnacks: "سناكس",
    hideSoldOut: "إخفاء غير المتوفر",
    editorTitle: "لوحة الإدارة ومحرر القائمة",
    editorSubtitle: "اضبط رقم واتساب، أدر الأصناف، واختبر أكثر من 300 صنف.",
    load300: "تحميل 300 صنف تجريبي",
    exportJson: "تصدير JSON",
    importJson: "استيراد JSON",
    lblItemName: "اسم الصنف *",
    lblItemPrice: "السعر *",
    lblItemCategory: "التصنيف",
    lblItemTag: "شارة / وسم",
    lblItemImage: "صورة (المعرض أو الكاميرا — معاينة)",
    removePhoto: "إزالة الصورة",
    lblItemDesc: "وصف مختصر",
    lblItemAddons: "إضافات (الصيغة: الاسم:السعر، مفصولة بفاصلة)",
    addItemBtn: "+ إضافة صنف",
    updateItemBtn: "حفظ التعديلات",
    cancelBtn: "إلغاء",
    adminSearchPlaceholder: "ابحث في قائمة المحرر...",
    stockOutTag: "نفذت الكمية",
    addBtn: "+ أضف",
    customizeBtn: "خيارات",
    soldOutBtn: "غير متوفر",
    loadMore: rem => `عرض المزيد (${rem} متبقي)`,
    noItemsFound: "لا توجد أصناف مطابقة.",
    viewOrder: "اطلب الآن",
    cartCount: n => `${n} أصناف مختارة`,
    customizeTitle: "تخصيص الصنف",
    addonsHeading: "إضافات / صوص إضافي (اختياري)",
    noAddons: "لا توجد إضافات لهذا الصنف.",
    lblItemNote: "ملاحظات خاصة",
    itemNotePlaceholder: "مثال: سكر خفيف، الصوص جانبي...",
    addToOrder: "أضف إلى الطلب",
    checkoutTitle: "إتمام طلبك",
    emptyCart: "السلة فارغة.",
    lblOrderType: "نوع الطلب",
    deliveryOption: "توصيل (مجاني)",
    pickupOption: "استلام من الفرع (مجاني)",
    lblCustomerName: "الاسم *",
    customerNamePlaceholder: "اكتب اسمك",
    lblCustomerAddress: "الموقع المباشر / العنوان *",
    customerAddressPlaceholder: "اضغط 'إرسال الموقع المباشر' أو اكتب العنوان",
    shareLocation: "📍 إرسال الموقع المباشر",
    gettingLocation: "جاري تحديد الموقع عبر GPS...",
    locationCaptured: "تم إرفاق الموقع المباشر بنجاح!",
    locationDenied: "تم رفض إذن الموقع. اكتب العنوان يدوياً.",
    locationUnsupported: "المتصفح لا يدعم تحديد الموقع GPS.",
    lblOrderNote: "ملاحظات (اختياري)",
    orderNotePlaceholder: "أي ملاحظة إضافية...",
    lblSubtotal: "المجموع الفرعي",
    lblDeliveryFee: "التوصيل",
    freeText: "مجاني",
    lblGrandTotal: "الإجمالي النهائي",
    sendWhatsapp: "إرسال الطلب عبر واتساب",
    alertNameRequired: "يرجى إدخال الاسم.",
    alertAddressRequired: "يرجى مشاركة الموقع المباشر أو إدخال العنوان.",
    alertInvalidJson: "يرجى اختيار ملف JSON صحيح.",
    alertReadJsonError: "تعذر قراءة الملف.",
    previewSize: kb => `حجم المعاينة: ~${kb} KB`,
    editBtn: "تعديل",
    deleteBtn: "حذف",
    markSoldOut: "نفذت الكمية",
    markAvailable: "متوفر",
    waHeader: store => `*طلب جديد - ${store}*`,
    waCustomer: v => `*الاسم:* ${v}`,
    waType: v => `*نوع الطلب:* ${v}`,
    waAddress: v => `*الموقع / العنوان:* ${v}`,
    waNote: v => `*ملاحظة:* ${v}`,
    waItems: "*الأصناف:*",
    waSubtotal: v => `المجموع الفرعي: ${v}`,
    waDelivery: "التوصيل: مجاني",
    waTotal: v => `*الإجمالي النهائي: ${v}*`
  }
};

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Double Chocolate Crispy Drizzle",
    nameAr: "دبل شوكولاتة كريسبي دريزل",
    category: "dessert",
    tag: "Bestseller",
    tagAr: "الأكثر مبيعاً",
    price: 1.300,
    available: true,
    image: "",
    desc: "Crispy wafer and dark-milk chocolate layers with white chocolate drizzle.",
    descAr: "طبقات ويفر مقرمشة وشوكولاتة داكنة وحليب مع صوص شوكولاتة بيضاء.",
    addons: [
      { id: "a1", name: "Extra White Chocolate Drizzle", price: 0.250 },
      { id: "a2", name: "Roasted Hazelnut Crunch", price: 0.300 }
    ]
  },
  {
    id: 2,
    name: "Belgian Dark Fudge Box",
    nameAr: "بوكس فادج شوكولاتة بلجيكية داكنة",
    category: "dessert",
    tag: "Rich Cocoa",
    tagAr: "كاكاو غني",
    price: 1.600,
    available: true,
    image: "",
    desc: "Soft Belgian dark chocolate fudge cubes.",
    descAr: "مكعبات فادج شوكولاتة بلجيكية داكنة طرية.",
    addons: []
  },
  {
    id: 3,
    name: "Iced Spanish Latte",
    nameAr: "آيس سبانش لاتيه",
    category: "drinks",
    tag: "Chilled",
    tagAr: "مثلج",
    price: 1.400,
    available: true,
    image: "",
    desc: "Fresh espresso shot with creamy sweetened milk.",
    descAr: "إسبريسو طازج مع حليب محلى كريمي.",
    addons: []
  }
];

function loadSettings() {
  try {
    const raw = localStorage.getItem(APP_META.settingsKey);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(nextSettings) {
  storeSettings = { ...storeSettings, ...nextSettings };
  localStorage.setItem(APP_META.settingsKey, JSON.stringify(storeSettings));
}

function loadSavedLang() {
  return localStorage.getItem(APP_META.langKey) === "ar" ? "ar" : "en";
}

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(APP_META.catalogKey);
    if (!raw) return [...INITIAL_ITEMS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [...INITIAL_ITEMS];
  } catch {
    return [...INITIAL_ITEMS];
  }
}

function saveLocalState() {
  try {
    localStorage.setItem(APP_META.catalogKey, JSON.stringify(allItems));
  } catch {
    // Keep in-memory state when 300+ items exceed localStorage quota
  }
}

// ===== ৩. স্টেট ম্যানেজমেন্ট =====
let storeSettings = loadSettings();
let currentLang = loadSavedLang();
let isAdminAuthenticated = false;
let allItems = loadInitialItems();
let filteredItems = [];
let visibleLimit = APP_META.itemsPerPage;
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let sortMode = "default";
let hideSoldOut = false;
let adminSearch = "";
let currentModalItem = null;
let modalQty = 1;
let formImageData = "";

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const itemCounterBadge = document.getElementById("itemCounterBadge");
const loadMoreWrap = document.getElementById("loadMoreWrap");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const categoryTabs = document.getElementById("categoryTabs");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const hideSoldOutCheckbox = document.getElementById("hideSoldOutCheckbox");
const floatingCartBar = document.getElementById("floatingCartBar");
const cartItemCount = document.getElementById("cartItemCount");
const cartTotalPreview = document.getElementById("cartTotalPreview");

// Admin & Settings DOM
const toggleAdminBtn = document.getElementById("toggleAdminBtn");
const lockAdminBtn = document.getElementById("lockAdminBtn");
const adminPanel = document.getElementById("adminPanel");
const cfgStoreNameEn = document.getElementById("cfgStoreNameEn");
const cfgStoreNameAr = document.getElementById("cfgStoreNameAr");
const cfgWhatsappNumber = document.getElementById("cfgWhatsappNumber");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const addItemForm = document.getElementById("addItemForm");
const editItemIdInput = document.getElementById("editItemId");
const itemNameInput = document.getElementById("itemNameInput");
const itemPriceInput = document.getElementById("itemPriceInput");
const itemCategoryInput = document.getElementById("itemCategoryInput");
const itemTagInput = document.getElementById("itemTagInput");
const itemImageInput = document.getElementById("itemImageInput");
const removeImageBtn = document.getElementById("removeImageBtn");
const imagePreviewBox = document.getElementById("imagePreviewBox");
const imagePreviewImg = document.getElementById("imagePreviewImg");
const imageSizeInfo = document.getElementById("imageSizeInfo");
const itemDescInput = document.getElementById("itemDescInput");
const itemAddonsInput = document.getElementById("itemAddonsInput");
const saveItemBtn = document.getElementById("saveItemBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const adminSearchInput = document.getElementById("adminSearchInput");
const adminItemsList = document.getElementById("adminItemsList");

function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const val = dict[key];
  return typeof val === "function" ? val(...args) : val;
}

function getStoreTitle() {
  return currentLang === "ar" && storeSettings.nameAr ? storeSettings.nameAr : storeSettings.name;
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

function parseAddons(raw) {
  if (!raw || !raw.trim()) return [];
  return raw
    .split(",")
    .map((chunk, i) => {
      const [name, price] = chunk.split(":");
      const cleanName = (name || "").trim();
      const numPrice = parseFloat((price || "0").trim());
      if (!cleanName || isNaN(numPrice)) return null;
      return { id: `ad_${Date.now()}_${i}`, name: cleanName, price: numPrice };
    })
    .filter(Boolean);
}

function stringifyAddons(addons) {
  if (!Array.isArray(addons) || !addons.length) return "";
  return addons.map(a => `${a.name}:${a.price}`).join(", ");
}

// ===== ৪. ভাষা (EN / AR) ও RTL =====
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
  toggleAdminBtn.textContent = t("adminBtn", isAdminAuthenticated);
  lockAdminBtn.textContent = t("lockAdmin");
  searchInput.placeholder = t("searchPlaceholder");
  document.getElementById("hideSoldOutLabel").textContent = t("hideSoldOut");

  sortSelect.options[0].textContent = t("sortDefault");
  sortSelect.options[1].textContent = t("sortPriceAsc");
  sortSelect.options[2].textContent = t("sortPriceDesc");
  sortSelect.options[3].textContent = t("sortNameAsc");

  const tabs = categoryTabs.querySelectorAll(".tab");
  tabs[0].textContent = t("catAll");
  tabs[1].textContent = t("catDessert");
  tabs[2].textContent = t("catDrinks");
  tabs[3].textContent = t("catCombo");
  tabs[4].textContent = t("catSnacks");

  // Settings & Editor labels
  document.getElementById("settingsHeading").textContent = t("settingsHeading");
  document.getElementById("lblCfgNameEn").textContent = t("lblCfgNameEn");
  document.getElementById("lblCfgNameAr").textContent = t("lblCfgNameAr");
  document.getElementById("lblCfgWhatsapp").textContent = t("lblCfgWhatsapp");
  saveSettingsBtn.textContent = t("saveSettings");

  document.getElementById("editorTitle").textContent = t("editorTitle");
  document.getElementById("editorSubtitle").textContent = t("editorSubtitle");
  document.getElementById("generate300Btn").textContent = t("load300");
  document.getElementById("exportJsonBtn").textContent = t("exportJson");
  document.getElementById("importJsonBtn").textContent = t("importJson");
  document.getElementById("lblItemName").textContent = t("lblItemName");
  document.getElementById("lblItemPrice").textContent = t("lblItemPrice");
  document.getElementById("lblItemCategory").textContent = t("lblItemCategory");
  itemCategoryInput.options[0].textContent = t("catDessert");
  itemCategoryInput.options[1].textContent = t("catDrinks");
  itemCategoryInput.options[2].textContent = t("catCombo");
  itemCategoryInput.options[3].textContent = t("catSnacks");
  document.getElementById("lblItemTag").textContent = t("lblItemTag");
  document.getElementById("lblItemImage").textContent = t("lblItemImage");
  removeImageBtn.textContent = t("removePhoto");
  document.getElementById("lblItemDesc").textContent = t("lblItemDesc");
  document.getElementById("lblItemAddons").textContent = t("lblItemAddons");
  saveItemBtn.textContent = editItemIdInput.value ? t("updateItemBtn") : t("addItemBtn");
  cancelEditBtn.textContent = t("cancelBtn");
  adminSearchInput.placeholder = t("adminSearchPlaceholder");

  // Modals & Checkout
  document.getElementById("openCartBtn").textContent = t("viewOrder");
  document.getElementById("modalItemTitle").textContent = t("customizeTitle");
  document.getElementById("addonsHeading").textContent = t("addonsHeading");
  document.getElementById("lblItemNote").textContent = t("lblItemNote");
  document.getElementById("itemNote").placeholder = t("itemNotePlaceholder");
  document.getElementById("confirmAddBtn").textContent = t("addToOrder");

  document.getElementById("checkoutTitle").textContent = t("checkoutTitle");
  document.getElementById("lblOrderType").textContent = t("lblOrderType");
  document.getElementById("lblDeliveryOption").textContent = t("deliveryOption");
  document.getElementById("lblPickupOption").textContent = t("pickupOption");
  document.getElementById("lblCustomerName").textContent = t("lblCustomerName");
  document.getElementById("customerName").placeholder = t("customerNamePlaceholder");
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

  refreshCatalog(false);
  updateCartUI();
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

// ===== ৫. সহজ কার্ট অপারেশন (কাস্টমারদের জন্য) =====
function getItemCartQty(itemId) {
  return cart
    .filter(c => c.itemId === itemId)
    .reduce((sum, c) => sum + c.qty, 0);
}

window.quickAddItem = function (itemId) {
  const item = allItems.find(x => x.id === itemId);
  if (!item || item.available === false) return;

  // যদি আইটেমের অ্যাড-অন থাকে, তাহলে কাস্টমাইজ মোডাল খুলবে
  if (Array.isArray(item.addons) && item.addons.length > 0) {
    openCustomizeModal(itemId);
    return;
  }

  const key = `${item.id}_default`;
  const idx = cart.findIndex(c => c.key === key);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({
      key,
      itemId: item.id,
      name: item.name,
      nameAr: item.nameAr || item.name,
      addons: [],
      note: "",
      unitPrice: Number(item.price),
      qty: 1
    });
  }

  updateCartUI();
  renderGrid();
};

window.quickChangeItemQty = function (itemId, delta) {
  // সর্বশেষ যুক্ত হওয়া এন্ট্রি বা প্রথম ম্যাচিং আইটেমের qty বদলাবে
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].itemId === itemId) {
      cart[i].qty += delta;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  updateCartUI();
  renderGrid();
};

// ===== ৬. ফিল্টার, সর্ট ও মেনু কার্ড রেন্ডারিং =====
function refreshCatalog(resetLimit = true) {
  if (resetLimit) visibleLimit = APP_META.itemsPerPage;
  itemCounterBadge.textContent = t("itemsCount", allItems.length);

  filteredItems = allItems.filter(item => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSold = !hideSoldOut || item.available !== false;
    const q = searchQuery.toLowerCase();
    const matchText =
      (item.name || "").toLowerCase().includes(q) ||
      (item.nameAr || "").toLowerCase().includes(q) ||
      (item.desc || "").toLowerCase().includes(q) ||
      (item.descAr || "").toLowerCase().includes(q);
    return matchCat && matchSold && matchText;
  });

  if (sortMode === "price-asc") {
    filteredItems.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortMode === "price-desc") {
    filteredItems.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortMode === "name-asc") {
    filteredItems.sort((a, b) => getLocalizedName(a).localeCompare(getLocalizedName(b)));
  }

  renderGrid();
  if (isAdminAuthenticated && !adminPanel.classList.contains("hidden")) {
    renderEditorList();
  }
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
        ? `<span class="card-tag">${tagText}</span>`
        : "";

      const title = getLocalizedName(item);
      const desc = getLocalizedDesc(item);
      const img = item.image
        ? `<img src="${item.image}" alt="${title}" class="menu-card-img" loading="lazy" />`
        : "";

      const qtyInCart = getItemCartQty(item.id);
      const hasOptions = Array.isArray(item.addons) && item.addons.length > 0;

      let actionHtml = "";
      if (!available) {
        actionHtml = `<button type="button" class="btn-add" disabled>${t("soldOutBtn")}</button>`;
      } else if (qtyInCart > 0) {
        actionHtml = `
          <div class="card-qty-stepper">
            <button type="button" onclick="quickChangeItemQty(${item.id}, -1)">-</button>
            <span>${qtyInCart}</span>
            <button type="button" onclick="quickAddItem(${item.id})">+</button>
          </div>
        `;
      } else {
        const optBtn = hasOptions
          ? `<button type="button" class="btn-customize" onclick="openCustomizeModal(${item.id})">${t("customizeBtn")}</button>`
          : "";
        actionHtml = `
          <div class="card-action-group">
            ${optBtn}
            <button type="button" class="btn-add" onclick="quickAddItem(${item.id})">${t("addBtn")}</button>
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
            </div>
            <div class="card-footer">
              <span class="price">${formatPrice(item.price)}</span>
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

hideSoldOutCheckbox.addEventListener("change", e => {
  hideSoldOut = e.target.checked;
  refreshCatalog(true);
});

// ===== ৭. পিন-সুরক্ষিত এডমিন ও ফ্রন্টএন্ড WhatsApp সেটিংস =====
function populateSettingsInputs() {
  cfgStoreNameEn.value = storeSettings.name || "";
  cfgStoreNameAr.value = storeSettings.nameAr || "";
  cfgWhatsappNumber.value = storeSettings.whatsappNumber || "";
}

function lockAdminSession() {
  isAdminAuthenticated = false;
  adminPanel.classList.add("hidden");
  toggleAdminBtn.textContent = t("adminBtn", false);
  toggleAdminBtn.classList.remove("active");
}

toggleAdminBtn.onclick = () => {
  if (!isAdminAuthenticated) {
    const enteredPin = prompt(t("pinPrompt"));
    if (enteredPin === null) return;
    if (enteredPin.trim() !== storeSettings.adminPin) {
      alert(t("wrongPin"));
      return;
    }
    isAdminAuthenticated = true;
    toggleAdminBtn.textContent = t("adminBtn", true);
    toggleAdminBtn.classList.add("active");
    populateSettingsInputs();
    adminPanel.classList.remove("hidden");
    renderEditorList();
    return;
  }

  adminPanel.classList.toggle("hidden");
  if (!adminPanel.classList.contains("hidden")) {
    populateSettingsInputs();
    renderEditorList();
  }
};

lockAdminBtn.onclick = lockAdminSession;

saveSettingsBtn.onclick = () => {
  const cleanPhone = (cfgWhatsappNumber.value || "").replace(/[^\d]/g, "");
  if (!cleanPhone || cleanPhone.length < 7) {
    alert(t("invalidWhatsapp"));
    return;
  }
  saveSettings({
    name: cfgStoreNameEn.value.trim() || DEFAULT_SETTINGS.name,
    nameAr: cfgStoreNameAr.value.trim() || DEFAULT_SETTINGS.nameAr,
    whatsappNumber: cleanPhone
  });
  document.getElementById("storeName").textContent = getStoreTitle();
  alert(t("settingsSaved"));
};

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > APP_META.maxImageWidth) {
          h = Math.round((h * APP_META.maxImageWidth) / w);
          w = APP_META.maxImageWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", APP_META.imageQuality);
        const kb = Math.round((dataUrl.length * 3) / 4 / 1024);
        resolve({ dataUrl, kb });
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setImagePreview(dataUrl, kb = null) {
  formImageData = dataUrl || "";
  if (formImageData) {
    imagePreviewImg.src = formImageData;
    imagePreviewBox.classList.remove("hidden");
    removeImageBtn.classList.remove("hidden");
    const size = kb || Math.round((formImageData.length * 3) / 4 / 1024);
    imageSizeInfo.textContent = t("previewSize", size);
  } else {
    imagePreviewImg.src = "";
    imagePreviewBox.classList.add("hidden");
    removeImageBtn.classList.add("hidden");
    imageSizeInfo.textContent = "";
    itemImageInput.value = "";
  }
}

itemImageInput.onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const { dataUrl, kb } = await compressImage(file);
    setImagePreview(dataUrl, kb);
  } catch {
    alert(t("alertReadJsonError"));
  }
};

removeImageBtn.onclick = () => setImagePreview("");

function resetEditorForm() {
  editItemIdInput.value = "";
  addItemForm.reset();
  setImagePreview("");
  saveItemBtn.textContent = t("addItemBtn");
  cancelEditBtn.classList.add("hidden");
}

cancelEditBtn.onclick = resetEditorForm;

addItemForm.onsubmit = e => {
  e.preventDefault();
  const name = itemNameInput.value.trim();
  const price = parseFloat(itemPriceInput.value);
  const category = itemCategoryInput.value;
  const tag = itemTagInput.value.trim() || "Fresh";
  const desc = itemDescInput.value.trim();
  const addons = parseAddons(itemAddonsInput.value);
  if (!name || isNaN(price) || price < 0) return;

  const editId = editItemIdInput.value;
  if (editId) {
    const idx = allItems.findIndex(x => String(x.id) === String(editId));
    if (idx > -1) {
      const updated = { ...allItems[idx], price, category, addons, image: formImageData };
      if (currentLang === "ar") {
        updated.nameAr = name;
        updated.tagAr = tag;
        updated.descAr = desc;
      } else {
        updated.name = name;
        updated.tag = tag;
        updated.desc = desc;
      }
      allItems[idx] = updated;
    }
  } else {
    allItems.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      name,
      nameAr: name,
      price,
      category,
      tag,
      tagAr: tag,
      desc,
      descAr: desc,
      addons,
      image: formImageData,
      available: true
    });
  }

  saveLocalState();
  refreshCatalog(false);
  resetEditorForm();
};

window.startEditItem = function (id) {
  const item = allItems.find(x => x.id === id);
  if (!item) return;
  editItemIdInput.value = item.id;
  itemNameInput.value = getLocalizedName(item);
  itemPriceInput.value = item.price;
  itemCategoryInput.value = item.category;
  itemTagInput.value = getLocalizedTag(item);
  itemDescInput.value = getLocalizedDesc(item);
  itemAddonsInput.value = stringifyAddons(item.addons);
  setImagePreview(item.image || "");
  saveItemBtn.textContent = t("updateItemBtn");
  cancelEditBtn.classList.remove("hidden");
  adminPanel.scrollIntoView({ behavior: "smooth" });
};

window.toggleStock = function (id) {
  const item = allItems.find(x => x.id === id);
  if (!item) return;
  item.available = item.available === false ? true : false;
  saveLocalState();
  refreshCatalog(false);
};

window.deleteItem = function (id) {
  allItems = allItems.filter(x => x.id !== id);
  saveLocalState();
  refreshCatalog(false);
};

function renderEditorList() {
  const q = adminSearch.toLowerCase();
  const list = allItems.filter(
    x => (x.name || "").toLowerCase().includes(q) || (x.nameAr || "").toLowerCase().includes(q)
  );
  adminItemsList.innerHTML = list
    .slice(0, 60)
    .map(item => {
      const avail = item.available !== false;
      const title = getLocalizedName(item);
      const thumb = item.image
        ? `<img src="${item.image}" alt="${title}" class="admin-thumb" />`
        : `<div class="admin-thumb"></div>`;
      return `
        <div class="admin-item-row">
          <div class="admin-item-left">
            ${thumb}
            <div class="admin-item-info">
              <strong>${title}</strong>
              <span>${formatPrice(item.price)} • ${item.category} ${!avail ? `• [${t("stockOutTag")}]` : ""}</span>
            </div>
          </div>
          <div class="admin-item-btns">
            <button type="button" class="small-btn soldout" onclick="toggleStock(${item.id})">${avail ? t("markSoldOut") : t("markAvailable")}</button>
            <button type="button" class="small-btn" onclick="startEditItem(${item.id})">${t("editBtn")}</button>
            <button type="button" class="small-btn del" onclick="deleteItem(${item.id})">${t("deleteBtn")}</button>
          </div>
        </div>
      `;
    })
    .join("");
}

adminSearchInput.addEventListener("input", e => {
  adminSearch = e.target.value.trim();
  renderEditorList();
});

// ৩০০ ডেমো আইটেম জেনারেটর
document.getElementById("generate300Btn").onclick = () => {
  const cats = ["dessert", "drinks", "combo", "snacks"];
  const tagsEn = ["Bestseller", "New", "Crispy", "Chilled", "Special"];
  const tagsAr = ["الأكثر مبيعاً", "جديد", "مقرمش", "مثلج", "مميز"];
  const demo = [];
  for (let i = 1; i <= 300; i++) {
    const cat = cats[i % cats.length];
    const tIdx = i % tagsEn.length;
    demo.push({
      id: 10000 + i,
      name: `Signature Item #${i}`,
      nameAr: `صنف مميز #${i}`,
      category: cat,
      tag: tagsEn[tIdx],
      tagAr: tagsAr[tIdx],
      price: Number((0.9 + (i % 25) * 0.1).toFixed(3)),
      available: i % 9 !== 0,
      image: "",
      desc: `Frontend catalog test item #${i} (${cat}).`,
      descAr: `صنف تجريبي للواجهة الأمامية #${i} (${cat}).`,
      addons: []
    });
  }
  allItems = demo;
  saveLocalState();
  refreshCatalog(true);
};

// JSON Export / Import
document.getElementById("exportJsonBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(allItems, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "catalog-items.json";
  a.click();
  URL.revokeObjectURL(url);
};

const importJsonInput = document.getElementById("importJsonInput");
document.getElementById("importJsonBtn").onclick = () => importJsonInput.click();

importJsonInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (Array.isArray(data) && data.length) {
        allItems = data;
        saveLocalState();
        refreshCatalog(true);
      } else {
        alert(t("alertInvalidJson"));
      }
    } catch {
      alert(t("alertReadJsonError"));
    }
    importJsonInput.value = "";
  };
  reader.readAsText(file);
};

// ===== ৮. কাস্টমাইজেশন মোডাল (অ্যাড-অন বা নোটের জন্য) =====
const customModal = document.getElementById("customModal");
const modalItemTitle = document.getElementById("modalItemTitle");
const modalItemImg = document.getElementById("modalItemImg");
const modalItemDesc = document.getElementById("modalItemDesc");
const addonsList = document.getElementById("addonsList");
const itemNoteInput = document.getElementById("itemNote");
const modalQtyValue = document.getElementById("modalQtyValue");

window.openCustomizeModal = function (id) {
  currentModalItem = allItems.find(x => x.id === id);
  if (!currentModalItem) return;

  modalQty = 1;
  modalQtyValue.textContent = modalQty;
  modalItemTitle.textContent = getLocalizedName(currentModalItem);
  modalItemDesc.textContent = getLocalizedDesc(currentModalItem);
  itemNoteInput.value = "";

  if (currentModalItem.image) {
    modalItemImg.src = currentModalItem.image;
    modalItemImg.classList.remove("hidden");
  } else {
    modalItemImg.src = "";
    modalItemImg.classList.add("hidden");
  }

  if (currentModalItem.addons && currentModalItem.addons.length) {
    addonsList.innerHTML = currentModalItem.addons
      .map(
        a => `
        <label class="addon-item">
          <span>
            <input type="checkbox" value="${a.id}" data-name="${a.name}" data-price="${a.price}" />
            ${a.name}
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
  const checked = Array.from(addonsList.querySelectorAll("input:checked")).map(cb => ({
    id: cb.value,
    name: cb.dataset.name,
    price: parseFloat(cb.dataset.price)
  }));
  const addonsSum = checked.reduce((s, a) => s + a.price, 0);
  const unitPrice = Number(currentModalItem.price) + addonsSum;
  const note = itemNoteInput.value.trim();
  const key = `${currentModalItem.id}_${checked.map(a => a.id).sort().join("-")}_${note}`;

  const existing = cart.findIndex(c => c.key === key);
  if (existing > -1) {
    cart[existing].qty += modalQty;
  } else {
    cart.push({
      key,
      itemId: currentModalItem.id,
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

// ===== ৯. লাইভ লোকেশন (GPS) ও WhatsApp চেকআউট =====
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
      const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
      customerAddressInput.value = mapLink;
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
        const displayName = currentLang === "ar" && item.nameAr ? item.nameAr : item.name;
        return `
        <div class="cart-item-row">
          <div class="cart-item-details">
            <h4>${displayName}</h4>
            ${item.addons.length ? `<div class="cart-item-meta">+ ${item.addons.map(a => a.name).join(", ")}</div>` : ""}
            ${item.note ? `<div class="cart-item-meta">${item.note}</div>` : ""}
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
  const name = document.getElementById("customerName").value.trim();
  const type = document.querySelector('input[name="orderType"]:checked').value;
  const address = customerAddressInput.value.trim();
  const note = document.getElementById("orderNote").value.trim();

  if (!name) return alert(t("alertNameRequired"));
  if (type === "Delivery" && !address) return alert(t("alertAddressRequired"));

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const storeTitle = getStoreTitle();
  const cleanPhone = (storeSettings.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber).replace(/[^\d]/g, "");

  const lines = [
    t("waHeader", storeTitle),
    `-------------------------`,
    t("waCustomer", name),
    t("waType", type)
  ];
  if (type === "Delivery") lines.push(t("waAddress", address));
  if (note) lines.push(t("waNote", note));
  lines.push(`-------------------------`, t("waItems"));

  cart.forEach((item, i) => {
    const itemLabel = currentLang === "ar" && item.nameAr ? item.nameAr : item.name;
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

applyLanguage(currentLang);
