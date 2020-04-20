const {Pool}  = require('pg')
const pool = new Pool();


const postModelEssay = (req,res) =>{

    const {question,essay,user} = req.body
    pool.connect((err,client,release) =>{
        if (err) {
            console.error('Error acquiring client', err.stack)
            res.status(500).send({ msg: 'Error acquiring client' })

        }
        client.query(`INSERT INTO essays(question, essay, user_id, created_at) VALUES($1, $2, $3 ,NOW())`, [question, essay, user],
         (err, result) => {
            release()
            if (err) {
                console.error('Error executing query', err.stack)
                res.status(500).send({ msg: 'Error executing query' })

            }
            res.status(200).send({ msg: 'successfull', rows: result.rows });
        })

    })

    }


module.exports = {postModelEssay}