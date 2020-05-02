const { executeQuery } = require('../DB/connection');


const postModelEssay = (req, res) => {
    const { question, essay, task, type } = req.body
    const user = req.id;
    executeQuery(`INSERT INTO essays(question, essay, user_id, task, type , created_at) VALUES($1, $2, $3,$4,$5 ,NOW())`, [question, essay, user, task, type])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


const getModelEssayById = (req, res) => {
    const { id } = req.params
    const user = req.id
    executeQuery(`select exists ( select  user_id from reviews where user_id = $2 and essay_id = $1) reviewedbyme,(case when es.user_id = $2  and  es.id = $1 then true else false end ) submittedbyme  ,es.id as essayId,es.question,es.essay as answer ,es.task,es.type , es.created_at as createdTime,us.id as userid,us.full_name as username
    from essays es left join  users us on es.user_id  = us.id 
    where es.id = $1`
        , [id, user])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(500).send(err))
}


const getModelEssay = (req, res) => {
    executeQuery(`select es.id as essayId, (SELECT exists(SELECT id FROM reviews 
        where user_id = $1 AND essay_id = es.id) ) as reviewed_by_me,(case when es.user_id = $1 then true else false end ) submittedbyme  ,es.question ,es.task,es.type , es.created_at as createdTime,us.id as userid,us.full_name as username
            from essays es left join  users us on es.user_id  = us.id`, [req.id])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
}


module.exports = { postModelEssay, getModelEssayById, getModelEssay }