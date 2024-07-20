# Todo Application

A Todo application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v16 or later)

## Setup

### 1. Clone the Repository

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/codespike9/Todo.git
cd Todo
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the following configuration settings:

```

DATABASE_NAME='database_name'
DBURI = 'your_mongodb_connection_string'
PORT=8001
CORS_ORIGIN='*'
JWT_SECRET=your_jwt_secret //example=876
JWT_EXPIRE=4d
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret.

Example of `.env` file:

```
DATABASE_NAME=Todo
PORT=8001
CORS_ORIGIN='*'
DBURI=mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net
JWT_SECRET=SecretKey
JWT_EXPIRE=4d
```

### 4. Configure Environment variables for testing

Create a `.env.tests` file in the project root and add the following configuration settings:

```

MONGOURI_TODO=`your_mongodb_connection_string/todo_test`
MONGOURI_AUTH=`your_mongodb_connection_string/todo_auth_test`
CORS_ORIGIN='*'
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=4d
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and JWT secret.

Example of `.env.tests` file:

```
MONGOURI_TODO=`mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/todo_test`
MONGOURI_AUTH=`mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/todo_auth_test`
CORS_ORIGIN='*'
JWT_SECRET=secretKey
JWT_EXPIRE=4d
```


### 5. Start the Server

Start the server with the following command:

```bash
npm run dev
```
The server should now be running on [http://localhost:8001](http://localhost:8001).

## API Documentation

API documentation is available at [http://localhost:8001/api-docs](http://localhost:8001/api-docs)

Application Documentation : [https://documenter.getpostman.com/view/29101734/2sA3kUGN2V](https://documenter.getpostman.com/view/29101734/2sA3kUGN2V)

## Running Test Cases

To run the test suite, use the following command:

```bash
npm test
```