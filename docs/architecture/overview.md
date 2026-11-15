# RushDB 3 architecture overview

## Positioning

RushDB 3 is a standalone Rust database engine built around a Labeled Meta-Property Graph (LMPG), an automatically maintained schema catalog, and integrated structured, keyword, and vector retrieval. It should be evaluated as an agent-facing connected-data engine—not assumed to be a universal replacement for PostgreSQL, MongoDB, or Neo4j.

RushDB 2.x and 3.x are materially different generations: 2.x was built over Neo4j; 3.x is the standalone engine with its own storage and query implementation.

## Logical architecture

```mermaid
flowchart TB
  APP[Applications and data producers] --> ING[Ingestion and mutation APIs]
  ING --> TX[Commit and WAL path]
  TX --> STORE[Typed property / relationship storage]
  TX --> CAT[Live schema catalog and statistics]
  STORE --> QP[Query planner and execution]
  CAT --> QP
  QP --> GRAPH[Graph and structured filters]
  QP --> TEXT[Keyword / BM25 retrieval]
  QP --> VEC[Vector retrieval]
  GRAPH --> FUSE[Hybrid ranking / result assembly]
  TEXT --> FUSE
  VEC --> FUSE
  FUSE --> SDK[SDK / SQL / native APIs / MCP tools]
  SDK --> AGENT[AI agent or application]
```

## Core idea

The database maintains an inspectable description of observed labels, properties, types, value information, and relationship shapes as data is committed. An agent can inspect that live description before constructing a query. This reduces dependence on stale schema descriptions embedded in prompts.

It does **not** automatically infer business definitions, resolve semantic renames, enforce application authorization policy, or make every observed property an indexed property.

## Deployment distinction

- **Self-hosted engine:** application-managed embedding generation; local engine and direct integrations.
- **RushDB Cloud:** managed service with additional managed capabilities. Do not attribute Cloud-only features to the self-hosted binary.

## Diagram source

Editable Mermaid sources are in [`assets/diagrams/`](../../assets/diagrams/). The accompanying PNG/SVG illustrations are intended as reusable technical assets, not evidence of measured runtime behaviour.
