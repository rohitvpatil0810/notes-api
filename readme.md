# 📝Notes API

A simple RESTful API for note-taking, built with Node.js, Express.js, and MongoDB. The API provides CRUD operations for managing text notes with data validation and error handling.

## 📦Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rohitvpatil0810/notes-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd notes-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## 🚀Usage

### Running in Development

Start the server in development mode with nodemon:

```bash
npm run dev
```

## Running in Production

### Start the server in production mode:

```bash
npm start
```

## 🚥API Endpoints

### Create Note

- **Endpoint:** `POST /api/notes`
- **Body:** JSON with `title` and `content`
- **Auth:** Basic Authentication
- **Possible Response Codes:**
  - 201: Successfully created a new note
  - 400: Validation error if `title` is missing
  - 401: Unauthorized if Basic Authentication fails
  - 500: Internal Server Error if there's an issue on the server

### Retrieve Notes

- **Endpoint:** `GET /api/notes`
- **Auth:** Basic Authentication
- **Possible Response Codes:**
  - 200: Successfully retrieved all notes
  - 401: Unauthorized if Basic Authentication fails
  - 500: Internal Server Error if there's an issue on the server

### Retrieve Single Note by ID

- **Endpoint:** `GET /api/notes/:id`
- **Auth:** Basic Authentication
- **Possible Response Codes:**
  - 200: Successfully retrieved a single note
  - 404: Not Found if the note with the given ID does not exist
  - 401: Unauthorized if Basic Authentication fails
  - 500: Internal Server Error if there's an issue on the server

### Update Note

- **Endpoint:** `PUT /api/notes/:id`
- **Body:** JSON with updated `title` and `content`
- **Auth:** Basic Authentication
- **Possible Response Codes:**
  - 200: Successfully updated an existing note
  - 404: Not Found if the note with the given ID does not exist
  - 401: Unauthorized if Basic Authentication fails
  - 500: Internal Server Error if there's an issue on the server

### Delete Note

- **Endpoint:** `DELETE /api/notes/:id`
- **Auth:** Basic Authentication
- **Possible Response Codes:**
  - 200: Successfully deleted an existing note
  - 404: Not Found if the note with the given ID does not exist
  - 401: Unauthorized if Basic Authentication fails
  - 500: Internal Server Error if there's an issue on the server
    S

## ⚙️Environment Variables

Set the following environment variables in a `.env` file:

- `PORT`: Port number for the server.
- `MONGODB_URI`: MongoDB connection URI.
- `SECRET_KEY`: Secret key for Basic Authentication.

Example `.env` file:

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes
SECRET_KEY=my_secret_key
```

## 🧪Testing

To run tests for the project, use the following command:

```bash
npm test
```

**Developed by Rohit Patil | [GitHub](https://github.com/rohitvpatil0810)**

Feel free to customize it further based on your project's specific needs!
