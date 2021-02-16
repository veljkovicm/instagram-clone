# instagram-clone

Deployed at: [insta.veljkovicweb.dev](https://insta.veljkovicweb.dev) (Ubuntu 20.04 wih NginX)

**Tools used:**

  * React/Redux
  * NodeJS (with Express)
  * PostgreSQL (with Sequelize)
  * SASS for styling
  * JWT for authentication
  
 
**Functionality:**

  * Log In, Sign Up and Password reset - with related emails sent through SendGrid
  * Browse posts from followers, like, comment, save...
  * Upload new posts
  * Follow/unfollow users
  * Update profile details like: avatar, bio, website, username, email...
  * User search via username or full name
  * User page with all user posts, and posts from other users that were saved
  
  
  ## TODO:
  * add unit tests
  * realtime chat with socket.io
  * realtime notifications
  * protected user accounts (Follow requests must be accepted)
  
  
  **Notable packages**
  * lodash
  * jsonwebtoken
  * aws-sdk - for image uploads to DigitalOcean Spaces
  * bcryptjs
  * react-router-dom
  * node-sass
  * date-fns
