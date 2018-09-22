const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment');

const pool = require('../modules/pool');

const router = express.Router();


//POST route to add new pet owner to database
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('new pet', req.body);

    const petInfo = req.body
    
     


    // (async () => {
    //     const client = await pool.connect();

    //     try {
    //         await client.query('BEGIN');
    //         //query to add pet to pets table
    //         const queryText = `INSERT INTO pets(owner_id, name, species, breed, age, weight) 
    //                     VALUES ($1, $2, $3, $4, $5, $6);`;
    //         const petResult = client.query(queryText, [ownerId, petInfo.name, petInfo.species, petInfo.breed, petInfo.age,
    //             petInfo.weight]);
            
    //         const petId = petResult.rows[0].id;

    //       
            
    //         //get ids and fequencies of vaccines and from care_type table
    //         queryText = 'SELECT * FROM care_type;';

    //         const care_typeResult = client.query(queryText);
    //         res.sendStatus(201);
    //     } catch(error){
    //         console.log('ROLLBACK', error);
    //         await client.query('ROLLBACK');
    //         throw error;
    //     } finally {
    //         client.release();
    //     }

    // })().catch((error) => {
    //     console.log('CATCH', error);
    //     res.sendStatus(500);
    // });  
});

module.exports = router;