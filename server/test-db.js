const { createClient } = require('@libsql/client');
require('dotenv').config();

const url = process.env.TEAM_DB_URL;
const authToken = process.env.TEAM_DB_AUTH_TOKEN;

const client = createClient({
  url: url,
  authToken: authToken,
});

async function test() {
  try {
    const result = await client.execute("SELECT id, title FROM tasks LIMIT 1");
    console.log('Result type:', typeof result.rows[0]);
    console.log('Result rows:', JSON.stringify(result.rows, null, 2));
    await client.close();
  } catch (error) {
    console.error(error);
  }
}

test();
