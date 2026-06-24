const { createClient } = require('@libsql/client');
require('dotenv').config();

const url = process.env.TURSO_DATABASE_URL || process.env.TEAM_DB_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.TEAM_DB_AUTH_TOKEN;

if (!url) {
  console.warn("TURSO_DATABASE_URL/TEAM_DB_URL is not set. Database queries will fail.");
}

const client = createClient({
  url: url || "",
  authToken: authToken,
});

async function query(sql, params = []) {
  try {
    // For backward compatibility with existing code that doesn't use params
    const result = await client.execute({ sql, args: params });
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

module.exports = { query };
