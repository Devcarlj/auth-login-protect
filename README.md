

# `README.md`

```markdown
# Task Management API — Containerized Stack

[cite_start]A persistent, containerized REST API built with **Node.js / Express** and **PostgreSQL**, fully containerized using **Docker** and **Docker Compose**[cite: 1179].

---

## 🚀 Quick Start (One-Command Setup)

[cite_start]You can launch the entire stack (API server + PostgreSQL database) with a single command[cite: 1205].

### Prerequisites
* [cite_start][Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running[cite: 1205].
* Git installed.

### Instructions

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_FOLDER>

```

2. **Set up Environment Variables:**
Copy the example environment file to create your `.env` file:


```bash
cp .env.example .env

```


3. **Start the Stack:**
Run the application using Docker Compose:


```bash
docker compose up --build -d

```


4. **Verify It's Running:**
* **API Server:** [http://localhost:3000](http://localhost:3000)
* **Swagger UI Documentation:** [http://localhost:3000/docs](http://localhost:3000/docs)


5. **Stop the Stack:**
```bash
docker compose down

```



---

## 🔑 Environment Variables

The application reads configuration settings from the `.env` file. Below are the default values configured in `.env.example`:

| Variable | Description | Default Value |
| --- | --- | --- |
| `PORT` | Port the Express API server listens on | `3000` |
| `DB_HOST` | Database host service name in Docker | `db` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `tasks` |
| `DB_USER` | Database superuser username | `postgres` |
| `DB_PASSWORD` | Database user password | `dev` |

---

## 📚 API Endpoints

| Method | Endpoint | Description | Success Code |
| --- | --- | --- | --- |
| `GET` | `/` | API status health check | `200 OK` |
| `GET` | `/tasks` | Fetch all tasks | `200 OK` |
| `GET` | `/tasks/:id` | Fetch a single task by ID | `200 OK` |
| `POST` | `/tasks` | Create a new task (`title` required) | `201 Created` |
| `PUT` | `/tasks/:id` | Update an existing task (`title`, `done`) | `200 OK` |
| `DELETE` | `/tasks/:id` | Delete a task by ID | `204 No Content` |
| `GET` | `/docs` | Interactive Swagger API documentation | `200 OK` |

---

## 🧪 Sample Request (`curl`)

Here is an example `curl` request to verify the API server with headers and response status output:

```bash
curl -i http://localhost:3000/tasks

```

### Example Response Output:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 104
Date: Thu, 13 Aug 2026 21:00:00 GMT
Connection: keep-alive

[
  {
    "id": 1,
    "title": "Buy groceries",
    "done": false,
    "created_at": "2026-08-13T04:59:20.176Z",
    "updated_at": "2026-08-13T04:59:20.176Z"
  },
  {
    "id": 2,
    "title": "Learn Postgres",
    "done": false,
    "created_at": "2026-08-13T04:59:20.176Z",
    "updated_at": "2026-08-13T04:59:20.176Z"
  },
  {
    "id": 3,
    "title": "Complete assignment",
    "done": false,
    "created_at": "2026-08-13T04:59:20.176Z",
    "updated_at": "2026-08-13T04:59:20.176Z"
  }

```

---

## 💾 Database Verification & Persistence

### Screenshots

<img width="1919" height="1018" alt="Screenshot 2026-08-13 214013" src="https://github.com/user-attachments/assets/772dcbda-5d0b-4c61-bf10-900696188354" />


---

## 🛠️ Architecture & Technologies Used

* **Node.js & Express**: Web framework handling backend logic, input validation, and REST API routing.
* 
**PostgreSQL**: Relational database engine running in a separate Docker container.


* 
**Docker & Docker Compose**: Containerization tool managing multi-container service orchestration.


* **pg (node-postgres)**: PostgreSQL client driver for Node.js utilizing parameterized SQL queries to prevent SQL injection.

```

---

### [cite_start]Key Requirements Checklist Covered in this README[cite: 1205]:
1. [cite_start]**One command startup instructions** (`docker compose up`)[cite: 1205].
2. [cite_start]**Environment instructions** pointing at `.env.example`[cite: 1205].
3. [cite_start]**Table of all API endpoints**[cite: 1205].
4. [cite_start]**Pasted `curl -i` example** showing HTTP headers and JSON output[cite: 1205].
5. [cite_start]**Database verification screenshot section**[cite: 1205].

```