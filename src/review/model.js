const { executeQuery } = require('../DB/connection');

const postReviewModal = (req, res) => {
    const { id: userId } = req;
    const { sliders, essayId } = req.body;
    // res.status(200).send({ status: 'success', msg: 'successfull', rows: sliders });
    let promises = Object.keys(sliders).map(key => {
        return insertData({ essayId, key, value: sliders[key], userId });

    });
    Promise.all(promises)
        .then(result => res.status(200).send({ status: 'success', msg: "successful" }))
        .catch(err => res.status(500).send({ status: "failed", msg: "err in inserting database" }))
}

const insertData = (data) => {
    console.log('insertData')
    const { essayId, key, value, userId } = data;
    return new Promise((resolve, reject) => {
        executeQuery(`INSERT INTO reviews(essay_id, band_descriptor_id, value, user_id, created_at) VALUES($1, (SELECT id FROM band_descriptors WHERE label=$2), $3,$4, NOW()) RETURNING id`, [essayId, key, value, userId])
            .then(result => resolve(result.rows))
            .catch(err => reject({ status: 'failed', msg: 'Error executing query' }))
    })
}


const getReviewByIdModal = (req, res) => {
    let essayId = req.params.id;
    executeQuery(`select json_agg(json_build_object('label' , bd.label ,'value' ,rw.value)) as reviews  from(
        select essay_id,band_descriptor_id,round(avg(value)) as value from reviews
        where essay_id = $1
        group by essay_id,band_descriptor_id) rw left join band_descriptors bd on 
        rw.band_descriptor_id  = bd.id  
        and bd.type = 'slide'`, [essayId])
        .then(result => {
            res.status(200).send({ ...result, rows: result.rows.length ? result.rows[0].reviews : [] })
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { postReviewModal, getReviewByIdModal }