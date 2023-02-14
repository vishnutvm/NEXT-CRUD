const Task = require('../models/task');

// Declare a route
module.exports = (app) => {
  // testing api
  app.get('/', async (request, reply) => {
    return { hello: 'Welcome' };
  });

  //   get all tasks
  app.get('/api/tasks', async (request, reply) => {
    console.log('Getting task working....');
    try {
      const tasks = await Task.find({});

      reply.code(200).send(tasks);
    } catch (e) {
      console.log(e);
      reply.code(500).send(e);
    }
  });

  //   add  tasks
  app.post('/api/task', async (request, reply) => {
    console.log('Adding task working');
    try {
      const task = request.body;
      const newTask = await Task.create(task);
      reply.code(201).send(newTask);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  //   get particular task
  app.get('/api/task/:id', async (request, reply) => {
    try {
      const taskId = request.params.id;
      const task = await Task.findById(taskId);
      reply.code(200).send(task);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  //   updating particular task
  app.put('/api/task/:id', async (request, reply) => {
    try {
      const taskId = request.params.id;
      const updates = request.body;
      await Task.findByIdAndUpdate(taskId, updates);

      const updatedTask = await Task.find({});
      reply.code(200).send({ data: updatedTask });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  //   deleting particular task
  app.delete('/api/task/:id', async (request, reply) => {
    try {
      const taskid = request.params.id;
      const deletingTask = await Task.findById(taskid);
      await Task.findByIdAndDelete(taskid);
      reply.code(200).send({ data: deletingTask });
    } catch (e) {
      reply.code(500).send(e);
    }
  });
};
