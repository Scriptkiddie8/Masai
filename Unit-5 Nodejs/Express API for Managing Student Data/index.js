const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const { nanoid } = require("nanoid");

const app = express();
const port = 3000;

app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

(async () => {
  await db.read();
  db.data ||= { students: [] };
  await db.write();
})();

app.post("/students", async (req, res) => {
  const { name, course, batch } = req.body;
  const newStudent = {
    id: nanoid(),
    name,
    course,
    batch,
  };
  db.data.students.push(newStudent);
  await db.write();
  res.status(201).json(newStudent);
});

app.get("/students", async (req, res) => {
  await db.read();
  res.json(db.data.students);
});

app.get("/students/:id", async (req, res) => {
  await db.read();
  const student = db.data.students.find((s) => s.id === req.params.id);
  if (student) res.json(student);
  else res.status(404).json({ message: "No students found" });
});

app.put("/students/:id", async (req, res) => {
  await db.read();
  const student = db.data.students.find((s) => s.id === req.params.id);
  if (student) {
    Object.assign(student, req.body);
    await db.write();
    res.json(student);
  } else {
    res.status(404).json({ message: "No students found" });
  }
});

app.delete("/students/:id", async (req, res) => {
  await db.read();
  const index = db.data.students.findIndex((s) => s.id === req.params.id);
  if (index !== -1) {
    db.data.students.splice(index, 1);
    await db.write();
    res.json({ message: "Student deleted" });
  } else {
    res.status(404).json({ message: "No students found" });
  }
});

app.get("/students/search", async (req, res) => {
  const { course } = req.query;
  await db.read();
  const students = db.data.students.filter((s) => s.course === course);
  if (students.length > 0) {
    res.json(students);
  } else {
    res.status(404).json({ message: "No students found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
