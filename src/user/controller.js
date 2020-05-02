const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let { getUserModel, getUserByIDModel, postUserModel, getUserByEmailModal } = require('./model');

const getUser = (req, res) => {
    getUserModel(req, res)
}


const getUserById = (req, res) => {
    getUserByIDModel(req, res)
}

const postUser = async (req, res) => {
    const user = await getUserByEmailModal(req.body.email);
    if (user.length) {
        res.status(401).send({ status: 'failed', msg: 'User account exists. Please Login.' })
    } else {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        postUserModel(req, res)
    }

}

const loginUser = async (req, res) => {
    // loginUserModel(req, res)getUserByEmail
    const user = await getUserByEmailModal(req.body.email);
    const { password } = req.body;
    if (user.length) {
        let isPassMatch = bcrypt.compareSync(password, user[0].password);
        if (isPassMatch) {
            let token = jwt.sign({
                data: { id: user[0].id, email: user[0].email },
            }, 'testsecret', { expiresIn: '24h' });
            res.status(200).send({ status: 'success', msg: 'successfull', data: token })
        } else {
            res.status(401).send({ status: 'failed', msg: 'Email or Password incorrect' })
        }

    } else {
        res.status(401).send({ status: 'failed', msg: 'Not a valid email' })
    }

}
module.exports = { getUser, getUserById, postUser, loginUser };