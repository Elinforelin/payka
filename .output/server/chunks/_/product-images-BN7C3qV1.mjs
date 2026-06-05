import { i as img1, a as img2 } from "./619792737_18417153727189140_5984683189343682714_n-2Ta9zfVb.mjs";
import { i as img } from "./7812354786123547-cWmkQVbL.mjs";
const __vite_glob_0_0 = "/assets/2345413523454-Xt8wRga0.png";
const __vite_glob_0_1 = "/assets/45875674576754-n8SRIrbi.png";
const __vite_glob_0_3 = "/assets/5346354635465-0idztduK.png";
const assetModules = /* @__PURE__ */ Object.assign({
  "../assets/2345413523454.png": __vite_glob_0_0,
  "../assets/45875674576754.png": __vite_glob_0_1,
  "../assets/521469718_18391966183189140_5158185447317376143_n.jpg": img2,
  "../assets/5346354635465.png": __vite_glob_0_3,
  "../assets/619792737_18417153727189140_5984683189343682714_n.jpg": img1,
  "../assets/7812354786123547.png": img
});
const assetsByFilename = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const filename = path.split("/").pop();
    return [filename, url];
  })
);
function resolveProductImageUrl(imageUrl) {
  if (!imageUrl) return img1;
  const filename = imageUrl.split("/").pop();
  if (filename && assetsByFilename[filename]) {
    return assetsByFilename[filename];
  }
  return img1;
}
export {
  resolveProductImageUrl as r
};
