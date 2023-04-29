import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoute } from './handles/user.handel';
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', async (_req, res) => {
  res.send('api-new projact...');
});
app.use(
  cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',

    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  })
);
userRoute(app);
app.listen(port, () => {
  console.log(`Your server starting on --> http://localhost:${port}`);
});
/*for start (npm run dev)*/
export default app;
console.log();
