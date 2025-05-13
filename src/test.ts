import { getHealthyRpc } from './getHealthyRpc.js';
import { Connection, VersionedTransaction } from '@solana/web3.js';

async function testRpcHealth() {
    try {
        // Test with some public RPC endpoints
        const rpcs = [
            'https://api.mainnet-beta.solana.com',
            'https://solana-api.projectserum.com',
            'https://rpc.ankr.com/solana'
        ];

        console.log('Testing RPC health check...');
        const healthy = await getHealthyRpc(rpcs);
        console.log(`Healthy RPC found: ${healthy.url}`);
        console.log(`Latency (ping): ${healthy.latency} ms`);
        console.log(`Slot: ${healthy.slot}`);

        // Test connection to the healthy RPC
        const connection = new Connection(healthy.url);
        const slot = await connection.getSlot();
        console.log('Current slot (double-check):', slot);

    } catch (error) {
        console.error('Error during RPC health check:', error);
    }
}

// Run the test
testRpcHealth(); 