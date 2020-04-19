const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let { getUserModel, getUserByIDModel, postUserModel, getUserByEmailModal } = require('./model');

const getUser = (req, res) => {
    getUserModel(req, res)
}


const getUserById = (req, res) => {
    getUserByIDModel(req, res)
}

const postUser = (req, res) => {
    console.log('rounds', process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    postUserModel(req, res)
}

const loginUser = async (req, res) => {
    // loginUserModel(req, res)getUserByEmail
    const user = await getUserByEmailModal(req.body.email);
    const { password } = req.body;
    console.log('user', user);
    if (user.length) {
        let isPassMatch = bcrypt.compareSync(password, user[0].password);
        if (isPassMatch) {
            let token = jwt.sign({
                data: { id: user[0].id, email: user[0].id },
            }, 'testsecret', { expiresIn: '1h' });
            res.status(200).send({ msg: 'successfull', data: token })
        } else {
            res.status(401).send({ msg: 'Email or Password incorrect' })
        }

    } else {
        res.status(401).send({ msg: 'Not a valid email' })
    }

}
module.exports = { getUser, getUserById, postUser, loginUser };