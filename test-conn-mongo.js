const { MongoClient } = require('mongoose').mongo;
const dns = require('dns');
const dotenv = require('dotenv');

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.error(err);
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
});

async function run() {
  try {
    console.log('Connecting via MongoClient...');
    await client.connect();
    console.log('MongoClient connected successfully!');
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('MongoClient error:', err);
    if (err.reason && err.reason.servers) {
      for (const [address, server] of err.reason.servers.entries()) {
        console.error(`Server: ${address}`);
        console.error(`Error details:`, server.error);
      }
    }
  } finally {
    await client.close();
  }
}

run();
