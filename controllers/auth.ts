import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

export default authJTW;