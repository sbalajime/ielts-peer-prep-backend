const pool = require('../DB/connection');


const postModelEssay = (req, res) => {

    const { question, essay, user, task } = req.body
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ status: 'failed', msg: 'Error acquiring client' })

        }
        client.query(`INSERT INTO essays(question, essay, user_id, task,created_at) VALUES($1, $2, $3,$4 ,NOW())`, [question, essay, user, task],
            (err, result) => {
                release()
                if (err) {
                    console.error('Error executing query', err.stack)
                    res.status(500).send({ status: 'failed', msg: 'Error executing query' })

                }
                res.status(200).send({ status: 'success', msg: 'successfull', rows: result.rows });
            })

    })

}


module.exports = { postModelEssay }