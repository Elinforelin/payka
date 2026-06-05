import { a as createServerRpc, c as createServerFn } from "./server.mjs";
import { p as products } from "./data-PA_hLshr.mjs";
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
const getProducts_createServerFn_handler = createServerRpc("237309454c5690c32e203a1aa74c313b7a850b750559f65572a0bdfc1a3249a9", (opts, signal) => getProducts.__executeServer(opts, signal));
const getProducts = createServerFn({
  method: "GET"
}).handler(getProducts_createServerFn_handler, async () => {
  return products;
});
export {
  getProducts_createServerFn_handler
};
