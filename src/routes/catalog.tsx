import {createFileRoute, Link} from "@tanstack/react-router";
import {Search, SlidersHorizontal, ShoppingBag, Heart, Bell} from "lucide-react";
import {useState} from "react";
import {createServerFn} from "@tanstack/react-start";
import {prisma} from "@/lib/prisma.ts";
import {resolveProductImageUrl} from "@/lib/product-images.ts";

import img1 from "@/assets/619792737_18417153727189140_5984683189343682714_n.jpg";

const getProducts = createServerFn({method: "GET"}).handler(async () => {
    return await prisma.product.findMany();
});

export const Route = createFileRoute("/catalog")({
    loader: async () => await getProducts(),
    component: CatalogPage,
});

function CatalogPage() {
    const productsData = Route.useLoaderData();
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Rings", "Bangles", "Earrings", "Pendants"];

    const filteredProducts = (productsData || []).filter((product) => {
        if (activeCategory === "All") return true;
        return product.category.toLowerCase() === activeCategory.toLowerCase();
    });

    return (
        <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-xl">
                        <img src={img1} alt="User" className="h-full w-full object-cover"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#1a1a1a]">Welcome Back</h2>
                        <p className="text-sm text-[#6b5f59]">Sanzida</p>
                    </div>
                </div>
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Bell className="h-6 w-6 text-[#1a1a1a]"/>
                </button>
            </header>

            {/* Search & Filter */}
            <div className="mt-8 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19690]"/>
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-lg outline-none shadow-sm"
                    />
                </div>
                <button
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b3917d] text-white shadow-lg">
                    <SlidersHorizontal className="h-6 w-6"/>
                </button>
            </div>

            {/* Categories */}
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap rounded-full px-8 py-3 text-lg font-medium transition-all cursor-pointer ${
                            activeCategory === cat
                                ? "bg-[#b3917d] text-white"
                                : "bg-white text-[#6b5f59]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* New Arrivals */}
            <section className="mt-8">
                <h3 className="text-2xl font-bold text-[#1a1a1a]">New Arrivals</h3>
                <div className="mt-6 flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                    {filteredProducts.map((product) => (
                        <Link
                            to="/product/$productId"
                            params={{ productId: String(product.id) }}
                            key={product.id}
                            className="min-w-[280px] rounded-[32px] bg-white p-4 shadow-sm"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#f7f3ef]">
                                <button
                                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-[#1a1a1a] backdrop-blur-md">
                                    <Heart className="h-5 w-5"/>
                                </button>
                                <img
                                    src={resolveProductImageUrl(product.imageUrl)}
                                    alt={product.name}
                                    className="h-full w-full object-contain p-8"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between px-2">
                                <div>
                                    <h4 className="text-lg font-bold text-[#1a1a1a]">
                                        {product.name}
                                    </h4>
                                    <p className="text-lg font-bold text-[#b3917d]">
                                        ${product.price}
                                    </p>
                                </div>
                                <Link
                                    to="/product/$productId"
                                    params={{ productId: String(product.id) }}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-white"
                                >
                                    <ShoppingBag className="h-5 w-5"/>
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* We Recommend */}
            <section className="mt-10">
                <h3 className="text-2xl font-bold text-[#1a1a1a]">We Recommend</h3>
                <div className="mt-6 space-y-4">
                    {(productsData || []).slice(0, 3).map((product) => (
                        <Link
                            to="/product/$productId"
                            params={{ productId: String(product.id) }}
                            key={product.id}
                            className="flex items-center gap-4 rounded-3xl bg-white p-3 shadow-sm"
                        >
                            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-[#f7f3ef]">
                                <img
                                    src={resolveProductImageUrl(product.imageUrl)}
                                    alt={product.name}
                                    className="h-full w-full object-contain p-2"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-[#1a1a1a]">
                                    {product.name}
                                </h4>
                                <p className="text-lg font-bold text-[#b3917d]">
                                    ${product.price}
                                </p>
                            </div>
                            <span
                                className="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e7eb] text-[#1a1a1a]">
                                <ShoppingBag className="h-5 w-5"/>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

