const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8888;
const routerV1 = require('./src/routes/v1');
const cookieParser = require('cookie-parser');
const mongooseConnect = require('./src/database/mongooseConnect');
const cors = require('cors');
const globalError = require('./src/error/globalError');

app.use(cookieParser());
app.use(express.json());
app.use(routerV1);
app.use(globalError);

app.get('/health', (_, res) => {
  res.json({ message: 'Server health is fine' });
});
app.get('/', (_, res) => {
  res.json({ message: 'Server is working fine' });
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
