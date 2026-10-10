import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { compileFunction } from "node:vm";
import test from "node:test";
import ts from "typescript";

const filename = new URL("../src/app/api/contact/route.ts", import.meta.url);
const source = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const nativeRequire = createRequire(import.meta.url);

// Only replace the storage boundary; never load credentials or send real messages.
function contactRoute({ configured = true, error = null, throws = false } = {}) {
  const inserted = [];
  const supabase = { from(table) {
    assert.equal(table, "contact_submissions");
    return { async insert(records) {
      inserted.push(...records);
      if (throws) throw new Error("Private database details");
      return { error };
    } };
  } };
  const targetModule = { exports: {} };
  const require = name => name === "@/lib/supabase"
    ? { supabase: configured ? supabase : null, isSupabaseConfigured: configured }
    : nativeRequire(name);
  compileFunction(source, ["exports", "require", "module"], { filename: filename.pathname })(targetModule.exports, require, targetModule);
  return { POST: targetModule.exports.POST, inserted };
}

const payload = { name: "  Test User  ", email: "  test@example.com  ", message: "  Partnership inquiry  ", company: "  Example  ", represent: "company" };
const request = body => new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) });

test("valid contact messages are trimmed and saved without a SELECT permission", async () => {
  const { POST, inserted } = contactRoute();
  const response = await POST(request(payload));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(inserted.length, 1);
  assert.equal(inserted[0].name, "Test User");
  assert.equal(inserted[0].email, "test@example.com");
  assert.equal(inserted[0].message, "Partnership inquiry");
  assert.equal(inserted[0].company, "Example");
});

test("optional organization details can be omitted", async () => {
  const { POST, inserted } = contactRoute();
  assert.equal((await POST(request({ name: "Test", email: "test@example.com", message: "Hello" }))).status, 200);
  assert.equal(inserted[0].company, null);
  assert.equal(inserted[0].represent, null);
});

test("invalid JSON, types, email, whitespace, and oversized messages do not reach storage", async () => {
  const { POST, inserted } = contactRoute();
  for (const body of [null, [], {}, { ...payload, name: 123 }, { ...payload, name: " " }, { ...payload, email: "invalid" },
    { ...payload, message: " " }, { ...payload, message: "x".repeat(5001) }, { ...payload, company: {} }, { ...payload, represent: "unknown" }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", body: "{" }))).status, 400);
  assert.equal(inserted.length, 0);
});

test("unconfigured storage never reports successful delivery", async () => {
  const { POST, inserted } = contactRoute({ configured: false });
  const response = await POST(request(payload));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(inserted.length, 0);
});

test("database errors and exceptions return failure without exposing private details", async () => {
  for (const options of [{ error: { message: "Private database details" } }, { throws: true }]) {
    const response = await contactRoute(options).POST(request(payload));
    const body = await response.json();
    assert.equal(response.status, 500);
    assert.equal(body.success, false);
    assert.equal(JSON.stringify(body).includes("Private"), false);
    assert.equal(body.data, undefined);
  }
});
