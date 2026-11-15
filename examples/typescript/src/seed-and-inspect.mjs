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
  console.log('\n=== LIVE SCHEMA ===\n');
  console.dir(schema, { depth: null });

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

  console.log('\n=== QUERY RESULT ===\n');
  console.dir(result, { depth: null });
}

main().catch((error) => {
  console.error('RushDB validation example failed:', error);
  process.exitCode = 1;
});
