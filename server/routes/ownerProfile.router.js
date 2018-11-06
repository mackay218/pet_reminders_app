const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//route to get specific pet owner information
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('owner id to get', req.params.id);

    //id of owner to get info for
    const ownerId = req.params.id;

    const queryText = `SELECT * FROM pet_owners WHERE "id" = $1;`;
    
    pool.query(queryText, [ownerId])
        .then((results) => {
            console.log('owner router');
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
});//end get route

//route to update pet owner information
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('update owner info router', req.body);
    
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const notes = req.body.notes;
    const id = req.body.id;

    const queryText = `UPDATE pet_owners SET "first_name" = $1, "last_name" = $2, 
                                            "phone" = $3, "email" = $4,
                                            "address" = $5, "notes" = $6 WHERE "id" = $7;`;

    pool.query(queryText, [firstname, lastname, phone, email, address, notes, id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => { console.log('error updating owner info:', err) }); 
});//end put route

module.exports = router;