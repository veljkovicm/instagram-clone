import express from 'express';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import Services from '../services/services.js';


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
  let savedPostsArr = [];

  if(req.user && user.id === req.user.id) {
    const savedPosts = await Services.getSavedPosts(req.user.id);
    
    savedPosts.forEach((p) => {
      savedPostsArr.push({
        likeCount: p.post.likes.length || 0,
        commentCount: p.post.comments.length || 0,
        ...p.post.dataValues,
      });
    });
  }

  user.dataValues.following = !!following;

  const [ followerCount, followingCount ] = await Promise.all([ Services.getFollowerCount(user.id), Services.getFollowingCount(user.id) ]);

  user.dataValues.followerCount = followerCount;
  user.dataValues.followingCount = followingCount;

  const posts = await Services.getPosts(user.id);
  
  if(posts) {
    for(let post in posts) {
      posts[post].dataValues.likeCount = posts[post].likes.length;
      posts[post].dataValues.commentCount = posts[post].comments.length;
    }
  }
  // maybe get only posts, without comments etc. load rest of the data on image popup

  return res.send({
    statusCode: 200,
    payload: {
      user,
      posts: {
        userPosts: posts,
        savedPosts: savedPostsArr,
      },
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
  if(file.mimetype !=='image/jpeg' && file.mimetype !== 'image/png') {
    return res.json({
      statusCode: 400,
      message: 'Unsupported file type. Please use JPG/PNG',
    }).status(400)
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
  const timestamp = Date.now();

  const filename = `avatar-${userId}-${timestamp}.${fileExtension}`;

  file.mv(`${__dirname}/public/uploads/${filename}`, async (err) => {
    if(err) {
      console.error(err);
      return res.json({
        statusCode: 500,
        message: err,
      }).status(500);
    }

    await Services.updateAvatar({ filename, userId});

    // reformat. not looking good with url in here?
    const newAvatar = `http://localhost:5000/uploads/${filename}`;

    res.json({
      statusCode: 200,
      message: 'Avatar updated successfully!',
      payload: { newAvatar },
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

router.post('/get-follower-list', async (req, res) => {
  const { username } = req.body;
  const { id } = await Services.getUserIdByUsername(username);

  const followerList = await Services.getFollowList({ listType: 'follower', id });
  const followingList = await Services.getFollowList({ listType: 'following', id: req.user.id });
  
  followerList.map((user) => {
    const isFollowing = _.some(followingList, { id: user.followerId});
    user.dataValues.isFollowing = isFollowing;
  
    return user;
  });

  return res.json({
    statusCode: 200,
    payload: followerList,
  }).status(200)
});

router.post('/get-following-list', async (req, res) => {
  const { username } = req.body;

  const { id } = await Services.getUserIdByUsername(username);

  const followingList = await Services.getFollowList({ listType: 'following', id });

  followingList.map((user) => {
    user.dataValues.isFollowing = true;
    return user;
  });

  return res.json({
    statusCode: 200,
    payload: followingList,
  }).status(200);
});



export default router;