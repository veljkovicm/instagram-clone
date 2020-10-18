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
    // console.log(post.user);
    filteredResults.push({
      id: post.id,
      fileName: post.fileName,
      caption: post.caption,
      uploadedAt: post.uploadedAt,
      username: post.user.username,
      avatar: post.user.avatar,
      fullName: post.user.fullNamem
    })
  })

  return res.json({
    statusCode: 200,
    posts: filteredResults,
  }).status(200)

})


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

export default router;