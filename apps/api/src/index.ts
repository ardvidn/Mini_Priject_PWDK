import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import apiRouter from './common/api.router';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(` [API] -> http://localhost:${PORT}`);
});
