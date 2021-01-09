import express from 'express';
import config from 'config';
import AWS from 'aws-sdk';
import _ from 'lodash';
import Services from '../services/services.js';

const router = express.Router();

router.get('/:username', async (req, res) => {
  let savedPostsArr = [];
  let savedPostsIds = []

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
    savedPostsIds = await Services.getSavedPostsList(req.user.id);
    if(username === req.user.username) {
      user.dataValues.isOwnProfile = true;
    }
  }


  if(req.user && user.id === req.user.id) {
    const savedPosts = await Services.getSavedPosts(req.user.id);
    savedPosts.forEach((p) => {
      const postLikesIds = _.map(p.post.likes, 'userId');
      savedPostsArr.push({
        likeCount: p.post.likes.length || 0,
        commentCount: p.post.comments.length || 0,
        isSaved: _.includes(savedPostsIds, p.post.id),
        isLiked: _.includes(postLikesIds, req.user.id),
        ...p.post.dataValues,
      });
    });
  }

  user.dataValues.following = !!following;

  const [ followerCount, followingCount ] = await Promise.all([ Services.getFollowerCount(user.id), Services.getFollowingCount(user.id) ]);

  user.dataValues.followerCount = followerCount;
  user.dataValues.followingCount = followingCount;

  const posts = await Services.getUserPosts(user.id);
  
  if(posts) {
    for(let post in posts) {
      posts[post].dataValues.likeCount = posts[post].likes.length;
      posts[post].dataValues.commentCount = posts[post].comments.length;
      posts[post].dataValues.isSaved = _.includes(savedPostsIds, posts[post].id);
      posts[post].dataValues.isLiked = _.some(posts[post].likes, { userId: req.user.id});
    }
  }

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
  let params = {};
  if(req.file === null) {
    return res.json({
      statusCode: 400,
      message: 'No file uploaded',
    }).status(400);
  }

  const { file } = req.files;
  if(file.mimetype !=='image/jpeg' && file.mimetype !== 'image/png') {
    return res.json({
      statusCode: 400,
      message: 'Unsupported file type. Please use JPG/PNG',
    }).status(400)
  }

  const { avatar: oldAvatar } =  await Services.getOldAvatarUrl(req.user.id);

  const spacesEndpoint = new AWS.Endpoint(`${config.AWS.spacesEndpoint}/avatars`);
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: config.AWS.accessKey,
    secretAccessKey: config.AWS.secretKey,
  });

  if(oldAvatar) {
    params = {
      Bucket: config.AWS.bucketName,
      Key: oldAvatar,
    };

    s3.deleteObject(params, (err) => {
      if (err) console.log(err, err.stack);
    });
  }

  const { id: userId } = req.user;
  const fileExtension = file.mimetype.split('/')[1];
  const timestamp = Date.now();

  const filename = `avatar-${userId}-${timestamp}.${fileExtension}`;

  await Services.updateAvatar({ filename, userId });

  params = {
    Body: file.data,
    Bucket: config.AWS.bucketName,
    Key: filename,
    ACL: 'public-read',
  };

  const newAvatar = `http://instagram-assets.fra1.digitaloceanspaces.com/avatars/${filename}`;

  await s3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  return res.json({
    statusCode: 200,
    message: 'Avatar updated successfully!',
    payload: { newAvatar },
  }).status(200);
});


router.post('/update-settings', async (req, res) => {
  const userData = req.body;
  const { id } = req.user;

  //check if email / username changed,
  // check availability of username
  // send confirmation if email changed



  const { message, statusCode } = await Services.updateUserSettings({ userData, id });

  return res.json({
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

  return res.json({
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

  return res.json({
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
