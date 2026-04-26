const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory store (replace with a DB for persistence across restarts)
let notes = [];
let nextId = 1;

// GET /notes - list all notes
app.get("/notes", (req, res) => {
    res.json(notes);
});

// GET /notes/:id - get a single note
app.get("/notes/:id", (req, res) => {
    const note = notes.find((n) => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
});

// POST /notes - create a note
app.post("/notes", (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ error: "title and body are required" });
    }
    const note = { id: nextId++, title, body, createdAt: new Date().toISOString() };
    notes.push(note);
    res.status(201).json(note);
});

// PUT /notes/:id - update a note
app.put("/notes/:id", (req, res) => {
    const idx = notes.findIndex((n) => n.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: "Note not found" });
    const { title, body } = req.body;
    notes[idx] = { ...notes[idx], ...(title && { title }), ...(body && { body }) };
    res.json(notes[idx]);
});

// DELETE /notes/:id - delete a note
app.delete("/notes/:id", (req, res) => {
    const idx = notes.findIndex((n) => n.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: "Note not found" });
    notes.splice(idx, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Notes API running on port ${PORT}`));