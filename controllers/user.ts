import express, { Request, Response, } from 'express';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authJTW from './auth';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
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

router.post('/login', async (req: Request, res: Response) => {
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
          const token = jwt.sign({user: {
            id: user.id,
            name: user.name
          }}, process.env.TOKEN_SECRET!);
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

router.use(authJTW);

router.get('/users', (req: Request, res: Response) => {
  const { id } = req.user;
  User.findAll({
    where: {
      id
    }
  })
    .then(data => {
      res.json(data);
    });
});

router.get('/user/comments', (req: Request, res: Response) => {
  const { id } = req.user;
  Comment.findAll({
    where: {
      userId: id
    }
  })
    .then((comments) => res.json(comments));
});

export default router;