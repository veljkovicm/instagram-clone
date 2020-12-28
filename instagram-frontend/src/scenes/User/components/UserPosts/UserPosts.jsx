import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PostPopup } from 'components';

import './userPosts.scss';

const UserPosts = (props) => {
  const {
    posts: {
      userPosts,
      savedPosts,
    },
    username,
    isOwnProfile
  } = props;

  const [ activeTab, setActiveTab ] = useState('feed');
  const [ showPopup, setShowPopup ] = useState(false);
  const [ popupData, setPopupData ] = useState();
  let  activeTabPosts,postsMarkup, savedPostsMarkup;

  const handlePostClick = (post) => {
    setShowPopup(true);
    setPopupData(post);
    window.history.replaceState(null, post.caption, `/p/${post.id}`);
  }

  const formatPosts = (posts) => {
    return posts.map((post) =>
      <div
        key={post.id}
        className="user-profile__posts__single"
        onClick={() => handlePostClick(post)}
      >
        <div>
          <img src={`http://localhost:5000/uploads/${post.fileName}`} alt="user-post" />
        </div>
        <div className="user-profile__posts__single__hover">
          <div className="user-profile__posts__single__hover__likes">
            <div className="user-profile__posts__single__hover__likes__icon"/>
            <span>{post.likeCount ? post.likeCount : 0}</span>
            </div>
          <div className="user-profile__posts__single__hover__comments">
            <div className="user-profile__posts__single__hover__comments__icon"/>
            <span>{post.commentCount ? post.commentCount : 0}</span>
          </div>
        </div>
      </div>
    )
  }

  if(userPosts.length) {
    postsMarkup = formatPosts(userPosts);
  } else {
    if(isOwnProfile) {
      postsMarkup = (
        <div className="user-profile__user-posts-empty own">
          <div className="user-profile__user-posts-empty__image-wrapper">
            <img src="/posts-placeholder.jpg" alt=""/>
          </div>
          <div className="user-profile__user-posts-empty__description">
            <h4>Start capturing and sharing your moments</h4>
            <p>Get the app to share your first photo and video</p>
            <div className="auth-page-app-links">
              <div className="auth-page-app-links__ios" alt="ios"/>
              <div className="auth-page-app-links__android" alt="android"/>
            </div>
          </div>
        </div>
      )
    } else {
      postsMarkup = (
        <div className="user-profile__user-posts-empty others">
          <div className="user-profile__user-posts-empty__badge" />
          <h4>No Posts Yet</h4>
        </div>
      )
    }
  }

  if(savedPosts.length) {
    savedPostsMarkup = formatPosts(savedPosts);
  } else {
    savedPostsMarkup = (
      <div className="user-profile__saved-posts-empty">
        <div className="user-profile__saved-posts-empty__badge" />
        <h4 className="user-profile__saved-posts-empty__title">Save</h4>
        <p className="user-profile__saved-posts-empty__text">
          Save photos that you want to see again.
          No one is notified, and only you can see what you've saved.
        </p>
      </div>
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
    <div className="user-profile__controls">
      <span className={`user-profile__controls__single feed ${activeTab === 'feed' ? 'tab-active' : ''}`} onClick={() => handleTabClick('feed')}>Posts</span>
      <span className={`user-profile__controls__single saved ${activeTab === 'saved' ? 'tab-active' : ''}`} onClick={() => handleTabClick('saved')}>Saved</span>
    </div>
  )


  return (
    <>
      {
        showPopup
          &&
        <div className="user-profile__post-popup">
          <PostPopup
            post={popupData}
            setShowPopup={setShowPopup}
            username={username} />
        </div>
      }
      <div className="user-profile__posts-wrapper">
        <div className="user-profile__tab-controls">
          {isOwnProfile ? tabControls : null}
        </div>
        <div className="user-profile__posts">
          {activeTabPosts}
        </div>
      </div>
    </>
  )
}

UserPosts.propTypes = {
  posts: PropTypes.object,
  isOwnProfile: PropTypes.bool,
  username: PropTypes.string,
}

export default UserPosts;
