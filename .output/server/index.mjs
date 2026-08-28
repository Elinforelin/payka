globalThis.__nitro_main__ = import.meta.url;
import nodeHTTP from "node:http";
import { Readable } from "node:stream";
import nodeHTTPS from "node:https";
import nodeHTTP2 from "node:http2";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./chunks/_/server.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
function lazyInherit(target, source, sourceKey) {
  for (const key2 of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
    if (key2 === "constructor") continue;
    const targetDesc = Object.getOwnPropertyDescriptor(target, key2);
    const desc = Object.getOwnPropertyDescriptor(source, key2);
    let modified = false;
    if (desc.get) {
      modified = true;
      desc.get = targetDesc?.get || function() {
        return this[sourceKey][key2];
      };
    }
    if (desc.set) {
      modified = true;
      desc.set = targetDesc?.set || function(value) {
        this[sourceKey][key2] = value;
      };
    }
    if (!targetDesc?.value && typeof desc.value === "function") {
      modified = true;
      desc.value = function(...args) {
        return this[sourceKey][key2](...args);
      };
    }
    if (modified) Object.defineProperty(target, key2, desc);
  }
}
const FastURL = /* @__PURE__ */ (() => {
  const NativeURL = globalThis.URL;
  const FastURL$1 = class URL {
    #url;
    #href;
    #protocol;
    #host;
    #pathname;
    #search;
    #searchParams;
    #pos;
    constructor(url) {
      if (typeof url === "string") this.#href = url;
      else {
        this.#protocol = url.protocol;
        this.#host = url.host;
        this.#pathname = url.pathname;
        this.#search = url.search;
      }
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeURL;
    }
    get _url() {
      if (this.#url) return this.#url;
      this.#url = new NativeURL(this.href);
      this.#href = void 0;
      this.#protocol = void 0;
      this.#host = void 0;
      this.#pathname = void 0;
      this.#search = void 0;
      this.#searchParams = void 0;
      this.#pos = void 0;
      return this.#url;
    }
    get href() {
      if (this.#url) return this.#url.href;
      if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
      return this.#href;
    }
    #getPos() {
      if (!this.#pos) {
        const url = this.href;
        const protoIndex = url.indexOf("://");
        const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
        this.#pos = [
          protoIndex,
          pathnameIndex,
          pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex)
        ];
      }
      return this.#pos;
    }
    get pathname() {
      if (this.#url) return this.#url.pathname;
      if (this.#pathname === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.pathname;
        this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
      }
      return this.#pathname;
    }
    get search() {
      if (this.#url) return this.#url.search;
      if (this.#search === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.search;
        const url = this.href;
        this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
      }
      return this.#search;
    }
    get searchParams() {
      if (this.#url) return this.#url.searchParams;
      if (!this.#searchParams) this.#searchParams = new URLSearchParams(this.search);
      return this.#searchParams;
    }
    get protocol() {
      if (this.#url) return this.#url.protocol;
      if (this.#protocol === void 0) {
        const [protocolIndex] = this.#getPos();
        if (protocolIndex === -1) return this._url.protocol;
        this.#protocol = this.href.slice(0, protocolIndex + 1);
      }
      return this.#protocol;
    }
    toString() {
      return this.href;
    }
    toJSON() {
      return this.href;
    }
  };
  lazyInherit(FastURL$1.prototype, NativeURL.prototype, "_url");
  Object.setPrototypeOf(FastURL$1.prototype, NativeURL.prototype);
  Object.setPrototypeOf(FastURL$1, NativeURL);
  return FastURL$1;
})();
function resolvePortAndHost(opts) {
  const _port = opts.port ?? globalThis.process?.env.PORT ?? 3e3;
  const port2 = typeof _port === "number" ? _port : Number.parseInt(_port, 10);
  if (port2 < 0 || port2 > 65535) throw new RangeError(`Port must be between 0 and 65535 (got "${port2}").`);
  return {
    port: port2,
    hostname: opts.hostname ?? globalThis.process?.env.HOST
  };
}
function fmtURL(host2, port2, secure) {
  if (!host2 || !port2) return;
  if (host2.includes(":")) host2 = `[${host2}]`;
  return `http${secure ? "s" : ""}://${host2}:${port2}/`;
}
function printListening(opts, url) {
  if (!url || (opts.silent ?? globalThis.process?.env?.TEST)) return;
  const _url = new URL(url);
  const allInterfaces = _url.hostname === "[::]" || _url.hostname === "0.0.0.0";
  if (allInterfaces) {
    _url.hostname = "localhost";
    url = _url.href;
  }
  let listeningOn = `➜ Listening on:`;
  let additionalInfo = allInterfaces ? " (all interfaces)" : "";
  if (globalThis.process.stdout?.isTTY) {
    listeningOn = `\x1B[32m${listeningOn}\x1B[0m`;
    url = `\x1B[36m${url}\x1B[0m`;
    additionalInfo = `\x1B[2m${additionalInfo}\x1B[0m`;
  }
  console.log(`${listeningOn} ${url}${additionalInfo}`);
}
function resolveTLSOptions(opts) {
  if (!opts.tls || opts.protocol === "http") return;
  const cert2 = resolveCertOrKey(opts.tls.cert);
  const key2 = resolveCertOrKey(opts.tls.key);
  if (!cert2 && !key2) {
    if (opts.protocol === "https") throw new TypeError("TLS `cert` and `key` must be provided for `https` protocol.");
    return;
  }
  if (!cert2 || !key2) throw new TypeError("TLS `cert` and `key` must be provided together.");
  return {
    cert: cert2,
    key: key2,
    passphrase: opts.tls.passphrase
  };
}
function resolveCertOrKey(value) {
  if (!value) return;
  if (typeof value !== "string") throw new TypeError("TLS certificate and key must be strings in PEM format or file paths.");
  if (value.startsWith("-----BEGIN ")) return value;
  const { readFileSync } = process.getBuiltinModule("node:fs");
  return readFileSync(value, "utf8");
}
function createWaitUntil() {
  const promises2 = /* @__PURE__ */ new Set();
  return {
    waitUntil: (promise) => {
      if (typeof promise?.then !== "function") return;
      promises2.add(Promise.resolve(promise).catch(console.error).finally(() => {
        promises2.delete(promise);
      }));
    },
    wait: () => {
      return Promise.all(promises2);
    }
  };
}
const noColor = /* @__PURE__ */ (() => {
  const env = globalThis.process?.env ?? {};
  return env.NO_COLOR === "1" || env.TERM === "dumb";
})();
const _c = (c, r = 39) => (t) => noColor ? t : `\x1B[${c}m${t}\x1B[${r}m`;
const red = /* @__PURE__ */ _c(31);
const gray = /* @__PURE__ */ _c(90);
function wrapFetch(server) {
  const fetchHandler = server.options.fetch;
  const middleware = server.options.middleware || [];
  return middleware.length === 0 ? fetchHandler : (request) => callMiddleware$1(request, fetchHandler, middleware, 0);
}
function callMiddleware$1(request, fetchHandler, middleware, index) {
  if (index === middleware.length) return fetchHandler(request);
  return middleware[index](request, () => callMiddleware$1(request, fetchHandler, middleware, index + 1));
}
const errorPlugin = (server) => {
  const errorHandler2 = server.options.error;
  if (!errorHandler2) return;
  server.options.middleware.unshift((_req, next) => {
    try {
      const res = next();
      return res instanceof Promise ? res.catch((error) => errorHandler2(error)) : res;
    } catch (error) {
      return errorHandler2(error);
    }
  });
};
const gracefulShutdownPlugin = (server) => {
  const config = server.options?.gracefulShutdown;
  if (!globalThis.process?.on || config === false || config === void 0 && (process.env.CI || process.env.TEST)) return;
  const gracefulShutdown = config === true || !config?.gracefulTimeout ? Number.parseInt(process.env.SERVER_SHUTDOWN_TIMEOUT || "") || 3 : config.gracefulTimeout;
  const forceShutdown = config === true || !config?.forceTimeout ? Number.parseInt(process.env.SERVER_FORCE_SHUTDOWN_TIMEOUT || "") || 5 : config.forceTimeout;
  let isShuttingDown = false;
  const shutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    const w = process.stderr.write.bind(process.stderr);
    w(gray(`
Shutting down server in ${gracefulShutdown}s...`));
    let timeout;
    await Promise.race([server.close().finally(() => {
      clearTimeout(timeout);
      w(gray(" Server closed.\n"));
    }), new Promise((resolve2) => {
      timeout = setTimeout(() => {
        w(gray(`
Force closing connections in ${forceShutdown}s...`));
        timeout = setTimeout(() => {
          w(red("\nCould not close connections in time, force exiting."));
          resolve2();
        }, forceShutdown * 1e3);
        return server.close(true);
      }, gracefulShutdown * 1e3);
    })]);
    globalThis.process.exit(0);
  };
  for (const sig of ["SIGINT", "SIGTERM"]) globalThis.process.on(sig, shutdown);
};
const NodeResponse = /* @__PURE__ */ (() => {
  const NativeResponse = globalThis.Response;
  const STATUS_CODES = globalThis.process?.getBuiltinModule?.("node:http")?.STATUS_CODES || {};
  class NodeResponse$1 {
    #body;
    #init;
    #headers;
    #response;
    constructor(body, init) {
      this.#body = body;
      this.#init = init;
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeResponse;
    }
    get status() {
      return this.#response?.status || this.#init?.status || 200;
    }
    get statusText() {
      return this.#response?.statusText || this.#init?.statusText || STATUS_CODES[this.status] || "";
    }
    get headers() {
      if (this.#response) return this.#response.headers;
      if (this.#headers) return this.#headers;
      const initHeaders = this.#init?.headers;
      return this.#headers = initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders);
    }
    get ok() {
      if (this.#response) return this.#response.ok;
      const status = this.status;
      return status >= 200 && status < 300;
    }
    get _response() {
      if (this.#response) return this.#response;
      this.#response = new NativeResponse(this.#body, this.#headers ? {
        ...this.#init,
        headers: this.#headers
      } : this.#init);
      this.#init = void 0;
      this.#headers = void 0;
      this.#body = void 0;
      return this.#response;
    }
    _toNodeResponse() {
      const status = this.status;
      const statusText = this.statusText;
      let body;
      let contentType;
      let contentLength;
      if (this.#response) body = this.#response.body;
      else if (this.#body) if (this.#body instanceof ReadableStream) body = this.#body;
      else if (typeof this.#body === "string") {
        body = this.#body;
        contentType = "text/plain; charset=UTF-8";
        contentLength = Buffer.byteLength(this.#body);
      } else if (this.#body instanceof ArrayBuffer) {
        body = Buffer.from(this.#body);
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof Uint8Array) {
        body = this.#body;
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof DataView) {
        body = Buffer.from(this.#body.buffer);
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof Blob) {
        body = this.#body.stream();
        contentType = this.#body.type;
        contentLength = this.#body.size;
      } else if (typeof this.#body.pipe === "function") body = this.#body;
      else body = this._response.body;
      const headers2 = [];
      const initHeaders = this.#init?.headers;
      const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders).map(([k, v]) => [k.toLowerCase(), v]) : void 0);
      let hasContentTypeHeader;
      let hasContentLength;
      if (headerEntries) for (const [key2, value] of headerEntries) {
        if (Array.isArray(value)) for (const v of value) headers2.push([key2, v]);
        else headers2.push([key2, value]);
        if (key2 === "content-type") hasContentTypeHeader = true;
        else if (key2 === "content-length") hasContentLength = true;
      }
      if (contentType && !hasContentTypeHeader) headers2.push(["content-type", contentType]);
      if (contentLength && !hasContentLength) headers2.push(["content-length", String(contentLength)]);
      this.#init = void 0;
      this.#headers = void 0;
      this.#response = void 0;
      this.#body = void 0;
      return {
        status,
        statusText,
        headers: headers2,
        body
      };
    }
  }
  lazyInherit(NodeResponse$1.prototype, NativeResponse.prototype, "_response");
  Object.setPrototypeOf(NodeResponse$1, NativeResponse);
  Object.setPrototypeOf(NodeResponse$1.prototype, NativeResponse.prototype);
  return NodeResponse$1;
})();
async function sendNodeResponse(nodeRes, webRes) {
  if (!webRes) {
    nodeRes.statusCode = 500;
    return endNodeResponse(nodeRes);
  }
  if (webRes._toNodeResponse) {
    const res = webRes._toNodeResponse();
    writeHead(nodeRes, res.status, res.statusText, res.headers);
    if (res.body) {
      if (res.body instanceof ReadableStream) return streamBody(res.body, nodeRes);
      else if (typeof res.body?.pipe === "function") {
        res.body.pipe(nodeRes);
        return new Promise((resolve2) => nodeRes.on("close", resolve2));
      }
      nodeRes.write(res.body);
    }
    return endNodeResponse(nodeRes);
  }
  const rawHeaders = [...webRes.headers];
  writeHead(nodeRes, webRes.status, webRes.statusText, rawHeaders);
  return webRes.body ? streamBody(webRes.body, nodeRes) : endNodeResponse(nodeRes);
}
function writeHead(nodeRes, status, statusText, rawHeaders) {
  const writeHeaders = globalThis.Deno ? rawHeaders : rawHeaders.flat();
  if (!nodeRes.headersSent) if (nodeRes.req?.httpVersion === "2.0") nodeRes.writeHead(status, writeHeaders);
  else nodeRes.writeHead(status, statusText, writeHeaders);
}
function endNodeResponse(nodeRes) {
  return new Promise((resolve2) => nodeRes.end(resolve2));
}
function streamBody(stream, nodeRes) {
  if (nodeRes.destroyed) {
    stream.cancel();
    return;
  }
  const reader = stream.getReader();
  function streamCancel(error) {
    reader.cancel(error).catch(() => {
    });
    if (error) nodeRes.destroy(error);
  }
  function streamHandle({ done, value }) {
    try {
      if (done) nodeRes.end();
      else if (nodeRes.write(value)) reader.read().then(streamHandle, streamCancel);
      else nodeRes.once("drain", () => reader.read().then(streamHandle, streamCancel));
    } catch (error) {
      streamCancel(error instanceof Error ? error : void 0);
    }
  }
  nodeRes.on("close", streamCancel);
  nodeRes.on("error", streamCancel);
  reader.read().then(streamHandle, streamCancel);
  return reader.closed.catch(streamCancel).finally(() => {
    nodeRes.off("close", streamCancel);
    nodeRes.off("error", streamCancel);
  });
}
var NodeRequestURL = class extends FastURL {
  #req;
  constructor({ req }) {
    const path = req.url || "/";
    if (path[0] === "/") {
      const qIndex = path.indexOf("?");
      const pathname = qIndex === -1 ? path : path?.slice(0, qIndex) || "/";
      const search = qIndex === -1 ? "" : path?.slice(qIndex) || "";
      const host2 = req.headers.host || req.headers[":authority"] || `${req.socket.localFamily === "IPv6" ? "[" + req.socket.localAddress + "]" : req.socket.localAddress}:${req.socket?.localPort || "80"}`;
      const protocol = req.socket?.encrypted || req.headers["x-forwarded-proto"] === "https" || req.headers[":scheme"] === "https" ? "https:" : "http:";
      super({
        protocol,
        host: host2,
        pathname,
        search
      });
    } else super(path);
    this.#req = req;
  }
  get pathname() {
    return super.pathname;
  }
  set pathname(value) {
    this._url.pathname = value;
    this.#req.url = this._url.pathname + this._url.search;
  }
};
const NodeRequestHeaders = /* @__PURE__ */ (() => {
  const NativeHeaders = globalThis.Headers;
  class Headers2 {
    #req;
    #headers;
    constructor(req) {
      this.#req = req;
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeHeaders;
    }
    get _headers() {
      if (!this.#headers) {
        const headers2 = new NativeHeaders();
        const rawHeaders = this.#req.rawHeaders;
        const len = rawHeaders.length;
        for (let i = 0; i < len; i += 2) {
          const key2 = rawHeaders[i];
          if (key2.charCodeAt(0) === 58) continue;
          const value = rawHeaders[i + 1];
          headers2.append(key2, value);
        }
        this.#headers = headers2;
      }
      return this.#headers;
    }
    get(name) {
      if (this.#headers) return this.#headers.get(name);
      const value = this.#req.headers[name.toLowerCase()];
      return Array.isArray(value) ? value.join(", ") : value || null;
    }
    has(name) {
      if (this.#headers) return this.#headers.has(name);
      return name.toLowerCase() in this.#req.headers;
    }
    getSetCookie() {
      if (this.#headers) return this.#headers.getSetCookie();
      const value = this.#req.headers["set-cookie"];
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    *_entries() {
      const rawHeaders = this.#req.rawHeaders;
      const len = rawHeaders.length;
      for (let i = 0; i < len; i += 2) {
        const key2 = rawHeaders[i];
        if (key2.charCodeAt(0) === 58) continue;
        yield [key2.toLowerCase(), rawHeaders[i + 1]];
      }
    }
    entries() {
      return this.#headers ? this.#headers.entries() : this._entries();
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  }
  lazyInherit(Headers2.prototype, NativeHeaders.prototype, "_headers");
  Object.setPrototypeOf(Headers2, NativeHeaders);
  Object.setPrototypeOf(Headers2.prototype, NativeHeaders.prototype);
  return Headers2;
})();
const NodeRequest = /* @__PURE__ */ (() => {
  const NativeRequest = globalThis[/* @__PURE__ */ Symbol.for("srvx.nativeRequest")] ??= globalThis.Request;
  const PatchedRequest = class Request$1 extends NativeRequest {
    static _srvx = true;
    static [Symbol.hasInstance](instance) {
      if (this === PatchedRequest) return instance instanceof NativeRequest;
      else return Object.prototype.isPrototypeOf.call(this.prototype, instance);
    }
    constructor(input, options) {
      if (typeof input === "object" && "_request" in input) input = input._request;
      if (options?.body?.getReader !== void 0) options.duplex ??= "half";
      super(input, options);
    }
  };
  if (!globalThis.Request._srvx) globalThis.Request = PatchedRequest;
  class Request2 {
    runtime;
    #req;
    #url;
    #bodyStream;
    #request;
    #headers;
    #abortController;
    constructor(ctx) {
      this.#req = ctx.req;
      this.runtime = {
        name: "node",
        node: ctx
      };
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeRequest;
    }
    get ip() {
      return this.#req.socket?.remoteAddress;
    }
    get method() {
      if (this.#request) return this.#request.method;
      return this.#req.method || "GET";
    }
    get _url() {
      return this.#url ||= new NodeRequestURL({ req: this.#req });
    }
    set _url(url) {
      this.#url = url;
    }
    get url() {
      if (this.#request) return this.#request.url;
      return this._url.href;
    }
    get headers() {
      if (this.#request) return this.#request.headers;
      return this.#headers ||= new NodeRequestHeaders(this.#req);
    }
    get _abortController() {
      if (!this.#abortController) {
        this.#abortController = new AbortController();
        const { req, res } = this.runtime.node;
        const abortController = this.#abortController;
        const abort = (err) => abortController.abort?.(err);
        req.once("error", abort);
        if (res) res.once("close", () => {
          const reqError = req.errored;
          if (reqError) abort(reqError);
          else if (!res.writableEnded) abort();
        });
        else req.once("close", () => {
          if (!req.complete) abort();
        });
      }
      return this.#abortController;
    }
    get signal() {
      return this.#request ? this.#request.signal : this._abortController.signal;
    }
    get body() {
      if (this.#request) return this.#request.body;
      if (this.#bodyStream === void 0) {
        const method = this.method;
        this.#bodyStream = !(method === "GET" || method === "HEAD") ? Readable.toWeb(this.#req) : null;
      }
      return this.#bodyStream;
    }
    text() {
      if (this.#request) return this.#request.text();
      if (this.#bodyStream !== void 0) return this.#bodyStream ? new Response(this.#bodyStream).text() : Promise.resolve("");
      return readBody(this.#req).then((buf) => buf.toString());
    }
    json() {
      if (this.#request) return this.#request.json();
      return this.text().then((text) => JSON.parse(text));
    }
    get _request() {
      if (!this.#request) {
        this.#request = new PatchedRequest(this.url, {
          method: this.method,
          headers: this.headers,
          body: this.body,
          signal: this._abortController.signal
        });
        this.#headers = void 0;
        this.#bodyStream = void 0;
      }
      return this.#request;
    }
  }
  lazyInherit(Request2.prototype, NativeRequest.prototype, "_request");
  Object.setPrototypeOf(Request2.prototype, NativeRequest.prototype);
  return Request2;
})();
function readBody(req) {
  return new Promise((resolve2, reject) => {
    const chunks = [];
    const onData = (chunk) => {
      chunks.push(chunk);
    };
    const onError = (err) => {
      reject(err);
    };
    const onEnd = () => {
      req.off("error", onError);
      req.off("data", onData);
      resolve2(Buffer.concat(chunks));
    };
    req.on("data", onData).once("end", onEnd).once("error", onError);
  });
}
function serve(options) {
  return new NodeServer(options);
}
var NodeServer = class {
  runtime = "node";
  options;
  node;
  serveOptions;
  fetch;
  #isSecure;
  #listeningPromise;
  #wait;
  constructor(options) {
    this.options = {
      ...options,
      middleware: [...options.middleware || []]
    };
    for (const plugin of options.plugins || []) plugin(this);
    errorPlugin(this);
    gracefulShutdownPlugin(this);
    const fetchHandler = this.fetch = wrapFetch(this);
    this.#wait = createWaitUntil();
    const handler = (nodeReq, nodeRes) => {
      const request = new NodeRequest({
        req: nodeReq,
        res: nodeRes
      });
      request.waitUntil = this.#wait.waitUntil;
      const res = fetchHandler(request);
      return res instanceof Promise ? res.then((resolvedRes) => sendNodeResponse(nodeRes, resolvedRes)) : sendNodeResponse(nodeRes, res);
    };
    const tls = resolveTLSOptions(this.options);
    const { port: port2, hostname: host2 } = resolvePortAndHost(this.options);
    this.serveOptions = {
      port: port2,
      host: host2,
      exclusive: !this.options.reusePort,
      ...tls ? {
        cert: tls.cert,
        key: tls.key,
        passphrase: tls.passphrase
      } : {},
      ...this.options.node
    };
    let server;
    this.#isSecure = !!this.serveOptions.cert && this.options.protocol !== "http";
    if (this.options.node?.http2 ?? this.#isSecure) if (this.#isSecure) server = nodeHTTP2.createSecureServer({
      allowHTTP1: true,
      ...this.serveOptions
    }, handler);
    else throw new Error("node.http2 option requires tls certificate!");
    else if (this.#isSecure) server = nodeHTTPS.createServer(this.serveOptions, handler);
    else server = nodeHTTP.createServer(this.serveOptions, handler);
    this.node = {
      server,
      handler
    };
    if (!options.manual) this.serve();
  }
  serve() {
    if (this.#listeningPromise) return Promise.resolve(this.#listeningPromise).then(() => this);
    this.#listeningPromise = new Promise((resolve2) => {
      this.node.server.listen(this.serveOptions, () => {
        printListening(this.options, this.url);
        resolve2();
      });
    });
  }
  get url() {
    const addr = this.node?.server?.address();
    if (!addr) return;
    return typeof addr === "string" ? addr : fmtURL(addr.address, addr.port, this.#isSecure);
  }
  ready() {
    return Promise.resolve(this.#listeningPromise).then(() => this);
  }
  async close(closeAll) {
    await Promise.all([this.#wait.wait(), new Promise((resolve2, reject) => {
      const server = this.node?.server;
      if (!server) return resolve2();
      if (closeAll && "closeAllConnections" in server) server.closeAllConnections();
      server.close((error) => error ? reject(error) : resolve2());
    })]);
  }
};
const NullProtoObj = /* @__PURE__ */ (() => {
  const e = function() {
  };
  return e.prototype = /* @__PURE__ */ Object.create(null), Object.freeze(e.prototype), e;
})();
const kEventNS = "h3.internal.event.";
const kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
const kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var H3Event = class {
  app;
  req;
  url;
  context;
  static __is_event__ = true;
  constructor(req, context, app) {
    this.context = context || req.context || new NullProtoObj();
    this.req = req;
    this.app = app;
    const _url = req._url;
    this.url = _url && _url instanceof URL ? _url : new FastURL(req.url);
  }
  get res() {
    return this[kEventRes] ||= new H3EventResponse();
  }
  get runtime() {
    return this.req.runtime;
  }
  waitUntil(promise) {
    this.req.waitUntil?.(promise);
  }
  toString() {
    return `[${this.req.method}] ${this.req.url}`;
  }
  toJSON() {
    return this.toString();
  }
  get node() {
    return this.req.runtime?.node;
  }
  get headers() {
    return this.req.headers;
  }
  get path() {
    return this.url.pathname + this.url.search;
  }
  get method() {
    return this.req.method;
  }
};
var H3EventResponse = class {
  status;
  statusText;
  get headers() {
    return this[kEventResHeaders] ||= new Headers();
  }
};
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) return defaultStatusCode;
  if (typeof statusCode === "string") statusCode = +statusCode;
  if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
  return statusCode;
}
var HTTPError = class HTTPError2 extends Error {
  get name() {
    return "HTTPError";
  }
  status;
  statusText;
  headers;
  cause;
  data;
  body;
  unhandled;
  static isError(input) {
    return input instanceof Error && input?.name === "HTTPError";
  }
  static status(status, statusText, details) {
    return new HTTPError2({
      ...details,
      statusText,
      status
    });
  }
  constructor(arg1, arg2) {
    let messageInput;
    let details;
    if (typeof arg1 === "string") {
      messageInput = arg1;
      details = arg2;
    } else details = arg1;
    const status = sanitizeStatusCode(details?.status || details?.cause?.status || details?.status || details?.statusCode, 500);
    const statusText = sanitizeStatusMessage(details?.statusText || details?.cause?.statusText || details?.statusText || details?.statusMessage);
    const message = messageInput || details?.message || details?.cause?.message || details?.statusText || details?.statusMessage || [
      "HTTPError",
      status,
      statusText
    ].filter(Boolean).join(" ");
    super(message, { cause: details });
    this.cause = details;
    Error.captureStackTrace?.(this, this.constructor);
    this.status = status;
    this.statusText = statusText || void 0;
    const rawHeaders = details?.headers || details?.cause?.headers;
    this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
    this.unhandled = details?.unhandled ?? details?.cause?.unhandled ?? void 0;
    this.data = details?.data;
    this.body = details?.body;
  }
  get statusCode() {
    return this.status;
  }
  get statusMessage() {
    return this.statusText;
  }
  toJSON() {
    const unhandled = this.unhandled;
    return {
      status: this.status,
      statusText: this.statusText,
      unhandled,
      message: unhandled ? "HTTPError" : this.message,
      data: unhandled ? void 0 : this.data,
      ...unhandled ? void 0 : this.body
    };
  }
};
function isJSONSerializable(value, _type) {
  if (value === null || value === void 0) return true;
  if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
  if (typeof value.toJSON === "function") return true;
  if (Array.isArray(value)) return true;
  if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
  if (value instanceof NullProtoObj) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
const kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
const kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
  if (typeof val?.then === "function") return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) => toResponse(resolvedVal, event, config));
  const response = prepareResponse(val, event, config);
  if (typeof response?.then === "function") return toResponse(response, event, config);
  const { onResponse: onResponse$1 } = config;
  return onResponse$1 ? Promise.resolve(onResponse$1(response, event)).then(() => response) : response;
}
var HTTPResponse = class {
  #headers;
  #init;
  body;
  constructor(body, init) {
    this.body = body;
    this.#init = init;
  }
  get status() {
    return this.#init?.status || 200;
  }
  get statusText() {
    return this.#init?.statusText || "OK";
  }
  get headers() {
    return this.#headers ||= new Headers(this.#init?.headers);
  }
};
function prepareResponse(val, event, config, nested) {
  if (val === kHandled) return new NodeResponse(null);
  if (val === kNotFound) val = new HTTPError({
    status: 404,
    message: `Cannot find any route matching [${event.req.method}] ${event.url}`
  });
  if (val && val instanceof Error) {
    const isHTTPError = HTTPError.isError(val);
    const error = isHTTPError ? val : new HTTPError(val);
    if (!isHTTPError) {
      error.unhandled = true;
      if (val?.stack) error.stack = val.stack;
    }
    if (error.unhandled && !config.silent) console.error(error);
    const { onError: onError$1 } = config;
    return onError$1 && !nested ? Promise.resolve(onError$1(error, event)).catch((error$1) => error$1).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug);
  }
  const preparedRes = event[kEventRes];
  const preparedHeaders = preparedRes?.[kEventResHeaders];
  if (!(val instanceof Response)) {
    const res = prepareResponseBody(val, event, config);
    const status = res.status || preparedRes?.status;
    return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
      status,
      statusText: res.statusText || preparedRes?.statusText,
      headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
    });
  }
  if (!preparedHeaders || nested || !val.ok) return val;
  try {
    mergeHeaders$1(val.headers, preparedHeaders, val.headers);
    return val;
  } catch {
    return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
      status: val.status,
      statusText: val.statusText,
      headers: mergeHeaders$1(val.headers, preparedHeaders)
    });
  }
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
  for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
  else target.set(name, value);
  return target;
}
const frozenHeaders = () => {
  throw new Error("Headers are frozen");
};
var FrozenHeaders = class extends Headers {
  constructor(init) {
    super(init);
    this.set = this.append = this.delete = frozenHeaders;
  }
};
const emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
const jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
  if (val === null || val === void 0) return {
    body: "",
    headers: emptyHeaders
  };
  const valType = typeof val;
  if (valType === "string") return { body: val };
  if (val instanceof Uint8Array) {
    event.res.headers.set("content-length", val.byteLength.toString());
    return { body: val };
  }
  if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
  if (isJSONSerializable(val, valType)) return {
    body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
    headers: jsonHeaders
  };
  if (valType === "bigint") return {
    body: val.toString(),
    headers: jsonHeaders
  };
  if (val instanceof Blob) {
    const headers2 = new Headers({
      "content-type": val.type,
      "content-length": val.size.toString()
    });
    let filename = val.name;
    if (filename) {
      filename = encodeURIComponent(filename);
      headers2.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
    }
    return {
      body: val.stream(),
      headers: headers2
    };
  }
  if (valType === "symbol") return { body: val.toString() };
  if (valType === "function") return { body: `${val.name}()` };
  return { body: val };
}
function nullBody(method, status) {
  return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug) {
  return new NodeResponse(JSON.stringify({
    ...error.toJSON(),
    stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
  }, void 0, debug ? 2 : void 0), {
    status: error.status,
    statusText: error.statusText,
    headers: error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders)
  });
}
function callMiddleware(event, middleware, handler, index = 0) {
  if (index === middleware.length) return handler(event);
  const fn = middleware[index];
  let nextCalled;
  let nextResult;
  const next = () => {
    if (nextCalled) return nextResult;
    nextCalled = true;
    nextResult = callMiddleware(event, middleware, handler, index + 1);
    return nextResult;
  };
  const ret = fn(event, next);
  return isUnhandledResponse(ret) ? next() : typeof ret?.then === "function" ? ret.then((resolved) => isUnhandledResponse(resolved) ? next() : resolved) : ret;
}
function isUnhandledResponse(val) {
  return val === void 0 || val === kNotFound;
}
function toRequest(input, options) {
  if (typeof input === "string") {
    let url = input;
    if (url[0] === "/") {
      const host2 = "localhost";
      url = `${"http"}://${host2}${url}`;
    }
    return new Request(url, options);
  } else if (input instanceof URL) return new Request(input, options);
  return input;
}
function defineHandler(input) {
  if (typeof input === "function") return handlerWithFetch(input);
  const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
    return input.fetch(event.req);
  } : NoHandler);
  return Object.assign(handlerWithFetch(input.middleware?.length ? function _handlerMiddleware(event) {
    return callMiddleware(event, input.middleware, handler);
  } : handler), input);
}
function handlerWithFetch(handler) {
  if ("fetch" in handler) return handler;
  return Object.assign(handler, { fetch: (req) => {
    if (typeof req === "string") req = new URL(req, "http://_");
    if (req instanceof URL) req = new Request(req);
    const event = new H3Event(req);
    try {
      return Promise.resolve(toResponse(handler(event), event));
    } catch (error) {
      return Promise.resolve(toResponse(error, event));
    }
  } });
}
function defineLazyEventHandler(loader) {
  let handler;
  let promise;
  const resolveLazyHandler = () => {
    if (handler) return Promise.resolve(handler);
    return promise ??= Promise.resolve(loader()).then((r) => {
      handler = toEventHandler(r) || toEventHandler(r.default);
      if (typeof handler !== "function") throw new TypeError("Invalid lazy handler", { cause: { resolved: r } });
      return handler;
    });
  };
  return defineHandler(function lazyHandler(event) {
    return handler ? handler(event) : resolveLazyHandler().then((r) => r(event));
  });
}
function toEventHandler(handler) {
  if (typeof handler === "function") return handler;
  if (typeof handler?.handler === "function") return handler.handler;
  if (typeof handler?.fetch === "function") return function _fetchHandler(event) {
    return handler.fetch(event.req);
  };
}
const NoHandler = () => kNotFound;
var H3Core = class {
  config;
  "~middleware";
  "~routes" = [];
  constructor(config = {}) {
    this["~middleware"] = [];
    this.config = config;
    this.fetch = this.fetch.bind(this);
    this.handler = this.handler.bind(this);
  }
  fetch(request) {
    return this["~request"](request);
  }
  handler(event) {
    const route = this["~findRoute"](event);
    if (route) {
      event.context.params = route.params;
      event.context.matchedRoute = route.data;
    }
    const routeHandler = route?.data.handler || NoHandler;
    const middleware = this["~getMiddleware"](event, route);
    return middleware.length > 0 ? callMiddleware(event, middleware, routeHandler) : routeHandler(event);
  }
  "~request"(request, context) {
    const event = new H3Event(request, context, this);
    let handlerRes;
    try {
      if (this.config.onRequest) {
        const hookRes = this.config.onRequest(event);
        handlerRes = typeof hookRes?.then === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
      } else handlerRes = this.handler(event);
    } catch (error) {
      handlerRes = Promise.reject(error);
    }
    return toResponse(handlerRes, event, this.config);
  }
  "~findRoute"(_event) {
  }
  "~addRoute"(_route) {
    this["~routes"].push(_route);
  }
  "~getMiddleware"(_event, route) {
    const routeMiddleware = route?.data.middleware;
    const globalMiddleware2 = this["~middleware"];
    return routeMiddleware ? [...globalMiddleware2, ...routeMiddleware] : globalMiddleware2;
  }
};
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled;
  const status = error.status || 500;
  const url = event.url || new URL(event.req.url);
  if (status === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.req.method}] ${url}
`, error);
  }
  const headers2 = {
    "content-type": "application/json",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer",
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  if (status === 404 || !event.res.headers.has("cache-control")) {
    headers2["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    status,
    statusText: error.statusText,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status,
    statusText: error.statusText,
    headers: headers2,
    body
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const ENC_SLASH_RE = /%2f/gi;
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"f1e-ESBTjHetHyiokkO0tT/irBbMO8Y"',
    "mtime": "2026-08-28T15:10:24.710Z",
    "size": 3870,
    "path": "../public/favicon.ico"
  },
  "/favicon.svg": {
    "type": "image/svg+xml",
    "etag": '"146-gEqt+v/8GsJV8yjTvspkk25K22E"',
    "mtime": "2026-08-28T15:10:24.711Z",
    "size": 326,
    "path": "../public/favicon.svg"
  },
  "/logo192.png": {
    "type": "image/png",
    "etag": '"14e3-f08taHgqf6/O2oRVTsq5tImHdQA"',
    "mtime": "2026-08-28T15:10:24.711Z",
    "size": 5347,
    "path": "../public/logo192.png"
  },
  "/logo512.png": {
    "type": "image/png",
    "etag": '"25c0-RpFfnQJpTtSb/HqVNJR2hBA9w/4"',
    "mtime": "2026-08-28T15:10:24.712Z",
    "size": 9664,
    "path": "../public/logo512.png"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": '"1f2-Oqn/x1R1hBTtEjA8nFhpBeFJJNg"',
    "mtime": "2026-08-28T15:10:24.712Z",
    "size": 498,
    "path": "../public/manifest.json"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"43-BEzmj4PuhUNHX+oW9uOnPSihxtU"',
    "mtime": "2026-08-28T15:10:24.712Z",
    "size": 67,
    "path": "../public/robots.txt"
  },
  "/tanstack-circle-logo.png": {
    "type": "image/png",
    "etag": '"40cab-HZ1KcYPs7tRjLe4Sd4g6CwKW+W8"',
    "mtime": "2026-08-28T15:10:24.718Z",
    "size": 265387,
    "path": "../public/tanstack-circle-logo.png"
  },
  "/tanstack-word-logo-white.svg": {
    "type": "image/svg+xml",
    "etag": '"3a9a-9TQFm/pN8AZe1ZK0G1KyCEojnYg"',
    "mtime": "2026-08-28T15:10:24.719Z",
    "size": 15002,
    "path": "../public/tanstack-word-logo-white.svg"
  },
  "/assets/1000016899-D2hoKkIq.png": {
    "type": "image/png",
    "etag": '"82540e-UeFXMyI2sJhLmtBOdpyN2G1Y69M"',
    "mtime": "2026-08-28T15:10:25.118Z",
    "size": 8541198,
    "path": "../public/assets/1000016899-D2hoKkIq.png"
  },
  "/assets/2345413523454-Xt8wRga0.png": {
    "type": "image/png",
    "etag": '"7faa1-vxZuZljSJhiPVT+qj/v8KmkrUxU"',
    "mtime": "2026-08-28T15:10:24.981Z",
    "size": 522913,
    "path": "../public/assets/2345413523454-Xt8wRga0.png"
  },
  "/assets/45875674576754-n8SRIrbi.png": {
    "type": "image/png",
    "etag": '"56bce-Mh/szqCvZQMdBnD6wZl3zAxJ4mE"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 355278,
    "path": "../public/assets/45875674576754-n8SRIrbi.png"
  },
  "/assets/521469718_18391966183189140_5158185447317376143_n-DV7w6U8k.jpg": {
    "type": "image/jpeg",
    "etag": '"497fc-3kFOf3ZjQ4rOLWSCmv++JrHpGyI"',
    "mtime": "2026-08-28T15:10:24.977Z",
    "size": 301052,
    "path": "../public/assets/521469718_18391966183189140_5158185447317376143_n-DV7w6U8k.jpg"
  },
  "/assets/5267491911117774004-BfnEaEnc.png": {
    "type": "image/png",
    "etag": '"fcf2b-B1PDa7rbufEnz2h9xW6htTFYryM"',
    "mtime": "2026-08-28T15:10:24.993Z",
    "size": 1036075,
    "path": "../public/assets/5267491911117774004-BfnEaEnc.png"
  },
  "/assets/5267491911117774016-DZWLj8IV.jpg": {
    "type": "image/jpeg",
    "etag": '"2923a-qewMFfZ9yW4yyOjG3cKBDeLS0HE"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 168506,
    "path": "../public/assets/5267491911117774016-DZWLj8IV.jpg"
  },
  "/assets/5267491911117774017-DzJjAsKi.jpg": {
    "type": "image/jpeg",
    "etag": '"27f20-Evw1Zn9rQzlWTd0JuyQfazTosR8"',
    "mtime": "2026-08-28T15:10:24.980Z",
    "size": 163616,
    "path": "../public/assets/5267491911117774017-DzJjAsKi.jpg"
  },
  "/assets/5271827470149687881-BmJEuHgv.jpg": {
    "type": "image/jpeg",
    "etag": '"25f4d-jWwTP020+cFkGj/UJRo/fNFajqQ"',
    "mtime": "2026-08-28T15:10:24.980Z",
    "size": 155469,
    "path": "../public/assets/5271827470149687881-BmJEuHgv.jpg"
  },
  "/assets/5271827470149687883-CHA2LveA.jpg": {
    "type": "image/jpeg",
    "etag": '"285b6-i8KZj6NddGA7WZMUD4v1TBESXvg"',
    "mtime": "2026-08-28T15:10:24.980Z",
    "size": 165302,
    "path": "../public/assets/5271827470149687883-CHA2LveA.jpg"
  },
  "/assets/5271827470149687884-kQhSUqBS.jpg": {
    "type": "image/jpeg",
    "etag": '"2d8ce-xRCiJFYWE0V5a0jAVZ02iqATGd4"',
    "mtime": "2026-08-28T15:10:24.980Z",
    "size": 186574,
    "path": "../public/assets/5271827470149687884-kQhSUqBS.jpg"
  },
  "/assets/5282821220627849158-DfogjQUX.jpg": {
    "type": "image/jpeg",
    "etag": '"1c5ad-X8Z0HXm32XmdRdGQ7wJHOmpaj6w"',
    "mtime": "2026-08-28T15:10:24.977Z",
    "size": 116141,
    "path": "../public/assets/5282821220627849158-DfogjQUX.jpg"
  },
  "/assets/5282821220627849159-DcVdvfL5.jpg": {
    "type": "image/jpeg",
    "etag": '"1f477-IVJacokvgmBIY7/XXGzNuNnTxSo"',
    "mtime": "2026-08-28T15:10:24.977Z",
    "size": 128119,
    "path": "../public/assets/5282821220627849159-DcVdvfL5.jpg"
  },
  "/assets/5282821220627849160-CfkbQknG.jpg": {
    "type": "image/jpeg",
    "etag": '"253d3-iXQz96pPEMbi7Ne31vUTK3rboeo"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 152531,
    "path": "../public/assets/5282821220627849160-CfkbQknG.jpg"
  },
  "/assets/5282821220627849167-B9vlzwNK.jpg": {
    "type": "image/jpeg",
    "etag": '"3fe8f-T85wEhjC5t6pBthtGcvDIfU6iYA"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 261775,
    "path": "../public/assets/5282821220627849167-B9vlzwNK.jpg"
  },
  "/assets/5282821220627849168-BHthtyBB.jpg": {
    "type": "image/jpeg",
    "etag": '"409be-LgFHOr+Oo+8803Yhi/q5fw1IRTI"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 264638,
    "path": "../public/assets/5282821220627849168-BHthtyBB.jpg"
  },
  "/assets/5282821220627849169-BMbkkhpa.jpg": {
    "type": "image/jpeg",
    "etag": '"28ff5-aTcIvgByN4XFMDgEnhqC/CkYyDk"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 167925,
    "path": "../public/assets/5282821220627849169-BMbkkhpa.jpg"
  },
  "/assets/5282821220627849170-DVP_w26p.jpg": {
    "type": "image/jpeg",
    "etag": '"27f1a-Yd0UlIsdwUUMtWJjYsB22KTNmnY"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 163610,
    "path": "../public/assets/5282821220627849170-DVP_w26p.jpg"
  },
  "/assets/5346354635465-0idztduK.png": {
    "type": "image/png",
    "etag": '"b96e8-QAxU7U17wYmlTPjnp3+xivW0NWg"',
    "mtime": "2026-08-28T15:10:24.990Z",
    "size": 759528,
    "path": "../public/assets/5346354635465-0idztduK.png"
  },
  "/assets/619792737_18417153727189140_5984683189343682714_n-D8TUxlBa.jpg": {
    "type": "image/jpeg",
    "etag": '"35874-AYdNfrzVMIIR/qhxiRVjXl59qtA"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 219252,
    "path": "../public/assets/619792737_18417153727189140_5984683189343682714_n-D8TUxlBa.jpg"
  },
  "/assets/7812354786123547-I0C1U1xA.png": {
    "type": "image/png",
    "etag": '"50eca-alJr2QK5Rkr40ITSzeC0ahXg83o"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 331466,
    "path": "../public/assets/7812354786123547-I0C1U1xA.png"
  },
  "/assets/IMG_1339-R94EuZni.png": {
    "type": "image/png",
    "etag": '"25fe6a-nGqew0B6faqrv40SAqshe6wpCKw"',
    "mtime": "2026-08-28T15:10:25.040Z",
    "size": 2489962,
    "path": "../public/assets/IMG_1339-R94EuZni.png"
  },
  "/assets/IMG_1444-CpvpEYhJ.png": {
    "type": "image/png",
    "etag": '"363109-RHhZbHtUhEXmEJRl9GSkK2AU2Bw"',
    "mtime": "2026-08-28T15:10:25.058Z",
    "size": 3551497,
    "path": "../public/assets/IMG_1444-CpvpEYhJ.png"
  },
  "/assets/IMG_1449--4b8vmxr.png": {
    "type": "image/png",
    "etag": '"287e4c-uTx/F1eUjCcunHwJqnwN+px7X+o"',
    "mtime": "2026-08-28T15:10:25.056Z",
    "size": 2653772,
    "path": "../public/assets/IMG_1449--4b8vmxr.png"
  },
  "/assets/IMG_1462-D-twRZuc.png": {
    "type": "image/png",
    "etag": '"270a1a-05BVxO0WjqrBDHigbmaYrL5Xpaw"',
    "mtime": "2026-08-28T15:10:25.040Z",
    "size": 2558490,
    "path": "../public/assets/IMG_1462-D-twRZuc.png"
  },
  "/assets/IMG_1482-DKt_-8vN.png": {
    "type": "image/png",
    "etag": '"151a3c-vCeGKzpsRodQnTW3zTiwJVwLfcQ"',
    "mtime": "2026-08-28T15:10:25.014Z",
    "size": 1382972,
    "path": "../public/assets/IMG_1482-DKt_-8vN.png"
  },
  "/assets/IMG_1491-Dp01ZPVl.png": {
    "type": "image/png",
    "etag": '"38e9e3-rJK6lZM4Ce8KZZnRTlEdxNWeA5Y"',
    "mtime": "2026-08-28T15:10:25.064Z",
    "size": 3729891,
    "path": "../public/assets/IMG_1491-Dp01ZPVl.png"
  },
  "/assets/IMG_1702-DR2LLU37.png": {
    "type": "image/png",
    "etag": '"31c602-yNiYGlIgeNPGMvBajYAdQ7exUag"',
    "mtime": "2026-08-28T15:10:25.058Z",
    "size": 3261954,
    "path": "../public/assets/IMG_1702-DR2LLU37.png"
  },
  "/assets/IMG_1742-tAUMdKu9.png": {
    "type": "image/png",
    "etag": '"63b3db-YBGHEl8kSyneZ5UUDKDXvah+AQU"',
    "mtime": "2026-08-28T15:10:25.085Z",
    "size": 6534107,
    "path": "../public/assets/IMG_1742-tAUMdKu9.png"
  },
  "/assets/IMG_1761-3WE9dH5Y.png": {
    "type": "image/png",
    "etag": '"31f0fe-4URADV++ECeU6cGF5g6UysP73Jc"',
    "mtime": "2026-08-28T15:10:25.057Z",
    "size": 3272958,
    "path": "../public/assets/IMG_1761-3WE9dH5Y.png"
  },
  "/assets/IMG_4831-DBGRXD2-.png": {
    "type": "image/png",
    "etag": '"3fc782-2i5eD/FubYZFzV47E9rwjT+1Xo0"',
    "mtime": "2026-08-28T15:10:25.066Z",
    "size": 4179842,
    "path": "../public/assets/IMG_4831-DBGRXD2-.png"
  },
  "/assets/IMG_4835-BCflxU0K.png": {
    "type": "image/png",
    "etag": '"49c132-dTfr7wutleMIbP8oEoSCxJZZ8Mo"',
    "mtime": "2026-08-28T15:10:25.075Z",
    "size": 4833586,
    "path": "../public/assets/IMG_4835-BCflxU0K.png"
  },
  "/assets/IMG_4837-BFFnsUx3.png": {
    "type": "image/png",
    "etag": '"365c48-9W9+lokcOcpF5kIHd5mfkr7rgYk"',
    "mtime": "2026-08-28T15:10:25.058Z",
    "size": 3562568,
    "path": "../public/assets/IMG_4837-BFFnsUx3.png"
  },
  "/assets/IMG_4923-a4mg6Wg5.png": {
    "type": "image/png",
    "etag": '"940273-NaUyOSiC0BWkdpBVL35uH30kOfE"',
    "mtime": "2026-08-28T15:10:25.118Z",
    "size": 9699955,
    "path": "../public/assets/IMG_4923-a4mg6Wg5.png"
  },
  "/assets/IMG_4935-B_49xHWQ.png": {
    "type": "image/png",
    "etag": '"844c26-vWDjciVcNptnApG/paFrscE49FY"',
    "mtime": "2026-08-28T15:10:25.118Z",
    "size": 8670246,
    "path": "../public/assets/IMG_4935-B_49xHWQ.png"
  },
  "/assets/IMG_4939-IrMGZfHw.png": {
    "type": "image/png",
    "etag": '"3a0c6f-wlTKTeRKtj3NnNQDjyr8rsxg66g"',
    "mtime": "2026-08-28T15:10:25.064Z",
    "size": 3804271,
    "path": "../public/assets/IMG_4939-IrMGZfHw.png"
  },
  "/assets/IMG_5741-TRQUx5rE.png": {
    "type": "image/png",
    "etag": '"3d749b-q/5QCgK8kQOiZ+Xpv285YyxlfiY"',
    "mtime": "2026-08-28T15:10:25.065Z",
    "size": 4027547,
    "path": "../public/assets/IMG_5741-TRQUx5rE.png"
  },
  "/assets/IMG_5742--bsMq_m9.png": {
    "type": "image/png",
    "etag": '"42abf7-H+4Hhvo+1S85/GXNQkgE3kKbPL4"',
    "mtime": "2026-08-28T15:10:25.071Z",
    "size": 4369399,
    "path": "../public/assets/IMG_5742--bsMq_m9.png"
  },
  "/assets/IMG_8727-BYf4eGRK.png": {
    "type": "image/png",
    "etag": '"373134-6lrjMb7s57qRkPx8xTg+nIt85Ds"',
    "mtime": "2026-08-28T15:10:25.059Z",
    "size": 3617076,
    "path": "../public/assets/IMG_8727-BYf4eGRK.png"
  },
  "/assets/IMG_8730-pky_dXg6.png": {
    "type": "image/png",
    "etag": '"1e7193-sIKb5YYvd0P0/L5RHTSGd7RPvLg"',
    "mtime": "2026-08-28T15:10:25.026Z",
    "size": 1995155,
    "path": "../public/assets/IMG_8730-pky_dXg6.png"
  },
  "/assets/IMG_8745-BybyIonF.png": {
    "type": "image/png",
    "etag": '"404da1-Mu+lN3DkYThmwmXBR2XEhEt5L/Q"',
    "mtime": "2026-08-28T15:10:25.071Z",
    "size": 4214177,
    "path": "../public/assets/IMG_8745-BybyIonF.png"
  },
  "/assets/IMG_8753-BkdoItUy.png": {
    "type": "image/png",
    "etag": '"2f6595-CAbrnqZ69kdaLaj0yU2p+MTnhX0"',
    "mtime": "2026-08-28T15:10:25.047Z",
    "size": 3106197,
    "path": "../public/assets/IMG_8753-BkdoItUy.png"
  },
  "/assets/IMG_9086-D2cYClla.png": {
    "type": "image/png",
    "etag": '"2da084-5XyFho6r9iy4EJiXI64bcrAcUQg"',
    "mtime": "2026-08-28T15:10:25.047Z",
    "size": 2990212,
    "path": "../public/assets/IMG_9086-D2cYClla.png"
  },
  "/assets/IMG_9100-IbpSBRDI.png": {
    "type": "image/png",
    "etag": '"3be8d7-UBGh6Dv9vEzS59tfZDJrcz1hMWM"',
    "mtime": "2026-08-28T15:10:25.064Z",
    "size": 3926231,
    "path": "../public/assets/IMG_9100-IbpSBRDI.png"
  },
  "/assets/IMG_9115-Cfooyhpm.png": {
    "type": "image/png",
    "etag": '"289937-o4w5RKjlrlmo9dbMlOmzgVFrZrc"',
    "mtime": "2026-08-28T15:10:25.060Z",
    "size": 2660663,
    "path": "../public/assets/IMG_9115-Cfooyhpm.png"
  },
  "/assets/IMG_9118-BlWu087-.png": {
    "type": "image/png",
    "etag": '"3d1707-UMWNzVqY0JEdbmz2nyySOVYZQVg"',
    "mtime": "2026-08-28T15:10:25.063Z",
    "size": 4003591,
    "path": "../public/assets/IMG_9118-BlWu087-.png"
  },
  "/assets/IMG_9133-CvFDJepk.png": {
    "type": "image/png",
    "etag": '"1e1ec2-FvYGQOF34XfFalstw83m2w0LSM4"',
    "mtime": "2026-08-28T15:10:25.025Z",
    "size": 1973954,
    "path": "../public/assets/IMG_9133-CvFDJepk.png"
  },
  "/assets/LanguageToggle-Dn2FCgtn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c2-4CetE3cvLRNIu/kg+8yUKoVZA2U"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 706,
    "path": "../public/assets/LanguageToggle-Dn2FCgtn.js"
  },
  "/assets/MiniCart-lG-ssGkO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18f0-iK6QjFCdWVypPZe3yqndcPMc+c0"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 6384,
    "path": "../public/assets/MiniCart-lG-ssGkO.js"
  },
  "/assets/ProductCard-C-2llfQ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c43-bGupUN8PuR89l/ivrc+lGhlxilo"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 3139,
    "path": "../public/assets/ProductCard-C-2llfQ2.js"
  },
  "/assets/ProductPrice-BZZVTOz0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a36-eyMS5JOhbyH7kaaLE9YQUtxu5hQ"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 2614,
    "path": "../public/assets/ProductPrice-BZZVTOz0.js"
  },
  "/assets/ShippingReturnsInfo-DvVqCC6U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1620-wwsaPLopTwTWxPAX0DlvCGuQEeE"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 5664,
    "path": "../public/assets/ShippingReturnsInfo-DvVqCC6U.js"
  },
  "/assets/about-CtjQkmGS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2175-OnyJusStbEVYRqr7pdMiojy1GAU"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 8565,
    "path": "../public/assets/about-CtjQkmGS.js"
  },
  "/assets/amethyst-CymuyiJp.png": {
    "type": "image/png",
    "etag": '"8bcb-kKmperW9uABnTIzVp4gkhooFmU4"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 35787,
    "path": "../public/assets/amethyst-CymuyiJp.png"
  },
  "/assets/azure-9SbPZM9H.png": {
    "type": "image/png",
    "etag": '"345a2-HTUSH0qNfjkQu8/C3O6n3waHdJ0"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 214434,
    "path": "../public/assets/azure-9SbPZM9H.png"
  },
  "/assets/black-DrsCHDbS.png": {
    "type": "image/png",
    "etag": '"24d38-4KiQZNdC/8Trh4tMPTiReAGNfXw"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 150840,
    "path": "../public/assets/black-DrsCHDbS.png"
  },
  "/assets/blue-DvMUwwc9.png": {
    "type": "image/png",
    "etag": '"34307-P6v0mzwqVBb3/XylH6+++ERfcYI"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 213767,
    "path": "../public/assets/blue-DvMUwwc9.png"
  },
  "/assets/box-closed-BPGiG52J.png": {
    "type": "image/png",
    "etag": '"4efbcb-4FFW7KfPqy9xHfEc75E2i7XbeKU"',
    "mtime": "2026-08-28T15:10:25.075Z",
    "size": 5176267,
    "path": "../public/assets/box-closed-BPGiG52J.png"
  },
  "/assets/box-open-If8SndzH.png": {
    "type": "image/png",
    "etag": '"47341b-g9ttpMVWuAn4jqXA+mFsCF/Tvy8"',
    "mtime": "2026-08-28T15:10:25.067Z",
    "size": 4666395,
    "path": "../public/assets/box-open-If8SndzH.png"
  },
  "/assets/cart-DL0tZU0U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10c8-2EOFyu6pJ1MtpxY6qlKuIrCnUmM"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 4296,
    "path": "../public/assets/cart-DL0tZU0U.js"
  },
  "/assets/catalog._category-Bf7ZQv2z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1da9-ig0TTKIp21Iq95VTUnyCchX2jmw"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 7593,
    "path": "../public/assets/catalog._category-Bf7ZQv2z.js"
  },
  "/assets/champagne-CWhMv6xh.png": {
    "type": "image/png",
    "etag": '"38491-d9tH2OQhZFhiFFjcSK551mvMtJU"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 230545,
    "path": "../public/assets/champagne-CWhMv6xh.png"
  },
  "/assets/checkout-BWvJGf7C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3954b-IV5G+5wqU41DX8UYq76apBK+f94"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 234827,
    "path": "../public/assets/checkout-BWvJGf7C.js"
  },
  "/assets/chevron-left-B9XybRyC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"82-UCpY+CTAg6KRq2FVjuSlykXLrVs"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 130,
    "path": "../public/assets/chevron-left-B9XybRyC.js"
  },
  "/assets/contact-BLf9oyPt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-Ikt8rirRVTZ2WlhyCYnL5A4ZGIU"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 131,
    "path": "../public/assets/contact-BLf9oyPt.js"
  },
  "/assets/favorites-CoyehWP7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"173b-mkFw6eqe+XUpyMxVghb7KVYgc1I"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 5947,
    "path": "../public/assets/favorites-CoyehWP7.js"
  },
  "/assets/garnet-DMN6UBPM.png": {
    "type": "image/png",
    "etag": '"32753-Yg0yA01D/2B57yVVBDf5XVQYZeI"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 206675,
    "path": "../public/assets/garnet-DMN6UBPM.png"
  },
  "/assets/green-CwbQ3KGP.png": {
    "type": "image/png",
    "etag": '"307d5-FfO0h+QhPxPo4s202S3ZgIwcqrk"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 198613,
    "path": "../public/assets/green-CwbQ3KGP.png"
  },
  "/assets/includes-LJbxRig8.png": {
    "type": "image/png",
    "etag": '"493787-Zw2T8kuPAYbAVOA6WYlJyoUrmLs"',
    "mtime": "2026-08-28T15:10:25.078Z",
    "size": 4798343,
    "path": "../public/assets/includes-LJbxRig8.png"
  },
  "/assets/index-CDsTA6K7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a09-TifCYY/C4AmTrWiYHz8nchSqns4"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 10761,
    "path": "../public/assets/index-CDsTA6K7.js"
  },
  "/assets/instagram-DS6G83kH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"128-Mm5HdgAfIk59g8rH+6s6A4epbbA"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 296,
    "path": "../public/assets/instagram-DS6G83kH.js"
  },
  "/assets/lavender-B9iiRP9q.png": {
    "type": "image/png",
    "etag": '"36996-BZDTc6hmVUVyoMEwY9vAdD2Eqes"',
    "mtime": "2026-08-28T15:10:24.978Z",
    "size": 223638,
    "path": "../public/assets/lavender-B9iiRP9q.png"
  },
  "/assets/main-xOdJPNmr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"66277-9dC8o3pWM0con86LScLiIzYBrcE"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 418423,
    "path": "../public/assets/main-xOdJPNmr.js"
  },
  "/assets/me-BW1pAF82.png": {
    "type": "image/png",
    "etag": '"6123e-zl5DzOEsYXQSSM3QQVSBwm7DknI"',
    "mtime": "2026-08-28T15:10:24.977Z",
    "size": 397886,
    "path": "../public/assets/me-BW1pAF82.png"
  },
  "/assets/me-CVaxqaLc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32-5c8hGJhn6bcoAc/p2oqgLaIEGaI"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 50,
    "path": "../public/assets/me-CVaxqaLc.js"
  },
  "/assets/minus-9CcRxpl0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"75-jL4TrpkRkkBBMdRiXXBxC8T2KDY"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 117,
    "path": "../public/assets/minus-9CcRxpl0.js"
  },
  "/assets/olive-Bb93XcxI.png": {
    "type": "image/png",
    "etag": '"3210d-+2C03zx4jVSKaeyzIVWtxykh2fs"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 205069,
    "path": "../public/assets/olive-Bb93XcxI.png"
  },
  "/assets/peridot-DlzG3Ivx.png": {
    "type": "image/png",
    "etag": '"36d3f-Q8p7hFRS5ZB82ESWsUEN8m69Y7U"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 224575,
    "path": "../public/assets/peridot-DlzG3Ivx.png"
  },
  "/assets/photo-86-CBbQNrru.png": {
    "type": "image/png",
    "etag": '"3f3baa-QNKZbt7SjgsH+wNlw0Y0Hj/IQ6M"',
    "mtime": "2026-08-28T15:10:25.065Z",
    "size": 4144042,
    "path": "../public/assets/photo-86-CBbQNrru.png"
  },
  "/assets/photo-97-DEAisnHP.png": {
    "type": "image/png",
    "etag": '"20179e-7UBembsFj72JaMpB4ZcXfAuccjg"',
    "mtime": "2026-08-28T15:10:25.037Z",
    "size": 2103198,
    "path": "../public/assets/photo-97-DEAisnHP.png"
  },
  "/assets/pink-DhKkeyrZ.png": {
    "type": "image/png",
    "etag": '"35a97-pMS55P1QOwucsWhyiORcSNxO1tg"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 219799,
    "path": "../public/assets/pink-DhKkeyrZ.png"
  },
  "/assets/product-C_Aaku7Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5e-UxqjKsIapvyAyOjSnZ0ubJN2XrA"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 94,
    "path": "../public/assets/product-C_Aaku7Z.js"
  },
  "/assets/product-images-D2LLjIHr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"169c-kZo+ZXh3dMflOsYCoyiFNDLbr40"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 5788,
    "path": "../public/assets/product-images-D2LLjIHr.js"
  },
  "/assets/product._productId-DaJk1I2M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"658a-Ge3sLJwPsjGwDbAqcbWjCZSWSjA"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 25994,
    "path": "../public/assets/product._productId-DaJk1I2M.js"
  },
  "/assets/red-AJPyvfwq.png": {
    "type": "image/png",
    "etag": '"2f27c-VMf4lSf6VhIRFPQ5xPPqWrJ4kMg"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 193148,
    "path": "../public/assets/red-AJPyvfwq.png"
  },
  "/assets/search-CaPPyo7u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a9-gqQGrpIvkVEwFKzuKFrsNro2zb8"',
    "mtime": "2026-08-28T15:10:24.988Z",
    "size": 169,
    "path": "../public/assets/search-CaPPyo7u.js"
  },
  "/assets/shipping-CptzarNU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f0-BnotAsA9bs91hlB7sDxNwu0mQVQ"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 1264,
    "path": "../public/assets/shipping-CptzarNU.js"
  },
  "/assets/signin-DrO6vk-F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"841-nkv6l167WtMgFYYiFyBKBS6Xr64"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 2113,
    "path": "../public/assets/signin-DrO6vk-F.js"
  },
  "/assets/signup-AGhW98f0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6af-g1H0JalH85u6SELKyM5Pu0ukJkk"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 1711,
    "path": "../public/assets/signup-AGhW98f0.js"
  },
  "/assets/styles-B7GSwdhA.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"a1c2-YaDlstVrnvnw94AAYp2q7woN1YY"',
    "mtime": "2026-08-28T15:10:24.987Z",
    "size": 41410,
    "path": "../public/assets/styles-B7GSwdhA.css"
  },
  "/assets/trash-2-DogMEczg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b1-+6jEjzAm9E1c9//ex+8/7zhHWGg"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 433,
    "path": "../public/assets/trash-2-DogMEczg.js"
  },
  "/assets/truck-CwZ4I5hB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"252-7od+cFLLUJK51eP1Vq6C7+BXZak"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 594,
    "path": "../public/assets/truck-CwZ4I5hB.js"
  },
  "/assets/white-CVIsZzJV.png": {
    "type": "image/png",
    "etag": '"3c0a1-pGRpX3bxu486AmVnUumU3bNhuYI"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 245921,
    "path": "../public/assets/white-CVIsZzJV.png"
  },
  "/assets/x-BcexyQ5C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-eoPye7pQdbY7LOaSc8SS2n0QmZI"',
    "mtime": "2026-08-28T15:10:24.989Z",
    "size": 154,
    "path": "../public/assets/x-BcexyQ5C.js"
  },
  "/assets/yellow-79HrWYOE.png": {
    "type": "image/png",
    "etag": '"34ff5-y39ZHa4TZndgIiCQDmh+y+VxHhI"',
    "mtime": "2026-08-28T15:10:24.979Z",
    "size": 217077,
    "path": "../public/assets/yellow-79HrWYOE.png"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br"
};
const _geDYWU = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/");
    s.length - 1;
    if (s[1] === "assets") {
      r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
    }
    return r;
  };
})();
const _lazy_0v6AUb = defineLazyEventHandler(() => Promise.resolve().then(function() {
  return ssrRenderer$1;
}));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_0v6AUb };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_geDYWU)
].filter(Boolean);
function useNitroApp() {
  return useNitroApp.__instance__ ??= initNitroApp();
}
function initNitroApp() {
  const nitroApp2 = createNitroApp();
  globalThis.__nitro__ = nitroApp2;
  return nitroApp2;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  for (const rule of Object.values(routeRules)) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const port = Number.parseInt(process.env.NITRO_PORT || process.env.PORT || "") || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch
});
trapUnhandledErrors();
const nodeServer = {};
function fetchViteEnv(viteEnvName, input, init) {
  const envs = globalThis.__nitro_vite_envs__ || {};
  const viteEnv = envs[viteEnvName];
  if (!viteEnv) {
    throw HTTPError.status(404);
  }
  return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
function ssrRenderer({ req }) {
  return fetchViteEnv("ssr", req);
}
const ssrRenderer$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: ssrRenderer
});
export {
  FastURL as F,
  NullProtoObj as N,
  NodeResponse as a,
  nodeServer as default
};
