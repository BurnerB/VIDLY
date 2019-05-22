### STORE-AP(Node.JS App -Express for practice)
#### Video store Management App

#### Endpoints covered
| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`api/genres`   |Create a Genre|
| GET           | `api/genres/<genre-id>`   |Get a specific genre|
| GET          | `api/genres` | Get all genres |
| PUT         | `api/genres/<genre-id>`    |Modify a genre|
| DELETE          | `api/genres/<genre-id`|delete a specific genre|
| POST          | `/api/customers`       |Create a customer|
| GET         | `/api/customers/<customer-Id>` |Get a specific customer|
| GET | `/api/customers`|get all customers|
| PUT  |`/api/customers<customer-Id>` |Modify a customer|
| DELETE          | `/api/customers<customer-Id>`|delete a specific customer|
| POST          | `/api/movies`      |create a movie|
| GET        | `/api/movies/<movie-Id>` |get a specific movie|
| PUT | `/api/movies/<movie-Id>` |Modify a Movie|
| Delete  |`/api/movies/<movie-Id>`  |Delete a movie|
| GET  |`/api/rentals`  |GET all rented movies|
| POST  |`/api/rentals/<rental-Id>`  |Add a movie to rentals|
| POST  |`/api/users`  |Create a User|
| POST  |`/api/users/auth`  |User Login|
| GET  |`/api/users/<user-Id>`  |Get  a User|

#### Tools Used
* Language: Javascript
* Server environment: Node.js 
* Back-end framework: Express 
* Testing library: Jest.js

### Getting Started
#### Setting up your system
Make sure you already have NPM installed in your system..
#### How to get started
After cloning this repository to your local machine,cd into the package folder using your terminal and run the following:

`> npm install`

t will install the node_modules which will help you run the project on your local machine.

#### Run the server
` npm start`

#### Run the tests
` npm test`
