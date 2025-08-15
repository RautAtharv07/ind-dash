// src/services/mockDataService.js
const generateMockTasks = () => {
  const priorities = ['high', 'medium', 'low'];
  const statuses = ['pending', 'in-progress', 'completed'];
  const assignees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];
  const projects = ['Website Redesign', 'Mobile App', 'Marketing Campaign', 'Product Launch'];
  
  const tasks = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const daysOffset = Math.floor(Math.random() * 30) - 10; // -10 to 20 days
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + daysOffset);
    
    tasks.push({
      id: `task-${i}`,
      title: `Task ${i}: ${['Fix', 'Implement', 'Review', 'Update', 'Create'][i % 5]} ${['header', 'API', 'design', 'content', 'bug'][i % 5]}`,
      description: `This is a detailed description for task ${i}. It explains what needs to be done and any special requirements.`,
      dueDate: dueDate.toISOString().split('T')[0],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      project: projects[Math.floor(Math.random() * projects.length)],
      createdAt: new Date().toISOString()
    });
  }
  
  return tasks;
};

const mockTasks = generateMockTasks();

// Simulate API calls with delays
export const fetchTasks = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockTasks), 500);
  });
};

export const updateTaskStatus = async (taskId, newStatus) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const taskIndex = mockTasks.findIndex(t => t.id === taskId);
      if (taskIndex >= 0) {
        mockTasks[taskIndex].status = newStatus;
        resolve(mockTasks[taskIndex]);
      }
      resolve(null);
    }, 300);
  });
};

export const fetchTasksByFilter = async (filter) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      let filteredTasks = [...mockTasks];
      
      switch(filter) {
        case 'today':
          filteredTasks = filteredTasks.filter(task => task.dueDate === today);
          break;
        case 'week':
          filteredTasks = filteredTasks.filter(task => 
            new Date(task.dueDate) <= nextWeek && 
            new Date(task.dueDate) >= new Date()
          );
          break;
        case 'overdue':
          filteredTasks = filteredTasks.filter(task => new Date(task.dueDate) < new Date(today));
          break;
        case 'high':
        case 'medium':
        case 'low':
          filteredTasks = filteredTasks.filter(task => task.priority === filter);
          break;
      }
      
      resolve(filteredTasks);
    }, 400);
  });
};