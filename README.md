# RushDB Engineering Research

Independent, source-backed engineering notes and reproducible evaluation material for **RushDB 3**.

This repository examines RushDB as an agent-facing, graph-native data system: its Labeled Meta-Property Graph (LMPG), live schema catalog, query and retrieval interfaces, storage internals, MCP integration, operational model, and production-readiness trade-offs.

> **Research status:** documentation/source-validated snapshot dated 16 November 2026. The included TypeScript proof of concept is source-checked
 See [validation status](docs/evaluation/validation-status.md).

## What is in this repository?

- [Architecture overview](docs/architecture/overview.md)
- [LMPG data model and schema catalog](docs/architecture/lmpg-and-schema-catalog.md)
- [Storage, WAL, MVCC and transactions](docs/architecture/storage-and-transactions.md)
- [Agent discovery and MCP workflow](docs/integrations/agent-discovery-and-mcp.md)
- [Hybrid retrieval](docs/architecture/hybrid-retrieval.md)
- [Security and tenancy](docs/operations/security-and-tenancy.md)
- [Deployment and operational checklist](docs/operations/production-checklist.md)
- [Performance and benchmark methodology](docs/evaluation/performance-and-benchmarks.md)
- [Database comparison and fit](docs/evaluation/database-fit.md)
- [Validation status and limitations](docs/evaluation/validation-status.md)
- [TypeScript proof of concept](examples/typescript/README.md)

## Scope and non-goals

This is an independent engineering research repository, not an official RushDB project and not a claim of endorsement. It is not the Medium article, a product manual, or a replacement for the official documentation. Product behaviour and compatibility can change; verify the exact engine and SDK release before relying on any statement.

The repository intentionally does not recommend replacing a mature transactional system of record solely to adopt an agent-oriented retrieval layer. A derived RushDB projection alongside PostgreSQL or MongoDB is one adoption pattern worth evaluating.

## Source hierarchy

Prefer current official documentation and the exact release's source code over older videos, social posts, or secondary summaries. Vendor-published benchmarks are labelled as such and are not presented as independently reproduced measurements.

Start with the [official RushDB repository](https://github.com/rush-db/rushdb), [documentation](https://docs.rushdb.com/), and [JavaScript SDK](https://github.com/rush-db/javascript-sdk).

## Research snapshot

- Research date: 2026-11-16
- Target: RushDB 3.x standalone engine
- SDK example: `@rushdb/javascript-sdk`
- MCP: self-hosted direct/stdio mode
- Runtime validation: outstanding

## Contributing

Corrections and reproducible evidence are welcome. Please include the RushDB version, environment, exact command or query, expected result, observed result, and relevant official source. Do not submit secrets, customer data, or unverified performance claims.

## License

Original documentation and example code in this repository are licensed under the MIT License unless a file says otherwise. RushDB itself and its upstream components retain their own licenses. See [LICENSE](LICENSE).
