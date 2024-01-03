const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { check } = require("express-validator");

// Create Note
router.post(
  "/notes",
  [
    check("title").isLength({ min: 1, max: 255 }),
    check("content").isLength({ min: 1 }),
  ],
  noteController.createNote
);

// Retrieve Notes
router.get("/notes", noteController.getAllNotes);

// Retrieve Single Note
router.get("/notes/:id", noteController.getNoteById);

// Update Note
router.put(
  "/notes/:id",
  [
    check("title").isLength({ min: 1, max: 255 }),
    check("content").isLength({ min: 1 }),
  ],
  noteController.updateNote
);

// Delete Note
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
