import express from 'express';
import { User } from '../models/User';
import Bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({where: {
    username
  }});
  if(user){
    res.send('User already exists');
  }
  else {
    const hashedPassword = await Bcrypt.hash(password, 10);
    User.create({
      username,
      password: hashedPassword,
      createdAt: Date.now()
    })
      .then(user => {
        res.json(user);
      });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(!user){
    res.send('Invalid username or password');
  }
  else{
    Bcrypt.compare(password, user.password)
      .then(result => {
        if(result){
          res.json(user);
        }
        else{
          res.send('Incorrect username or password');
        }
      });
  }
});

router.get('/users', (req, res) => {
  User.findAll()
    .then(data => {
      res.json(data);
    });
});

export default router;