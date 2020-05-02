const { executeQuery } = require('../DB/connection');

const postReviewModal = (req, res) => {
    const { id: userId } = req;
    const { sliders, essayId, comment } = req.body;
    // res.status(200).send({ status: 'success', msg: 'successfull', rows: sliders });
    let promises = [];
    let keys = Object.keys(sliders);
    for (let i = 0; i < keys.length + 1; i++) {
        if (i != keys.length - 1) {
            let key = keys[i];
            promises.push(insertData({ essayId, key, value: sliders[key], userId }))
        } else {
            promises.push(insertComment({ essayId, userId, comment }))
        }
    }
    Promise.all(promises)
        .then(result => res.status(200).send({ status: 'success', msg: "successful" }))
        .catch(err => res.status(500).send({ status: "failed", msg: "err in inserting database" }))
}

const insertData = (data) => {
    const { essayId, key, value, userId } = data;
    return new Promise((resolve, reject) => {
        executeQuery(`INSERT INTO reviews(essay_id, band_descriptor_id, value, user_id, created_at) VALUES($1, (SELECT id FROM band_descriptors WHERE label=$2), $3,$4, NOW()) RETURNING id`, [essayId, key, value, userId])
            .then(result => resolve(result.rows))
            .catch(err => reject({ status: 'failed', msg: 'Error executing query' }))
    })
}


const insertComment = (data) => {
    const { essayId, comment, userId } = data;
    return new Promise((resolve, reject) => {
        executeQuery(`INSERT INTO comments(essay_id, user_id, comment) VALUES($1, $2, $3) RETURNING id`, [essayId, userId, comment])
            .then(result => resolve(result.rows))
            .catch(err => reject({ status: 'failed', msg: 'Error executing query' }))
    })
}


const getReviewByIdModal = (req, res) => {
    let essayId = req.params.id;
    let user = req.id
    executeQuery(`select exists(select user_id from reviews where user_id = $2 and essay_id = $1) reviewedbyme,
    exists(select user_id from essays where user_id = $2 and id = $1) submittedbyme
    ,json_agg(json_build_object('label' , bd.label ,'value' ,rw.value)) as reviews
    from(
    select r.essay_id,r.band_descriptor_id,floor(2* avg(r.value))/2 as value from reviews r , 
	essays e
    where 
		r.essay_id = e.id
	and	r.essay_id = $1 
    group by essay_id,band_descriptor_id) rw left join band_descriptors bd on 
    rw.band_descriptor_id  = bd.id  
    and bd.type = 'slide'`, [essayId, user])
        .then(result => {
            console.log(result.rows[0])
            res.status(200).send({ ...result, rows: result.rows[0] })
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { postReviewModal, getReviewByIdModal }