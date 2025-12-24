# Todo App

Full-stack Todo application built with **React**, **Node.js (Express)**, and **PostgreSQL**.  
Allows users to create, edit, complete, and delete tasks with a REST API backend.

---

## Project Goal

A full-featured task manager that can be extended with user accounts, authentication, and additional features.

---

## Architecture

### Frontend

- **React**
- Communicates with backend via HTTP (JSON)

### Backend

- **Node.js**
- **Express.js**
- REST API

### Database

- **PostgreSQL**
- Stores tasks and users

---

## Features

### Tasks

Each task has:

- `id`
- `title`
- `description` (optional)
- `completed`
- `created_at`
- `updated_at`

User can:

- Create, view, edit, and delete tasks
- Mark tasks as completed/uncompleted
- Filter tasks: All / Active / Completed

### Users (Optional)

- Registration
- Login / Authentication
- Logout

---

## API Endpoints

| Method | URL            | Description       |
| ------ | -------------- | ----------------- |
| POST   | /api/todos     | Create a new task |
| GET    | /api/todos     | Get all tasks     |
| GET    | /api/todos/:id | Get a single task |
| PUT    | /api/todos/:id | Update a task     |
| DELETE | /api/todos/:id | Delete a task     |

> If authentication is implemented, tasks will be linked to `user_id`.

---

## Database Schema

### `todos` Table

- `id` (PK)
- `title`
- `description`
- `completed`
- `user_id` (optional)
- `created_at`
- `updated_at`

### `users` Table (Optional)

- `id`
- `email`
- `password_hash`
- `created_at`

---

## Frontend Components

- `TodoList`
- `TodoItem`
- `TodoForm`
- `Filter`
- `Login / Register` (if auth is implemented)

### UI Requirements

- Display task list
- Task creation form
- Buttons: Complete / Edit / Delete
- Indicate completed tasks

---

## Optional Enhancements

- JWT Authentication
- Pagination
- Task search
- Drag & Drop
- Dark mode
- Docker

---

## Scripts

- `npm start` — run in development mode
- `npm build` — compile TypeScript
- `npm serve` — run compiled production version

---

## License

MIT
