import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

// Create a new task
router.post('/create', async (request, response) => {
  try {
    const { title, description } = request.body;

    // Validate title and description
    if (!title || !description) {
      return response.status(400).send({
        message: 'Title and description are required fields.',
      });
    }

    const newTask = {
      title,
      description,
      completed: false, // Initialize task as not completed
    };

    const task = await Task.create(newTask);
    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all tasks
router.get('/tasks', async (request, response) => {
  try {
    const tasks = await Task.find({});
    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Get a specific task by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);

    if (!task) {
      return response.status(404).send({ message: 'Task not found' });
    }

    return response.status(200).json(task);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Update task details
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description } = request.body;

    // Validate title and description
    if (!title || !description) {
      return response.status(400).send({
        message: 'Title and description are required fields.',
      });
    }

    const updatedTask = {
      title,
      description,
    };

    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    if (!task) {
      return response.status(404).send({ message: 'Task not found' });
    }

    return response.status(200).send({ message: 'Task updated successfully', task });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return response.status(404).json({ message: 'Task not found' });
    }

    return response.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Mark task as completed
router.patch('/:id/complete', async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);

    if (!task) {
      return response.status(404).send({ message: 'Task not found' });
    }

    if (task.completed) {
      return response.status(400).send({ message: 'Task is already completed' });
    }

    task.completed = true;
    await task.save();

    return response.status(200).send({ message: 'Task marked as completed', task });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
