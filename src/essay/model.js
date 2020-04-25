const pool = require('../DB/connection');


const postModelEssay = (req, res) => {
    const { question, essay, task } = req.body
    const user = req.id
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ status: 'failed', msg: 'Error acquiring client' })

        }
        client.query(`INSERT INTO essays(question, essay, user_id, task,created_at) VALUES($1, $2, $3,$4 ,NOW())`, [question, essay, user, task],
            (err, result) => {
                release();
                if (err) {
                    console.error('Error executing query', err.stack)
                    res.status(500).send({ status: 'failed', msg: 'Error executing query' })

                }
                res.status(200).send({ status: 'success', msg: 'successfull', rows: result.rows });
            })

    })

}


const getModelEssayById = (req, res) => {
    const { id } = req.params
    pool.connect((err, client, release) => {
        if (err)
            res.send({ msg: "failed", msg: "Error connecting.." })
        else {
            client.query(`select es.id as essayId, es.question,es.essay as answer ,es.task , es.created_at as createdTime,us.id as userid,us.full_name as username
            from essays es left join  users us on es.user_id  = us.id 
            where es.id = $1`, [id], (err, results) => {
                release()
                if (err)
                    res.status(500).send({ status: "failed", msg: "Error Quering Database" })
                else
                    res.status(200).send({ status: "success", msg: "Successful", rows: results.rows })
            })
        }

    })


}


const getModelEssay = (req, res) => {

    pool.connect((err, client, release) => {
        if (err) {
            res.send({ status: "failed", msg: "error acquring connection" })
        }
        else {
            client.query(`select es.id as essayId, es.question ,es.task , es.created_at as createdTime,us.id as userid,us.full_name as username
                    from essays es left join  users us on es.user_id  = us.id`, (err, results) => {
                release()
                if (err)
                    res.status(500).send({ status: "failed", msg: "err in quering database" })
                else
                    res.status(200).send({ status: 'success', msg: "successful", rows: results.rows })
            }
            )
        }
    })

}


module.exports = { postModelEssay, getModelEssayById, getModelEssay }