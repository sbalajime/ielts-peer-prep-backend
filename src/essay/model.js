const { executeQuery } = require('../DB/connection');


const postModelEssay = (req, res) => {
    const { question, essay, task } = req.body
    const user = req.id;
    executeQuery(`INSERT INTO essays(question, essay, user_id, task,created_at) VALUES($1, $2, $3,$4 ,NOW())`, [question, essay, user, task])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


const getModelEssayById = (req, res) => {
    const { id } = req.params
    executeQuery(`select es.id as essayId, es.question,es.essay as answer ,es.task , es.created_at as createdTime,us.id as userid,us.full_name as username
    from essays es left join  users us on es.user_id  = us.id 
    where es.id = $1`, [id])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


const getModelEssay = (req, res) => {
    executeQuery(`select es.id as essayId, (SELECT exists(SELECT SUM(id) FROM reviews GROUP BY essay_id , user_id HAVING user_id = $1 AND essay_id = es.id)) as reviewed_by_me ,es.question ,es.task , es.created_at as createdTime,us.id as userid,us.full_name as username
    from essays es left join  users us on es.user_id  = us.id`, [req.id])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


module.exports = { postModelEssay, getModelEssayById, getModelEssay }