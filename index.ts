require('dotenv').config();
import express from 'express';
import router from './controllers/user';
const app = express();
app.use(express.json());
app.use('/api', router);
const port = process.env.PORT || 3003;
app.listen(port, ()=> {
  console.log('Server listening on port ' + port);
});