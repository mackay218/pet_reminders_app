const express = require('express');
const app = express();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


router.put('/', (req, res) => {
    
    const petInfo = req.body;

    const queryText = `UPDATE pets SET "name" = $1, "breed" = $2, "age" = $3,
                        "sex" = $4, "weight" = $5, "notes" = $6 WHERE "id" = $7;`;
    pool.query(queryText, [petInfo.name, petInfo.breed, petInfo.age, petInfo.sex, petInfo.weight, petInfo.notes, petInfo.id])                        
        .then(() => { res.sendStatus(200); })
        .catch((error) => { console.log('error updating pet info:', error) }); 
})


module.exports = router;