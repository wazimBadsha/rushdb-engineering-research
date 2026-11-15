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

## Key distinction

A database can expose which fields exist and still have no knowledge of whether a particular agent is allowed to read them. Schema discovery is not authorization. A valid query is not necessarily an authorized query.

Consult the current official [security documentation](https://docs.rushdb.com/engine/operations/security/) for the release-specific token and tenancy model.
