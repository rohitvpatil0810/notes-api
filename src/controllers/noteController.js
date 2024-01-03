const Note = require("../models/Note");
const { validationResult } = require("express-validator");
const { handleError, handleNotFound } = require("../utils/errorHandlers");

const successResponse = (res, data, status = 200) => {
  res.status(status).json(data);
};

// Create Note
exports.createNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    successResponse(res, savedNote, 201); // 201 Created
  } catch (error) {
    handleError(res, error);
  }
};

// Retrieve All Notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    successResponse(res, notes);
  } catch (error) {
    handleError(res, error);
  }
};

// Retrieve Single Note by ID
exports.getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      handleNotFound(res, note);
      return;
    }

    successResponse(res, note);
  } catch (error) {
    handleError(res, error);
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!note) {
      handleNotFound(res, note);
      return;
    }

    successResponse(res, note);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      handleNotFound(res, note);
      return;
    }

    successResponse(res, { message: "Note deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
