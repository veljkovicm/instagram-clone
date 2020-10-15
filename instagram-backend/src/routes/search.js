import express from 'express';
import Services from '../services/services.js';


const router = express.Router();

router.post('/', async (req, res) => {
  const usersArray = [];
  const { query } = req.body;
  console.log('>> req.body', req.body);
  const searchResult = await Services.search({ query });

  searchResult.forEach(user => {
    usersArray.push({
      username: user.username,
      fullName: user.fullName,
      imageUrl: 'https://via.placeholder.com/50',
    })
  })

  console.log('searchResult', searchResult);

  return res.status(200).json({
    statusCode: 200,
    result: usersArray,
  })
});


export default router;