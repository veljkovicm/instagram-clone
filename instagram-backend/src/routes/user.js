import express from 'express';
import Services from '../services/services.js';


const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await Services.getUser(username);

  if (!user) {
    return res.send({
      statusCode: 404,
      message: 'User not found!',
    }).status(404);
  }

  const userId = user.id;

  const posts = await Services.getPosts({ userId });
  // maybe get only posts, without comments etc. load rest of the data on image popup

  return res.send({
    statusCode: 200,
    payload: {
      user,
      posts,
    },
  }).status(200)
});


export default router;