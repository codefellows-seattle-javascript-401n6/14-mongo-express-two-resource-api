# MongoDB RESTful API

**Author** : Rafael Malave

## Overview

This is a RESTful API that utilizes the MongoDB database that supports storing data
with subdocuments.

## Getting started

Clone this repository to your local computer. Run `npm install` to install the necessary packages. Start the server with npm start and start mongodb on your local machine with `mongod`. run the tests by running `npm test`.

To manually send requests, use [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).

## HTTP Methods

This RESTfull HTTP server allows for the creation of car Brands resource with cars as subdocuments of each brand. 

- POST endpoint `/api/owners` Suppoerted fields: `name` (string, required) cars(array of car objects); 

- GET endpoints `/api/owners` and `/api/owner/:id`

- PUT `/api/owner/:id` send a valid json object with the data to be updated for the selected brand

- DELTE `/api/owner/id` delete the required record from the database.

## Technologies

- Nodejs
- Express
- npm
- MongoDB




