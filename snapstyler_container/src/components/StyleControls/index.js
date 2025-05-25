import React from 'react';
import { useStyler } from '../../context/StylerContext';
import { ACTIONS } from '../../context/StylerContext';
import { STYLE_PRESETS } from '../../utils/constants';
import './StyleControls.css';

/**
 * Component for controlling the styling options of the screenshot
 */
const StyleControls = () => {
  const { state, dispatch } = useStyler();
  const { stylingOptions, userHandle } = state;

  const handleStylingChange = (property, value) => {
    dispatch({
      type: ACTIONS.UPDATE_STYLING,
      payload: { [property]: value }
    });
  };

  const handleUserHandleChange = (e) => {
    dispatch({
      type: ACTIONS.SET_USER_HANDLE,
      payload: e.target.value
    });
  };

  return (
    <div className="style-controls">
      <h3>Customize Your Screenshot</h3>
      
      <div className="control-group">
        <label htmlFor="stylePreset">Style Preset</label>
        <select
          id="stylePreset"
          onChange={(e) => {
            if (e.target.value !== "") {
              const preset = STYLE_PRESETS[e.target.value];
              dispatch({
                type: ACTIONS.UPDATE_STYLING,
                payload: preset
              });
            }
          }}
          defaultValue=""
        >
          <option value="">Custom</option>
          <option value="clean">Clean</option>
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
          <option value="vibrant">Vibrant</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="cornerRadius">Corner Radius</label>
        <div className="range-control">
          <input
            type="range"
            id="cornerRadius"
            min="0"
            max="30"
            value={stylingOptions.cornerRadius}
            onChange={(e) => handleStylingChange('cornerRadius', parseInt(e.target.value))}
          />
          <span className="value-display">{stylingOptions.cornerRadius}px</span>
        </div>
      </div>
      
      <div className="control-group">
        <label htmlFor="backgroundType">Background Type</label>
        <select
          id="backgroundType"
          value={stylingOptions.backgroundType}
          onChange={(e) => handleStylingChange('backgroundType', e.target.value)}
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="pattern">Pattern</option>
        </select>
      </div>
      
      {stylingOptions.backgroundType === 'solid' && (
        <div className="control-group">
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            type="color"
            id="backgroundColor"
            value={stylingOptions.backgroundColor}
            onChange={(e) => handleStylingChange('backgroundColor', e.target.value)}
          />
        </div>
      )}
      
      {stylingOptions.backgroundType === 'gradient' && (
        <>
          <div className="control-group">
            <label htmlFor="backgroundGradientStart">Gradient Start</label>
            <input
              type="color"
              id="backgroundGradientStart"
              value={stylingOptions.backgroundGradientStart}
              onChange={(e) => handleStylingChange('backgroundGradientStart', e.target.value)}
            />
          </div>
          <div className="control-group">
            <label htmlFor="backgroundGradientEnd">Gradient End</label>
            <input
              type="color"
              id="backgroundGradientEnd"
              value={stylingOptions.backgroundGradientEnd}
              onChange={(e) => handleStylingChange('backgroundGradientEnd', e.target.value)}
            />
          </div>
        </>
      )}
      
      {stylingOptions.backgroundType === 'pattern' && (
        <div className="control-group">
          <label htmlFor="backgroundPattern">Pattern</label>
          <select
            id="backgroundPattern"
            value={stylingOptions.backgroundPattern}
            onChange={(e) => handleStylingChange('backgroundPattern', e.target.value)}
          >
            <option value="none">None</option>
            <option value="dots">Dots</option>
            <option value="lines">Lines</option>
            <option value="grid">Grid</option>
          </select>
        </div>
      )}
      
      <div className="control-group">
        <label htmlFor="padding">Padding</label>
        <div className="range-control">
          <input
            type="range"
            id="padding"
            min="0"
            max="100"
            value={stylingOptions.padding}
            onChange={(e) => handleStylingChange('padding', parseInt(e.target.value))}
          />
          <span className="value-display">{stylingOptions.padding}px</span>
        </div>
      </div>
      
      <div className="control-group">
        <label htmlFor="userHandle">Your User Handle</label>
        <input
          type="text"
          id="userHandle"
          placeholder="@username"
          value={userHandle}
          onChange={handleUserHandleChange}
        />
      </div>
    </div>
  );
};

export default StyleControls;
