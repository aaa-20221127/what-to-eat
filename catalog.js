const COOKING_CATEGORIES = [
  { name: "清蒸", color: "#22708f", dishes: [
    "豉汁蒸排骨", "清蒸螃蟹", "清蒸生蚝蒜蓉", "虾仁豆腐蒸蛋",
  ] },
  { name: "炒", color: "#c8391f", dishes: [
    "香菜炒牛肉", "芹菜炒牛肉", "蒜苔炒肉", "蒜香大虾", "鸡蛋",
    "炒娃娃菜", "辣椒炒肉", "西兰花炒虾仁", "手撕包菜", "番茄炒蛋",
    "鱼香肉丝", "酸辣土豆丝", "粉丝鸡蛋炒包菜", "青椒炒杏鲍菇", "干锅土豆片",
    "干煸杏鲍菇", "农家一碗香", "白玉菇炒火腿", "清炒四季豆", "毛豆炒香干",
    "蒜苔炒肉末", "土豆炒猪肉粒", "干煸豆角土豆", "孜然火腿土豆丁", "炒合菜",
    "口蘑鸡胸肉", "香辣小炒鸡腿肉", "回锅肉", "红三剁", "辣子鸡丁",
    "芦笋炒虾仁", "爆炒花甲",
  ] },
  { name: "养生汤类", color: "#55721f", dishes: [
    "排骨萝卜汤", "家常酸辣汤", "山药排骨汤", "冬瓜丸子汤", "羊肚菌素汤",
    "皮蛋咸蛋白菜粉丝汤", "百香果酸汤牛肉",
  ] },
  { name: "炖煮与红烧", color: "#7f4527", dishes: [
    "红烧香菇", "白菜豆腐粉丝煲", "娃娃菜炖豆腐", "葱油焖鸡", "酱汁豆腐",
    "葱烧豆腐", "豆腐烧萝卜丝", "可乐鸡翅", "肥牛金针菇卷", "鹌鹑蛋红烧肉",
    "电饭煲焖排骨", "板栗炖排骨", "肉末滑蛋豆腐",
  ] },
  { name: "煎与收汁", color: "#a8620b", dishes: [
    "青椒酿肉", "苹果猪排", "土豆煎牛排", "嫩煎鸡排", "香煎鲈鱼",
    "口蘑鸡腿",
  ] },
  { name: "煎炸", color: "#8d5929", dishes: [
    "糖醋里脊", "莲藕肉丸", "椒盐大虾", "锅包大虾", "香辣鱼块",
    "香酥大虾", "椒盐鸡翅",
  ] },
  { name: "卤味", color: "#743a74", dishes: [
    "茶叶蛋",
  ] },
  { name: "凉拌与腌菜", color: "#47766d", dishes: [
    "酸辣腌萝卜", "皮蛋拌黄瓜", "西兰花拌木耳", "擂椒皮蛋", "柠檬鸡爪",
    "酸甜大拌菜",
  ] },
  { name: "焯拌", color: "#6a732e", dishes: [
    "蚝油生菜",
  ] },
  { name: "烘烤", color: "#97563e", dishes: [
    "蒜香烤排骨", "蒜香孜然烤五花肉", "牙签肉", "麻辣牛肉干",
  ] },
  { name: "主食", color: "#57518a", dishes: [
    "番茄肉酱拌面", "葱香肉饼", "番茄肥牛烩饭", "鸡蛋软饼", "葱油拌面",
    "青菜包", "空心烧饼", "酸辣粉", "蔬菜卷", "发面小饼",
    "卤肉饭", "可乐鸡腿饭", "酸汤馄饨",
  ] },
  { name: "点心与甜品", color: "#854868", dishes: [
    "家常米糕", "大米白糕", "南瓜烤蛋奶", "红枣核桃蛋糕", "黄油小餐包",
    "燕麦蜂蜜饼干", "椰蓉吐司", "大米发糕", "轻乳酪蛋糕", "红糖枣泥蛋糕",
    "岩烧乳酪面包",
  ] },
  { name: "饮品", color: "#596242", dishes: [
    "豆浆",
  ] },
];

const SEAFOOD = new Set([
  "蒜香大虾", "西兰花炒虾仁", "清蒸螃蟹", "清蒸生蚝蒜蓉", "虾仁豆腐蒸蛋", "芦笋炒虾仁",
  "椒盐大虾", "锅包大虾", "香辣鱼块", "香煎鲈鱼", "爆炒花甲", "香酥大虾",
]);

const SEASONAL_SOUPS = [
  { name: "春季汤", color: "#47766d", dishes: ["山药排骨汤", "羊肚菌素汤"] },
  { name: "夏季汤", color: "#39747d", dishes: ["冬瓜丸子汤", "百香果酸汤牛肉"] },
  { name: "冬季汤", color: "#88502e", dishes: ["家常酸辣汤", "皮蛋咸蛋白菜粉丝汤"] },
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
  ["西兰花炒虾仁", "broccoli-shrimp"],
  ["手撕包菜", "torn-cabbage"],
  ["番茄炒蛋", "tomato-eggs"],
  ["豉汁蒸排骨", "black-bean-ribs"],
  ["鱼香肉丝", "yu-xiang-pork"],
  ["蚝油生菜", "oyster-sauce-lettuce"],
  ["酸辣土豆丝", "hot-sour-potatoes"],
  ["粉丝鸡蛋炒包菜", "popular-1-01"],
  ["青椒炒杏鲍菇", "popular-1-02"],
  ["干锅土豆片", "popular-1-03"],
  ["干煸杏鲍菇", "popular-1-04"],
  ["农家一碗香", "popular-1-05"],
  ["白玉菇炒火腿", "popular-1-06"],
  ["清炒四季豆", "popular-1-07"],
  ["毛豆炒香干", "popular-1-08"],
  ["蒜苔炒肉末", "popular-1-09"],
  ["土豆炒猪肉粒", "popular-1-10"],
  ["干煸豆角土豆", "popular-1-11"],
  ["红烧香菇", "popular-1-12"],
  ["孜然火腿土豆丁", "popular-2-01"],
  ["炒合菜", "popular-2-02"],
  ["口蘑鸡胸肉", "popular-2-03"],
  ["香辣小炒鸡腿肉", "popular-2-04"],
  ["回锅肉", "popular-2-05"],
  ["红三剁", "popular-2-06"],
  ["辣子鸡丁", "popular-2-07"],
  ["白菜豆腐粉丝煲", "popular-2-08"],
  ["娃娃菜炖豆腐", "popular-2-09"],
  ["葱油焖鸡", "popular-2-10"],
  ["酱汁豆腐", "popular-2-11"],
  ["葱烧豆腐", "popular-2-12"],
  ["豆腐烧萝卜丝", "popular-3-01"],
  ["可乐鸡翅", "popular-3-02"],
  ["肥牛金针菇卷", "popular-3-03"],
  ["糖醋里脊", "popular-3-04"],
  ["莲藕肉丸", "popular-3-05"],
  ["青椒酿肉", "popular-3-06"],
  ["苹果猪排", "popular-3-07"],
  ["鹌鹑蛋红烧肉", "popular-3-08"],
  ["电饭煲焖排骨", "popular-3-09"],
  ["板栗炖排骨", "popular-3-10"],
  ["土豆煎牛排", "popular-3-11"],
  ["嫩煎鸡排", "popular-3-12"],
  ["椒盐大虾", "popular-4-01"],
  ["锅包大虾", "popular-4-02"],
  ["香辣鱼块", "popular-4-03"],
  ["虾仁豆腐蒸蛋", "popular-4-04"],
  ["芦笋炒虾仁", "popular-4-05"],
  ["香煎鲈鱼", "popular-4-06"],
  ["爆炒花甲", "popular-4-07"],
  ["香酥大虾", "popular-4-08"],
  ["肉末滑蛋豆腐", "popular-4-09"],
  ["口蘑鸡腿", "popular-4-10"],
  ["椒盐鸡翅", "popular-4-11"],
  ["茶叶蛋", "popular-4-12"],
  ["家常酸辣汤", "popular-5-01"],
  ["山药排骨汤", "popular-5-02"],
  ["冬瓜丸子汤", "popular-5-03"],
  ["羊肚菌素汤", "popular-5-04"],
  ["皮蛋咸蛋白菜粉丝汤", "popular-5-05"],
  ["百香果酸汤牛肉", "popular-5-06"],
  ["酸辣腌萝卜", "popular-5-07"],
  ["皮蛋拌黄瓜", "popular-5-08"],
  ["西兰花拌木耳", "popular-5-09"],
  ["擂椒皮蛋", "popular-5-10"],
  ["柠檬鸡爪", "popular-5-11"],
  ["酸甜大拌菜", "popular-5-12"],
  ["番茄肉酱拌面", "popular-6-01"],
  ["葱香肉饼", "popular-6-02"],
  ["番茄肥牛烩饭", "popular-6-03"],
  ["鸡蛋软饼", "popular-6-04"],
  ["葱油拌面", "popular-6-05"],
  ["青菜包", "popular-6-06"],
  ["空心烧饼", "popular-6-07"],
  ["酸辣粉", "popular-6-08"],
  ["蔬菜卷", "popular-6-09"],
  ["发面小饼", "popular-6-10"],
  ["卤肉饭", "popular-6-11"],
  ["可乐鸡腿饭", "popular-6-12"],
  ["酸汤馄饨", "popular-7-01"],
  ["家常米糕", "popular-7-02"],
  ["大米白糕", "popular-7-03"],
  ["南瓜烤蛋奶", "popular-7-04"],
  ["红枣核桃蛋糕", "popular-7-05"],
  ["黄油小餐包", "popular-7-06"],
  ["燕麦蜂蜜饼干", "popular-7-07"],
  ["椰蓉吐司", "popular-7-08"],
  ["大米发糕", "popular-7-09"],
  ["轻乳酪蛋糕", "popular-7-10"],
  ["红糖枣泥蛋糕", "popular-7-11"],
  ["岩烧乳酪面包", "popular-7-12"],
  ["蒜香烤排骨", "popular-8-01"],
  ["蒜香孜然烤五花肉", "popular-8-02"],
  ["牙签肉", "popular-8-03"],
  ["麻辣牛肉干", "popular-8-04"],
  ["豆浆", "popular-8-05"],
]);
