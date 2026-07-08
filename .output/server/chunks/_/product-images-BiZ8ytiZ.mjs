import { i as img } from "./7812354786123547-BzsHGh6s.mjs";
const __vite_glob_0_0 = "/assets/2345413523454-Xt8wRga0.png";
const __vite_glob_0_1 = "/assets/45875674576754-n8SRIrbi.png";
const __vite_glob_0_2 = "/assets/521469718_18391966183189140_5158185447317376143_n-DV7w6U8k.jpg";
const __vite_glob_0_3 = "/assets/5346354635465-0idztduK.png";
const defaultImage = "/assets/619792737_18417153727189140_5984683189343682714_n-D8TUxlBa.jpg";
const __vite_glob_0_6 = "/assets/5282821220627849158-DfogjQUX.jpg";
const __vite_glob_0_7 = "/assets/5282821220627849159-DcVdvfL5.jpg";
const __vite_glob_0_8 = "/assets/5282821220627849160-CfkbQknG.jpg";
const __vite_glob_0_9 = "/assets/blue-DvMUwwc9.png";
const __vite_glob_0_10 = "/assets/green-CwbQ3KGP.png";
const __vite_glob_0_11 = "/assets/white-CVIsZzJV.png";
const __vite_glob_0_12 = "/assets/yellow-79HrWYOE.png";
const __vite_glob_0_13 = "/assets/5282821220627849167-B9vlzwNK.jpg";
const __vite_glob_0_14 = "/assets/5282821220627849168-BHthtyBB.jpg";
const __vite_glob_0_15 = "/assets/5282821220627849169-BMbkkhpa.jpg";
const __vite_glob_0_16 = "/assets/5282821220627849170-DVP_w26p.jpg";
const __vite_glob_0_17 = "/assets/IMG_4923-a4mg6Wg5.png";
const __vite_glob_0_18 = "/assets/IMG_4935-B_49xHWQ.png";
const __vite_glob_0_19 = "/assets/IMG_4939-IrMGZfHw.png";
const __vite_glob_0_20 = "/assets/5267491911117774004-BfnEaEnc.png";
const __vite_glob_0_21 = "/assets/IMG_4831-DBGRXD2-.png";
const __vite_glob_0_22 = "/assets/IMG_4835-BCflxU0K.png";
const __vite_glob_0_23 = "/assets/IMG_4837-BFFnsUx3.png";
const __vite_glob_0_24 = "/assets/5267491911117774016-DZWLj8IV.jpg";
const __vite_glob_0_25 = "/assets/5267491911117774017-DzJjAsKi.jpg";
const __vite_glob_0_26 = "/assets/5271827470149687881-BmJEuHgv.jpg";
const __vite_glob_0_27 = "/assets/5271827470149687883-CHA2LveA.jpg";
const __vite_glob_0_28 = "/assets/5271827470149687884-kQhSUqBS.jpg";
const assetModules = /* @__PURE__ */ Object.assign({
  "../assets/2345413523454.png": __vite_glob_0_0,
  "../assets/45875674576754.png": __vite_glob_0_1,
  "../assets/521469718_18391966183189140_5158185447317376143_n.jpg": __vite_glob_0_2,
  "../assets/5346354635465.png": __vite_glob_0_3,
  "../assets/619792737_18417153727189140_5984683189343682714_n.jpg": defaultImage,
  "../assets/7812354786123547.png": img,
  "../assets/bubochki/5282821220627849158.jpg": __vite_glob_0_6,
  "../assets/bubochki/5282821220627849159.jpg": __vite_glob_0_7,
  "../assets/bubochki/5282821220627849160.jpg": __vite_glob_0_8,
  "../assets/cubicZirconiaColors/blue.png": __vite_glob_0_9,
  "../assets/cubicZirconiaColors/green.png": __vite_glob_0_10,
  "../assets/cubicZirconiaColors/white.png": __vite_glob_0_11,
  "../assets/cubicZirconiaColors/yellow.png": __vite_glob_0_12,
  "../assets/cup/5282821220627849167.jpg": __vite_glob_0_13,
  "../assets/cup/5282821220627849168.jpg": __vite_glob_0_14,
  "../assets/cup/5282821220627849169.jpg": __vite_glob_0_15,
  "../assets/cup/5282821220627849170.jpg": __vite_glob_0_16,
  "../assets/flower/IMG_4923.png": __vite_glob_0_17,
  "../assets/flower/IMG_4935.png": __vite_glob_0_18,
  "../assets/flower/IMG_4939.png": __vite_glob_0_19,
  "../assets/lollypop/5267491911117774004.png": __vite_glob_0_20,
  "../assets/lollypop/IMG_4831.png": __vite_glob_0_21,
  "../assets/lollypop/IMG_4835.png": __vite_glob_0_22,
  "../assets/lollypop/IMG_4837.png": __vite_glob_0_23,
  "../assets/plava/5267491911117774016.jpg": __vite_glob_0_24,
  "../assets/plava/5267491911117774017.jpg": __vite_glob_0_25,
  "../assets/plava/5271827470149687881.jpg": __vite_glob_0_26,
  "../assets/plava/5271827470149687883.jpg": __vite_glob_0_27,
  "../assets/plava/5271827470149687884.jpg": __vite_glob_0_28
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
export {
  resolveProductImageUrl as r
};
