require("dotenv").config();
console.log("My Database URL is:", process.env.DATABASE_URL);
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const app = express();
const port = 3000;

app.use(express.json());


const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const res = await pool.query("SELECT COUNT(*) FROM tasks");
  if (parseInt(res.rows[0].count, 10) === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done) VALUES 
      ('Buy groceries', false),
      ('Learn Postgres', false),
      ('Complete assignment', false)
    `);
  }
}

initDb();

// Serve Swagger UI for API documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Converts a raw SQLite row into an API task object
function rowToTask(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    done: Boolean(row.done), // converts 0 -> false, 1 -> true
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// GET /tasks - Supports ?search=milk, ?done=true/false, and ?sort=title
app.get("/tasks", async (req, res) => {
  const { search, done, sort } = req.query;
  let query = "SELECT * FROM tasks";
  const conditions = [];
  const params = [];

  if (search && search.trim() !== "") {
    params.push(`%${search.trim()}%`);
    conditions.push(`title ILIKE $${params.length}`); // ILIKE = case-insensitive search
  }

  if (done !== undefined) {
    params.push(done === "true"); // Passes actual boolean
    conditions.push(`done = $${params.length}`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += sort === "title" ? " ORDER BY title ASC" : " ORDER BY id ASC";

  const result = await pool.query(query, params);
  res.json(result.rows); // Postgres rows natively formatted
});

// GET /stats - Returns task counts directly from SQLite aggregate functions
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(result.rows[0]);
});

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks", "/stats", "/reset"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// POST /tasks - Insert new task into DB
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const result = await pool.query(
    "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
    [title.trim(), false]
  );

  res.status(201).json(result.rows[0]);
});

// PUT /tasks/:id - Update task in DB
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  const existing = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  if (existing.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTitle = title !== undefined && title.trim() !== "" ? title.trim() : existing.rows[0].title;
  const updatedDone = done !== undefined ? done : existing.rows[0].done;

  const result = await pool.query(
    "UPDATE tasks SET title = $1, done = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
    [updatedTitle, updatedDone, id]
  );

  res.json(result.rows[0]);
});
// DELETE /tasks/:id - Delete task from DB
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
