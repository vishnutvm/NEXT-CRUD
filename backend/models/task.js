const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskScheme = new Schema({
  task: { type: String, unique: true, required: true },
});

const Task = mongoose.model('task', taskScheme);

module.exports = Task;
