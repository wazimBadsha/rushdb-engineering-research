# Storage, WAL, MVCC, and transactions

## Documented write path

For the RushDB 3.0.13 snapshot (20 November 2026), the write path is log-first with asynchronous materialization:

1. A mutation is planned and expanded into deterministic key/value operations.
2. The commit is appended to the segmented write-ahead log (WAL). Concurrent commits can share a flush group.
3. For the normal durable commit path, WAL `fsync` establishes durability.
4. Once the WAL record is durable, the commit is published and becomes visible to new readers. Client acknowledgement is tied to this durable publication—not to completion of the store-file write.
5. A background thread materializes published changes into the embedded `redb` store file. Reads include committed changes that have not yet been materialized, preserving the same snapshot answers.
6. Checkpoints make the materialized state durable and allow eligible WAL segments to be reclaimed according to the checkpoint and retention positions.

The 3.0.13 release changed the publication/materialization boundary. Do not describe the old sequence in which a client waited for the `redb` apply before the commit was published. The WAL remains the recovery source of truth; `redb` is the queryable materialization.

The 3.0.13 release notes also describe a bounded unmaterialized-write backlog: it is capped at a quarter of the managed budget, up to 256 MiB, and commits wait when the bound is reached. Large commits of 16,384 keys or more can enter that backlog as a sorted run rather than key by key. Treat these as release-specific implementation details, not universal properties of every historical 3.x build.

## MVCC

Readers use snapshots so a query observes a consistent version while later commits are published. The 3.0.13 storage path must also account for durable, published commits that are still waiting in the background materialization queue. Older versions remain available while active snapshots may still need them and can be reclaimed after they are no longer visible.

## Transactions

The documented model provides multi-statement transactions with atomic publication and snapshot isolation/first-committer-wins conflict detection. Applications should handle retryable write conflicts with bounded retries and idempotent operations.

## Engineering questions to test

- What is the observed commit latency distribution under concurrent writes?
- What happens when the process is terminated at each write/checkpoint stage?
- How long does recovery take as WAL volume grows?
- What are backup consistency and restore-time guarantees?
- How does snapshot retention affect storage reclamation under long-running readers?

## References

- [RushDB 3.0.13 changelog](https://github.com/rush-db/rushdb/blob/main/CHANGELOG.md#3013--2026-11-20)
- [Write path](https://docs.rushdb.com/engine/architecture/write-path/)
- [Storage engine](https://docs.rushdb.com/engine/architecture/storage-engine/)
- [MVCC and snapshots](https://docs.rushdb.com/engine/architecture/mvcc-and-snapshots/)
- [Transactions](https://docs.rushdb.com/engine/query/transactions/)
