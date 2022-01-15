# Nursery Rhymes API

API bringing you all the banging nursery rhymes of your childhood.

The datasource for this API lives in `rhymes.json` and we are using it as our in memory data storage.

## Getting started

To use this API on your local environment you will need to complete the following steps:

### Environment Variables

- Rename the `.env.example` to `.env`. The variable in this file is the relative path to `rhymes.json` in this repo.

**NOTE** you must not commit your `.env` file to git.

### Installing Dependencies

- To install all the dependencies required for this project run `npm install`

### Starting the application

- To start the application run `npm start`

## Available Endpoints

Below is the documentation for this API. We can put it on our static HTML page for our users (the consumers of this API) to use as documentation so they know how to use this API.

| Method | URL | Description | Example URL | Request Body | Status Code | Response Body |
|---|---|---|---|---|---|---|
| `GET` | `/`| Returns a static HTML file `index.html`. It should be used to share the dumentation of  | `http://localhost:8080/` | | 200 | HTML page|
|`GET` | `/rhymes` | Return all rhymes from the `rhymes.json` file  | `http://localhost:8080/rhymes` | | 200 | `[{ "id": 1, "rhyme": "The wheels on the bus" },{ "id": 2, "rhyme": "Heads, shoulders, knees and toes" },{ "id": 2, "rhyme": "Hickory Dickory dock" }, {...}, {...} ]` |
| `GET` | `/rhymes/:id` | Return a specific rhyme with the corresponding `id` | `http://localhost:8080/rhymes/5` | | 200 or 404 if id not found | `{"id": 2,"rhyme":"Heads, shoulders, knees and toes"}` |
| `POST`* | `/rhymes` | Add a new rhyme to the rhyme list | `http://localhost:8080/rhymes` | `{'id': 8, 'rhyme':'Twinkle twinkle little star'}` | 201 (Created), 400 if incorrect data submitted| |
| `DELETE` | `rhymes/:id` | Deletes a rhyme by `id` |`http://localhost:8080/rhymes/5` | | 200 (OK) | |
