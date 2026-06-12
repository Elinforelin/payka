import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { p as products } from "./data-B-rfjP1v.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "node:fs";
import "node:url";
import "node:path";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const getProduct_createServerFn_handler = createServerRpc("02237705211f6fce5dafbd6be40b265cc093810759aabc102a7a61ff80e58dd5", (opts, signal) => getProduct.__executeServer(opts, signal));
const getProduct = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(getProduct_createServerFn_handler, async ({
  data
}) => {
  return products.find((p) => p.id === data.productId) || null;
});
export {
  getProduct_createServerFn_handler
};
