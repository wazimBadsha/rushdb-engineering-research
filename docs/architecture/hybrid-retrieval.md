# Hybrid retrieval: graph, keyword, and vector search

RushDB's retrieval proposition combines three distinct signals:

1. **Structured and graph filters** constrain candidates by labels, properties, and relationships.
2. **Keyword retrieval** supports lexical matching, including BM25-style ranking through configured text indexes.
3. **Vector retrieval** ranks candidates by embedding similarity.

The documented hybrid workflow filters candidates and combines keyword/vector rankings. Fusion methods include Reciprocal Rank Fusion (RRF) and Distribution-Based Score Fusion (DBSF).

## Why fusion matters

BM25 scores and cosine similarities are not naturally calibrated to the same numeric scale. Naively adding raw scores is usually not a sound ranking strategy. Rank fusion avoids requiring direct score comparability; score fusion normalizes result distributions before combining them.

## Self-hosted embedding responsibility

For self-hosted deployments, the application supplies vectors. The application therefore owns:

- Embedding model selection and versioning.
- Vector dimensionality consistency.
- Re-embedding and backfill strategy.
- Retry/dead-letter handling for embedding failures.
- Evaluation of recall and latency against representative queries.

Managed embedding features belong to the Cloud product path and should not be attributed to the self-hosted engine.

## Evaluation metrics

Use a labelled relevance set and measure recall@k, precision@k, nDCG@k, p50/p95/p99 latency, index build time, memory, and behaviour during bulk writes. Record exact versus ANN search, index parameters, vector dimensions, filter selectivity, and warm/cold cache conditions.

## References

- [Hybrid search](https://docs.rushdb.com/engine/indexes-and-search/hybrid-search/)
- [Vector search](https://docs.rushdb.com/engine/indexes-and-search/vector-search/)
- [Query planning](https://docs.rushdb.com/engine/indexes-and-search/query-planning/)
