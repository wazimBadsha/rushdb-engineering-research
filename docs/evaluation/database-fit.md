# Database fit: where RushDB belongs

## A workload-first comparison

RushDB 3 should be assessed by workload and operational requirements rather than by a generic claim that one database replaces another.

| Requirement | RushDB 3 | PostgreSQL | MongoDB |
|---|---|---|---|
| Connected records and named relationships | Native LMPG model | Relational joins; graph extensions possible | References and aggregation operators |
| Flexible evolving properties | Schema catalog over observed structure | JSONB plus relational schema | Flexible document model |
| General-purpose transactional OLTP | Validate workload and maturity constraints | Mature primary strength | Mature primary strength |
| Hybrid retrieval | Integrated graph, keyword, and vector paths | Extensions and search integrations | Atlas search/vector capabilities |
| SQL ecosystem and broad tooling | Interface compatibility is release-specific | Extensive ecosystem | SQL is not its primary query model |
| Agent-oriented schema discovery | Explicit catalog and MCP workflow | Build catalog/introspection tooling | Build schema profiling/tooling |

The table is intentionally qualitative. It is not a benchmark and should not be used as a procurement decision without a workload-specific POC.

## Strong RushDB evaluation candidates

- Agent memory where entities and relations are important.
- Context graphs assembled from multiple application systems.
- Retrieval that combines strict business filters, lexical terms, semantic similarity, and graph expansion.
- Data exploration where the observed schema changes frequently and agents need a discoverable catalog.

## Cases where another system may remain primary

- Mature transactional workflows with strict relational constraints.
- Workloads heavily dependent on SQL ecosystem depth, broad ORM compatibility, or advanced analytical extensions.
- Existing MongoDB document workloads where graph traversal is limited and Atlas capabilities meet retrieval needs.
- Teams without capacity to operate and evaluate another data platform.

## Recommended architecture

Keep PostgreSQL or MongoDB as the system of record when it already owns transactional invariants. Project a controlled subset into RushDB through an outbox or CDC pipeline. Give agents least-privilege access to the projection, and route business mutations through application services that enforce domain rules and authorization.

## Further reading

- [PostgreSQL information schema](https://www.postgresql.org/docs/current/infoschema-columns.html)
- [pgvector](https://github.com/pgvector/pgvector)
- [MongoDB $graphLookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/)
- [MongoDB Atlas Vector Search](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/)
