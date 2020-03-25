require('dotenv').config();
import express from 'express';
import userRouter from './controllers/user';
import postRouter from './controllers/post';
const app = express();
app.use(express.json());
app.use('/api', userRouter, postRouter);
const port = process.env.PORT || 3003;
app.listen(port, ()=> {
  console.log('Server listening on port ' + port);
});