const { Pool } = require('pg');
const pool = new Pool();

const getUserModel = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ msg: 'Error acquiring client' })
        }
        client.query('SELECT * FROM users', (err, result) => {
            release()
            if (err) {
                console.error('Error executing query', err.stack)
                res.status(500).send({ msg: 'Error executing query' })
            }
            res.status(200).send({ msg: 'successfull', rows: result.rows })
        })
    })
}

const getUserByIDModel = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ msg: 'Error acquiring client' })

        }
        client.query('SELECT * FROM users where id = 1', (err, result) => {
            release()
            if (err) {
                console.error('Error executing query', err.stack)
                res.status(500).send({ msg: 'Error executing query' })

            }
            res.status(200).send({ msg: 'successfull', rows: result.rows });
        })
    })
}


const postUserModel = (req, res) => {
    const { fullName, email, password } = req.body;
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ msg: 'Error acquiring client' })

        }
        client.query(`INSERT INTO users(full_name, email, password, created_at) VALUES($1, $2, $3 ,NOW())`, [fullName, email, password], (err, result) => {
            release()
            if (err) {
                console.error('Error executing query', err.stack)
                res.status(500).send({ msg: 'Error executing query' })

            }
            res.status(200).send({ msg: 'successfull', rows: result.rows });
        })
    })
}




const getUserByEmailModal = (email) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                reject({ msg: 'Error acquiring client' })
            }
            client.query('SELECT * FROM users where email = $1', [email], (err, result) => {
                release()
                if (err) {
                    reject({ msg: 'Error executing query' })
                }
                resolve(result.rows)
            })
        })
    })
}


module.exports = { getUserModel, getUserByIDModel, postUserModel, getUserByEmailModal };