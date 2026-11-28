/* Arabic helper: glossary of the printed menu + small word dictionary.
   Used by the customer site (fallback display) and the admin panel (auto-fill). */
(function () {
  const MENU = [
    ["Steak Beef Wrap", "راب ستيك لحم"],
    ["Steak Beef Plate Spicy", "طبق ستيك لحم بقري حار"],
    ["TNT Texax", "تي ان تي تكساس"],
    ["Pasta Red Chi./Beef", "باستا ريد تشي / لحم بقري"],
    ["Pasta White Chi./Beef", "باستا وايت تشي / لحم بقري"],
    ["Naga Pasta Chi./Beef", "النجا باستا تشي / لحم بقر"],
    ["Chicken Noodles", "معكرونة الدجاج"],
    ["Prawn Noodles", "نودلز روبيان"],
    ["Mixed Noodles", "نودلز مشكلة"],
    ["Spicy Soup", "شوربة حارة"],
    ["Sweet Corn Soup", "شوربة ذرة حلوة"],
    ["Chicken Soup", "حساء الدجاج"],
    ["Hommous Beef/Chicken", "حمص لحم/دجاج"],
    ["Hammous Shwarma", "شاورما حمص"],
    ["Shwarma", "شاورما"],
    ["Chicken Kabab", "كباب دجاج"],
    ["Sarookh Shwarma", "صاروخ شاورما"],
    ["Italian Shwarma", "شاورما ايطالي"],

    ["Steak Beef Combo", "ستيك بيف كومبو"],
    ["Steak Beef/Chi. Burger", "ستيك لحم / تشي. برجر"],
    ["Steak Chicken Combo", "كومبو ستيك دجاج"],
    ["Zinker Combo", "كومبو زينكر"],
    ["Mathafi Combo", "مطافي كومبو"],
    ["Barq wa Raad Combo", "كومبو برق ورعد"],
    ["Har Nar Combo", "كومبو هار نار"],
    ["Ciabatta Combo", "كومبو سياباتا"],
    ["Zinker Special Combo", "كومبو زينكر الخاص"],
    ["Zinker Prawns Combo", "كومبو روبيان زينكر"],
    ["Kabab Beef / Chi. Combo", "كباب لحم / تشي. كومبو"],
    ["Fillet Combo", "كومبو فيليه"],
    ["Prawns Combo", "كومبو روبيان"],
    ["Sheesh Tawook Combo", "كومبو شيش طاووق"],
    ["Hot Dog Combo", "كومبو هوت دوج"],
    ["Tikka Combo", "كومبو تكا"],
    ["Theriyaqi Combo", "ترياقي كومبو"],
    ["Filler Jelapeno Combo", "كومبو فيلر جيلابينو"],

    ["Beef/Chi. Burger", "لحم البقر / تشي. برجر"],
    ["Shawarma Burger", "شاورما برجر"],
    ["Burger Special Beef/Chi", "برجر سبيشال بيف / تشي"],
    ["Vegetable Burger", "برجر خضار"],
    ["Prawns Burger", "برجر روبيان"],
    ["Tikka Burger", "برجر تكا"],
    ["Zinker Spicy Burger", "برجر زينكر حار"],
    ["Zamboo Burger", "برجر زامبو"],
    ["Khaleej Burger", "برجر الخليج"],
    ["Zinker Zamboo Burger", "برجر زنكر زامبو"],
    ["Har nar Spicy Double Burger", "هار نار سبايسي دبل برجر"],
    ["Mexico Double Spicy Burger", "برجر المكسيك دبل سبايسي"],
    ["Zinker w.Cheese Burger", "زنكر و جبن برجر"],
    ["Fantasia", "فانتازيا"],
    ["Classic Zinker", "كلاسيك زينكر"],
    ["Mexico Classic Zinker", "المكسيك كلاسيك زينكر"],
    ["Tikka Classic Zinker", "تكا كلاسيك زينكر"],

    ["Mixed Pizza", "بيتزا مشكلة"],
    ["Chicken Pizza", "بيتزا الدجاج"],
    ["Prawns Pizza", "بيتزا روبيان"],
    ["Mashrom Chicken Pizza", "بيتزا دجاج مشروم"],
    ["Hot Dog Pizza", "بيتزا هوت دوج"],
    ["Beef Mashrom Pizza", "بيتزا بيف مشروم"],
    ["Vagitable Pizza", "بيتزا خضار"],
    ["Cheese Pizza", "جبن البيتزا"],
    ["Tikka Pizza", "بيتزا تكا"],
    ["Tikka Pizzager", "تكا بيتزا"],
    ["Chicken Pizzager", "بيتزاجر الدجاج"],
    ["Beef Pizzager", "بيتزاجر بيف"],
    ["Sheesh Taook Arbi", "شيش طاووق عربي"],
    ["Shawarma Arbi", "شاورما عربي"],
    ["Hommous", "حمص"],
    ["Buruj Al Arbi", "برج العربي"],
    ["Tikka Arbi", "تكا عربي"],
    ["Har Nar Arbi", "هار نار عربي"],
    ["Zinker Arbi", "زينكر عربي"],
    ["Ala Khaifak", "على كيفك"],
    ["Green Salad", "سلطة خضراء"],
    ["Fatoush", "فتوش"],
    ["Arabic Salad", "سلطة عربية"],
    ["Mexico Spicy Wrap", "راب المكسيك الحار"],
    ["Zinker Wrap", "راب زينكر"],

    ["2016 Special", "سبيشال 2016"],
    ["Chicken Club", "كلوب دجاج"],
    ["Zinker Club", "نادي زينكر"],
    ["Shawarma Club", "كلوب شاورما"],
    ["Club Special", "كلوب خاص"],
    ["Egg Club", "كلوب البيض"],
    ["Club Lulu", "نادي اللولو"],
    ["Vegetable Club", "كلوب خضروات"],
    ["Jabal Ayoob", "جبل أيوب"],
    ["Hot Dog Club", "كلوب هوت دوج"],
    ["Arabic Club", "كلوب عربي"],
    ["Millenium Club", "نادي الألفية"],
    ["Al Jazeera Club", "نادي الجزيرة"],
    ["Tea Festival Club", "نادي مهرجان الشاي"],

    ["Snack Meal 3pc", "وجبة سناك ٣ قطع"],
    ["Broasted Meal 4pc", "وجبة بروستد ٤ قطع"],
    ["Broasted Meal 5pc", "وجبة بروستد ٥ قطع"],
    ["Jambo Broasted Meal 6pc", "وجبة جامبو بروستد ٦ قطع"],
    ["Family Broasted Meal 8pc", "وجبة بروستد عائلية ٨ قطع"],
    ["Broasted Special Meal 12pc", "وجبة بروستد الخاصة ١٢ قطعة"],
    ["Fillet Plate", "طبق فيليه"],
    ["Nuggets Plate", "صحن ناجتس"],
    ["Jumbo Prawns Plate", "صحن روبيان جامبو"],
    ["Potato Wedges", "أسافين البطاطا"],
    ["French Fries", "البطاطس المقلية"],
    ["Hot Dog Plate", "طبق هوت دوج"],

    ["Roob Ruman", "روب رومان"],
    ["Blue Mojito", "موهيتو بلو"],
    ["Pinaple Mojito", "موهيتو الأناناس"],
    ["Pineapple Mojito", "موهيتو الأناناس"],
    ["Strwberry Mojito", "ستروبيري موهيتو"],
    ["Strawberry Mojito", "ستروبيري موهيتو"],
    ["Lemon Mojito", "موهيتو الليمون"],
    ["Passion Mojito", "موهيتو العاطفة"],
    ["Roob Strwberry", "روب فراولة"],
    ["Roob Strawberry", "روب فراولة"],
    ["Roob Mango", "روب مانجو"],
    ["Kitkat Shake Milk", "حليب كيت كات شيك"],
    ["Ferrero Rocher Shake", "فيريرو روشيه شيك"],
    ["Avocado with Pistachio Shake", "مخفوق الأفوكادو بالفستق"],
    ["Coold Coffee", "قهوة باردة"],
    ["Cold Coffee", "قهوة باردة"],
    ["Lotus Crush Milk", "حليب لوتس كراش"],
    ["Snickers Crush Milk", "حليب كراش سنيكرز"],
    ["Oreo Crush Milk", "حليب اوريو كراش"],
    ["Nutella Crush Milk", "حليب نوتيلا كراش"],

    ["Faluda", "فالودة"],
    ["Super Faluda", "سوبر فالودا"],
    ["Moxed Ice Cream", "ايس كريم مشكل"],
    ["Mixed Ice Cream", "ايس كريم مشكل"],
    ["Avocado Juice", "عصير أفوكادو"],
    ["Aboodi Juice", "عصير عبودي"],
    ["Cocktail Juice", "عصير كوكتيل"],
    ["Mariam Juice", "عصير مريم"],
    ["Mango Juice", "عصير مانجو"],
    ["Orange Juice", "عصير البرتقال"],
    ["Ruman Juice", "عصير رمان"],
    ["Strwberry Milk Shake", "ستروبيري ميلك شيك"],
    ["Strawberry Milk Shake", "ستروبيري ميلك شيك"],
    ["Vanilla Milk Shake", "لبن مخفوق بالفانيلا"],
    ["Chocolet Milk Shake", "شوكولاتة ميلك شيك"],
    ["Chocolate Milk Shake", "شوكولاتة ميلك شيك"],
    ["Sweet Melon Juice", "عصير شمام حلو"],
    ["Water Melon Juice", "عصير البطيخ"],
    ["Banana Juice", "عصير الموز"],
    ["Strwberry Juice", "عصير فراولة"],
    ["Strawberry Juice", "عصير فراولة"],
    ["Lemon Juice", "عصير ليمون"],
    ["Orange and Mango mix Juice", "عصير مشكل برتقال ومانجو"],
    ["Sweet corn", "ذرة حلوة"],
    ["Pop Corn", "الفشار"],

    ["Galaxy Crush Milk", "جالاكسي كراش ميلك"],
    ["Twix Crush Milk", "حليب تويكس كراش"],
    ["Bounty Crush Milk", "حليب باونتي كراش"],
    ["Cold Cappachino", "كابتشينو بارد"],
    ["Cold Cappuccino", "كابتشينو بارد"],
    ["Pineapple", "أناناس"],
    ["Mango with Banana Mixed", "مانجو مع موز مشكل"],
    ["Strwberry with Ruman", "ستروبري مع رومان"],
    ["Date Milkshake", "ميلك شيك التمر"],
    ["Ruman", "رومان"],
    ["Mango", "مانجو"],
    ["Mixed Fruits", "فواكه مختلطة"],
    ["Mango Fresh Juice", "عصير مانجو طازج"],
    ["Orange Fresh Juice", "عصير برتقال طازج"],
    ["Cocktail Fresh Juice", "عصير كوكتيل طازج"],
    ["Avocado Fresh Juice", "عصير أفوكادو طازج"],
    ["Mixed Fruits Salad", "سلطة فواكه مشكلة"]
  ];

  // single words (lower case)
  const WORDS = {
    burger: "برجر", pizza: "بيتزا", combo: "كومبو", wrap: "راب", sandwich: "ساندويتش", club: "كلوب",
    shake: "شيك", milkshake: "ميلك شيك", milk: "حليب", juice: "عصير", salad: "سلطة", soup: "شوربة",
    plate: "طبق", meal: "وجبة", platter: "بلاتر", fries: "بطاطس", chips: "شيبس", nuggets: "ناجتس",
    coffee: "قهوة", tea: "شاي", water: "ماء", cola: "كولا", pepsi: "بيبسي", drink: "مشروب", ice: "ثلج",
    cream: "كريم", cake: "كيك", dessert: "حلى", kabab: "كباب", kebab: "كباب", shawarma: "شاورما", shwarma: "شاورما",
    chicken: "دجاج", beef: "لحم بقري", meat: "لحم", lamb: "لحم غنم", fish: "سمك", prawn: "روبيان", prawns: "روبيان",
    egg: "بيض", cheese: "جبن", vegetable: "خضار", vegetables: "خضار", veg: "خضار", mushroom: "مشروم",
    tomato: "طماطم", onion: "بصل", onions: "بصل", olives: "زيتون", olive: "زيتون", jalapeno: "هالبينو",
    garlic: "ثوم", mayo: "مايونيز", mayonnaise: "مايونيز", ketchup: "كاتشب", mustard: "خردل", bbq: "باربكيو",
    sauce: "صوص", hummus: "حمص", hommous: "حمص", bacon: "لحم مقدد", corn: "ذرة", rice: "أرز", bread: "خبز",
    mango: "مانجو", orange: "برتقال", lemon: "ليمون", banana: "موز", apple: "تفاح", strawberry: "فراولة",
    pineapple: "أناناس", avocado: "أفوكادو", pomegranate: "رمان", watermelon: "بطيخ", melon: "شمام", dates: "تمر",
    chocolate: "شوكولاتة", vanilla: "فانيلا", caramel: "كراميل", mint: "نعناع", pistachio: "فستق",
    spicy: "حار", hot: "حار", cold: "بارد", special: "خاص", mixed: "مشكل", fresh: "طازج", crispy: "مقرمش",
    grilled: "مشوي", fried: "مقلي", double: "دبل", single: "مفرد", classic: "كلاسيك", extra: "إضافي",
    small: "صغير", medium: "وسط", large: "كبير", regular: "عادي", half: "نصف", full: "كامل", family: "عائلي",
    jumbo: "جامبو", mini: "ميني", big: "كبير", with: "مع", and: "و", no: "بدون", without: "بدون",
    plain: "سادة", sweet: "حلو", salt: "ملح", pepper: "فلفل", arabic: "عربي", italian: "ايطالي",
    new: "جديد", popular: "شائع", offer: "عرض", deal: "عرض", bestseller: "الأكثر مبيعاً", delicious: "لذيذ", tasty: "لذيذ",
    pc: "قطعة", pcs: "قطع", piece: "قطعة", pieces: "قطع", cup: "كوب", glass: "كأس", bottle: "زجاجة", can: "علبة"
  };
  const PHRASES = {
    "extra cheese": "جبن إضافي", "extra sauce": "صوص إضافي", "spicy sauce": "صوص حار", "garlic sauce": "صوص الثوم",
    "bbq sauce": "صوص باربكيو", "extra spicy": "حار جداً", "extra chicken": "دجاج إضافي", "extra beef": "لحم إضافي",
    "extra fries": "بطاطس إضافية", "french fries": "بطاطس مقلية", "hot dog": "هوت دوج", "ice cream": "ايس كريم",
    "water melon": "بطيخ", "sweet corn": "ذرة حلوة", "pop corn": "فشار", "milk shake": "ميلك شيك",
    "best seller": "الأكثر مبيعاً", "most popular": "الأكثر طلباً", "chef special": "تشكيلة الشيف", "new item": "جديد",
    "cheese slice": "شريحة جبن", "extra mayo": "مايونيز إضافي", "extra ketchup": "كاتشب إضافي"
  };
  const HEADS = new Set(["burger","pizza","combo","wrap","sandwich","club","shake","milkshake","juice","salad","soup","plate","meal","platter","sauce","coffee","tea","cake","kabab","kebab","shawarma","shwarma","nuggets","fries"]);
  const ADJS = new Set(["spicy","hot","cold","special","mixed","fresh","crispy","grilled","fried","double","single","classic","small","medium","large","regular","family","jumbo","mini","big","plain","sweet","arabic","italian"]);

  function norm(s) {
    return String(s || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
  }
  const MAP = new Map(MENU.map(([en, ar]) => [norm(en), ar]));

  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 3) return 99;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  function translateName(name) {
    const key = norm(name);
    if (!key) return "";
    if (MAP.has(key)) return MAP.get(key);
    const limit = key.length >= 14 ? 2 : key.length >= 8 ? 1 : 0;
    if (limit) {
      let best = null, bd = 99;
      for (const [k, v] of MAP) {
        const d = lev(key, k);
        if (d < bd) { bd = d; best = v; }
      }
      if (best && bd <= limit) return best;
    }
    return translateWords(name);
  }

  function translateWords(text) {
    const raw = String(text || "").trim().toLowerCase();
    if (!raw) return "";
    const phraseKey = raw.replace(/\s+/g, " ");
    if (PHRASES[phraseKey]) return PHRASES[phraseKey];
    const tokens = raw.replace(/[\/,]/g, " $& ").replace(/[().]/g, " ").split(/\s+/).filter(Boolean);
    const heads = [], rest = [], adjs = [];
    let hasWith = false;
    for (const tk of tokens) {
      if (tk === "/" || tk === ",") { rest.push(tk === "/" ? "/" : "،"); continue; }
      if (/^\d+(\.\d+)?$/.test(tk)) { rest.push(tk); continue; }
      const m = tk.match(/^(\d+)(pc|pcs)$/);
      if (m) { rest.push(m[1] + " " + WORDS[m[2]]); continue; }
      if (!WORDS[tk]) return "";
      if (tk === "with" || tk === "and") hasWith = true;
      if (HEADS.has(tk)) heads.push(WORDS[tk]);
      else if (ADJS.has(tk)) adjs.push(WORDS[tk]);
      else rest.push(WORDS[tk]);
    }
    if (hasWith || tokens.includes("/")) return tokens.map(tk => (tk === "/" ? "/" : tk === "," ? "،" : WORDS[tk] || tk)).join(" ");
    return heads.concat(rest, adjs).join(" ");
  }

  window.AR = { translateName, translateWords, norm };
})();
