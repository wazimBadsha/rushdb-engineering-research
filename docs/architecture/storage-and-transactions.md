# Storage, WAL, MVCC, and transactions

## Documented write path

The RushDB 3 documentation describes a log-first write path:

1. A mutation is planned and expanded into deterministic key/value operations.
2. The commit is appended to a segmented write-ahead log (WAL).
3. WAL flush/fsync establishes the documented durability boundary; concurrent commits may share a flush group.
4. The engine applies committed changes to an embedded `redb` ordered key/value store used as the queryable materialization.
5. Checkpoints persist materialized state and permit eligible WAL segments to be reclaimed.
6. Recovery replays committed WAL entries beyond the last checkpoint.

Be precise when describing acknowledgement and durability. The official write-path documentation distinguishes the buffered materialized-state apply from the WAL flush that establishes durability.

## MVCC

Readers use snapshots so a query observes a consistent version while later commits are published. Older versions remain available while active snapshots may still need them and can be reclaimed after they are no longer visible.

## Transactions

The documented model provides multi-statement transactions with atomic publication and snapshot isolation/first-committer-wins conflict detection. Applications should handle retryable write conflicts with bounded retries and idempotent operations.

## Engineering questions to test

- What is the observed commit latency distribution under concurrent writes?
- What happens when the process is terminated at each write/checkpoint stage?
- How long does recovery take as WAL volume grows?
- What are backup consistency and restore-time guarantees?
- How does snapshot retention affect storage reclamation under long-running readers?

## References

- [Write path](https://docs.rushdb.com/engine/architecture/write-path/)
- [Storage engine](https://docs.rushdb.com/engine/architecture/storage-engine/)
- [MVCC and snapshots](https://docs.rushdb.com/engine/architecture/mvcc-and-snapshots/)
- [Transactions](https://docs.rushdb.com/engine/query/transactions/)
