// src/services/taskService.js
const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return await response.json();
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await fetch(`${API_URL}/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status })
  });
  if (!response.ok) {
    throw new Error('Failed to update task status');
  }
  return await response.json();
};

export const fetchTasksByFilter = async (filter) => {
  const response = await fetch(`${API_URL}?filter=${filter}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filter} tasks`);
  }
  return await response.json();
};