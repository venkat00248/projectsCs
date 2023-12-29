import { Client, logger } from 'camunda-external-task-client-js';

// Configure the client
const config = {
  baseUrl: 'http://localhost:8080/engine-rest',
  use: logger
};

// Instantiate the client
const client = new Client(config);

// Subscribe to the "Review Task" external task
client.subscribe('ReviewTask', async function({ task, taskService }) {
  // Get variables from the task
  const { document } = task.variables;

  // Perform some processing (e.g., review the document)
  const approved = true;

  // Complete the task with the processing result
  await taskService.complete(task, { approved });
});

// Subscribe to the "Approval Task" external task
client.subscribe('ApprovalTask', async function({ task, taskService }) {
  // Get variables from the task
  const { approved } = task.variables;

  // Perform some processing based on approval status
  if (approved) {
    console.log('Document approved!');
    // Additional logic for approved document
  } else {
    console.log('Document rejected!');
    // Additional logic for rejected document
  }

  // Complete the task
  await taskService.complete(task);
});

// Start the client
client.start();
