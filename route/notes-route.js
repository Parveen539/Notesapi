const express = require('express');
const { getNote, createNote, updateNote, deleteNote } = require('../controller/notes-controller');
const auth = require('../middleware/auth');

const notesRouter = express.Router();

notesRouter.get('/', auth, getNote);

notesRouter.post('/', auth, createNote);

notesRouter.put('/:id', auth, updateNote);

notesRouter.delete('/:id', auth, deleteNote);

module.exports = notesRouter;