import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}
