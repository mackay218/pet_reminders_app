const express = require('express');
const app = express();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/:id', rejectUnauthenticated, (req, res) => {
    
    //id of owner to get info for
    const ownerId = req.params.id;
    console.log('pet owner id:', ownerId);

    const queryText = `SELECT * FROM pets WHERE "owner_id" = $1;`;

    pool.query(queryText, [ownerId])
        .then((results) => {
            console.log('got owner', results.rows);
            if (results.rows.length >= 1) {
                res.send(results.rows);
            }
            else {
                res.sendStatus(404);
            }


        })
        .catch((error) => {
            console.log('error getting owner', error);
            res.sendStatus(500);
        });

})



module.exports = router;