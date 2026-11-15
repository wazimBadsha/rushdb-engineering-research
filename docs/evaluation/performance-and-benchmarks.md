# Performance and benchmark notes

## Vendor-published capacity measurements

The RushDB capacity-planning documentation publishes measurements for a workload with 200,000 records across 50 tenants, ten properties per record, on an Intel i9-12900H Linux host with NVMe storage. The mixed workload used 500 concurrent closed-loop clients.

Selected published figures include:

| Workload | Reported result |
|---|---:|
| Bulk ingestion, batches of 500 | 12,600 records/s |
| Mixed workload without ordered indexes | 875 requests/s |
| Mixed workload with ordered indexes | 4,373 requests/s |
| Two-condition filtered reads without indexes | 1,810 requests/s |
| Same filtered reads with indexes | 10,600 requests/s |

These are vendor-reported results, not independently reproduced benchmarks and not a controlled cross-database comparison. Do not generalize them to another hardware profile or workload without reproduction.

## What to record in an independent benchmark

- Exact engine/SDK build and configuration.
- Hardware, CPU, RAM, storage, filesystem, and OS.
- Dataset size, record/property/edge counts, tenant distribution, and data skew.
- Query shapes, filter selectivity, traversal depth, and result size.
- Index types and parameters; index build/warm-up state.
- Concurrency model, client count, connection pooling, and batch size.
- Warm and cold cache conditions.
- p50, p95, p99 latency, throughput, error rate, CPU, memory, and disk I/O.
- Recovery, replication lag, and behaviour during bulk ingestion.

## Agent benchmark metrics

For agent-generated queries, database latency alone is insufficient. Also measure invalid identifier rate, result correctness, tool-call count, retry count, schema-discovery overhead, prompt-token cost, and end-to-end latency.

## Source

[Official capacity planning documentation](https://docs.rushdb.com/engine/operations/capacity-planning/)
