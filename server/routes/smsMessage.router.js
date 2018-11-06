const express = require('express');
const app = express();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment');
const router = express.Router();
const SID = process.env.TWILIO_SID;
const TOKEN = process.env.TWILIO_TOKEN;
const SENDER = process.env.TWILIO_SENDER
const twilio = require('twilio');
const client = new twilio(SID, TOKEN);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//route to send text messages
router.post('/', rejectUnauthenticated, (req, res) => {
    const messageData = req.body.dataToSend;
    const vetPhone = req.body.vetPhone;
    console.log('message to send data', messageData);
    console.log('vet phone:', vetPhone);

    const ownerName = messageData.first_name;
    const petName = messageData.name;
    const careDue = messageData.care_type.toString().replace(/_/g, ' ').replace(/,/g, ', ');
    const dueDate = moment(messageData.due_date).format('YYYY-MM-DD');
    const phone = messageData.phone;

    const messageToSend = `Hello ${ownerName} our records show ${petName} is due for ${careDue} vaccination(s) on ${dueDate} call us at ${vetPhone} to schedule an appt.`;

    console.log(messageToSend);

    if (!SID || !TOKEN) {
        return res.json({ message: 'add TWILIO_SID and TWILIO_TOKEN to .env file.' })
    }

    client.messages.create({
        to: phone,
        from: SENDER,
        body: messageToSend
    }).then((message) => {
        console.log(message.sid);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error with text', error);
        res.sendStatus(500);
    });
});//end post route

module.exports = router;