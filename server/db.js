const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function query(sql) {
  try {
    const { stdout, stderr } = await execPromise(`team-db "${sql.replace(/"/g, '\\"')}"`);
    if (stderr) {
      console.error('team-db stderr:', stderr);
    }
    return JSON.parse(stdout);
  } catch (error) {
    console.error('Error executing team-db:', error);
    throw error;
  }
}

module.exports = { query };
