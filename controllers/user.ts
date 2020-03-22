import express from 'express';
import  {User} from '../models/User';
const router = express.Router();
router.post('/user', (req, res) => {
  const {username, password } = req.body;
  User.create({
    username,
    password
  })
    .then(user => {
      res.json(user);
    });
});
router.get('/users', (req, res) => {
  User.findAll()
    .then(data => {
      res.json(data);
    });
});

export default router;