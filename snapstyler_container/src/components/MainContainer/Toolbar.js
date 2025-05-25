import React from 'react';
import { useStyler } from '../../context/StylerContext';
import { ACTIONS } from '../../context/StylerContext';

/**
 * Toolbar component for quick actions in SnapStyler
 */
const Toolbar = () => {
  const { state, dispatch } = useStyler();
  const { uploadedImage } = state;
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      dispatch({ type: ACTIONS.RESET });
    }
  };
  
  const handleNewUpload = () => {
    dispatch({ type: ACTIONS.UPLOAD_IMAGE, payload: null });
  };
  
  return (
    <div className="snapstyler-toolbar">
      {uploadedImage && (
        <>
          <button className="btn btn-sm" onClick={handleNewUpload}>
            New Upload
          </button>
          <button className="btn btn-sm btn-outline" onClick={handleReset}>
            Reset Changes
          </button>
        </>
      )}
    </div>
  );
};

export default Toolbar;
