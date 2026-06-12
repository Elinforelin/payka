import { i as img1, a as img2 } from "./619792737_18417153727189140_5984683189343682714_n-2Ta9zfVb.mjs";
import { i as img } from "./7812354786123547-cWmkQVbL.mjs";
const __vite_glob_0_0 = "/assets/2345413523454-Xt8wRga0.png";
const __vite_glob_0_1 = "/assets/45875674576754-n8SRIrbi.png";
const __vite_glob_0_3 = "/assets/5346354635465-0idztduK.png";
const __vite_glob_0_6 = "/assets/blue-DvMUwwc9.png";
const __vite_glob_0_7 = "/assets/green-CwbQ3KGP.png";
const __vite_glob_0_8 = "/assets/white-CVIsZzJV.png";
const __vite_glob_0_9 = "/assets/yellow-79HrWYOE.png";
const __vite_glob_0_10 = "/assets/5267491911117774004-BfnEaEnc.png";
const __vite_glob_0_11 = "/assets/IMG_4831-DBGRXD2-.png";
const __vite_glob_0_12 = "/assets/IMG_4835-BCflxU0K.png";
const __vite_glob_0_13 = "/assets/IMG_4837-BFFnsUx3.png";
const __vite_glob_0_14 = "/assets/5267491911117774016-DZWLj8IV.jpg";
const __vite_glob_0_15 = "/assets/5267491911117774017-DzJjAsKi.jpg";
const __vite_glob_0_16 = "/assets/5271827470149687881-BmJEuHgv.jpg";
const __vite_glob_0_17 = "/assets/5271827470149687883-CHA2LveA.jpg";
const __vite_glob_0_18 = "/assets/5271827470149687884-kQhSUqBS.jpg";
const assetModules = /* @__PURE__ */ Object.assign({
  "../assets/2345413523454.png": __vite_glob_0_0,
  "../assets/45875674576754.png": __vite_glob_0_1,
  "../assets/521469718_18391966183189140_5158185447317376143_n.jpg": img2,
  "../assets/5346354635465.png": __vite_glob_0_3,
  "../assets/619792737_18417153727189140_5984683189343682714_n.jpg": img1,
  "../assets/7812354786123547.png": img,
  "../assets/cubicZirconiaColors/blue.png": __vite_glob_0_6,
  "../assets/cubicZirconiaColors/green.png": __vite_glob_0_7,
  "../assets/cubicZirconiaColors/white.png": __vite_glob_0_8,
  "../assets/cubicZirconiaColors/yellow.png": __vite_glob_0_9,
  "../assets/lollypop/5267491911117774004.png": __vite_glob_0_10,
  "../assets/lollypop/IMG_4831.png": __vite_glob_0_11,
  "../assets/lollypop/IMG_4835.png": __vite_glob_0_12,
  "../assets/lollypop/IMG_4837.png": __vite_glob_0_13,
  "../assets/plava/5267491911117774016.jpg": __vite_glob_0_14,
  "../assets/plava/5267491911117774017.jpg": __vite_glob_0_15,
  "../assets/plava/5271827470149687881.jpg": __vite_glob_0_16,
  "../assets/plava/5271827470149687883.jpg": __vite_glob_0_17,
  "../assets/plava/5271827470149687884.jpg": __vite_glob_0_18
});
const assetsByPath = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => {
    const normalizedPath = path.replace(/^\.\.\/assets/, "/assets");
    return [normalizedPath, url];
  })
);
const assetsByFilename = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop(), url])
);
function resolveProductImageUrl(imageUrl) {
  if (!imageUrl) return img1;
  if (assetsByPath[imageUrl]) {
    return assetsByPath[imageUrl];
  }
  const filename = imageUrl.split("/").pop();
  if (filename && assetsByFilename[filename]) {
    return assetsByFilename[filename];
  }
  return img1;
}
export {
  resolveProductImageUrl as r
};
