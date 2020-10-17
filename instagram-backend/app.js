import express from 'express';
import path from 'path';
import  userRoutes from './src/routes/user.js';
import passwordRoutes from './src/routes//password.js';
import searchRoute from './src/routes/search.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {
  auth,
  checkUser,
} from './src/middleware/index.js';

// Database
import sequelize from './config/database.js';


// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ', err))



const app = express();

app.use(cors({}));

app.use(fileUpload());
// body-parser
app.use(express.json());


app.get('/auth/check-token', checkUser );
app.get('/', (req, res) => res.send('INDEX'));

// User routes
app.use('/user', auth, userRoutes);
app.use('/password', passwordRoutes);
app.use('/search', searchRoute);
app.use('/protected', auth, (req, res) => {
  return res.status(200).json({ message: 'AUTHENTICATED', user: req.user})
} )

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

