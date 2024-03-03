# Santa app with Express

This project was bootstrapped with:
 - [Express](https://github.com/expressjs).
 - [Axios](https://github.com/axios/axios).
 - [nodemailer](https://github.com/nodemailer/nodemailer)
 - [nodemon](https://github.com/remy/nodemon). (dev purpose)
 
## Feature
Levaring **ts-node** to use typescript in a NodeJS environment without having to compile first.
User data is retrieved as JSON using the **Axios** library, with responses cached for 15 minutes to enhance performance.

SMTP credentials are provided from the .env

## Available Scripts

In the project directory, you can run:

```npm start```
Run an express backend server on port 3000

```npm dev```
In development mode, the server automatically restarts whenever changes are made to the source code, thanks to the use of Nodemon.


