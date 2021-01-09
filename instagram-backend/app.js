import express from 'express';
import  flowRoutes from './src/routes/flow.js';
import passwordRoutes from './src/routes//password.js';
import searchRoute from './src/routes/search.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import postRoutes from './src/routes/post.js';
import {
  auth,
  checkUser,
} from './src/middleware/index.js';
import userRoutes from './src/routes/user.js';

// Database
import sequelize from './config/database.js';


// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ', err))



const app = express();

app.use(cors({}));
app.use(express.static('public'));
app.use(fileUpload());
// body-parser
app.use(express.json());


app.get('/auth/check-token', checkUser );



app.use('/u', auth, userRoutes);
app.use('/user', flowRoutes);
app.use('/p', auth, postRoutes);
app.use('/password', passwordRoutes);
app.use('/search', searchRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

