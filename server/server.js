const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 7777;
const indexRouter = require('./routes');
require('./connection');

app.use((req, res, next) => { // custom logger
  console.info(`Method: ${req.method} URL: ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.info(`Server is listening on HTTP://localhost:${PORT}`);
});
