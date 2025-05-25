import React from 'react';
import { StylerProvider } from '../../context/StylerContext';
import ImageUploader from '../ImageUploader';
import StyleControls from '../StyleControls';
import Preview from '../Preview';
import Toolbar from './Toolbar';
import './MainContainer.css';

/**
 * Main container component for SnapStyler
 * Orchestrates all the subcomponents and provides the app structure
 */
const MainContainer = () => {
  return (
    <StylerProvider>
      <div className="snapstyler-container">
        <header className="snapstyler-header">
          <h1>SnapStyler</h1>
          <p className="subtitle">Beautify your screenshots for social media</p>
          <Toolbar />
        </header>
        
        <div className="snapstyler-content">
          <div className="snapstyler-upload-section">
            <ImageUploader />
          </div>
          
          <div className="snapstyler-editor">
            <div className="snapstyler-controls">
              <StyleControls />
            </div>
            
            <div className="snapstyler-preview">
              <Preview />
            </div>
          </div>
        </div>
        
        <footer className="snapstyler-footer">
          <p>Create beautiful stylized screenshots in seconds</p>
        </footer>
      </div>
    </StylerProvider>
  );
};

export default MainContainer;
