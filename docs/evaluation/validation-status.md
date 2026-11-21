# Validation status

**Research snapshot:** 21 November 2026  
**Engine target:** RushDB 3.0.13  
**JavaScript SDK:** @rushdb/javascript-sdk 3.4.1  
**MCP server reference:** @rushdb/mcp-server 3.5.0

## Source and documentation review

The research was checked against the official documentation and public project sources for the distinctions between RushDB 2.x and 3.x, the LMPG and schema catalog, TypeScript SDK calls, nested JSON ingestion, MCP direct mode, self-hosted versus Cloud capabilities, hybrid retrieval, WAL/MVCC, capacity-planning figures, and release maturity.

## Static checks

- `npm run check` in examples/typescript — available for syntax validation.
- Package manifest and repository paths — reviewed.
- GitHub Actions static-check workflow — added; its hosted run status should be checked after the latest push.

## Runtime validation

The TypeScript POC now contains runtime assertions for expected catalog entries and the nested relationship query. The repository does not include a retained successful runtime execution transcript for the 3.0.13 target. Do not describe the integration example as runtime-verified until it has been run against that pinned engine and its output retained. No vector/hybrid search, MCP process, recovery, backup/restore, or independent benchmark execution is claimed.

## Required before claiming hands-on validation

1. Run the POC against RushDB engine 3.0.13 with JavaScript SDK 3.4.1 in a clean local data directory.
2. Preserve the actual schema output, query result, operating system, and exact command output.
3. Verify mixed-type and property-drift behaviour against the pinned release.
4. Exercise MCP direct mode separately using MCP server 3.5.0 and a tenant-scoped capability.
5. Test restart/recovery and backup/restore separately.
6. Re-run performance tests with disclosed hardware, data, query, concurrency, and index settings.

## Evidence labelling

- **Officially documented:** behaviour stated in current RushDB docs.
- **Source checked:** names/configuration cross-checked against public source or SDK docs.
- **Vendor benchmark:** performance result published by RushDB; not independently reproduced.
- **Independent runtime result:** only use after executing and preserving a reproducible test.

Vendor benchmarks should not be presented as independent results, and source-checked code should not be described as runtime-validated code.

The 3.0.13 source snapshot includes the release-specific WAL publication/background-materialization change. See the [3.0.13 changelog](https://github.com/rush-db/rushdb/blob/main/CHANGELOG.md#3013--2026-11-20). RushDB data-access policies are also reflected in the security and schema-catalog documents.
