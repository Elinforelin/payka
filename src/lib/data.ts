export enum Category {
    Bangles = "Bangles",
    Rings = "Rings",
    Earrings = "Earrings",
    Pendants = "Pendants",
}

/** Named collections that group pieces across categories. Values are URL slugs. */
export enum Collection {
    HerName = "her-name",
}

export interface Product {
    id: number;
    name: string;
    description: string;
    /** Regular catalog price (₴). Sale price is derived from discountPercent. */
    price: number;
    /** Optional percent off (1–99). e.g. 20 → customer pays 80% of price */
    discountPercent?: number;
    /**
     * When set (1–100), this percent of the sale goes to charity.
     * Shows a badge on cards and a short note on the product page.
     */
    charityPercent?: number;
    /** Whether product is in stock (true) or made to order (false) */
    inStock?: boolean;
    /** Overrides DEFAULT_READY_TIME_WEEKS for this piece's made-to-order lead time */
    readyTimeMinWeeks?: number;
    readyTimeMaxWeeks?: number;
    category: Category;
    collection?: Collection;
    /** Set to false to hide the piece from the website. Treated as true when omitted. */
    isReleased?: boolean;
    imageUrl: string | null;
    images?: string[];
    createdAt: string;
    updatedAt: string;
    clasp?: string | null;
    design?: string | null;
    gemstone?: string | null;
    metalColor?: string | null;
    metalStandard?: string | null;
    metalType?: string | null;
    /** Whether the piece has rhodium plating */
    rhodiumPlating: boolean;
    weight?: number | null;
    availableStones?: StoneOption[];
    /** How many stones the customer must choose colors for (default: 1) */
    stoneCount?: number;
    reviews?: Review[];
}

export interface Review {
    author: string;
    date: string;
    rating: number;
    text: string;
}

export interface StoneOption {
    type: string;
    colors: StoneColor[];
}

export interface StoneColor {
    name: string;
    value: string; // Hex color or CSS color name
    imageUrl?: string; // Optional: Image that shows this specific stone color
}

export const CUBIC_ZIRCONIA_COLORS: StoneColor[] = [
    {"name": "White", "value": "#FFF", "imageUrl": "/assets/cubicZirconiaColors/white.png"},
    {"name": "Green", "value": "#008000", "imageUrl": "/assets/cubicZirconiaColors/green.png"},
    {"name": "Blue", "value": "#0000FF", "imageUrl": "/assets/cubicZirconiaColors/blue.png"},
    {"name": "Yellow", "value": "#FFFF00", "imageUrl": "/assets/cubicZirconiaColors/yellow.png"},
    {"name": "Amethyst", "value": "#9966CC", "imageUrl": "/assets/cubicZirconiaColors/amethyst.png"},
    {"name": "Azure", "value": "#007FFF", "imageUrl": "/assets/cubicZirconiaColors/azure.png"},
    {"name": "Black", "value": "#000000", "imageUrl": "/assets/cubicZirconiaColors/black.png"},
    {"name": "Champagne", "value": "#F7E7CE", "imageUrl": "/assets/cubicZirconiaColors/champagne.png"},
    {"name": "Garnet", "value": "#733635", "imageUrl": "/assets/cubicZirconiaColors/garnet.png"},
    {"name": "Lavender", "value": "#E6E6FA", "imageUrl": "/assets/cubicZirconiaColors/lavender.png"},
    {"name": "Olive", "value": "#808000", "imageUrl": "/assets/cubicZirconiaColors/olive.png"},
    {"name": "Peridot", "value": "#9CB071", "imageUrl": "/assets/cubicZirconiaColors/peridot.png"},
    {"name": "Pink", "value": "#FFC0CB", "imageUrl": "/assets/cubicZirconiaColors/pink.png"},
    {"name": "Red", "value": "#FF0000", "imageUrl": "/assets/cubicZirconiaColors/red.png"},
];

/** Default made-to-order lead time (in weeks) when a product doesn't set its own. */
export const DEFAULT_READY_TIME_WEEKS: readonly [number, number] = [2, 4];

export function getCategoryCoverImage(category: Category): string | null {
    return products.find((product) => product.category === category)?.imageUrl ?? null;
}

export function getCategoriesWithProducts(): Category[] {
    return Object.values(Category).filter((category) =>
        products.some((product) => product.category === category)
    );
}

const COLLECTION_COVER_IMAGES: Record<Collection, string> = {
    [Collection.HerName]: "/assets/collections/herName/collection_aqua.jpeg",
};

export function getCollectionCoverImage(collection: Collection): string {
    return COLLECTION_COVER_IMAGES[collection];
}

export function getCollectionProducts(collection: Collection): Product[] {
    return products.filter((product) => product.collection === collection);
}

const allProducts: Product[] = [
    {
        "id": 6,
        "name": "product.names.ring_plava",
        "description": "product.descriptions.ring_plava",
        "price": 2700,
        "inStock": true,
        "category": Category.Rings,
        "imageUrl": "/assets/plava/5267491911117774016.jpg",
        "images": [
            "/assets/plava/5267491911117774016.jpg",
            "/assets/plava/5267491911117774017.jpg",
            "/assets/plava/5271827470149687881.jpg",
            "/assets/plava/5271827470149687883.jpg",
            "/assets/plava/5271827470149687884.jpg",
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
            },
        ],
    },
    {
        "id": 7,
        "name": "product.names.bubochki_ring",
        "description": "product.descriptions.bubochki_ring",
        "price": 1700,
        "charityPercent": 100,
        "discountPercent": 25,
        "inStock": true,
        "category": Category.Rings,
        "imageUrl": "/assets/bubochki/5282821220627849158.jpg",
        "images": [
            "/assets/bubochki/5282821220627849158.jpg",
            "/assets/bubochki/5282821220627849159.jpg",
            "/assets/bubochki/5282821220627849160.jpg",
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
            },
        ],
    },
    {
        "id": 8,
        "name": "product.names.lollypop",
        "description": "product.descriptions.lollypop_rings",
        "price": 2000,
        "inStock": true,
        "category": Category.Rings,
        "imageUrl": "/assets/lollypop/IMG_4831.png",
        "images": [
            "/assets/lollypop/IMG_4831.png",
            "/assets/lollypop/IMG_4835.png",
            "/assets/lollypop/IMG_4837.png",
            "/assets/lollypop/5267491911117774004.png",
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
            },
        ],
        "availableStones": [
            {
                "type": "Cubic Zirconia",
                "colors": CUBIC_ZIRCONIA_COLORS,
            }
        ]
    },
    {
        "id": 9,
        "name": "product.names.silver_pendant_cup",
        "description": "product.descriptions.silver_pendant_cup",
        "price": 4100,
        "inStock": false,
        "category": Category.Pendants,
        "discountPercent": 30,
        "imageUrl": "/assets/cup/5282821220627849167.jpg",
        "images": [
            "/assets/5282821220627849167.jpg",
            "/assets/5282821220627849168.jpg",
            "/assets/5282821220627849169.jpg",
        ],
        "createdAt": "2026-06-04T07:17:07.888Z",
        "updatedAt": "2026-06-04T07:17:07.888Z",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
        "weight": 7,
        "reviews": [
        ],
    },
    {
        "id": 10,
        "name": "product.names.flower_pendant",
        "description": "product.descriptions.flower_pendant",
        "price": 4100,
        "inStock": true,
        "category": Category.Pendants,
        "imageUrl": "/assets/flower/IMG_4939.png",
        "images": [
            "/assets/flower/IMG_4935.png",
            "/assets/flower/IMG_4939.png",
            "/assets/flower/IMG_4923.png",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 7,
    },
    {
        "id": 12,
        "name": "product.names.round_wrinkled_earrings",
        "description": "product.descriptions.round_wrinkled_earrings",
        "price": 1800,
        "inStock": true,
        "category": Category.Earrings,
        "imageUrl": "/assets/roundWrinkledEarrings/IMG_1482.png",
        "images": [
            "/assets/roundWrinkledEarrings/IMG_1482.png",
            "/assets/roundWrinkledEarrings/IMG_1491.png",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 5,
    },
    {
        "id": 13,
        "name": "product.names.wave_ring",
        "description": "product.descriptions.wave_ring",
        "price": 1900,
        "inStock": false,
        "category": Category.Rings,
        "imageUrl": "/assets/waveRing/IMG_8753.png",
        "images": [
            "/assets/waveRing/IMG_1742.png",
            "/assets/waveRing/IMG_8727.png",
            "/assets/waveRing/IMG_8730.png",
            "/assets/waveRing/IMG_8745.png",
            "/assets/waveRing/IMG_8753.png",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 4,
    },
    {
        "id": 14,
        "name": "product.names.smeared_ring",
        "description": "product.descriptions.smeared_ring",
        "price": 2700,
        "inStock": false,
        "category": Category.Rings,
        "imageUrl": "/assets/smearedRing/IMG_1702.png",
        "images": [
            "/assets/smearedRing/IMG_1702.png",
            "/assets/smearedRing/photo-86.png",
            "/assets/smearedRing/photo-97.png",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 5,
    },
    {
        "id": 15,
        "name": "product.names.crumpled_ring",
        "description": "product.descriptions.crumpled_ring",
        "price": 2900,
        "inStock": true,
        "category": Category.Rings,
        "imageUrl": "/assets/crumpledRing/IMG_9086.png",
        "images": [
            "/assets/crumpledRing/IMG_9100.png",
            "/assets/crumpledRing/IMG_9115.png",
            "/assets/crumpledRing/IMG_9118.png",
            "/assets/crumpledRing/IMG_9086.png",
            "/assets/crumpledRing/IMG_9133.png",
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
                "colors": CUBIC_ZIRCONIA_COLORS,
            }
        ]
    },
    {
        "id": 16,
        "name": "product.names.vase_earring",
        "description": "product.descriptions.vase_earring",
        "price": 1700,
        "inStock": true,
        "category": Category.Earrings,
        "imageUrl": "/assets/crumpledRing/IMG_1444.png",
        "images": [
            "/assets/vaseEarring/IMG_1449.png",
            "/assets/vaseEarring/IMG_1462.png",
            "/assets/vaseEarring/IMG_1444.png",
            "/assets/vaseEarring/IMG_1761.png",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 5,
    },
    {
        "id": 17,
        "name": "product.names.ring_with_tourmaline",
        "description": "product.descriptions.ring_with_tourmaline",
        "price": 2700,
        "inStock": false,
        "category": Category.Rings,
        "imageUrl": "/assets/ringWithTourmaline/IMG_7965.jpg",
        "images": [
            "/assets/ringWithTourmaline/IMG_7965.jpg",
            "/assets/ringWithTourmaline/IMG_7983.jpg",
            "/assets/ringWithTourmaline/IMG_7994.jpg",
            "/assets/ringWithTourmaline/IMG_8015.jpg",
            "/assets/ringWithTourmaline/IMG_8020.jpg",
        ],
        "createdAt": "2026-06-04T07:17:07.889Z",
        "updatedAt": "2026-06-04T07:17:07.889Z",
        "gemstone": "common.gemstones.tourmaline",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 5,
    },
    {
        "id": 18,
        "name": "product.names.braided_ring",
        "description": "product.descriptions.braided_ring",
        "price": 2700,
        "inStock": true,
        "category": Category.Rings,
        "imageUrl": "/assets/braidedRing/IMG_8027.jpg",
        "images": [
            "/assets/braidedRing/IMG_8027.jpg",
            "/assets/braidedRing/IMG_8034.jpg",
            "/assets/braidedRing/IMG_8036.jpg",
            "/assets/braidedRing/IMG_8040.jpg",
            "/assets/braidedRing/IMG_8103.jpg",
        ],
        "createdAt": "2026-09-18T00:00:00.000Z",
        "updatedAt": "2026-09-18T00:00:00.000Z",
        "gemstone": "common.gemstones.none",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": false,
        "weight": 5,
    },
    {
        "id": 20,
        "name": "product.names.pearl_earrings",
        "description": "product.descriptions.pearl_earrings",
        "price": 2100,
        "inStock": true,
        "category": Category.Earrings,
        "imageUrl": "/assets/earringWithPearls/1000016899.jpg",
        "images": [
            "/assets/earringWithPearls/1000016899.jpg",
            "/assets/earringWithPearls/IMG_1339.jpg",
            "/assets/earringWithPearls/IMG_5741.jpg",
            "/assets/earringWithPearls/IMG_5742.jpg",
            "/assets/earringWithPearls/IMG_8178.jpg",
        ],
        "createdAt": "2026-09-24T00:00:00.000Z",
        "updatedAt": "2026-09-24T12:13:00.000Z",
        "gemstone": "common.gemstones.pearl",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
        "weight": 5,
    },
    {
        "id": 21,
        "name": "product.names.moonstone_ring",
        "description": "product.descriptions.moonstone_ring",
        "price": 2500,
        "inStock": false,
        "category": Category.Rings,
        "imageUrl": "/assets/moonstoneRing/IMG_8215.jpg",
        "images": [
            "/assets/moonstoneRing/IMG_8189.jpg",
            "/assets/moonstoneRing/IMG_8214.jpg",
            "/assets/moonstoneRing/IMG_8215.jpg",
            "/assets/moonstoneRing/IMG_8222.jpg",
            "/assets/moonstoneRing/IMG_8223.jpg",
        ],
        "createdAt": "2026-09-24T00:00:00.000Z",
        "updatedAt": "2026-09-24T00:00:00.000Z",
        "gemstone": "common.gemstones.moonstone",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
        "weight": 5,
    },
    {
        "id": 22,
        "name": "product.names.solomia_pendant",
        "description": "product.descriptions.solomia_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "imageUrl": "/assets/collections/herName/solomia/1.jpeg",
        "images": [
            "/assets/collections/herName/solomia/IMG_0019.png",
            "/assets/collections/herName/solomia/IMG_9892.png",
            "/assets/collections/herName/solomia/IMG_9914.png",
            "/assets/collections/herName/solomia/IMG_9912.png",
        ],
        "createdAt": "2026-11-06T00:00:00.000Z",
        "updatedAt": "2026-11-06T00:00:00.000Z",
        "gemstone": "common.gemstones.tourmaline_citrine",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 23,
        "name": "product.names.stefania_pendant",
        "description": "product.descriptions.stefania_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "imageUrl": "/assets/collections/herName/stefania/2.jpeg",
        "images": [
            "/assets/collections/herName/stefania/IMG_9890.png",
            "/assets/collections/herName/stefania/IMG_0013.png",
            "/assets/collections/herName/stefania/IMG_9904.png",
            "/assets/collections/herName/stefania/IMG_0010.png",
            "/assets/collections/herName/stefania/IMG_9834.png",
        ],
        "createdAt": "2026-11-09T00:00:00.000Z",
        "updatedAt": "2026-11-09T00:00:00.000Z",
        "gemstone": "common.gemstones.tourmaline_peridot_rhodolite",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 24,
        "name": "product.names.maya_pendant",
        "description": "product.descriptions.maya_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "imageUrl": "/assets/collections/herName/maya/3.jpeg",
        "images": [
            "/assets/collections/herName/maya/IMG_0026.png",
            "/assets/collections/herName/maya/IMG_0027.png",
            "/assets/collections/herName/maya/IMG_0028.png",
            "/assets/collections/herName/maya/IMG_0030.png",
            "/assets/collections/herName/maya/IMG_9884.png",
        ],
        "createdAt": "2026-11-09T00:00:00.000Z",
        "updatedAt": "2026-11-09T00:00:00.000Z",
        "gemstone": "common.gemstones.chrysoprase_peridot_tourmaline",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 25,
        "name": "product.names.oia_pendant",
        "description": "product.descriptions.oia_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "isReleased": true,
        "imageUrl": "/assets/collections/herName/oia/4.jpeg",
        "images": [
            "/assets/collections/herName/oia/IMG_0031.webp",
            "/assets/collections/herName/oia/IMG_0032.webp",
            "/assets/collections/herName/oia/IMG_0033.webp",
            "/assets/collections/herName/oia/IMG_0034.webp",
            "/assets/collections/herName/oia/IMG_0035.webp",
        ],
        "createdAt": "2026-11-09T00:00:00.000Z",
        "updatedAt": "2026-11-09T00:00:00.000Z",
        "gemstone": "common.gemstones.labradorite_blue_topaz",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 26,
        "name": "product.names.dana_pendant",
        "description": "product.descriptions.dana_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "isReleased": false,
        "imageUrl": "/assets/collections/herName/dana/5.jpeg",
        "images": [
            "/assets/collections/herName/dana/IMG_0037.png",
            "/assets/collections/herName/dana/IMG_0038.png",
            "/assets/collections/herName/dana/IMG_0039.png",
            "/assets/collections/herName/dana/IMG_0040.png",
        ],
        "createdAt": "2026-11-10T00:00:00.000Z",
        "updatedAt": "2026-11-10T00:00:00.000Z",
        "gemstone": "common.gemstones.tourmaline_london_topaz_tanzanite",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 27,
        "name": "product.names.afrodita_pendant",
        "description": "product.descriptions.afrodita_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "isReleased": false,
        "imageUrl": "/assets/collections/herName/afrodita/6.jpeg",
        "images": [
            "/assets/collections/herName/afrodita/IMG_0070.png",
            "/assets/collections/herName/afrodita/IMG_0071.png",
            "/assets/collections/herName/afrodita/IMG_0072.png",
            "/assets/collections/herName/afrodita/IMG_0073.png",
        ],
        "createdAt": "2026-11-10T00:00:00.000Z",
        "updatedAt": "2026-11-10T00:00:00.000Z",
        "gemstone": "common.gemstones.garnet",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
    {
        "id": 28,
        "name": "product.names.kvitoslava_pendant",
        "description": "product.descriptions.kvitoslava_pendant",
        "price": 2500,
        "inStock": true,
        "category": Category.Pendants,
        "collection": Collection.HerName,
        "isReleased": false,
        "imageUrl": "/assets/collections/herName/kvitoslava/7.jpeg",
        "images": [
            "/assets/collections/herName/kvitoslava/IMG_0074.png",
            "/assets/collections/herName/kvitoslava/IMG_0075.png",
            "/assets/collections/herName/kvitoslava/IMG_0076.png",
            "/assets/collections/herName/kvitoslava/IMG_0077.png",
        ],
        "createdAt": "2026-11-10T00:00:00.000Z",
        "updatedAt": "2026-11-10T00:00:00.000Z",
        "gemstone": "common.gemstones.tourmaline_rhodolite",
        "metalStandard": "925",
        "metalType": "common.metal_types.silver",
        "rhodiumPlating": true,
    },
];

export function isProductReleased(product: Pick<Product, "isReleased">): boolean {
    return product.isReleased !== false;
}

/** Pieces visible on the website; unreleased ones (`isReleased: false`) are left out everywhere. */
export const products: Product[] = allProducts.filter(isProductReleased);
