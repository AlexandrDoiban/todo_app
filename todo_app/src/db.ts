import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  connectionString: process.env.PG_URL as string,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function connectDB(): Promise<Client> {
  try {
    await client.connect();
    console.log('PostgreSQL connection established');
    return client;
  } catch (err) {
    if (err instanceof Error) {
      console.error('PostgreSQL connection failed:', err.message);
    } else {
      console.error('PostgreSQL connection failed:', err);
    }
    process.exit(1);
  }
}

export { client };
