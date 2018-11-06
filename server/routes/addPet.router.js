const express = require('express');
const app = express();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//POST route to add new pet owner to database
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('new pet', req.body);

    const petInfo = req.body;

    (async () => {
        const client = await pool.connect();

        try {
            //query to add pet to pets table
            let queryText = `INSERT INTO pets(owner_id, name, species, breed, sex, age, weight) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;
            let values = [petInfo.ownerId, petInfo.name, petInfo.species, petInfo.breed, petInfo.sex, petInfo.age,
            petInfo.weight];

            //assign id of new pet to variable
            const petResult = await client.query(queryText, values);

            console.log(petResult.rows[0].id);

            let petId = petResult.rows[0].id;

            //loop through care dates and create history for each 
            for (let careDate of req.body.care_dates) {
                queryText = `INSERT INTO care_history(pet_id, vet_id, care_type, due_date, previous_date)
                                VALUES ($1, $2, $3, $4, $5);`;
                const result = await client.query(queryText, [petId, careDate.vetId, careDate.name, careDate.dueDate, careDate.previousDate]);
            }
            await client.query('COMMIT');
            res.sendStatus(201);
        } catch (error) {
            console.log('ROLLBACK', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    });
});//end post route

module.exports = router;