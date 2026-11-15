# Validation status

**Research snapshot:** 16 November 2026  
**Target:** RushDB 3.x standalone engine, JavaScript SDK, and MCP direct mode  
**Outcome:** documentation/source-validated; live runtime validation remains outstanding.

## Source and documentation review

The research was checked against the official documentation and public project sources for the distinctions between RushDB 2.x and 3.x, the LMPG and schema catalog, TypeScript SDK calls, nested JSON ingestion, MCP direct mode, self-hosted versus Cloud capabilities, hybrid retrieval, WAL/MVCC, capacity-planning figures, and release maturity.

## Static checks

- `node --check examples/typescript/src/seed-and-inspect.mjs` — passed.
- `package.json` JSON parsing — passed.
- Repository tree and relative Markdown links — reviewed.

## Runtime validation

Live runtime validation has not yet been completed. No ingestion, catalog query, relationship query, vector search, failure-recovery test, or benchmark is claimed as executed.

## Required before claiming hands-on validation

1. Pin an exact RushDB engine version, SDK version, and MCP server version.
2. Run the POC in a clean local data directory.
3. Preserve the actual schema output and query result.
4. Verify mixed-type and property-drift behaviour against the pinned release.
5. Test restart/recovery and backup/restore separately.
6. Re-run performance tests with disclosed hardware, data, query, concurrency, and index settings.

## Evidence labelling

- **Officially documented:** behaviour stated in current RushDB docs.
- **Source checked:** names/configuration cross-checked against public source or SDK docs.
- **Vendor benchmark:** performance result published by RushDB; not independently reproduced.
- **Independent runtime result:** only use after executing and preserving a reproducible test.

Vendor benchmarks should not be presented as independent results, and source-checked code should not be described as runtime-validated code.
