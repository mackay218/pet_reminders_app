const express = require('express');
const app = express();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//route to get pets for specific owner
router.get('/owner/:id', rejectUnauthenticated, (req, res) => {
    
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

});//end get route

//route to get specific pet information
router.get('/pet/:id', rejectUnauthenticated, (req, res) => {

    const petId = req.params.id;
    console.log('pet id:', petId);

    const queryText = `SELECT * FROM pets WHERE "id" = $1;`;

    pool.query(queryText, [petId])
        .then((results) => {
            res.send(results.rows[0]);
        })
        .catch((error) => {
            console.log('error getting one pet:', error);
            res.sendStatus(500);
        });
}); //end get route





module.exports = router;