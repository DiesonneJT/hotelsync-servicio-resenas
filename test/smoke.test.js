const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

test("sintaxis valida en src", () => {
  const srcDir = path.join(__dirname, "..", "src");
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) files.push(full);
    }
  }
  walk(srcDir);
  assert.ok(files.length > 0);
  for (const f of files) execSync(`node --check "${f}"`, { stdio: "pipe" });
});

test("package.json ok", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
  assert.ok(pkg.scripts.start);
  assert.ok(pkg.scripts.test);
});
