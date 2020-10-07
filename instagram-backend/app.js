import express from 'express';
import path from 'path';
import  userRoutes from './src/routes/user.js';
import passwordRoutes from './src/routes//password.js';
import bodyParser from 'body-parser';
import auth from './src/middleware/auth.js';

// Database
import sequelize from './config/database.js';


// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ', err))



const app = express();

// body-parser
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false}));
app.get('/', (req, res) => res.send('INDEX'));

// User routes
app.use('/user', userRoutes);
app.use('/password', passwordRoutes);
app.use('/protected', auth, (req, res) => {
  return res.status(200).json({ message: 'AUTHENTICATED', user: req.user})
} )

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

