// Require the framework and instantiate it
const fastify = require('fastify');
const app = fastify();
const mongoose = require('mongoose');
const taskRouts = require('./routes/taskRouts');


app.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['POST,GET,PUT,DELETE'],
});
// setting db
//connected fastify to mongoose
try {
  mongoose.set('strictQuery', false);
  mongoose.connect(
    'mongodb+srv://crud:crud@cluster0.ryhi2wz.mongodb.net/?retryWrites=true&w=majority'
  );
} catch (e) {
  console.error(e);
}

// routes setup
taskRouts(app);

// Run the server!
app.listen(3001, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
