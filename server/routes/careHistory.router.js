const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//route to add new entries to care history
router.post('/', rejectUnauthenticated, (req, res) => {

	const entryToAdd = req.body;

	console.log('entry to add', entryToAdd);

	const queryText = `INSERT INTO care_history(pet_id, vet_id, care_type, due_date, previous_date)
								VALUES ($1, $2, $3, $4, $5);`
	
	pool.query(queryText, [entryToAdd.petId, entryToAdd.vetId, entryToAdd.careType, 
							entryToAdd.dueDate, entryToAdd.previousDate])
		.then((response) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log('error adding new entry to care history:', error);
		});													
});//end post route

//route to get all of care history for user id
router.get('/:id', rejectUnauthenticated, (req, res) => {

    const userId = req.params.id;
    console.log('in get care history for user', userId );

    const queryText = `SELECT 	"care_history"."pet_id", 
		"care_history"."vet_id",
		array_agg("care_type") AS "care_type",
		"care_history"."due_date",
		string_agg(CAST("previous_date" as text), ', ') as "previous_date",
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

});//end get route

//route to update notification_sent status
router.put('/message', rejectUnauthenticated, (req, res) => {
	console.log('in careHistory router update notification_sent', req.body);

	const body = req.body.dataToSend;

	const petId = body.pet_id;
	const dueDate = body.due_date;

	let notificationSent = body.notification_sent;

	if(notificationSent === false){
		notificationSent = true;
	}
	
	const queryText = `UPDATE care_history SET "notification_sent" = $1 WHERE "pet_id" = $2 AND "due_date" = $3;`;

	pool.query(queryText, [notificationSent, petId, dueDate])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('error updating notification_sent:', error);
			res.sendStatus(500);
		});

});//end put route

//route to update complete_care status
router.put('/care', rejectUnauthenticated, (req, res) => {
	console.log('in careHistory router update complete_care');

	const petId = req.body.pet_id;
	const dueDate = req.body.due_date;

	let completeCare = req.body.complete_care;

	if(completeCare === false){
		completeCare = true;
	}
	else if(completeCare === true){
		completeCare = false;
	}

	const queryText = `UPDATE care_history SET "complete_care" = $1 WHERE "pet_id" = $2 AND "due_date" = $3;`;

	pool.query(queryText, [completeCare, petId, dueDate])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('error updating complete_care:', error);
			res.sendStatus(500);
		});
});//end put route

//route to delete/undo new care history entry
router.delete('/:petId/:vetId/:careType/:dueDate/:previousDate', rejectUnauthenticated, (req, res) => {
	const entryToDelete = req.params;

	console.log('entry to delete:', entryToDelete);

	const queryText = `DELETE FROM care_history WHERE "pet_id" = $1 AND "vet_id" = $2 AND "care_type" = $3 AND 
													  "due_date" = $4 AND "previous_date" = $5;`;
	pool.query(queryText, [entryToDelete.petId, entryToDelete.vetId, entryToDelete.careType, 
							entryToDelete.dueDate, entryToDelete.previousDate])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log('error deleting entries from care_history:', error);
			res.sendStatus(500);
		});												  
});//end delete route

module.exports = router;