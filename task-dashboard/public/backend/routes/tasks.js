// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get tasks with optional filtering
router.get('/', async (req, res) => {
  try {
    let query = {};
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    switch(req.query.filter) {
      case 'today':
        query.dueDate = today;
        break;
      case 'week':
        query.dueDate = { 
          $lte: nextWeek.toISOString().split('T')[0],
          $gte: today
        };
        break;
      case 'overdue':
        query.dueDate = { $lt: today };
        query.status = { $ne: 'completed' };
        break;
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.patch('/:id/status', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});