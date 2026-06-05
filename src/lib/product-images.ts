import defaultImage from "@/assets/619792737_18417153727189140_5984683189343682714_n.jpg";

const assetModules = import.meta.glob<string>("../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const assetsByPath = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    // path is like "../assets/lollypop/IMG_4831.JPG"
    // we want to match it with "/assets/lollypop/IMG_4831.JPG"
    const normalizedPath = path.replace(/^\.\.\/assets/, "/assets");
    return [normalizedPath, url];
  }),
);

const assetsByFilename = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop()!, url])
);

export function resolveProductImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return defaultImage;

  if (assetsByPath[imageUrl]) {
    return assetsByPath[imageUrl];
  }

  const filename = imageUrl.split("/").pop();
  if (filename && assetsByFilename[filename]) {
    return assetsByFilename[filename];
  }

  return defaultImage;
}
