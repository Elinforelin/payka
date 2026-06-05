import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronLeft, ChevronUp, Heart, ShoppingBag, Star } from "lucide-react";
import { products } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useState } from "react";

const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { productId: number }) => data)
  .handler(async ({ data }) => {
    return products.find(p => p.id === data.productId) || null;
  });

export const Route = createFileRoute("/product/$productId")({
  loader: async ({ params }) => {
    const productId = Number(params.productId);
    if (!Number.isFinite(productId)) {
      throw notFound();
    }

    const product = await getProduct({ data: { productId } });
    console.log(product)
    if (!product) {
      throw notFound();
    }

    return product;
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const productDetails = [
    { label: "Артикул", value: product.sku },
    { label: "Проба", value: product.metalStandard },
    { label: "Метал", value: product.metalType },
    { label: "Колір металу", value: product.metalColor },
    { label: "Застібка", value: product.clasp },
    { label: "Вставка", value: product.gemstone },
    { label: "Дизайн", value: product.design },
    { label: "Стиль", value: product.style },
    { label: "Тип виробу", value: product.productType },
    { label: "Технологія виготовлення", value: product.technology },
    { label: "Ширина, мм", value: product.width },
    { label: "Товщина, мм", value: product.thickness },
    { label: "Довжина, мм", value: product.length },
    { label: "Вага, г", value: product.weight },
  ].filter((detail) => detail.value !== null && detail.value !== undefined);
  console.log(product)
  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/catalog"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-6 w-6 text-[#1a1a1a]" />
        </Link>
        <h1 className="text-xl font-bold text-[#1a1a1a]">Detail</h1>
        <div className="flex items-center gap-3">
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Heart className="h-6 w-6 text-[#1a1a1a]" />
          </button>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          <div className="aspect-square w-full overflow-hidden rounded-[48px] bg-[#f7f3ef] shadow-inner">
            <img
              src={resolveProductImageUrl(product.imageUrl)}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#1a1a1a]">{product.name}</h2>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-[#b3917d] text-[#b3917d]" />
              <span className="font-bold text-[#1a1a1a]">4.8</span>
            </div>
          </div>

          <p className="mt-2 text-[#6b5f59]">{product.description}</p>

          <div className="mt-8">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <h3 className="text-xl font-bold text-[#1a1a1a]">Про виріб</h3>
              {isDetailsOpen ? (
                <ChevronUp className="h-6 w-6 text-[#1a1a1a]" />
              ) : (
                <ChevronDown className="h-6 w-6 text-[#1a1a1a]" />
              )}
            </button>
            {isDetailsOpen && (
              <div className="mt-2 space-y-3">
                {productDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-end gap-2 text-sm md:text-base"
                  >
                    <span className="text-[#6b5f59] whitespace-nowrap">{detail.label}</span>
                    <div className="mb-1.5 flex-1 border-b border-dotted border-[#d1ccc8]" />
                    <span className="font-bold text-[#1a1a1a] text-right">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Select Size</h3>
            <div className="mt-4 flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all ${
                    size === "M"
                      ? "border-[#b3917d] bg-[#b3917d] text-white"
                      : "border-[#e5e7eb] bg-white text-[#1a1a1a]"
                  }`}
                >
                  <span className="text-lg font-bold">{size}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-6 pt-10">
            <div>
              <p className="text-sm font-medium text-[#6b5f59]">Total Price</p>
              <p className="text-3xl font-bold text-[#1a1a1a]">${product.price}</p>
            </div>
            <button className="flex flex-1 items-center justify-center gap-3 rounded-full bg-[#1a1a1a] py-5 text-xl font-bold text-white transition-all hover:bg-[#333]">
              <ShoppingBag className="h-6 w-6" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
