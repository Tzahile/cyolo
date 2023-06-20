const express = require('express');
const app = express();

const fileRouter = require('./routes/file');
app.use('/v1', fileRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});