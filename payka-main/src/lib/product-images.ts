import defaultImage from "@/assets/619792737_18417153727189140_5984683189343682714_n.jpg";

const assetModules = import.meta.glob<string>("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const assetsByFilename = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop()!;
    return [filename, url];
  }),
);

export function resolveProductImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return defaultImage;

  const filename = imageUrl.split("/").pop();
  if (filename && assetsByFilename[filename]) {
    return assetsByFilename[filename];
  }

  return defaultImage;
}
