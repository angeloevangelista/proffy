import express from "express";

import routes from './routes';

const port = 3333;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.clear();
  console.log(`Server is running at http://127.0.0.1:${port}`);
});

app.use(routes);