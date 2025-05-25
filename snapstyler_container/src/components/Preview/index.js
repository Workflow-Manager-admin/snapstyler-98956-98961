import React, { useRef, useEffect } from 'react';
import { useStyler } from '../../context/StylerContext';
import { ACTIONS } from '../../context/StylerContext';
import { applyImageStyling, generateShareableImage } from '../../utils/imageUtils';
import './Preview.css';

/**
 * Component for displaying the styled screenshot preview
 */
const Preview = () => {
  const { state, dispatch } = useStyler();
  const { uploadedImage, stylingOptions, userHandle, isSaving } = state;
  const previewRef = useRef(null);

  useEffect(() => {
    if (uploadedImage && previewRef.current) {
      applyImageStyling(previewRef.current, stylingOptions);
    }
  }, [uploadedImage, stylingOptions]);
  
  // Handle initial load and ensure the corner radius is applied to the image directly
  useEffect(() => {
    const imageElement = previewRef.current?.querySelector('.preview-image');
    if (imageElement && stylingOptions) {
      imageElement.style.borderRadius = `${stylingOptions.cornerRadius}px`;
    }
  }, [uploadedImage, stylingOptions]);

  const handleSave = async () => {
    if (!uploadedImage) return;

    dispatch({ type: ACTIONS.SET_SAVING, payload: true });

    try {
      const imageUrl = await generateShareableImage(previewRef.current);
      
      // Create a temporary anchor element to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `styled-${uploadedImage.name || 'screenshot'}`;
      link.click();
    } catch (error) {
      console.error('Error generating shareable image:', error);
      // Here we would want to show an error message to the user
    } finally {
      dispatch({ type: ACTIONS.SET_SAVING, payload: false });
    }
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    // For now, we'll just show a mock message
    alert('Sharing functionality would open a dialog to share to social media platforms.');
  };

  if (!uploadedImage) {
    return (
      <div className="preview-placeholder">
        <p>Upload a screenshot to see the preview</p>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <h3>Preview</h3>
      
      <div className="preview-wrapper">
        <div className="preview" ref={previewRef}>
          <img 
            src={uploadedImage.dataUrl} 
            alt="Preview" 
            className="preview-image" 
          />
          
          {userHandle && (
            <div className="user-handle">
              <span>{userHandle}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="preview-actions">
        <button 
          className="btn" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="loading-indicator">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              Saving
            </span>
          ) : 'Save'}
        </button>
        <button 
          className="btn btn-outline" 
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Preview;
