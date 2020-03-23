import express from 'express';
import { User } from '../models/User';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
          const token = jwt.sign({name: user.name}, process.env.TOKEN_SECRET);
          res.json({
            token
          });
        }
        else{
          res.send('Incorrect username or password');
        }
      });
  }
});

const authJTW = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    const tokenSecret = process.env.TOKEN_SECRET;
    jwt.verify(token, tokenSecret, (err, user) => {
      if(err)
        return res.send('Invalid token');
      req.user = user;
      next();
    });
  }
  else
    res.send('No authorization headers');
};

router.get('/users', authJTW, (req, res) => {
  User.findAll()
    .then(data => {
      res.json(data);
    });
});


export default router;