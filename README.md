# MongoDB Atlas Connection Lab

A simple Node.js and Express application demonstrating how to securely connect an application to a MongoDB Atlas database using the MongoDB Node.js driver and environment variables.

## Technologies

- Node.js
- Express
- MongoDB
- MongoDB Atlas
- dotenv

## Features

- Connects an Express application to MongoDB Atlas
- Stores the MongoDB connection URI in an environment variable
- Tests the database connection through a GET route
- Returns JSON responses for successful and failed connections
- Handles database connection errors
- Uses environment variables to configure the application

## Installation

Install the project dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3005
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the server:

```bash
npm start
```

The application will run at:

```text
http://localhost:3005
```

## Endpoint

### GET /

Tests the connection to MongoDB Atlas.

Successful response:

```json
{
  "message": "Successfully connected to the database!"
}
```

If the database connection fails:

```json
{
  "message": "Failed to connect to the database."
}
```

The failed request returns HTTP status code `500`.

## Environment Variables

Sensitive database information is stored in `.env`.

The `.env` file and `node_modules/` directory are excluded from Git using `.gitignore`.

## Reflection Questions

### 1. Why is it important to whitelist IP addresses in a real-world production environment?

Whitelisting IP addresses limits which computers or servers can attempt to connect to the database. Allowing connections from `0.0.0.0/0` allows connection attempts from anywhere on the internet, increasing the risk of unauthorized access if database credentials are compromised.

### 2. What is the purpose of dotenv?

`dotenv` loads values from a `.env` file into `process.env`. This allows sensitive configuration such as database credentials to be kept outside the application's source code.

In production, environment variables can instead be configured through the application's cloud hosting provider or another secrets-management system.

### 3. What would you check if the application failed to connect?

I would first:

1. Check that `MONGO_URI` exists in the `.env` file.
2. Verify that dotenv loaded the environment variable.
3. Check the MongoDB connection string and database credentials.
4. Check MongoDB Atlas Network Access settings.
5. Read the server error to identify the specific connection problem.
6. Check DNS or network connectivity if the application cannot resolve the Atlas cluster.

During development of this project, a DNS SRV lookup issue prevented Node.js from resolving the MongoDB Atlas cluster even though the cluster itself was available. Testing DNS separately helped isolate the problem from the Express and MongoDB application code.