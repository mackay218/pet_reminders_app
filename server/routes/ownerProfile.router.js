const express = require('express');
const pool = require('../modules/pool');


const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('owner id to get', req.params.id);

    //id of owner to get info for
    const ownerId = req.params.id;

    const queryText = `SELECT * FROM pet_owners WHERE "id" = $1;`;
    
    pool.query(queryText, [ownerId])
        .then((results) => {
            console.log('got owner', results.rows);
                if(results.rows.length >= 1){
                    res.send(results.rows[0]);
                }
                else{
                    res.sendStatus(404);
                }
          
            
        })
        .catch((error) => {
            console.log('error getting owner', error);
            res.sendStatus(500);
        });
});


module.exports = router;