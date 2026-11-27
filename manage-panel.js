const SUPABASE_CONFIG = {
  url: "https://YOUR-PROJECT-ID.supabase.co",
  anonKey: "YOUR-SUPABASE-ANON-KEY",
  table: "menu_items",
  bucket: "menu-images"
};

const DEFAULT_SETTINGS = {
  name: "Oman Quick Burger",
  nameAr: "عمان كويك برجر",
  whatsappNumber: "96890000000",
  currency: "OMR",
  decimals: 3
};

const APP_META = {
  categoriesKey: "oman_quick_burger_categories_v1",
  settingsKey: "oman_quick_burger_settings_v1",
  sessionKey: "oman_quick_burger_sb_session_v1",
  maxImageWidth: 800,
  imageQuality: 0.78
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

let storeSettings = loadSettings();
let categoriesList = loadCategories();
let authSession = loadSession();
let allItems = [];
let adminSearch = "";
let pendingImageBlob = null;
let formImageUrl = "";

const loginSection = document.getElementById("loginSection");
const managementSection = document.getElementById("managementSection");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

const cfgStoreNameEn = document.getElementById("cfgStoreNameEn");
const cfgStoreNameAr = document.getElementById("cfgStoreNameAr");
const cfgWhatsappNumber = document.getElementById("cfgWhatsappNumber");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const addCategoryForm = document.getElementById("addCategoryForm");
const newCatEnInput = document.getElementById("newCatEnInput");
const newCatArInput = document.getElementById("newCatArInput");
const adminCategoryChips = document.getElementById("adminCategoryChips");

const addItemForm = document.getElementById("addItemForm");
const editItemIdInput = document.getElementById("editItemId");
const itemNameInput = document.getElementById("itemNameInput");
const itemPriceInput = document.getElementById("itemPriceInput");
const itemVariantsInput = document.getElementById("itemVariantsInput");
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

function loadSettings() {
  try {
    const raw = localStorage.getItem(APP_META.settingsKey);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(next) {
  storeSettings = { ...storeSettings, ...next };
  localStorage.setItem(APP_META.settingsKey, JSON.stringify(storeSettings));
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

function saveCategories() {
  localStorage.setItem(APP_META.categoriesKey, JSON.stringify(categoriesList));
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(APP_META.sessionKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(sess) {
  authSession = sess;
  if (sess) {
    sessionStorage.setItem(APP_META.sessionKey, JSON.stringify(sess));
  } else {
    sessionStorage.removeItem(APP_META.sessionKey);
  }
}

function getAuthHeaders(extra = {}) {
  const token = authSession?.access_token || SUPABASE_CONFIG.anonKey;
  return {
    apikey: SUPABASE_CONFIG.anonKey,
    Authorization: `Bearer ${token}`,
    ...extra
  };
}

async function signInWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.msg || "Invalid credentials");
  }
  return data;
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

function mapItemToPayload(item) {
  return {
    name: item.name,
    name_ar: item.nameAr || item.name,
    category: item.category,
    tag: item.tag || "",
    tag_ar: item.tagAr || item.tag || "",
    price: Number(item.price || 0),
    variants: Array.isArray(item.variants) ? item.variants : [],
    addons: Array.isArray(item.addons) ? item.addons : [],
    desc_en: item.desc || "",
    desc_ar: item.descAr || item.desc || "",
    image_url: item.image || "",
    available: item.available !== false
  };
}

async function sbFetchItems() {
  const res = await fetch(
    `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?select=*&order=id.asc`,
    { headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to load items");
  const rows = await res.json();
  return Array.isArray(rows) ? rows.map(mapRowToItem) : [];
}

async function sbInsertItem(item) {
  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}`, {
    method: "POST",
    headers: getAuthHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation"
    }),
    body: JSON.stringify(mapItemToPayload(item))
  });
  if (!res.ok) throw new Error("Failed to insert item");
  const created = await res.json();
  return Array.isArray(created) && created.length ? mapRowToItem(created[0]) : null;
}

async function sbUpdateItem(id, item) {
  const res = await fetch(
    `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
        Prefer: "return=representation"
      }),
      body: JSON.stringify(mapItemToPayload(item))
    }
  );
  if (!res.ok) throw new Error("Failed to update item");
  const updated = await res.json();
  return Array.isArray(updated) && updated.length ? mapRowToItem(updated[0]) : null;
}

async function sbDeleteItem(id) {
  const res = await fetch(
    `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: getAuthHeaders()
    }
  );
  if (!res.ok) throw new Error("Failed to delete item");
}

async function sbUploadImageBlob(blob, fileName = "item.jpg") {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const objectPath = `items/${Date.now()}_${Math.floor(Math.random() * 10000)}_${safeName}`;
  const uploadUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/${SUPABASE_CONFIG.bucket}/${objectPath}`;
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: getAuthHeaders({
      "Content-Type": blob.type || "image/jpeg",
      "x-upsert": "true"
    }),
    body: blob
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return `${SUPABASE_CONFIG.url}/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/${objectPath}`;
}

function formatPrice(amount) {
  return `${Number(amount).toFixed(storeSettings.decimals)} ${storeSettings.currency}`;
}

function parseNamePriceList(raw, prefix = "opt") {
  if (!raw || !raw.trim()) return [];
  return raw
    .split(",")
    .map((chunk, i) => {
      const [name, price] = chunk.split(":");
      const cleanName = (name || "").trim();
      const numPrice = parseFloat((price || "0").trim());
      if (!cleanName || isNaN(numPrice)) return null;
      return { id: `${prefix}_${Date.now()}_${i}`, name: cleanName, price: numPrice };
    })
    .filter(Boolean);
}

function stringifyNamePriceList(list) {
  return Array.isArray(list) && list.length ? list.map(a => `${a.name}:${a.price}`).join(", ") : "";
}

function renderCategoriesUI() {
  const selectableCats = categoriesList.filter(c => c.id !== "all");
  const prev = itemCategoryInput.value;
  itemCategoryInput.innerHTML = selectableCats
    .map(cat => `<option value="${cat.id}">${cat.en}</option>`)
    .join("");
  if (selectableCats.some(c => c.id === prev)) itemCategoryInput.value = prev;

  adminCategoryChips.innerHTML = selectableCats
    .map(cat => {
      const del = cat.custom
        ? `<button type="button" class="cat-del-btn" onclick="deleteCustomCategory('${cat.id}')">&times;</button>`
        : "";
      return `<span class="cat-chip-item">${cat.en}${del}</span>`;
    })
    .join("");
}

addCategoryForm.onsubmit = e => {
  e.preventDefault();
  const enName = newCatEnInput.value.trim();
  const arName = newCatArInput.value.trim() || enName;
  if (!enName) return;
  const slug = enName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `cat-${Date.now()}`;
  if (categoriesList.some(c => c.id === slug || c.en.toLowerCase() === enName.toLowerCase())) {
    alert("Category already exists.");
    return;
  }
  categoriesList.push({ id: slug, en: enName, ar: arName, custom: true });
  saveCategories();
  newCatEnInput.value = "";
  newCatArInput.value = "";
  renderCategoriesUI();
  itemCategoryInput.value = slug;
};

window.deleteCustomCategory = function (catId) {
  categoriesList = categoriesList.filter(c => c.id !== catId);
  saveCategories();
  renderCategoriesUI();
};

saveSettingsBtn.onclick = () => {
  const cleanPhone = (cfgWhatsappNumber.value || "").replace(/[^\d]/g, "");
  if (!cleanPhone || cleanPhone.length < 7) {
    alert("Please enter a valid WhatsApp number.");
    return;
  }
  saveSettings({
    name: cfgStoreNameEn.value.trim() || DEFAULT_SETTINGS.name,
    nameAr: cfgStoreNameAr.value.trim() || DEFAULT_SETTINGS.nameAr,
    whatsappNumber: cleanPhone
  });
  alert("Settings saved!");
};

function compressImageToBlob(file) {
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
        const previewUrl = canvas.toDataURL("image/jpeg", APP_META.imageQuality);
        canvas.toBlob(
          blob => {
            if (!blob) return reject(new Error("Blob failed"));
            resolve({ blob, previewUrl, kb: Math.max(1, Math.round(blob.size / 1024)) });
          },
          "image/jpeg",
          APP_META.imageQuality
        );
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setImagePreview(url, kb = null) {
  if (url) {
    imagePreviewImg.src = url;
    imagePreviewBox.classList.remove("hidden");
    removeImageBtn.classList.remove("hidden");
    imageSizeInfo.textContent = kb ? `Compressed size: ~${kb} KB` : url;
  } else {
    pendingImageBlob = null;
    formImageUrl = "";
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
  const { blob, previewUrl, kb } = await compressImageToBlob(file);
  pendingImageBlob = blob;
  setImagePreview(previewUrl, kb);
};

removeImageBtn.onclick = () => setImagePreview("");

function resetEditorForm() {
  editItemIdInput.value = "";
  const prevCat = itemCategoryInput.value;
  addItemForm.reset();
  if (prevCat) itemCategoryInput.value = prevCat;
  setImagePreview("");
  saveItemBtn.textContent = "+ Add Item";
  cancelEditBtn.classList.add("hidden");
}

cancelEditBtn.onclick = resetEditorForm;

addItemForm.onsubmit = async e => {
  e.preventDefault();
  const name = itemNameInput.value.trim();
  const rawPrice = parseFloat(itemPriceInput.value);
  const parsedVariants = parseNamePriceList(itemVariantsInput.value, "var");
  const variants = parsedVariants.length >= 2 ? parsedVariants : [];
  const category = itemCategoryInput.value;
  const tag = itemTagInput.value.trim() || "Fresh";
  const desc = itemDescInput.value.trim();
  const addons = parseNamePriceList(itemAddonsInput.value, "ad");
  if (!name || isNaN(rawPrice) || rawPrice < 0) return;

  const price = variants.length ? variants[0].price : rawPrice;
  let finalImageUrl = formImageUrl;

  try {
    if (pendingImageBlob) {
      finalImageUrl = await sbUploadImageBlob(pendingImageBlob, `${name}.jpg`);
    }
    const editId = editItemIdInput.value;
    if (editId) {
      const idx = allItems.findIndex(x => String(x.id) === String(editId));
      const base = idx > -1 ? { ...allItems[idx] } : { id: editId, available: true };
      const updated = { ...base, name, price, variants, category, tag, desc, addons, image: finalImageUrl };
      const saved = await sbUpdateItem(editId, updated);
      if (saved && idx > -1) allItems[idx] = saved;
    } else {
      const created = await sbInsertItem({
        name,
        nameAr: name,
        price,
        variants,
        category,
        tag,
        tagAr: tag,
        desc,
        descAr: desc,
        addons,
        image: finalImageUrl,
        available: true
      });
      if (created) allItems.push(created);
    }
    renderEditorList();
    resetEditorForm();
  } catch (err) {
    alert(err.message || "Operation failed. Check Supabase Auth & RLS.");
  }
};

window.startEditItem = function (id) {
  const item = allItems.find(x => String(x.id) === String(id));
  if (!item) return;
  editItemIdInput.value = item.id;
  itemNameInput.value = item.name;
  itemPriceInput.value = item.price;
  itemVariantsInput.value = item.variants.length >= 2 ? stringifyNamePriceList(item.variants) : "";
  itemCategoryInput.value = item.category;
  itemTagInput.value = item.tag || "";
  itemDescInput.value = item.desc || "";
  itemAddonsInput.value = stringifyNamePriceList(item.addons);
  pendingImageBlob = null;
  formImageUrl = item.image || "";
  setImagePreview(item.image || "");
  saveItemBtn.textContent = "Save Changes";
  cancelEditBtn.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.toggleStock = async function (id) {
  const item = allItems.find(x => String(x.id) === String(id));
  if (!item) return;
  item.available = item.available === false ? true : false;
  await sbUpdateItem(item.id, item);
  renderEditorList();
};

window.deleteItem = async function (id) {
  await sbDeleteItem(id);
  allItems = allItems.filter(x => String(x.id) !== String(id));
  renderEditorList();
};

function renderEditorList() {
  const q = adminSearch.toLowerCase();
  const list = allItems.filter(x => (x.name || "").toLowerCase().includes(q));
  adminItemsList.innerHTML = list
    .map(item => {
      const avail = item.available !== false;
      const thumb = item.image
        ? `<img src="${item.image}" alt="${item.name}" class="admin-thumb" />`
        : `<div class="admin-thumb"></div>`;
      return `
        <div class="admin-item-row">
          <div class="admin-item-left">
            ${thumb}
            <div class="admin-item-info">
              <strong>${item.name}</strong>
              <span>${formatPrice(item.price)} • ${item.category} ${!avail ? "• [Stock Out]" : ""}</span>
            </div>
          </div>
          <div class="admin-item-btns">
            <button type="button" class="small-btn soldout" onclick="toggleStock('${item.id}')">${avail ? "Stock Out" : "Available"}</button>
            <button type="button" class="small-btn" onclick="startEditItem('${item.id}')">Edit</button>
            <button type="button" class="small-btn del" onclick="deleteItem('${item.id}')">Delete</button>
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

async function showAuthenticatedPanel() {
  loginSection.classList.add("hidden");
  managementSection.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  cfgStoreNameEn.value = storeSettings.name || "";
  cfgStoreNameAr.value = storeSettings.nameAr || "";
  cfgWhatsappNumber.value = storeSettings.whatsappNumber || "";
  renderCategoriesUI();
  allItems = await sbFetchItems();
  renderEditorList();
}

loginForm.onsubmit = async e => {
  e.preventDefault();
  loginError.textContent = "";
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  try {
    const sess = await signInWithEmail(email, password);
    saveSession(sess);
    await showAuthenticatedPanel();
  } catch (err) {
    loginError.textContent = err.message || "Sign in failed";
  }
};

logoutBtn.onclick = () => {
  saveSession(null);
  managementSection.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  loginSection.classList.remove("hidden");
};

if (authSession?.access_token) {
  showAuthenticatedPanel().catch(() => {
    saveSession(null);
  });
}
