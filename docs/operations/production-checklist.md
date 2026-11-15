# Production evaluation checklist

This is a review checklist, not a claim that every capability has been independently tested.

## Data and correctness

- [ ] Define the system of record and the consistency contract for any RushDB projection.
- [ ] Specify ingestion idempotency, replay, deduplication, and schema-drift handling.
- [ ] Test mixed property types, nulls, missing fields, nested objects, and relationship cardinality.
- [ ] Define business semantics separately from structural schema metadata.
- [ ] Establish query correctness fixtures and regression tests.

## Security

- [ ] Use least-privilege tenant-scoped credentials.
- [ ] Separate read, write, and destructive permissions.
- [ ] Test tenant isolation and missing-scope failure behaviour.
- [ ] Keep secrets out of prompts, logs, source control, and screenshots.
- [ ] Review whether schema samples expose sensitive values.

## Reliability and operations

- [ ] Exercise backup and restore, including recovery-time measurement.
- [ ] Test process termination during ingestion and checkpoint activity.
- [ ] Measure WAL growth, checkpoint behaviour, disk pressure, and recovery time.
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
