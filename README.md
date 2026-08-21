
# Task Management API · Auth & Protected Routes

A secure, containerized REST API built with **Node.js / Express**, **PostgreSQL**, and **Supabase Auth**, orchestrated using **Docker Compose**.

---

## 🚀 Quick Start (One-Command Setup)

Launch the entire stack (API server + PostgreSQL database) with a single command.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* Git installed.

### Instructions

1. **Clone the repository:**
```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_FOLDER>

```

2. **Set up Environment Variables:**
Copy the example environment file to create your local `.env` file:
```bash
cp .env.example .env

```


Open `.env` and fill in your Supabase credentials (`SUPABASE_URL` and `SUPABASE_KEY`) alongside your Postgres configuration.
3. **Start the Stack:**
Run the application using Docker Compose:
```bash
docker compose up --build

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

The application reads configuration settings from the `.env` file. Below are the variables configured in `.env.example`:

| Variable | Description | Example / Default |
| --- | --- | --- |
| `PORT` | Port the Express API server listens on | `3000` |
| `DATABASE_URL` | Connection string for PostgreSQL container | `postgres://postgres:dev@db:5432/tasks` |
| `SUPABASE_URL` | Supabase Project URL (Base URL) | `https://your-project.supabase.co` |
| `SUPABASE_KEY` | Supabase Public Anon API Key | `eyJhbGciOiJIUzI1NiIsIn...` |

---

## 📚 API Reference Table

| Endpoint | Method | Auth Required | Description | Success Status |
| --- | --- | --- | --- | --- |
| `/public/info` | GET | No | Public unauthenticated lobby info | 200 OK |
| `/auth/signup` | POST | No | Register a new user with email & password | 201 Created |
| `/auth/login` | POST | No | Authenticate user & return JWT tokens | 200 OK |
| `/auth/logout` | POST | Yes (`Bearer`) | Terminate current user session | 204 No Content |
| `/protected/profile` | GET | Yes (`Bearer`) | Retrieve authenticated user metadata | 200 OK |
| `/protected/dashboard` | GET | Yes (`Bearer`) | Access secure user dashboard | 200 OK |


---

## 🧪 Sample Request (`curl`)

Here is an example `curl` command testing the public info endpoint:

```bash
curl -i http://localhost:3000/public/info

```

### Example Response Output:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 48
Date: Fri, 21 Aug 2026 18:00:00 GMT
Connection: keep-alive

{"message":"Welcome stranger! This info is public."}

```

---

## 🔒 Understanding 401 Unauthorized vs. 403 Forbidden

Access control is split distinctly into identity and permissions:

* **`401 Unauthorized` ("I don't know who you are")**: Triggered when a client hits a protected route without providing a valid Bearer token, or when the token is missing, expired, or tampered with.
* **`403 Forbidden` ("I know who you are, but you aren't allowed here")**: Triggered when a request comes from a fully authenticated, verified user who lacks the specific administrative roles or permissions required to view the requested resource.

---

## 💾 Swagger UI & Authentication Flow

Swagger UI is served at `/docs`. Once authorized via the green **Authorize** padlock button using a JWT `access_token` from `/auth/login`, you can test all endpoints directly in the browser.

### Swagger UI Documentation Screenshot
<img width="1907" height="864" alt="image" src="https://github.com/user-attachments/assets/0501e3a2-4c1d-43ea-8692-1b302da44815" />


Below is the interactive documentation showing each auth-related endpoint:

#### Auth Endpoints Breakdown in Swagger UI:

1. **User Signup (`POST /auth/signup`)**: Registers a new user account with email and password parameters.
<img width="1452" height="787" alt="image" src="https://github.com/user-attachments/assets/037faf3b-3b71-4a69-9f49-e54452125ef1" />

2. **User Login (`POST /auth/login`)**: Authenticates credentials and returns session tokens (`access_token` and `refresh_token`).
<img width="1449" height="705" alt="image" src="https://github.com/user-attachments/assets/3e6fa822-7179-4496-8f1c-6ae8180515f9" />

3. **Public Info (`GET /public/info`)**:
<img width="1791" height="902" alt="image" src="https://github.com/user-attachments/assets/2a18c2f9-db7b-4048-8e5a-0fe37aa1d465" />

4. **Get User Profile (`GET /protected/profile`)**: Protected endpoint requiring a Bearer token to inspect account metadata.
<img width="1441" height="760" alt="image" src="https://github.com/user-attachments/assets/b66f07ea-0708-4281-8a19-1b6c1ee03024" />

5. **Log Out (`POST /auth/logout`)**: Protected endpoint that terminates the current user session.
<img width="1483" height="852" alt="image" src="https://github.com/user-attachments/assets/68febeb5-f54e-4ce7-8e63-282dd5e24289" />
