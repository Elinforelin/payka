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
const getProducts_createServerFn_handler = createServerRpc("5d14184e791326a0e274d1e4e3681e27fd834658d2ef5f776f7a7ca880bdf3a5", (opts, signal) => getProducts.__executeServer(opts, signal));
const getProducts = createServerFn({
  method: "GET"
}).handler(getProducts_createServerFn_handler, async () => {
  return products;
});
export {
  getProducts_createServerFn_handler
};
