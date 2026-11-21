import assert from 'node:assert/strict';
import RushDB from '@rushdb/javascript-sdk';

const token = process.env.RUSHDB_TOKEN;
const engineUrl = process.env.RUSHDB_ENGINE_URL ?? 'http://127.0.0.1:3000';

if (!token) {
  throw new Error('RUSHDB_TOKEN is required.');
}

const db = new RushDB(token, {
  direct: true,
  engineUrl,
});

async function main() {
  // One-time seed. Use a fresh data directory for repeatable experiments,
  // or add an explicit upsert/cleanup strategy before rerunning this script.
  await db.records.importJson({
    label: 'CUSTOMER',
    data: {
      customerId: 'C-1001',
      name: 'Ananya',
      city: 'Bengaluru',
      ORDER: [
        {
          orderId: 'O-1001',
          status: 'completed',
          purchasedAt: '2026-11-03T10:30:00.000Z',
          PRODUCT: [
            {
              sku: 'LAPTOP-14',
              title: 'Developer Laptop',
              category: 'laptop',
            },
          ],
        },
      ],
    },
  });

  // Deliberately introduce producer drift: `orderStatus` instead of `status`.
  // This demonstrates catalog visibility, not automatic semantic rename detection.
  await db.records.importJson({
    label: 'CUSTOMER',
    data: {
      customerId: 'C-1002',
      name: 'Rahul',
      city: 'Bengaluru',
      ORDER: [
        {
          orderId: 'O-1002',
          orderStatus: 'processing',
          purchasedAt: '2026-11-05T09:00:00.000Z',
          PRODUCT: [
            {
              sku: 'MONITOR-27',
              title: '27-inch Monitor',
              category: 'monitor',
            },
          ],
        },
      ],
    },
  });

  // Inspect the live catalog instead of hard-coding the entire schema in a prompt.
  const schema = await db.ai.getSchemaMarkdown();
  assert.equal(typeof schema, 'string', 'Expected getSchemaMarkdown() to return Markdown');
  for (const expected of ['CUSTOMER', 'ORDER', 'PRODUCT', 'status', 'orderStatus']) {
    assert.ok(schema.includes(expected), `Live schema is missing expected label/property "${expected}".`);
  }
  console.log('\n=== LIVE SCHEMA ===\n');
  console.log(schema);

  // This uses the documented nested where-query pattern: a CUSTOMER must
  // match its own city and have a related ORDER with status=completed.
  const result = await db.records.find({
    labels: ['CUSTOMER'],
    where: {
      city: 'Bengaluru',
      ORDER: { status: 'completed' },
    },
    limit: 20,
  });

  assert.ok(Array.isArray(result?.data), 'Expected records.find() to return a DBRecordsArrayInstance');
  const matchedCustomerIds = result.data
    .map((record) => record?.data?.customerId)
    .filter((customerId) => typeof customerId === 'string')
    .sort();

  assert.deepEqual(
    matchedCustomerIds,
    ['C-1001'],
    'Relationship query should return only the customer with a completed related order.'
  );

  console.log('\n=== QUERY RESULT ===\n');
  console.dir(result, { depth: null });
  console.log('\nVALIDATION PASSED: schema discovery and relationship query assertions matched.\n');
}

main().catch((error) => {
  console.error('RushDB schema-discovery integration failed:', error);
  process.exitCode = 1;
});
