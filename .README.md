## Introduction

This is a Car Rental Reservation System management backend api creation project, which is using Mongoose for MongoDB interaction and Node.js for server, also used TypeScript.

## Features

-CRUD Operation
-Authentication with Jwt
-Data Validation with Zod
-Error Handling
-Configurable via environment variables.

## Steps

1. Clone the Repository --- https://github.com/keyamoni05866/carRental-reservation-system-server-with-mongoose
2. Install Dependencies. --- npm install
3. Set up the Env variables:<br>

- Create a .env file in the root directory.
- Add the following environment variables:<br>
  PORT=5000<br>
  DATABASE_URL= The connection string for your MongoDB database.
  BCRYPT_SALT_ROUND=use round for password bcrypt
  JWT_ACCESS_SECRET=use your secret
  JWT_ACCESS_EXPIRES_IN= use expiration time
  JWT_REFRESH_SECRET=use refresh secret
  JWT_REFRESH_EXPIRES_IN=use expire time

## Running the server

-in package.json file there is 2 scripts for run the server.example:<br>

- start:prod(this is for javascript file ).
- start:dev(this is for typescript file).

## Live Link-

https://car-rental-reservatin-system.vercel.app/
