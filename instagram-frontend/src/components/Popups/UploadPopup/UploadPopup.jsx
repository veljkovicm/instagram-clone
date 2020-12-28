import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { upload } from './actions';

import './uploadPopup.scss';

const UploadPopup = ({ setPosts, setShowPopup}) => {

  const [ file, setFile ] = useState();
  const [ caption, setCaption ] = useState('');

  const handleChange =  (e) => {
    if(e.target.files) {
      setFile(e.target.files[0]);
    } else {
      setCaption(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    upload({ formData }).then((res) => {
      setPosts((oldPosts) => [
        res,
        ...oldPosts,
      ]);
    });
    setShowPopup(false);
  }

  const handlePopupClose = () => {
    setShowPopup(false);
  }

  return (
    <>
      <div className="upload-popup-backdrop" onClick={handlePopupClose} />
      <div className="upload-popup">
        <div className="upload-popup__header">
          <h4 className="upload-popup__header__title">New post</h4>
          <div className="upload-popup__header__button" onClick={handlePopupClose}/>
        </div>
        <form onSubmit={handleSubmit} className="upload-popup__form">
          <label htmlFor="image">Select an image</label>
          <div className="upload-popup__form__image-preview">
            { file ? <img src={URL.createObjectURL(file)} alt="preview" /> : null}
          </div>
          <input
            type="file"
            id="image"
            onChange={handleChange}
            className="upload-popup__form__file-input"
            hidden
          />
          <input
            type="text"
            name="description"
            placeholder="Post caption"
            onChange={handleChange}
            className="upload-popup__form__text-input"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="upload-popup__form__button"
            disabled={!file}
          >
            Share
          </button>
        </form>
      </div>
    </>
  )
}

UploadPopup.propTypes = {
  setPosts: PropTypes.func.isRequired,
  setShowPopup: PropTypes.func.isRequired,
}

export default UploadPopup;
