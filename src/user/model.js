

const jwt = require('jsonwebtoken');
const { pool, executeQuery } = require('../DB/connection');


const getUserModel = (req, res) => {
    executeQuery('SELECT * FROM users', [])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}

const getUserByIDModel = async (req, res) => {
    console.log('getUserByIDModal');
    executeQuery('SELECT * FROM users where id = $1', [1])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


const postUserModel = (req, res) => {
    const { fullName, email, password } = req.body;
    executeQuery(`INSERT INTO users(full_name, email, password, created_at) VALUES($1, $2, $3 ,NOW()) RETURNING id, email`, [fullName, email, password])
        .then(result => {
            let user = result.rows[0];
            let token = jwt.sign({
                data: { id: user.id, email: user.email },
            }, 'testsecret', { expiresIn: '24h' });
            res.status(200).send({ status: 'success', msg: 'successfull', data: token });
        })
        .catch(err => res.status(500).send(err))
}




const getUserByEmailModal = (email) => {
    console.log('email', email)
    return new Promise((resolve, reject) => {
        executeQuery(`SELECT * FROM users where email = $1`, [email])
            .then(result => { console.log('reulst.', result); resolve(result.rows) })
            .catch(err => reject({ msg: 'Error executing query' }))
    })
}

module.exports = { getUserModel, getUserByIDModel, postUserModel, getUserByEmailModal };