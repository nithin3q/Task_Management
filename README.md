# To-Do List Application

This is a simple To-Do List application built using **Node.js**, **Express**, and **MongoDB**. The application allows users to create, view, edit, and delete tasks, as well as mark tasks as completed.

## Depoyed Server Link

[link](https://task-management-nithin.onrender.com)

## Features

- **Create Tasks**: Add new tasks with a title and description.
- **View Tasks**: View a list of all tasks.
- **Edit Tasks**: Update the title and description of existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **Mark as Complete**: Mark tasks as completed and prevent re-marking.

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- [Node.js]
- [MongoDB]

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nithin3q/Task_Management.git
   ```
2. Install the required dependencies:

   ```
   npm install
   ```
3. Start the server:

   ```
   npm start
   ```
The application will start on `http://localhost:5000`.

## Usage

### Endpoints

The To-Do List API exposes several endpoints for task management:

- **Create a Task**
  
  `POST /create`
  
  - Request body (JSON):
  
    ```json
    {
      "title": "Task Title",
      "description": "Task Description"
    }
    ```
  - Response:
    - `201 Created`: Task created successfully.
    - `400 Bad Request`: Validation error, missing title or description.

- **Get All Tasks**
  
  `GET /tasks`
  
  - Response:
    - `200 OK`: Returns all tasks with task count.

- **Get Task by ID**
  
  `GET /:id`
  
  - Response:
    - `200 OK`: Returns the task for the given ID.
    - `404 Not Found`: Task with specified ID does not exist.

- **Update Task**
  
  `PUT /:id`
  
  - Request body (JSON):
  
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description"
    }
    ```
  - Response:
    - `200 OK`: Task updated successfully.
    - `404 Not Found`: Task with specified ID does not exist.

- **Delete Task**
  
  `DELETE /:id`
  
  - Response:
    - `200 OK`: Task deleted successfully.
    - `404 Not Found`: Task with specified ID does not exist.

- **Mark Task as Completed**
  
  `PATCH /:id/complete`
  
  - Response:
    - `200 OK`: Task marked as completed successfully.
    - `400 Bad Request`: Task is already completed.

---


## Available Endpoints

### 1. Create a Task

**Endpoint:**
- `POST /create`

**Request:**

```bash
curl -X POST http://localhost:5000/create \
-H "Content-Type: application/json" \
-d '{"title": "Sample Task", "description": "This is a test task"}'
```
### 2. GET All Tasks

```bash
curl -X GET http://localhost:5000/tasks
```

### 3. GET Task by ID

```bash
curl -X GET http://localhost:5000/:id
```

### 4. Update Task

```bash
curl -X PUT http://localhost:5000/:id \
-H "Content-Type: application/json" \
-d '{"title": "Updated Task", "description": "This task has been updated"}'
```

### 5. Delete Task

```bash
curl -X DELETE http://localhost:5000/:id
```

### 6. Mark Task as Completed

```bash
curl -X PATCH http://localhost:5000/:id/complete
```

### Models

- `taskModel.js`: Defines the **Task** schema with fields `title`, `description`, and `completed`. It also provides the necessary model methods to interact with the MongoDB database.

### Routes

- `taskRoutes.js`: Contains all the RESTful routes for task creation, retrieval, updating, deletion, and marking tasks as complete. Routes are structured as follows:
  - `POST /create`: Creates a new task.
  - `GET /tasks`: Fetches all tasks.
  - `GET /:id`: Retrieves a specific task by its ID.
  - `PUT /:id`: Updates a task by ID.
  - `DELETE /:id`: Deletes a task by ID.
  - `PATCH /:id/complete`: Marks a task as completed.

### Main Application (`index.js`)

This file initializes the Express application, connects to the MongoDB database using **Mongoose**, and sets up the task routes. Error handling and middleware (e.g., `body-parser`) are also defined here.

### Key Decisions

- **Task Completion Handling**: A separate route (`PATCH /:id/complete`) was created to handle marking tasks as completed. This allows for better separation of concerns, ensuring the task update functionality remains focused on editing title and description.
- **Error Handling**: All routes have error handling to return appropriate status codes and error messages. For example, missing task titles or attempts to re-mark tasks as completed are handled with `400` errors.
- **Validation**: Title and description validation is performed at the route level, ensuring that tasks are not created or updated with empty fields.

