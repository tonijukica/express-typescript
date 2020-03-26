import express, { Request, Response } from 'express';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import authJTW from './auth';

const router = express.Router();
router.use(authJTW);

router.get('/posts', async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.post('/post/', async(req: Request, res: Response) => {
  const { id } = req.user;
  const { title, text } = req.body;
  const post = await Post.create({
    userId: id,
    title: title,
    text: text
  });
  res.json(post); 
});

router.get('/post', async (req: Request, res: Response) => {
  const { id } = req.user;
  const posts = await Post.findAll({
    where: {
      userId: id
    }
  });
  res.json(posts);
});

router.post('/post/:id/comment', async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { text } = req.body;
  const comment = await Comment.create({
    postId,
    userId,
    text
  });
  res.json(comment);
});

router.get('/post/:id/comments', async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const comments = await Comment.findAll({
    where: {
      postId
    }
  });
  res.json(comments);
});
export default router;