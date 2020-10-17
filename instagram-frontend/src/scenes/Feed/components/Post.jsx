import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance} from 'date-fns'

const Post = (props) => {
  console.log('props',props);
  const {
    id,
    caption,
    fileName,
    avatar,
    uploadedAt,
    username,
  } = props;
  const uploadTime = formatDistance(new Date(uploadedAt).getTime(), new Date());
  
  const imageSrc = avatar ? `https://localhost:5000/public/uploads/${avatar}` : 'http://localhost:5000/uploads/no-img.png';
  return (
    <div className="single-post">
      <div className="single-post__user-badge">
        <Link to={`/${username}`}>
          <img src={imageSrc} alt="userAvatar" width="30"/>
        {username}
        </Link>
        {/* dot menu */}
      </div>
      <div className="single_post__image-wrapper">
        <img src={`http://localhost:5000/uploads/${fileName}`} alt="post-image" width="60%"/>
      </div>
      <div className="single-post__caption-wrapper">
        <Link to={`/${username}`}>{username}</Link>
        <span>{caption}</span>
      </div>
      <hr/>
      {/* comments */}
      {`${uploadTime} ago`}
      {/* Form component */}
    </div>
  )
}


export default Post;