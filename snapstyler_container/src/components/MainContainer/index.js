import React from 'react';
import { StylerProvider } from '../../context/StylerContext';
import ImageUploader from '../ImageUploader';
import StyleControls from '../StyleControls';
import Preview from '../Preview';
import Toolbar from './Toolbar';
import Notification from '../Notification';
import './MainContainer.css';

/**
 * Main container component for SnapStyler
 * Orchestrates all the subcomponents and provides the app structure
 */
const MainContainer = () => {
  return (
    <StylerProvider>
      <div className="snapstyler-container">
        <header className="snapstyler-header" role="banner">
          <h1>SnapStyler</h1>
          <p className="subtitle">Beautify your screenshots for social media</p>
          <Toolbar />
        </header>
        
        <main className="snapstyler-content">
          <section className="snapstyler-upload-section" aria-label="Image upload">
            <ImageUploader />
          </section>
          
          <div className="snapstyler-editor">
            <section className="snapstyler-controls" aria-label="Style controls">
              <StyleControls />
            </section>
            
            <section className="snapstyler-preview" aria-label="Preview">
              <Preview />
            </section>
          </div>
        </main>
        
        <footer className="snapstyler-footer" role="contentinfo">
          <p>Create beautiful stylized screenshots in seconds</p>
        </footer>
        
        {/* Notification component for toast messages */}
        <Notification />
      </div>
    </StylerProvider>
  );
};

export default MainContainer;
