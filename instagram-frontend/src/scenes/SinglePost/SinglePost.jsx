import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Post,
  Header,
  Loading,
} from 'components';

const SinglePost = (props) => {
  const { getPost } = props;
  const { postId } = useParams();

  const [ post, setPost ] = useState(null);
  
  useEffect(() => {
    getPost({ postId }).then((res) => {
      setPost(res);
    });
  }, [ getPost, postId ])

  if(!post) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <div className="single-post-wrapper page-content">
        <Post post={post} type="single" />
      </div>
    </>
  )
};

SinglePost.propTypes = {
  postComment: PropTypes.func.isRequired,
  postData: PropTypes.func,
  getPost: PropTypes.func.isRequired,
  likeAction: PropTypes.func.isRequired,
}

export default SinglePost;
