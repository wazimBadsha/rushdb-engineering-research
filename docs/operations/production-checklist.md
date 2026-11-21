# Production evaluation checklist

## Data and correctness

- [ ] Define the system of record and the consistency contract for any RushDB projection.
- [ ] Specify ingestion idempotency, replay, deduplication, and schema-drift handling.
- [ ] Test mixed property types, nulls, missing fields, nested objects, and relationship cardinality.
- [ ] Define business semantics separately from structural schema metadata.
- [ ] Establish query correctness fixtures and regression tests.

## Security and authorization

- [ ] Use least-privilege capability tokens with the required read and/or write scopes.
- [ ] Bind capabilities to the intended tenant in multitenant mode.
- [ ] Keep the unrestricted boot token and capability-signing secret out of prompts, logs, source control, and screenshots.
- [ ] Configure and test data-access policies for labels, properties, relationship types, result limits, and catalog visibility.
- [ ] Confirm that schema-discovery calls use the same tenant and policy context as subsequent record queries.
- [ ] Test tenant isolation, missing-scope failure, hidden-property access, denied relationship traversal, token expiry, and unsupported-adapter fail-closed behaviour.
- [ ] Keep end-user identity, ownership, business roles, and domain authorization in the application service.

## Reliability and operations

- [ ] Exercise backup and restore, including recovery-time measurement.
- [ ] Test process termination during WAL append, publication, background materialization, and checkpoint activity.
- [ ] Measure WAL growth, unmaterialized-write backlog, checkpoint behaviour, disk pressure, and recovery time.
- [ ] Test replica lag and promotion procedures if replication is used.
- [ ] Establish health checks, metrics, logs, alert thresholds, and capacity limits.
- [ ] Pin engine, SDK, and MCP server versions.

## Performance

- [ ] Benchmark representative data volume and tenant distribution.
- [ ] Measure p50/p95/p99 read and write latency.
- [ ] Test concurrency and batch sizes.
- [ ] Compare indexed and unindexed filter patterns.
- [ ] Measure vector recall/latency and hybrid retrieval quality.
- [ ] Include warm/cold cache and concurrent bulk-ingestion conditions.

## Compatibility

- [ ] Verify every SQL/PG wire driver, ORM, and catalog query actually used.
- [ ] Verify graph query language maturity for the chosen release.
- [ ] Do not treat Preview or release-candidate interfaces as stable contracts.
- [ ] Confirm backup/export and migration paths from the current system.
