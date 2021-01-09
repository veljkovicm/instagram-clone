import express from 'express';
import Services from '../services/services.js';


const router = express.Router();

router.post('/', async (req, res) => {
  const { query } = req.body;
  const searchResult = await Services.search(query);

  searchResult.map((user) => {
    return {
      username: user.username,
      fullName: user.userName,
      avatar: user.avatar,
    };
  });

  return res.status(200).json({
    statusCode: 200,
    result: searchResult,
  })
});


export default router;