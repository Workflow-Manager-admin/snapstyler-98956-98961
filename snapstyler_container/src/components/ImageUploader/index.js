import React, { useRef, useState } from 'react';
import { useStyler } from '../../context/StylerContext';
import { ACTIONS } from '../../context/StylerContext';
import { fileToDataUrl, isValidImageType, isValidFileSize } from '../../utils/imageUtils';
import './ImageUploader.css';

/**
 * Component for uploading screenshots to beautify
 */
const ImageUploader = () => {
  const { state, dispatch } = useStyler();
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file) => {
    setError('');
    
    // Validate file type
    if (!isValidImageType(file)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION, 
        payload: {
          type: 'error', 
          message: 'Invalid file format. Please upload a JPEG, PNG, GIF, or WebP image.',
          duration: 5000
        }
      });
      return;
    }

    // Validate file size (max 10MB)
    if (!isValidFileSize(file, 10)) {
      setError('File is too large. Maximum size is 10MB.');
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION, 
        payload: {
          type: 'error', 
          message: 'File is too large. Maximum size is 10MB.',
          duration: 5000
        }
      });
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      dispatch({
        type: ACTIONS.UPLOAD_IMAGE,
        payload: {
          file,
          dataUrl,
          name: file.name
        }
      });
      
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION, 
        payload: {
          type: 'success', 
          message: 'Image uploaded successfully!',
          duration: 3000
        }
      });
    } catch (err) {
      setError('Failed to process the image. Please try again.');
      console.error('Image processing error:', err);
      
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION, 
        payload: {
          type: 'error', 
          message: 'Failed to process the image. Please try again.',
          duration: 5000
        }
      });
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-uploader">
      {!state.uploadedImage ? (
        <div 
          className={`upload-area ${isDragging ? 'dragging' : ''}`} 
          onClick={triggerFileInput}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="upload-icon">📷</span>
          <h3>Upload a Screenshot</h3>
          <p>Click to browse or drag and drop an image</p>
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="upload-success">
          <div className="uploaded-info">
            <p>{state.uploadedImage.name}</p>
            <button 
              className="btn" 
              onClick={() => dispatch({ type: ACTIONS.UPLOAD_IMAGE, payload: null })}
            >
              Change Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
