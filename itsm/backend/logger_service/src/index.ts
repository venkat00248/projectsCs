import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/logsRoutes';
import { consumer } from './utils/kafka-consumer';

const app = express();
const port = 3002;

app.use(bodyParser.json());

app.use('/logger', router);

app.listen(port, async() => {
  console.log(`Server listening on port ${port}`);
  await consumer()
});
export default app;
