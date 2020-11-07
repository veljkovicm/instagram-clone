import React, { useState } from 'react';

const UserPosts = (props) => {
  const {
    posts: {
      userPosts,
      savedPosts,
    },
    isOwnProfile
  } = props;

  const [ activeTab, setActiveTab ] = useState('feed');
  let  activeTabPosts,postsMarkup, savedPostsMarkup;

  const formatPosts = (posts) => {
    return posts.map((post) =>
      <div key={post.id} className="user-profile__posts__single">
        <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="user-post" />
        <div className="user-profile__posts__single__hover">
          <div>L: {post.likeCount ? post.likeCount : 0}</div>
          <div>C: {post.commentCount ? post.commentCount : 0}</div>
        </div>
      </div>
    )
  }

  if(userPosts.length) {
    postsMarkup = formatPosts(userPosts);
  } else {
    postsMarkup = (
      <div>NO USER POSTS</div>
    )
  }

  if(savedPosts.length) {
    savedPostsMarkup = formatPosts(savedPosts);
  } else {
    savedPostsMarkup = (
      <div>NO SAVED POSTS</div>
    )
  }

  

  if(activeTab === 'feed') {
    activeTabPosts = postsMarkup;
  } else {
    activeTabPosts = savedPostsMarkup;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  const tabControls = (
    <div className="user-profile__controls-wrapper">
      <span onClick={() => handleTabClick('feed')}>Feed</span>
      <span onClick={() => handleTabClick('saved')}>Saved</span>
    </div>
  )


  return (
    <div className="user-profile__posts-wrapper">
      <div className="user-profile__tab-controls">
        {isOwnProfile ? tabControls : null}
      </div>
      <div className="user-profile__posts">
        {activeTabPosts}
      </div>
    </div>
  )
}


export default UserPosts;