import express from 'express';
import Services from '../services/services.js';
import path from 'path';

const router = express.Router();


router.get('/posts', async (req, res) =>{
  const { id: userId } = req.user;

  const posts = await Services.getPosts({ userId });

  if(!posts) {
    return res.json({
      statusCode: 404,
      message: 'No posts found!'
    }).status(404);
  }

  // console.log('>> posts', posts);
  const filteredResults = [];
  posts.forEach((post) => {
    filteredResults.push({
      id: post.id,
      fileName: post.fileName,
      caption: post.caption,
      uploadedAt: post.uploadedAt,
      username: post.user.username,
      avatar: post.user.avatar,
      fullName: post.user.fullName,
      comments: post.comments,
    });
  });

  return res.json({
    statusCode: 200,
    posts: filteredResults,
  }).status(200)

});


router.post('/upload', async (req, res) => {
  if(req.file === null) {
    return res.json({
      statusCode: 400,
      message: 'No file uploaded!',
    }).status(400);
  }

  const __dirname = path.resolve();
  const { file } = req.files;
  const timestamp = new Date().getTime();
  const { caption } = req.body;
  const { id: userId } = req.user;

  const fileName = `${timestamp}-${file.name}`;

  file.mv(`${__dirname}/public/uploads/${fileName}`, async (err) => {
    if(err) {
      console.error(err);
      return res.json({
        statusCode: 500,
        message: err,
      }).status(500);
    }
    await Services.addNewPost({ fileName, caption, userId })

    res.json({
      statusCode: 200,
      fileName,
      filePath: `/uploads/${fileName}`,
    }).status(200);
  });
});

router.post('/comment', async (req, res) => {
  const {
    comment,
    postId,
  } = req.body;

  const { id: userId } = req.user;

  if(comment.trim() === '') {
    return res.json({
      statusCode: 400,
      message: 'Cannot submit an empty comment',
    }).status(400);
  };

  Services.postComment({ comment, userId, postId })
    .then(() => {
      return res.json({
        statusCode: 200,
        message: 'Comment submitted successfully!',
      }).status(200);
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        statusCode: 500,
        message: 'Something went wrong.',
      }).status(500);
    });
});

router.get('/get-post/:postId', async (req, res) =>{
  const { postId } = req.params;

  const post = await Services.getPost({ postId });

  if(!post) {
    return res.json({
      statusCode: 404,
      message: 'Post not found!'
    }).status(404);
  }

  console.log('post', post.user.username);
  
  const filteredResults = {
    id: post.id,
    fileName: post.fileName,
    caption: post.caption,
    uploadedAt: post.uploadedAt,
    username: post.user.username,
    avatar: post.user.avatar,
    fullName: post.user.fullName,
    comments: post.comments,
  };
  

  return res.json({
    statusCode: 200,
    post: filteredResults,
  }).status(200)
});

export default router;