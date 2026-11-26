// ===== ১. স্টোর ও Supabase কনফিগারেশন =====
const STORE_CONFIG = {
  name: "Velvet Crumb & Treats",
  whatsappNumber: "96899160237", // আপনার WhatsApp নম্বর
  currency: "OMR",
  decimals: 3,
  deliveryFee: 0.000,
  adminPin: "1234", // এডমিন প্যানেল খোলার পিন কোড (পরিবর্তন করে নিন)
  itemsPerPage: 20, // একসাথে ২০টি আইটেম লোড হবে (৩০০+ আইটেম ফাস্ট রাখার জন্য)
  maxImageWidth: 700,
  imageQuality: 0.78
};

// আপনার Supabase Project Settings -> API থেকে নিচের দুটি তথ্য বসান:
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const BUCKET_NAME = "menu-images";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== ২. স্টেট ম্যানেজমেন্ট =====
let allMenuItems = [];
let filteredItems = [];
let displayedCount = STORE_CONFIG.itemsPerPage;
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let adminSearchQuery = "";
let currentModalItem = null;
let modalQty = 1;
let pendingImageBlob = null;
let isAdminUnlocked = sessionStorage.getItem("admin_unlocked") === "true";

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const loadingSpinner = document.getElementById("loadingSpinner");
const itemCounterBadge = document.getElementById("itemCounterBadge");
const loadMoreWrap = document.getElementById("loadMoreWrap");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const categoryTabs = document.getElementById("categoryTabs");
const searchInput = document.getElementById("searchInput");
const floatingCartBar = document.getElementById("floatingCartBar");
const cartItemCount = document.getElementById("cartItemCount");
const cartTotalPreview = document.getElementById("cartTotalPreview");

// Admin DOM Elements
const toggleAdminBtn = document.getElementById("toggleAdminBtn");
const logoutAdminBtn = document.getElementById("logoutAdminBtn");
const adminPanel = document.getElementById("adminPanel");
const addItemForm = document.getElementById("addItemForm");
const editItemIdInput = document.getElementById("editItemId");
const existingImageUrlInput = document.getElementById("existingImageUrl");
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

function formatPrice(amount) {
  return `${Number(amount).toFixed(STORE_CONFIG.decimals)} ${STORE_CONFIG.currency}`;
}

function parseAddonsText(rawText) {
  if (!rawText || !rawText.trim()) return [];
  return rawText
    .split(",")
    .map((part, idx) => {
      const [namePart, pricePart] = part.split(":");
      const name = (namePart || "").trim();
      const price = parseFloat((pricePart || "0").trim());
      if (!name || isNaN(price)) return null;
      return { id: `addon_${Date.now()}_${idx}`, name, price };
    })
    .filter(Boolean);
}

function formatAddonsText(addons) {
  if (!Array.isArray(addons) || addons.length === 0) return "";
  return addons.map(a => `${a.name}:${a.price}`).join(", ");
}

// ===== ৩. Supabase থেকে ডেটা লোড =====
async function fetchMenuItems() {
  loadingSpinner.classList.remove("hidden");
  const { data, error } = await supabaseClient
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  loadingSpinner.classList.add("hidden");

  if (error) {
    console.error("Error fetching menu:", error);
    menuGrid.innerHTML = `<p style="color:#ef4444; grid-column:1/-1; text-align:center;">ডাটাবেস কানেক্ট হয়নি! app.js ফাইলে SUPABASE_URL এবং KEY চেক করুন।</p>`;
    return;
  }

  allMenuItems = data || [];
  itemCounterBadge.textContent = `${allMenuItems.length} টি আইটেম`;
  applyFiltersAndRender(true);
  if (isAdminUnlocked) renderAdminList();
}

// ===== ৪. ছবি কম্প্রেস ও Supabase Storage-এ আপলোড =====
function compressImageToBlob(file, maxWidth = STORE_CONFIG.maxImageWidth, quality = STORE_CONFIG.imageQuality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (!blob) return reject("Compression failed");
            resolve({
              blob,
              previewUrl: URL.createObjectURL(blob),
              sizeKB: Math.round(blob.size / 1024)
            });
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImageToSupabase(blob) {
  const fileName = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.jpg`;
  const { error } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .upload(fileName, blob, { contentType: "image/jpeg" });

  if (error) throw error;

  const { data } = supabaseClient.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  return data.publicUrl;
}

itemImageInput.onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const { blob, previewUrl, sizeKB } = await compressImageToBlob(file);
    pendingImageBlob = blob;
    imagePreviewImg.src = previewUrl;
    imageSizeInfo.textContent = `আপলোডের জন্য প্রস্তুত (~${sizeKB} KB)`;
    imagePreviewBox.classList.remove("hidden");
    removeImageBtn.classList.remove("hidden");
  } catch {
    alert("ছবিটি প্রসেস করা যায়নি।");
  }
};

removeImageBtn.onclick = () => {
  pendingImageBlob = null;
  existingImageUrlInput.value = "";
  itemImageInput.value = "";
  imagePreviewImg.src = "";
  imagePreviewBox.classList.add("hidden");
  removeImageBtn.classList.add("hidden");
};

// ===== ৫. মেনু ফিল্টার ও Pagination রেন্ডারিং =====
function applyFiltersAndRender(resetPagination = true) {
  if (resetPagination) {
    displayedCount = STORE_CONFIG.itemsPerPage;
  }

  filteredItems = allMenuItems.filter(item => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  renderMenu();
}

function renderMenu() {
  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `<p style="color:#9ca3af; grid-column:1/-1; text-align:center; padding:30px 0;">কোনো আইটেম পাওয়া যায়নি।</p>`;
    loadMoreWrap.classList.add("hidden");
    return;
  }

  const visibleItems = filteredItems.slice(0, displayedCount);

  menuGrid.innerHTML = visibleItems
    .map(item => {
      const isAvailable = item.available !== false;
      const badgeHtml = !isAvailable
        ? `<span class="card-tag out-tag">Stock Out</span>`
        : item.tag
        ? `<span class="card-tag">${item.tag}</span>`
        : "";

      const imgHtml = item.image_url
        ? `<img src="${item.image_url}" alt="${item.name}" class="menu-card-img" loading="lazy" />`
        : "";

      return `
        <article class="menu-card ${!isAvailable ? "unavailable" : ""}">
          ${imgHtml}
          <div class="menu-card-body">
            <div>
              ${badgeHtml}
              <h3>${item.name}</h3>
              <p>${item.description || ""}</p>
            </div>
            <div class="card-footer">
              <span class="price">${formatPrice(item.price)}</span>
              <button class="btn-add" ${!isAvailable ? "disabled" : ""} onclick="openCustomizeModal(${item.id})">
                ${isAvailable ? "+ যোগ করুন" : "শেষ"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (displayedCount < filteredItems.length) {
    loadMoreWrap.classList.remove("hidden");
    loadMoreBtn.textContent = `আরও দেখুন (${filteredItems.length - displayedCount} টি বাকি)`;
  } else {
    loadMoreWrap.classList.add("hidden");
  }
}

loadMoreBtn.onclick = () => {
  displayedCount += STORE_CONFIG.itemsPerPage;
  renderMenu();
};

// Category & Search
categoryTabs.addEventListener("click", e => {
  if (!e.target.classList.contains("tab")) return;
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");
  activeCategory = e.target.dataset.category;
  applyFiltersAndRender(true);
});

searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.trim();
  applyFiltersAndRender(true);
});

// ===== ৬. পিন-প্রোটেক্টেড এডমিন প্যানেল =====
toggleAdminBtn.onclick = () => {
  if (!isAdminUnlocked) {
    const enteredPin = prompt("এডমিন পিন কোড দিন:");
    if (enteredPin !== STORE_CONFIG.adminPin) {
      if (enteredPin !== null) alert("ভুল পিন কোড!");
      return;
    }
    isAdminUnlocked = true;
    sessionStorage.setItem("admin_unlocked", "true");
  }

  adminPanel.classList.toggle("hidden");
  toggleAdminBtn.classList.toggle("active");
  if (!adminPanel.classList.contains("hidden")) {
    renderAdminList();
  }
};

logoutAdminBtn.onclick = () => {
  isAdminUnlocked = false;
  sessionStorage.removeItem("admin_unlocked");
  adminPanel.classList.add("hidden");
  toggleAdminBtn.classList.remove("active");
};

function renderAdminList() {
  const filteredAdmin = allMenuItems.filter(item =>
    item.name.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );

  adminItemsList.innerHTML = filteredAdmin
    .slice(0, 50) // একসাথে ৫০টি দেখাবে সার্চের সুবিধার্থে
    .map(item => {
      const isAvailable = item.available !== false;
      const thumbHtml = item.image_url
        ? `<img src="${item.image_url}" alt="${item.name}" class="admin-thumb" />`
        : `<div class="admin-thumb"></div>`;

      return `
        <div class="admin-item-row">
          <div class="admin-item-left">
            ${thumbHtml}
            <div class="admin-item-info">
              <strong>${item.name}</strong>
              <span>${formatPrice(item.price)} • ${item.category} ${!isAvailable ? "• [Stock Out]" : ""}</span>
            </div>
          </div>
          <div class="admin-item-btns">
            <button type="button" class="small-btn soldout" onclick="toggleStock(${item.id}, ${isAvailable})">
              ${isAvailable ? "Stock Out" : "Available"}
            </button>
            <button type="button" class="small-btn" onclick="startEditItem(${item.id})">এডিট</button>
            <button type="button" class="small-btn del" onclick="deleteMenuItem(${item.id})">ডিলিট</button>
          </div>
        </div>
      `;
    })
    .join("");
}

adminSearchInput.addEventListener("input", e => {
  adminSearchQuery = e.target.value.trim();
  renderAdminList();
});

function resetAdminForm() {
  editItemIdInput.value = "";
  existingImageUrlInput.value = "";
  pendingImageBlob = null;
  addItemForm.reset();
  imagePreviewBox.classList.add("hidden");
  removeImageBtn.classList.add("hidden");
  saveItemBtn.textContent = "+ সার্ভারে সেভ করুন";
  saveItemBtn.disabled = false;
  cancelEditBtn.classList.add("hidden");
}

cancelEditBtn.onclick = resetAdminForm;

// নতুন আইটেম সেভ বা আপডেট
addItemForm.onsubmit = async e => {
  e.preventDefault();
  const name = itemNameInput.value.trim();
  const price = parseFloat(itemPriceInput.value);
  const category = itemCategoryInput.value;
  const tag = itemTagInput.value.trim() || "Fresh";
  const description = itemDescInput.value.trim();
  const addons = parseAddonsText(itemAddonsInput.value);

  if (!name || isNaN(price) || price < 0) return;

  saveItemBtn.disabled = true;
  saveItemBtn.textContent = "আপলোড হচ্ছে, অপেক্ষা করুন...";

  try {
    let finalImageUrl = existingImageUrlInput.value || "";

    if (pendingImageBlob) {
      finalImageUrl = await uploadImageToSupabase(pendingImageBlob);
    }

    const editingId = editItemIdInput.value;
    const payload = {
      name,
      price,
      category,
      tag,
      description,
      addons,
      image_url: finalImageUrl
    };

    if (editingId) {
      const { error } = await supabaseClient
        .from("menu_items")
        .update(payload)
        .eq("id", editingId);
      if (error) throw error;
    } else {
      payload.available = true;
      const { error } = await supabaseClient
        .from("menu_items")
        .insert([payload]);
      if (error) throw error;
    }

    resetAdminForm();
    await fetchMenuItems();
  } catch (err) {
    console.error("Save error:", err);
    alert("সেভ করতে সমস্যা হয়েছে! Supabase Storage বা Table পলিসি চেক করুন।");
    saveItemBtn.disabled = false;
    saveItemBtn.textContent = "+ সার্ভারে সেভ করুন";
  }
};

window.startEditItem = function (id) {
  const item = allMenuItems.find(i => i.id === id);
  if (!item) return;
  editItemIdInput.value = item.id;
  itemNameInput.value = item.name;
  itemPriceInput.value = item.price;
  itemCategoryInput.value = item.category;
  itemTagInput.value = item.tag || "";
  itemDescInput.value = item.description || "";
  itemAddonsInput.value = formatAddonsText(item.addons);
  existingImageUrlInput.value = item.image_url || "";
  pendingImageBlob = null;

  if (item.image_url) {
    imagePreviewImg.src = item.image_url;
    imageSizeInfo.textContent = "বর্তমান ছবি";
    imagePreviewBox.classList.remove("hidden");
    removeImageBtn.classList.remove("hidden");
  } else {
    imagePreviewBox.classList.add("hidden");
    removeImageBtn.classList.add("hidden");
  }

  saveItemBtn.textContent = "পরিবর্তন সেভ করুন";
  cancelEditBtn.classList.remove("hidden");
  adminPanel.scrollIntoView({ behavior: "smooth" });
};

window.toggleStock = async function (id, currentStatus) {
  const { error } = await supabaseClient
    .from("menu_items")
    .update({ available: !currentStatus })
    .eq("id", id);

  if (!error) await fetchMenuItems();
};

window.deleteMenuItem = async function (id) {
  if (!confirm("আপনি কি নিশ্চিত এই আইটেমটি ডিলিট করতে চান?")) return;
  const { error } = await supabaseClient
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (!error) await fetchMenuItems();
};

// ===== ৭. কাস্টমাইজেশন মোডাল =====
const customModal = document.getElementById("customModal");
const modalItemTitle = document.getElementById("modalItemTitle");
const modalItemImg = document.getElementById("modalItemImg");
const modalItemDesc = document.getElementById("modalItemDesc");
const addonsList = document.getElementById("addonsList");
const itemNoteInput = document.getElementById("itemNote");
const modalQtyValue = document.getElementById("modalQtyValue");

window.openCustomizeModal = function (itemId) {
  currentModalItem = allMenuItems.find(i => i.id === itemId);
  if (!currentModalItem) return;

  modalQty = 1;
  modalQtyValue.textContent = modalQty;
  modalItemTitle.textContent = currentModalItem.name;
  modalItemDesc.textContent = currentModalItem.description || "";
  itemNoteInput.value = "";

  if (currentModalItem.image_url) {
    modalItemImg.src = currentModalItem.image_url;
    modalItemImg.classList.remove("hidden");
  } else {
    modalItemImg.src = "";
    modalItemImg.classList.add("hidden");
  }

  if (currentModalItem.addons && currentModalItem.addons.length > 0) {
    addonsList.innerHTML = currentModalItem.addons
      .map(
        addon => `
        <label class="addon-item">
          <span>
            <input type="checkbox" value="${addon.id}" data-name="${addon.name}" data-price="${addon.price}" />
            ${addon.name}
          </span>
          <span>+${formatPrice(addon.price)}</span>
        </label>
      `
      )
      .join("");
  } else {
    addonsList.innerHTML = `<p style="font-size:0.82rem; color:#9ca3af;">এই আইটেমের জন্য কোনো এক্সট্রা টপিংস নেই।</p>`;
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
  const checkedAddons = Array.from(addonsList.querySelectorAll("input:checked")).map(cb => ({
    id: cb.value,
    name: cb.dataset.name,
    price: parseFloat(cb.dataset.price)
  }));

  const addonsTotal = checkedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = Number(currentModalItem.price) + addonsTotal;
  const note = itemNoteInput.value.trim();
  const configKey = `${currentModalItem.id}_${checkedAddons.map(a => a.id).sort().join("-")}_${note}`;

  const existingIndex = cart.findIndex(c => c.configKey === configKey);
  if (existingIndex > -1) {
    cart[existingIndex].qty += modalQty;
  } else {
    cart.push({
      configKey,
      name: currentModalItem.name,
      basePrice: Number(currentModalItem.price),
      addons: checkedAddons,
      note,
      unitPrice,
      qty: modalQty
    });
  }

  customModal.classList.add("hidden");
  updateCartUI();
};

// ===== ৮. কার্ট ও বিল ক্যালকুলেশন =====
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  if (totalItems === 0) {
    floatingCartBar.classList.add("hidden");
  } else {
    floatingCartBar.classList.remove("hidden");
    cartItemCount.textContent = `${totalItems} টি আইটেম নির্বাচিত`;
    cartTotalPreview.textContent = formatPrice(subtotal);
  }

  renderCheckoutCart();
}

const checkoutModal = document.getElementById("checkoutModal");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const subtotalAmount = document.getElementById("subtotalAmount");
const deliveryAmount = document.getElementById("deliveryAmount");
const grandTotalAmount = document.getElementById("grandTotalAmount");
const addressGroup = document.getElementById("addressGroup");

document.getElementById("openCartBtn").onclick = () => {
  renderCheckoutCart();
  checkoutModal.classList.remove("hidden");
};

document.getElementById("closeCheckoutModal").onclick = () => checkoutModal.classList.add("hidden");

document.querySelectorAll('input[name="orderType"]').forEach(radio => {
  radio.addEventListener("change", e => {
    if (e.target.value === "Pickup") {
      addressGroup.classList.add("hidden");
    } else {
      addressGroup.classList.remove("hidden");
    }
    renderCheckoutCart();
  });
});

function renderCheckoutCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="color:#9ca3af; text-align:center; padding:16px 0;">আপনার কার্ট খালি।</p>`;
  } else {
    cartItemsContainer.innerHTML = cart
      .map((item, idx) => {
        const addonText = item.addons.length ? `+ ${item.addons.map(a => a.name).join(", ")}` : "";
        const noteText = item.note ? `নোট: "${item.note}"` : "";
        return `
          <div class="cart-item-row">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              ${addonText ? `<div class="cart-item-meta">${addonText}</div>` : ""}
              ${noteText ? `<div class="cart-item-meta">${noteText}</div>` : ""}
              <div class="cart-item-meta">${formatPrice(item.unitPrice)} × ${item.qty} = <strong>${formatPrice(item.unitPrice * item.qty)}</strong></div>
            </div>
            <div class="cart-item-actions">
              <button class="mini-btn" onclick="changeCartQty(${idx}, -1)">-</button>
              <span>${item.qty}</span>
              <button class="mini-btn" onclick="changeCartQty(${idx}, 1)">+</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const orderType = document.querySelector('input[name="orderType"]:checked').value;
  const delivery = cart.length > 0 && orderType === "Delivery" ? STORE_CONFIG.deliveryFee : 0;
  const grandTotal = subtotal + delivery;

  subtotalAmount.textContent = formatPrice(subtotal);
  deliveryAmount.textContent = formatPrice(delivery);
  grandTotalAmount.textContent = formatPrice(grandTotal);
}

window.changeCartQty = function (index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
  if (cart.length === 0) {
    checkoutModal.classList.add("hidden");
  }
};

// ===== ৯. WhatsApp অর্ডার মেসেজ জেনারেটর =====
document.getElementById("sendWhatsappBtn").onclick = () => {
  if (cart.length === 0) {
    alert("দয়া করে আগে অন্তত একটি আইটেম কার্টে যোগ করুন।");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const orderType = document.querySelector('input[name="orderType"]:checked').value;
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const orderNote = document.getElementById("orderNote").value.trim();

  if (!customerName) {
    alert("আপনার নাম লিখুন।");
    return;
  }

  if (orderType === "Delivery" && !customerAddress) {
    alert("ডেলিভারির জন্য আপনার ঠিকানা বা লোকেশন লিখুন।");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const delivery = orderType === "Delivery" ? STORE_CONFIG.deliveryFee : 0;
  const grandTotal = subtotal + delivery;

  let lines = [
    `*নতুন অর্ডার - ${STORE_CONFIG.name}*`,
    `-------------------------`,
    `*কাস্টমার:* ${customerName}`,
    `*অর্ডার টাইপ:* ${orderType}`,
  ];

  if (orderType === "Delivery") {
    lines.push(`*ঠিকানা:* ${customerAddress}`);
  }
  if (orderNote) {
    lines.push(`*নোট:* ${orderNote}`);
  }

  lines.push(`-------------------------`, `*অর্ডার আইটেমসমূহ:*`);

  cart.forEach((item, i) => {
    lines.push(`${i + 1}. *${item.name}* × ${item.qty} — ${formatPrice(item.unitPrice * item.qty)}`);
    if (item.addons.length > 0) {
      lines.push(`   ↳ Add-ons: ${item.addons.map(a => a.name).join(", ")}`);
    }
    if (item.note) {
      lines.push(`   ↳ Note: ${item.note}`);
    }
  });

  lines.push(
    `-------------------------`,
    `সাবটোটাল: ${formatPrice(subtotal)}`,
    `ডেলিভারি চার্জ: ${formatPrice(delivery)}`,
    `*সর্বমোট বিল: ${formatPrice(grandTotal)}*`
  );

  const message = encodeURIComponent(lines.join("\n"));
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};

// Initial Load
document.getElementById("storeName").textContent = STORE_CONFIG.name;
fetchMenuItems();
