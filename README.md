# Pet Reminder
A program for veterinarians to simplify keeping track of and reminding pet owners of vaccinations for dogs and cats. Pet Reminder allows the user to send SMS messages to clients to remind them of an upcoming need for care. The user can filter their list of clients by name, pet name, when upcoming care is needed or when it was last done.The app track who has been sent a message and whether the care has been completed. If the care has been completed the app calculates the next time the same care will be needed and adds a new reminder to the database for the upcoming date.

## Built With
- JavaScript
- HTML5
- CSS3
- React
- React-Redux
- Redux-Saga
- NodeJS
- ExpressJS
- PostgreSQL
- PassportJS
- Twilio
- Material-UI
- Font Awesome
- Google Fonts

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- Twilio account with phone number enabled to send SMS messages, sign up at: https://www.twilio.com/

## Getting Started

In postgresql create a database named 'pet_reminders_app'.

In the database run the SQL queries found in the database.sql to CREATE TABLEs. 

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    TWILIO_SID = twiloSID
    TWILIO_TOKEN = twilioToken
    TWILIO_SENDER = twilioPhoneNumber
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
 Replace twilioSID , twilioToken and twilioPhoneNumber with the corresponding values from the twilio account and number you will be using.
 
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy
