# Node Health Sol

A TypeScript utility library for checking Solana RPC node health.  
It helps you always connect to the fastest and most up-to-date Solana RPC endpoint, improving reliability for your blockchain apps.

---

## Features

- **Find the healthiest Solana RPC node** from a list, based on:
  - **Latency (ping):** How fast the node responds
  - **Slot freshness:** How up-to-date the node is with the blockchain
- **TypeScript support** for type safety and modern development
- **ES module compatible** (modern `import`/`export` syntax)

---

## Installation

```bash
npm install
```

---

## Usage

### 1. Import the Library

```typescript
import { getHealthyRpc } from 'node-health-sol';
```

### 2. Provide Your Own RPC Endpoints

> **Note:** This library does not provide a default list of endpoints. You must supply your own array of Solana RPC URLs. This gives you full flexibility to use public, private, or custom endpoints as needed.

```typescript
const myEndpoints = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana'
  // ...add your own endpoints here
];

const healthy = await getHealthyRpc(myEndpoints);

console.log(`Healthy RPC found: ${healthy.url}`);
console.log(`Latency (ping): ${healthy.latency} ms`);
console.log(`Slot: ${healthy.slot}`);
```

- **`healthy.url`**: The best RPC endpoint to use
- **`healthy.latency`**: How fast the node responded (in milliseconds)
- **`healthy.slot`**: The slot number reported by the node (higher = more up-to-date)

---

## API

### `getHealthyRpc(rpcs: string[], slotDrift?: number): Promise<{ url: string, latency: number, slot: number }>`

- **rpcs**: Array of Solana RPC URLs to check (**required; no defaults provided**)
- **slotDrift**: Maximum allowed difference from the highest slot (default: 20)
- **Returns**: The healthiest node's URL, its latency (ms), and its slot number

#### How it works:
- Pings each RPC node by requesting the current slot
- Measures response time (latency)
- Compares slot numbers to ensure the node is up-to-date
- Returns the fastest node that is also up-to-date

---

## Example: Health Check Script

```typescript
import { getHealthyRpc } from './getHealthyRpc.js';
import { Connection } from '@solana/web3.js';

async function testRpcHealth() {
  // User supplies their own endpoints
  const rpcs = [
    'https://api.mainnet-beta.solana.com',
    'https://solana-api.projectserum.com',
    'https://rpc.ankr.com/solana'
    // ...add your own endpoints here
  ];

  console.log('Testing RPC health check...');
  const healthy = await getHealthyRpc(rpcs);
  console.log(`Healthy RPC found: ${healthy.url}`);
  console.log(`Latency (ping): ${healthy.latency} ms`);
  console.log(`Slot: ${healthy.slot}`);

  // Double-check slot
  const connection = new Connection(healthy.url);
  const slot = await connection.getSlot();
  console.log('Current slot (double-check):', slot);
}

testRpcHealth();
```

---

## Best Practices for Endpoint Selection

- Use a mix of public and private endpoints for redundancy.
- Regularly update your endpoint list to remove unreliable or deprecated nodes.
- Consider using endpoints with higher rate limits or geographic proximity for better performance.
- Never hard-code endpoints in your production code—always allow configuration.

---

## Development

```bash
# Build the project
npm run build

# Run in development mode (watch for changes)
npm run dev

# Start the project (if you have an entry point)
npm start
```

---

## Project Structure

```
src/
  getHealthyRpc.ts         # Finds the healthiest Solana RPC node
  index.ts                 # Exports main functions
  test.ts                  # Example/test script
dist/                      # Compiled JavaScript output
```

---

## Notes

- The library uses ES modules. If you use it in your own project, make sure your environment supports ES modules or adjust import paths accordingly.
- The health check is based on both latency and slot freshness, so you always get a fast and up-to-date node.
- **You must supply your own list of endpoints.**

---

## License

ISC

---

## Author

devvang 
