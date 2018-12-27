# Code Review Notes
I thought I'd just make a pull request with some changes I noticed in the process of getting things set up.  All in all things look really good.  Keep writing apps to maintain the structure that you've got going here.  Reuse what you can using this as a template because there isn't much I can pick apart about structure.  I'm remembering things/best practices that I'll be putting to use for my projects.  Prime does a great job teaching file organization for express apps/react apps.

## Deployment
It would be great to get this hosted (I didn't see a link so I'm assuming this isn't hosted -- correct me if I'm wrong!)!  If you haven't hosted 
with Heroku yet let me know and I can try to help you get started with that.  It might also be a good excuse to take a look at Docker, although
it would require a lot more background research and concept grasping to get to that point.

Without having this hosted, it takes a good amount of effort to get a development environment set up.  I didn't have Postgres or a Postgres client
and spent a non trivial amount of time remembering how to configure that environment.  Personally I don't mind because it gave me some good
context for jumping back into it for a project at work, but this might be a deterrant to seeing the hard work you put into it.

I didn't get my solo app hosted and noone ever asked me to fire it up locally when I was interviewing.  I think being able to see your work without having to go through the setup would set you apart from other applicants.  There are some holes in the functionality, but while you're looking I think it would be worth putting in some time to iron out those kinks.  I've tried to point out what I saw not to point out flaws but to pull you back into the headspace of what you were working on.  Again, my stuff was in a really similar spot as I was going through my interviewing process and in hindsight I think the stuff in your github is either easy to see working or doesn't end up working to your advantage at all in many cases.

## Postgres Config
It looks like there are a few tables that aren't created in the database.sql file.  It shouldn't take too long to find the columns the app will need
for the vets and care_type tables.  Adding them in will probably be necessary to get the app working as intended (haven't gotten that far yet).

Update:  Once I got to adding dates to the app for shots/vaccines I got an error mossage.  The app is also run in dev mode by default which would be something worth looking into.  Errors in production should be caught and handled elegantly if you can.  This is something I'm still learning so no sweat.

## Dev Dependencies
Anything that isn't required to build the app (anything that your app isn't using as a package to function) should be put in your dev dependencies with
`npm i -D dev-dependency` or `yarn add -D devvv-packageeeeeee`.  PS yarn is awesome and doesn't take very long to set up. [yarn vs. npm](https://www.sitepoint.com/yarn-vs-npm/) (That seems like an outdated article but it hit the main points).

## Registration
Just saw that if you move the curser to fix a number in the phone number section of the registration, the curser jumps around a little unpredictably.  A nit; not mission critical so not a big deal.

I was able to create an account and log in!

## UI
I'm not sure what I'm supposed to do in the reminders or add owner section or what the purpose of the app is.  A landing page would be great with an option to log in once you get an idea of what you can do with the app.  I didn't have one for my solo project within two weeks and honestly that's an insanely short amount of time to create something so no worries there either.

There are react packages that handle browser history navigation (like clicking the back and forward buttons).  I don't know what they are off the top of my head and I don't think I've implemented them myself.  Something that a more senior dev would probably have dealt with that you would be able to glean after seeing it in action.  Alternatively, a rabbit hole worth diving into if you are more interested in frontend!

## Backend
Routes should be organized by resource rather than by what you're doing with the resource.  For example, you can have a pets.router.js (or just pets.js since you're already in the routes folder) that has all of the CRUD operations as separate functions.  Router.post will addPet, Router.get with getPet, Router.put will update, and Router.delete will delete.  I think its pretty common to have all of these in the same file unless the file gets huge.  For resource management you shouldn't have a problem making that happen.

Middleware you put in your main server app don't have to be put in your routers (body parser, etc).  Your app essentially is a loop that each of your requests to the server go to -- a request will fall down through that middleware to get to your route, so redeclaring it in the router file and having it fall through again only serves to potentially reconfigure the middleware if it isn't the same as in the server.js / main express file.

I put some object deconstruction changes in when I thought I may have more to point out in terms of shortcuts, but I think you're more up to speed with you js development than I am judging by the structure.

I'd take out the comments denoting the end of function too. Once you've read some code your eyes find this pretty automatically if you use consistent spacing and indentation.

Take out your console logs in production.  Another nit; users aren't going to be bothered by server logs, but once you start logging to a service anything unnecessary you leave in will start to bug you/ could reveal too much about your app if anyone ends up getting access to the logs.  Leave them in while you're developing but take them out in production.  Take out anything that has the potential to log anything sensitive.

You can do something like:
``` javascript
if (process.env.ENVIRONMENT_NAME === 'dev') {
  console.log('bugs route hit');
}
```
to prevent things from being logged in production

## gitignore
Nice!  You're using a default template to prevent the standard things from being committed.  A great habit to form.  Long gitignore files don't cost anything so I like covering my bases if I find a template.

## ALL IN ALL, LOOKIN GOOD!


