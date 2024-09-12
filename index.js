const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8888;
const routerV1 = require('./src/routes/v1');
const globalError = require('./src/error/globalError');
const cookieParser = require('cookie-parser');
const mongooseConnect = require('./src/database/mongooseConnect');
const cors = require('cors');
const logger = require('./src/middleware/logger');

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://mini-store-nine.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(routerV1);
app.use(logger);
app.use(globalError);

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Server health is fine' });
});
app.get('/', (_, res) => {
  res.status(200).json({ message: 'Server is working fine' });
});

mongooseConnect(process.env.URI)
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
