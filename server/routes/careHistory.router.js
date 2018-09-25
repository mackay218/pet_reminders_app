const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//route to get all of care history for user id
router.get('/:id', rejectUnauthenticated, (req, res) => {

    const userId = req.params.id;
    console.log('in get care history for user', userId );

    const queryText = `SELECT 	"care_history"."pet_id", 
		"care_history"."vet_id",
		string_agg("care_type", ', '),
		"care_history"."due_date",
		string_agg(CAST("previous_date" as text), ', '),
		"care_history"."notification_sent",
		"care_history"."complete_care",
		"pets".*,
		"pet_owners".* 
		FROM care_history 
		JOIN pets ON "care_history"."pet_id" = "pets"."id" 
		JOIN pet_owners ON "pets"."owner_id" = "pet_owners"."id"
		WHERE "care_history"."vet_id" = $1
		GROUP BY "care_history"."pet_id", 
				 "care_history"."vet_id",
				 "care_history"."due_date",
				 "care_history"."notification_sent",
				 "care_history"."complete_care",
				 "pets"."id",
				 "pets"."name",
				 "pets"."species",
				 "pets"."breed",
				 "pets"."age",
				 "pets"."sex",
				 "pets"."weight",
				 "pets"."owner_id",
				 "pet_owners"."id",
				 "pet_owners"."first_name",
				 "pet_owners"."last_name",
				 "pet_owners"."phone",
				 "pet_owners"."address",
				 "pet_owners"."email",
                 "pet_owners"."notes";`

    pool.query(queryText, [userId])
        .then((results) => { res.send(results.rows)})
        .catch((error) => { console.log('error getting care history:', error) });                 

});



module.exports = router;