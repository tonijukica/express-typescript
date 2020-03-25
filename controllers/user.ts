import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const authJTW = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    const tokenSecret = process.env.TOKEN_SECRET!;
    jwt.verify(token, tokenSecret, (err, data: any) => {
      if(err)
        return res.send('Invalid token');
      req.user = data.user;
      next();
    });
  }
  else
    res.send('No authorization headers');
};

router.get('/users', authJTW, (req: Request, res: Response) => {
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


export default router;