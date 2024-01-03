const request = require("supertest");
const app = require("../app");
const Note = require("../src/models/Note");

const basicAuthCredentials = {
  username: "admin",
  password: "your_test_secret_key",
};

describe("Note API", () => {
  beforeEach(async () => {
    await Note.deleteMany({});
  });

  describe("POST /api/notes", () => {
    it("should create a new note", async () => {
      const noteData = { title: "Test Note", content: "This is a test note" };

      const res = await request(app)
        .post("/api/notes")
        .send(noteData)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        title: noteData.title,
        content: noteData.content,
      });
    });

    it("should return validation error if title is missing", async () => {
      const noteData = { content: "This is a test note" };

      const res = await request(app)
        .post("/api/notes")
        .send(noteData)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /api/notes", () => {
    it("should retrieve all notes", async () => {
      // Assuming some notes are created before the test
      const existingNotes = [
        { title: "Note 1", content: "Content 1" },
        { title: "Note 2", content: "Content 2" },
      ];
      await Note.create(existingNotes);

      const res = await request(app)
        .get("/api/notes")
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(existingNotes.length);
    });
  });

  describe("GET /api/notes/:id", () => {
    it("should retrieve a single note by ID", async () => {
      const newNote = await Note.create({
        title: "Test Note",
        content: "This is a test note",
      });

      const res = await request(app)
        .get(`/api/notes/${newNote._id}`)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toMatchObject({
        title: newNote.title,
        content: newNote.content,
      });
    });

    it("should return 404 if note is not found", async () => {
      const nonExistingId = "60cfeaeeb166a1372c61b3e3"; // A random non-existing ID

      const res = await request(app)
        .get(`/api/notes/${nonExistingId}`)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Not Found");
    });
  });

  describe("PUT /api/notes/:id", () => {
    it("should update an existing note", async () => {
      const existingNote = await Note.create({
        title: "Old Title",
        content: "Old Content",
      });
      const updatedData = { title: "New Title", content: "New Content" };

      const res = await request(app)
        .put(`/api/notes/${existingNote._id}`)
        .send(updatedData)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toMatchObject({
        title: updatedData.title,
        content: updatedData.content,
      });
    });

    it("should return 404 if note is not found", async () => {
      const nonExistingId = "60cfeaeeb166a1372c61b3e3"; // A random non-existing ID
      const updatedData = { title: "New Title", content: "New Content" };

      const res = await request(app)
        .put(`/api/notes/${nonExistingId}`)
        .send(updatedData)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Not Found");
    });
  });

  describe("DELETE /api/notes/:id", () => {
    it("should delete an existing note", async () => {
      const existingNote = await Note.create({
        title: "Test Note",
        content: "This is a test note",
      });

      const res = await request(app)
        .delete(`/api/notes/${existingNote._id}`)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Note deleted successfully");
    });

    it("should return 404 if note is not found", async () => {
      const nonExistingId = "60cfeaeeb166a1372c61b3e3"; // A random non-existing ID

      const res = await request(app)
        .delete(`/api/notes/${nonExistingId}`)
        .auth(basicAuthCredentials.username, basicAuthCredentials.password);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Not Found");
    });
  });
});
