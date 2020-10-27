import express from 'express';
import Services from '../services/services.js';
import path from 'path';
import fs from 'fs';


const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await Services.getUser(username);
  let following = false;

  if (!user) {
    return res.send({
      statusCode: 404,
      message: 'User not found!',
    }).status(404);
  }

  if(req.user) {
    following = await Services.isFollowing({ followerId: req.user.id, followedId: user.id });
    if(username === req.user.username) {
      user.dataValues.isOwnProfile = true;
    }
  }
  user.dataValues.following = !!following;

  const [ followerCount, followingCount ] = await Promise.all([ Services.getFollowerCount(user.id), Services.getFollowingCount(user.id) ]);

  user.dataValues.followerCount = followerCount;
  user.dataValues.followingCount = followingCount;

  const posts = await Services.getPosts({ userId: user.id });
  // maybe get only posts, without comments etc. load rest of the data on image popup

  return res.send({
    statusCode: 200,
    payload: {
      user,
      posts,
    },
  }).status(200)
});

router.post('/upload-avatar', async (req, res) => {
  if(req.file === null) {
    return res.json({
      statusCode: 400,
      message: 'No file uploaded',
    }).status(400);
  }
  const __dirname = path.resolve();
  const { file } = req.files;

  if(file.mimetype !== ('image/jpeg' || 'image/png' )) {
    return res.json({
      statusCode: 400,
      message: 'Unsupported file type. Please use JPG/PNG',
    }).status(40)
  }

  const { avatar: oldAvatar } =  await Services.getOldAvatarUrl(req.user.id);

  if(oldAvatar) {
    console.log('>> oldAvatar', oldAvatar);
    fs.unlink(`${__dirname}/public/uploads/${oldAvatar}`, function(err) {
      if (err) {
        console.log('Not found!')
      }
    })
  }

  const { id: userId } = req.user;
  const fileExtension = file.mimetype.split('/')[1];

  const filename = `avatar-${userId}.${fileExtension}`;

  file.mv(`${__dirname}/public/uploads/${filename}`, async (err) => {
    if(err) {
      console.error(err);
      return res.json({
        statusCode: 500,
        message: err,
      }).status(500);
    }

    await Services.updateAvatar({ filename, userId});

    res.json({
      statusCode: 200,
      message: 'Avatar updated successfully!'
    }).status(200);
  })

});


router.post('/update-settings', async (req,res) => {
  const userData = req.body;
  const { id } = req.user;

  //check if email / username changed,
  // check availability of username
  // send confirmation if email changed



  const { message, statusCode } = await Services.updateUserSettings({ userData, id });
  console.log({message, statusCode});
  res.json({
    statusCode,
    message,
  }).status(statusCode)
});


router.post('/follow', async (req,res) => {
  // id of a user to follow
  const { username } = req.body;

  const { id: followedId } = await Services.getUserIdByUsername(username);

  
  const { id: followerId } = req.user;
  
  await Services.follow({ followerId, followedId });

  res.json({
    statusCode: 200,
    message: 'Follow action succesful',
  }).status(200)
});


router.post('/unfollow', async (req,res) => {
  // id of a user to follow
  const { username } = req.body;

  const { id: followedId } = await Services.getUserIdByUsername(username);

  const { id: followerId } = req.user;

  await Services.unfollow({ followerId, followedId });

  res.json({
    statusCode: 200,
    message: 'Unfollow action succesful',
  }).status(200)
});

router.post('/get-list', async (req, res) => {
  const { listType, username } = req.body;

  const { id } = await Services.getUserIdByUsername(username)

  const list = await Services.getFollowList({ listType, id });
  console.log('>> list', JSON.stringify(list, null, 2));
  res.json({
    statusCode: 200,
    payload: list,
  }).status(200)
});



export default router;