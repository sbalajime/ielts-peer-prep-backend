const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL
const pool = new Pool({
    connectionString: connectionString,
})

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                console.error('Error acquiring client', err.stack)
                reject({ status: 'failed', msg: 'Error acquiring client' })
            } else {
                client.query(query, params, (err, result) => {
                    release();
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject({ status: 'failed', msg: 'Error executing query' })
                    } else {
                        resolve({ status: 'success', msg: 'successfull', rows: result.rows })
                    }

                });
            }

        })
    })
}

module.exports = { pool, executeQuery };