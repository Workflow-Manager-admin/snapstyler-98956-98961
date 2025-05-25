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
      link.download = `styled-${uploadedImage.name || 'screenshot'}.png`;
      link.click();
      
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION,
        payload: {
          type: 'success',
          message: 'Image saved successfully!',
          duration: 3000
        }
      });
    } catch (error) {
      console.error('Error generating shareable image:', error);
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION,
        payload: {
          type: 'error',
          message: 'Failed to save image. Please try again.',
          duration: 5000
        }
      });
    } finally {
      dispatch({ type: ACTIONS.SET_SAVING, payload: false });
    }
  };

  const handleShare = async () => {
    if (!uploadedImage) return;

    dispatch({ type: ACTIONS.SET_SHARING, payload: true });

    try {
      const imageUrl = await generateShareableImage(previewRef.current);
      
      // Check if the Web Share API is supported
      if (navigator.share) {
        try {
          // Convert data URL to a File object
          const blob = await (await fetch(imageUrl)).blob();
          const file = new File([blob], `styled-${uploadedImage.name || 'screenshot'}.png`, { 
            type: 'image/png' 
          });
          
          await navigator.share({
            title: 'My Styled Screenshot',
            text: userHandle ? `Created with SnapStyler by ${userHandle}` : 'Created with SnapStyler',
            files: [file]
          });
          
          dispatch({
            type: ACTIONS.SHOW_NOTIFICATION,
            payload: {
              type: 'success',
              message: 'Image shared successfully!',
              duration: 3000
            }
          });
        } catch (error) {
          console.error('Error sharing:', error);
          // Fall back to basic download if sharing failed
          handleSave();
        }
      } else {
        // Fall back to basic download on unsupported browsers
        handleSave();
        
        dispatch({
          type: ACTIONS.SHOW_NOTIFICATION,
          payload: {
            type: 'info',
            message: 'Web Share API not supported in your browser. Image downloaded instead.',
            duration: 5000
          }
        });
      }
    } catch (error) {
      console.error('Error generating shareable image:', error);
      dispatch({
        type: ACTIONS.SHOW_NOTIFICATION,
        payload: {
          type: 'error',
          message: 'Failed to generate shareable image. Please try again.',
          duration: 5000
        }
      });
    } finally {
      dispatch({ type: ACTIONS.SET_SHARING, payload: false });
    }
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
