var Category = /* @__PURE__ */ ((Category2) => {
  Category2["Bangles"] = "Bangles";
  Category2["Rings"] = "Rings";
  Category2["Earrings"] = "Earrings";
  Category2["Pendants"] = "Pendants";
  return Category2;
})(Category || {});
const CUBIC_ZIRCONIA_COLORS = [
  { "name": "White", "value": "#FFF", "imageUrl": "/assets/cubicZirconiaColors/white.png" },
  { "name": "Green", "value": "#008000", "imageUrl": "/assets/cubicZirconiaColors/green.png" },
  { "name": "Blue", "value": "#0000FF", "imageUrl": "/assets/cubicZirconiaColors/blue.png" },
  { "name": "Yellow", "value": "#FFFF00", "imageUrl": "/assets/cubicZirconiaColors/yellow.png" },
  { "name": "Amethyst", "value": "#9966CC", "imageUrl": "/assets/cubicZirconiaColors/amethyst.png" },
  { "name": "Azure", "value": "#007FFF", "imageUrl": "/assets/cubicZirconiaColors/azure.png" },
  { "name": "Black", "value": "#000000", "imageUrl": "/assets/cubicZirconiaColors/black.png" },
  { "name": "Champagne", "value": "#F7E7CE", "imageUrl": "/assets/cubicZirconiaColors/champagne.png" },
  { "name": "Garnet", "value": "#733635", "imageUrl": "/assets/cubicZirconiaColors/garnet.png" },
  { "name": "Lavender", "value": "#E6E6FA", "imageUrl": "/assets/cubicZirconiaColors/lavender.png" },
  { "name": "Olive", "value": "#808000", "imageUrl": "/assets/cubicZirconiaColors/olive.png" },
  { "name": "Peridot", "value": "#9CB071", "imageUrl": "/assets/cubicZirconiaColors/peridot.png" },
  { "name": "Pink", "value": "#FFC0CB", "imageUrl": "/assets/cubicZirconiaColors/pink.png" },
  { "name": "Red", "value": "#FF0000", "imageUrl": "/assets/cubicZirconiaColors/red.png" }
];
function getCategoryCoverImage(category) {
  return products.find((product) => product.category === category)?.imageUrl ?? null;
}
function getCategoriesWithProducts() {
  return Object.values(Category).filter(
    (category) => products.some((product) => product.category === category)
  );
}
const products = [
  {
    "id": 6,
    "name": "product.names.ring_plava",
    "description": "product.descriptions.ring_plava",
    "price": 2700,
    "category": "Rings",
    "imageUrl": "/assets/plava/5267491911117774016.jpg",
    "images": [
      "/assets/plava/5267491911117774016.jpg",
      "/assets/plava/5267491911117774017.jpg",
      "/assets/plava/5271827470149687881.jpg",
      "/assets/plava/5271827470149687883.jpg",
      "/assets/plava/5271827470149687884.jpg"
    ],
    "createdAt": "2026-06-04T07:17:07.873Z",
    "updatedAt": "2026-06-04T07:17:07.873Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "rhodiumPlating": false,
    "weight": 6,
    "reviews": [
      {
        "author": "Іра Д.",
        "date": "2026-08-19",
        "rating": 5,
        "text": "дякую! дуже сподобалось 💜"
      }
    ]
  },
  {
    "id": 7,
    "name": "product.names.bubochki_ring",
    "description": "product.descriptions.bubochki_ring",
    "price": 1700,
    "charityPercent": 100,
    "discountPercent": 25,
    "category": "Rings",
    "imageUrl": "/assets/bubochki/5282821220627849158.jpg",
    "images": [
      "/assets/bubochki/5282821220627849158.jpg",
      "/assets/bubochki/5282821220627849159.jpg",
      "/assets/bubochki/5282821220627849160.jpg"
    ],
    "createdAt": "2026-06-04T07:17:07.884Z",
    "updatedAt": "2026-06-04T07:17:07.884Z",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 3.5,
    "reviews": [
      {
        "author": "Еліна K.",
        "date": "2026-08-20",
        "rating": 5,
        "text": "Доброго дня! Отримала і вдягнула вже кільце, дуже класне, і я вже його обожнюю 💛😅 Дуже дякую, бажаю всього найкращого ✨"
      }
    ]
  },
  {
    "id": 8,
    "name": "product.names.lollypop",
    "description": "product.descriptions.lollypop_rings",
    "price": 2e3,
    "category": "Rings",
    "imageUrl": "/assets/lollypop/IMG_4831.png",
    "images": [
      "/assets/lollypop/IMG_4831.png",
      "/assets/lollypop/IMG_4835.png",
      "/assets/lollypop/IMG_4837.png",
      "/assets/lollypop/5267491911117774004.png"
    ],
    "createdAt": "2026-06-04T07:17:07.886Z",
    "updatedAt": "2026-06-04T07:17:07.886Z",
    "gemstone": "common.gemstones.cubic_zirconia",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 4,
    "reviews": [
      {
        "author": "Марія С.",
        "date": "2026-05-20",
        "rating": 5,
        "text": "Просто закохалась! Каблучка з білим фіанітом сяє, як справжній діамант. Усі подруги питають, де брала."
      },
      {
        "author": "Юля Б.",
        "date": "2026-06-03",
        "rating": 5,
        "text": "Замовила з синім камінцем — виглядає розкішно. Якість срібла відмінна, потемніння немає."
      }
    ],
    "availableStones": [
      {
        "type": "Cubic Zirconia",
        "colors": CUBIC_ZIRCONIA_COLORS
      }
    ]
  },
  {
    "id": 9,
    "name": "product.names.silver_pendant_cup",
    "description": "product.descriptions.silver_pendant_cup",
    "price": 4100,
    "category": "Pendants",
    "discountPercent": 30,
    "imageUrl": "/assets/cup/5282821220627849167.jpg",
    "images": [
      "/assets/5282821220627849167.jpg",
      "/assets/5282821220627849168.jpg",
      "/assets/5282821220627849169.jpg"
    ],
    "createdAt": "2026-06-04T07:17:07.888Z",
    "updatedAt": "2026-06-04T07:17:07.888Z",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 7,
    "reviews": []
  },
  {
    "id": 10,
    "name": "product.names.flower_pendant",
    "description": "product.descriptions.flower_pendant",
    "price": 4100,
    "category": "Pendants",
    "imageUrl": "/assets/flower/IMG_4939.png",
    "images": [
      "/assets/flower/IMG_4935.png",
      "/assets/flower/IMG_4939.png",
      "/assets/flower/IMG_4923.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 7
  },
  {
    "id": 12,
    "name": "product.names.round_wrinkled_earrings",
    "description": "product.descriptions.round_wrinkled_earrings",
    "price": 1800,
    "category": "Earrings",
    "imageUrl": "/assets/roundWrinkledEarrings/IMG_1482.png",
    "images": [
      "/assets/roundWrinkledEarrings/IMG_1482.png",
      "/assets/roundWrinkledEarrings/IMG_1491.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 5
  },
  {
    "id": 13,
    "name": "product.names.wave_ring",
    "description": "product.descriptions.wave_ring",
    "price": 1900,
    "category": "Rings",
    "imageUrl": "/assets/waveRing/IMG_8753.png",
    "images": [
      "/assets/waveRing/IMG_1742.png",
      "/assets/waveRing/IMG_8727.png",
      "/assets/waveRing/IMG_8730.png",
      "/assets/waveRing/IMG_8745.png",
      "/assets/waveRing/IMG_8753.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 4
  },
  {
    "id": 14,
    "name": "product.names.smeared_ring",
    "description": "product.descriptions.smeared_ring",
    "price": 2700,
    "category": "Rings",
    "imageUrl": "/assets/smearedRing/IMG_1702.png",
    "images": [
      "/assets/smearedRing/IMG_1702.png",
      "/assets/smearedRing/photo-86.png",
      "/assets/smearedRing/photo-97.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 5
  },
  {
    "id": 15,
    "name": "product.names.crumpled_ring",
    "description": "product.descriptions.crumpled_ring",
    "price": 2900,
    "category": "Rings",
    "imageUrl": "/assets/crumpledRing/IMG_9086.png",
    "images": [
      "/assets/crumpledRing/IMG_9100.png",
      "/assets/crumpledRing/IMG_9115.png",
      "/assets/crumpledRing/IMG_9118.png",
      "/assets/crumpledRing/IMG_9086.png",
      "/assets/crumpledRing/IMG_9133.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.cubic_zirconia",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": true,
    "weight": 5,
    "stoneCount": 3,
    "availableStones": [
      {
        "type": "Cubic Zirconia",
        "colors": CUBIC_ZIRCONIA_COLORS
      }
    ]
  },
  {
    "id": 16,
    "name": "product.names.vase_earring",
    "description": "product.descriptions.vase_earring",
    "price": 1700,
    "category": "Earrings",
    "imageUrl": "/assets/crumpledRing/IMG_1444.png",
    "images": [
      "/assets/vaseEarring/IMG_1449.png",
      "/assets/vaseEarring/IMG_1462.png",
      "/assets/vaseEarring/IMG_1444.png",
      "/assets/vaseEarring/IMG_1761.png"
    ],
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "gemstone": "common.gemstones.none",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "rhodiumPlating": false,
    "weight": 5
  }
];
export {
  Category as C,
  getCategoryCoverImage as a,
  getCategoriesWithProducts as g,
  products as p
};
