const { executeQuery } = require('../DB/connection');

const postReviewModal = (req, res) => {
    const { id: userId } = req;
    const { sliders, essayId, comment } = req.body;

    // res.status(200).send({ status: 'success', msg: 'successfull', rows: sliders });
    let promises = [];
    let keys = Object.keys(sliders);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        promises.push(insertData({ essayId, key, value: sliders[key], userId }))
    }
    promises.push(insertComment({ essayId, userId, comment }))


    Promise.all(promises)
        .then(result => res.status(200).send({ status: 'success', msg: "successful" }))
        .catch(err => res.status(500).send({ status: "failed", msg: "Error while inserting data in database" }))
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
    let user = req.id;
    console.log('essayId', essayId, 'user', user)
    executeQuery(`	
    SELECT com.essay_id, rd.reviewedbyme, rd.submittedbyme, rd.reviews, com.comments_arr FROM (SELECT rw.essay_id,
		exists(SELECT user_id FROM reviews WHERE user_id = $2 AND essay_id = $1) reviewedbyme,
		exists(SELECT user_id FROM essays WHERE user_id = $2 AND id = $1) submittedbyme,
		json_agg(json_build_object('label' , bd.label ,'value' ,rw.value)) AS reviews
	FROM (
		SELECT 
			r.essay_id,
			r.band_descriptor_id,
			floor(2* avg(r.value))/2 AS value 
		FROM reviews r , essays e 
		WHERE	r.essay_id = e.id AND	r.essay_id = $1 
		GROUP BY essay_id,band_descriptor_id) rw 
	LEFT JOIN band_descriptors bd ON rw.band_descriptor_id  = bd.id AND bd.type = 'slide' GROUP BY rw.essay_id)
    AS rd LEFT JOIN (SELECT c.essay_id, json_agg(json_build_object('comment' , c.comment ,'user_name' ,u.full_name)) AS comments_arr FROM comments c LEFT JOIN essays e ON e.id = c.essay_id LEFT JOIN users u ON u.id = c.user_id GROUP BY  c.essay_id)
    AS com ON rd.essay_id = com.essay_id`, [essayId, user])
        .then(result => {
            console.log('result', result.rows)
            res.status(200).send({ ...result, rows: result.rows[0] })
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { postReviewModal, getReviewByIdModal }