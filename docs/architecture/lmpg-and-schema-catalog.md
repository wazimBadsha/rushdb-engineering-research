# LMPG data model and live schema catalog

## Model concepts

- **Record:** an entity such as a customer, order, product, session, or ticket.
- **Label:** a classification attached to a record, such as `CUSTOMER` or `ORDER`.
- **Property:** a typed value associated with a record or relationship.
- **Relationship:** a directed, named edge between records, such as `PLACED`, `CONTAINS`, or `WROTE_REVIEW`.

Nested JSON is an ingestion representation. Nested objects can be normalized into linked records rather than retained as opaque nested blobs.

## Storage representation

The LMPG documentation describes an occurrence-oriented property layout: individual property values are represented as ordered key/value occurrences associated with records or relationships. This supports property-level updates and metadata-driven access patterns, while requiring record reconstruction from multiple stored occurrences.

Do not simplify this to “a JSON document with edges.” The property-grained storage layout is an architectural choice with both benefits and costs, including key fan-out and reconstruction work.

## Catalog contents

The catalog can describe observed:

- Labels and record counts.
- Property names, observed types, and presence counts.
- Multi-valued and explicitly null properties.
- Properties observed with multiple types.
- Distinct-value dictionaries and useful distributions.
- Relationship source labels, relationship types, target labels, and counts.

A catalog-only description can provide structural metadata without scanning all records. A fuller description can include bounded samples and value information.

## Policy-filtered discovery

The catalog is an observed structural view, not an unconditional disclosure of every tenant field. When an enforced data-access policy is active, supported catalog operations are narrowed to the allowed labels, visible properties, and permitted relationship shapes. Configured minimum-count thresholds can also suppress low-count catalog groups and value details. Agents should discover the schema using the same tenant-scoped capability and policy context they will use for subsequent reads.

## Important limits

The catalog reports observed structure; it does not infer intent. If one producer writes `status` and another writes `orderStatus`, it can expose both. It cannot safely conclude that one is a rename, choose a canonical field, or migrate the data without domain rules.

Schema flexibility also does not remove index design. Frequently filtered properties may still need explicit indexes. Treat schema discovery and index selection as separate concerns.

## Official references

- [LMPG layout](https://docs.rushdb.com/engine/architecture/lmpg-layout/)
- [Schema catalog](https://docs.rushdb.com/engine/data-model/schema-catalog/)
- [Security and data-access policies](https://docs.rushdb.com/engine/operations/security/)
- [Architecture overview](https://docs.rushdb.com/engine/architecture/overview/)
