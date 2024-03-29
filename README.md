
# Overview
This application is a form that allows children to send a letter (in the form of an email, to be eco-friendly) to Santa Claus. 
Input validation is performed on both the frontend and backend. 
Success or error messages are displayed according to the success of a request. 
A batch of letters is sent every 15 seconds from the backend.

## Notes to the reviewer
Glitch does not support a Node version higher than 16, and pnpm is not well-maintained. Initially, I attempted to set up a pnpm monorepo, but Glitch was unable to make it work. As a result, I reverted to a simpler setup to ensure compatibility with Glitch, although I would not choose this approach for a real-life project.

There are a total of 3 subrepository: 
- The **server** located under _/server_ 
- The **ui** located under _/ui_
- The **types** including types and typeguards located under _/types_

They have their own **README.md** file
For the backend, I leverage a regular express server
For the UI side, I have adopted React + Tailwindcss (for the fun)

The build generated from the UI is under /dist at the root of the project and served from the server

My Ethereal username password are defined in /server/.env

The source code is available on my gitub repository: [santa-react](https://github.com/tailwindlabs/tailwindcss).

Time worked on the project: around 15 hours. 

## Get started

```npm install```
Install all node_modules for root / types / ui / server

```npm build```
Build ui into /dist

```npm start```
Run the server serving ui build from /dist

## Improvement
 - Make this project a monorepo including packages/server and packages/ui
 - Have a common tsconfig file to be imported from both packages's tsconfig, keeping their own settings
 - Setup prettier and eslint
 - Setup authentication
 - Leverage husky and github hooks
 - among others..





# IMPORTANT! READ before starting

By default for anonymous users (non logged in), your code and app will only remain on glitch.com for 5 days.
In order to not lose your challenge, please create a glitch.com account and log in to glitch.com before proceeding.

The following README contains instructions to guide you through the coding challenge, please read them carefully.

# JS coding challenge:

## How to create and submit your app using glitch

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: https://glitch.com/~js-santa-app and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste). This is your URL to code on, no other candidates will have this URL.

3. **Code**: You can edit the code directly in the Glitch editor or use your editor of choice (VSCode, Sublime, etc) and copy paste the files into Glitch. Git import and export is also available in the Tools menu on the bottom left. How you edit the code is entirely up to you, so long as your finished work is viewable at the URL created in the previous step.

> **NOTE**: Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

4. **Turn in**: When you finish coding, send your URL to us so we can review your code.

## Objectives overview:

The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:

1.  that the child is registered
2.  that the child is less than 10 years old.
    To this purpose, the server can fetch user and profiles data in JSON format from:

- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:

- child username (eg. charlie.brown)
- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
- request free text as was input in the form

Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

## Tips and detailed instructions:

- Somebody started to work on the app, but left it unfinished and did not use any modern technology. We added React for you to have a clean base but feel free to use any other technology you might prefer.
- The UI and UX of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- You should fetch the JSON data at every form submission (consider it as an API).
- For the sake of the challenge, you can keep the requests in-memory only.
- You are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console).
- To get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
  This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
  Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.

## Some things we will look for in your submission

- Code quality (readability, use of modern syntax...)
- Does the app work as designed (cf. objectives overview)
- App architecture (folder structure, configuration management...)
- Documentation (why did you choose to change or add a package...)

## Tips on usage of glitch

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.
When your app is running, you can access logs and console using the "Tools" button at the bottom left.
