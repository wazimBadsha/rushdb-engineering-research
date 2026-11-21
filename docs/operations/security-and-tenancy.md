# Security and tenancy considerations

Treat the database catalog and query tools as privileged data interfaces. Structural metadata may include sample values or distributions; it is not automatically safe to expose to every agent.

## Recommended controls

- Use a tenant-scoped, least-privilege capability for each application/agent boundary.
- Separate schema discovery, read retrieval, memory writes, and destructive operations.
- Keep unrestricted boot credentials out of model context and MCP configuration committed to source control.
- Enforce business authorization in the application service, not through prompt instructions alone.
- Validate tenant scope on every request and fail closed when scope is missing or invalid.
- Audit tool calls, query parameters, tenant identity, and result counts without logging unnecessary PII.
- Apply redaction and retention controls to logs, traces, samples, and agent transcripts.
- Rotate credentials and test expiry/revocation behaviour.

## Engine-enforced controls

RushDB 3 provides database-level authentication and authorization controls:

- **Boot token:** operator credential with full access across tenants. It can select any tenant and must never be placed in an agent prompt, client application, or committed MCP configuration.
- **Capability token:** signed credential issued by the application. Claims include a subject, permissions, tenant binding (required in multitenant mode), issue time, and expiry.
- **Permission scopes:** `read`, `write`, or `*`. A `write` grant does not imply `read`; clients needing both must receive both permissions.
- **Tenant isolation:** in multitenant mode every request must select a tenant, and a capability must be bound to that exact tenant. Tenants use separate keyspaces.
- **Data-access policy:** an operator can configure a tenant policy that restricts allowed labels, denied relationship types, visible properties per label, maximum result count, and (where configured) minimum catalog group counts.

The boot token is required to install or read the tenant policy. A capability token cannot change the policy that governs it.

## Schema discovery is policy-aware

When an enforced policy applies, supported catalog operations expose only the permitted labels, properties, values, and relationship shapes. The catalog is not inherently a complete view of the tenant when policy restrictions are active.

Supported record-query, aggregate, single-record, vector-search, and SQL `SELECT` paths apply the relevant policy controls as documented for the release. Query paths that cannot enforce the policy must fail closed with an authorization error. The current documentation identifies several statement-language and adapter paths that require this treatment, including Cypher, GQL, Gremlin, SQL/PGQ, Mongo-style statements, `joinPairs`, `vectorIndexCandidates`, text search, explain, and backup operations. Verify the exact adapter set against the engine version and interfaces your application uses; do not infer that every retrieval adapter automatically enforces every policy.

## Responsibilities that remain in the application

RushDB does not provide end-user identity management or decide the application's business authorization rules. The application must:

- Authenticate end users and map authenticated principals to tenant identities.
- Decide which agent receives which tenant-scoped capability and permission scope.
- Enforce ownership, business roles, purpose restrictions, and domain-specific rules that are not represented by the database policy.
- Route sensitive business mutations through application services when domain invariants or external side effects must be enforced.
- Keep boot credentials and capability-signing secrets outside model context and source control.

A valid query is not necessarily an authorized query. Do not rely on prompt instructions as a security control.

## Operational controls

- Audit tool calls, query parameters, tenant identity, and result counts without logging unnecessary PII.
- Apply redaction and retention controls to logs, traces, samples, and agent transcripts.
- Rotate credentials and test expiry/revocation behaviour.
- Test missing-tenant-scope, cross-tenant token use, hidden-property access, denied relationship traversal, and unsupported-adapter fail-closed behaviour.

## Official references

- [Security](https://docs.rushdb.com/engine/operations/security/)
- [Authentication](https://docs.rushdb.com/engine/connectivity/authentication/)
- [Multitenancy](https://docs.rushdb.com/engine/architecture/multitenancy/)
