const COOKING_CATEGORIES = [
  { name: "清蒸", color: "#22708f", dishes: [
    "蒸蛋", "清蒸鲈鱼", "蒜蓉粉丝虾", "豉汁蒸排骨", "香菇蒸鸡", "肉饼蒸蛋", "蒜泥蒸茄子", "清蒸螃蟹", "清蒸生蚝蒜蓉",
  ] },
  { name: "炒", color: "#c8391f", dishes: [
    "香菜炒牛肉", "芹菜炒牛肉", "蒜苔炒肉", "蒜香大虾", "鸡蛋", "炒娃娃菜", "辣椒炒肉", "青椒肉丝",
    "西兰花炒虾仁", "手撕包菜", "番茄炒蛋", "黑椒牛柳", "鱼香肉丝", "醋溜娃娃菜", "宫保鸡丁", "酸辣土豆丝",
  ] },
  { name: "养生汤类", color: "#55721f", dishes: [
    "排骨萝卜汤", "排骨玉米汤", "番茄蛋花汤", "山药香菇鸡汤", "胡萝卜玉米鸡汤",
    "冬瓜薏米排骨汤", "丝瓜蛤蜊豆腐汤", "莲藕花生排骨汤", "萝卜羊肉汤",
  ] },
  { name: "炖煮与红烧", color: "#7f4527", dishes: [
    "番茄牛腩", "红烧肉", "萝卜炖牛腩", "咖喱鸡腿", "家常豆腐", "麻婆豆腐",
  ] },
  { name: "煎与收汁", color: "#a8620b", dishes: ["香煎鸡腿", "照烧鸡腿", "香煎鸡胸", "香煎鱼排", "煎牛排"] },
  { name: "卤味", color: "#743a74", dishes: ["卤牛腱"] },
  { name: "凉拌", color: "#47766d", dishes: ["拍黄瓜"] },
  { name: "焯拌", color: "#6a732e", dishes: ["蚝油生菜"] },
];

const SEAFOOD = new Set([
  "蒜香大虾", "西兰花炒虾仁", "清蒸鲈鱼", "蒜蓉粉丝虾", "清蒸螃蟹", "清蒸生蚝蒜蓉", "香煎鱼排", "丝瓜蛤蜊豆腐汤",
]);

const SEASONAL_SOUPS = [
  { name: "春季汤", color: "#47766d", dishes: ["山药香菇鸡汤", "胡萝卜玉米鸡汤"] },
  { name: "夏季汤", color: "#39747d", dishes: ["冬瓜薏米排骨汤", "丝瓜蛤蜊豆腐汤"] },
  { name: "冬季汤", color: "#88502e", dishes: ["莲藕花生排骨汤", "萝卜羊肉汤"] },
];

const KNOWN_DISHES = new Set([
  "香菜炒牛肉", "芹菜炒牛肉", "蒜苔炒肉", "蒜香大虾", "鸡蛋", "炒娃娃菜", "辣椒炒肉",
  "清蒸螃蟹", "清蒸生蚝蒜蓉", "排骨萝卜汤",
]);

const FILTERS = [
  { name: "全部", color: "#b9a88f" },
  { name: "已会", color: "#2f6b4f" },
  ...COOKING_CATEGORIES.slice(0, 3),
  { name: "海鲜", color: "#286499" },
  ...COOKING_CATEGORIES.slice(3),
  ...SEASONAL_SOUPS,
];

const ALL_DISHES = COOKING_CATEGORIES.flatMap(({name, color, dishes}) =>
  dishes.map(dish => {
    const categories = [name];
    if (SEAFOOD.has(dish)) categories.push("海鲜");
    if (KNOWN_DISHES.has(dish)) categories.push("已会");
    const season = SEASONAL_SOUPS.find(filter => filter.dishes.includes(dish));
    if (season) categories.push(season.name);
    return { name: dish, categories, color };
  })
);

const DISH_PHOTOS = new Map([
  ["香菜炒牛肉", "cilantro-beef"],
  ["芹菜炒牛肉", "celery-beef"],
  ["蒜苔炒肉", "garlic-scapes-pork"],
  ["蒜香大虾", "garlic-prawns"],
  ["鸡蛋", "eggs"],
  ["炒娃娃菜", "baby-napa"],
  ["辣椒炒肉", "chili-pork"],
  ["清蒸螃蟹", "steamed-crab"],
  ["清蒸生蚝蒜蓉", "garlic-oysters"],
  ["排骨萝卜汤", "pork-rib-daikon-soup"],
  ["青椒肉丝", "pepper-pork"],
  ["西兰花炒虾仁", "broccoli-shrimp"],
  ["手撕包菜", "torn-cabbage"],
  ["番茄炒蛋", "tomato-eggs"],
  ["黑椒牛柳", "black-pepper-beef"],
  ["蒸蛋", "egg-custard"],
  ["清蒸鲈鱼", "steamed-sea-bass"],
  ["蒜蓉粉丝虾", "vermicelli-shrimp"],
  ["豉汁蒸排骨", "black-bean-ribs"],
  ["香菇蒸鸡", "shiitake-chicken"],
  ["肉饼蒸蛋", "steamed-pork-patty-egg"],
  ["蒜泥蒸茄子", "steamed-garlic-eggplant"],
  ["番茄牛腩", "tomato-brisket"],
  ["红烧肉", "red-braised-pork"],
  ["萝卜炖牛腩", "daikon-brisket"],
  ["卤牛腱", "soy-braised-beef-shank"],
  ["排骨玉米汤", "pork-rib-corn-soup"],
  ["咖喱鸡腿", "curry-chicken-legs"],
  ["香煎鸡腿", "pan-fried-chicken-thigh"],
  ["照烧鸡腿", "teriyaki-chicken-thigh"],
  ["香煎鸡胸", "pan-fried-chicken-breast"],
  ["香煎鱼排", "pan-fried-fish"],
  ["煎牛排", "pan-seared-steak"],
  ["家常豆腐", "home-style-tofu"],
  ["鱼香肉丝", "yu-xiang-pork"],
  ["醋溜娃娃菜", "vinegar-napa"],
  ["宫保鸡丁", "kung-pao-chicken"],
  ["麻婆豆腐", "mapo-tofu"],
  ["蚝油生菜", "oyster-sauce-lettuce"],
  ["酸辣土豆丝", "hot-sour-potatoes"],
  ["拍黄瓜", "smashed-cucumber"],
  ["番茄蛋花汤", "tomato-egg-drop-soup"],
  ["山药香菇鸡汤", "yam-shiitake-chicken-soup"],
  ["胡萝卜玉米鸡汤", "carrot-corn-chicken-soup"],
  ["冬瓜薏米排骨汤", "winter-melon-job-tears-rib-soup"],
  ["丝瓜蛤蜊豆腐汤", "loofah-clam-tofu-soup"],
  ["莲藕花生排骨汤", "lotus-peanut-rib-soup"],
  ["萝卜羊肉汤", "daikon-lamb-soup"],
]);
