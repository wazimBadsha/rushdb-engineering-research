# TypeScript schema-discovery proof of concept

This example exercises a discovery-first workflow against a local RushDB 3 engine:

1. Connect using the JavaScript SDK in direct mode.
2. Import nested customer/order/product data.
3. Introduce deliberate property-name drift (`status` versus `orderStatus`).
4. Inspect the live schema through `ai.getSchemaMarkdown()`.
5. Query customers through a related order using `records.find()`.

## Prerequisites

- A locally running RushDB 3 engine.
- Node.js supported by the selected SDK release.
- A local engine token.

## Start the engine (macOS example)

```bash
brew install rush-db/tap/rushdb
export RUSHDB_TOKEN="$(openssl rand -hex 32)"
rushdb up --data-dir ./rushdb-poc-data
```

Keep the engine bound to loopback for a local experiment. In a second terminal:

```bash
cd examples/typescript
npm install
export RUSHDB_TOKEN="<local-engine-token>"
export RUSHDB_ENGINE_URL="http://127.0.0.1:3000"
npm run seed-and-inspect
```

Use a fresh data directory for each repeatable run or implement explicit cleanup/upsert logic. This seed is intentionally one-shot and inserts additional records if run repeatedly.

## Expected observations

- Nested `ORDER` and `PRODUCT` objects are represented as linked records.
- The catalog describes observed labels, properties, and types.
- Both `status` and `orderStatus` are visible as distinct observed properties; the catalog does not infer that one is a semantic rename.
- The nested relationship filter returns the customer associated with a completed order.

These are expected test assertions. Live execution evidence has not yet been collected; see [validation status](../../docs/evaluation/validation-status.md).

## MCP

See [agent discovery and MCP workflow](../../docs/integrations/agent-discovery-and-mcp.md). Keep tokens out of source control and never provide a full-access token to an agent that only needs read access.
