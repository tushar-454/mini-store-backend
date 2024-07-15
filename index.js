const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 8888;
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ message: 'Server health is fine' });
});
app.get('/', (_, res) => {
  res.json({ message: 'Server is working fine' });
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    app.listen(port, () => {
      console.log(`Server is running on  http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
