import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the styler app
const initialState = {
  uploadedImage: null,
  stylingOptions: {
    cornerRadius: 8,
    backgroundType: 'solid', // 'solid', 'gradient', 'pattern'
    backgroundColor: '#f0f0f0',
    backgroundGradientStart: '#f0f0f0',
    backgroundGradientEnd: '#e0e0e0',
    backgroundPattern: 'none',
    padding: 20,
  },
  userHandle: '',
  isSaving: false,
  isSharing: false,
  notification: null, // { type: 'success|error|info', message: 'text', duration: 5000 }
};

// Action types
export const ACTIONS = {
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  UPDATE_STYLING: 'UPDATE_STYLING',
  SET_USER_HANDLE: 'SET_USER_HANDLE',
  SET_SAVING: 'SET_SAVING',
  SET_SHARING: 'SET_SHARING',
  RESET: 'RESET',
};

// Reducer function for state updates
const stylerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPLOAD_IMAGE:
      return {
        ...state,
        uploadedImage: action.payload,
      };
    case ACTIONS.UPDATE_STYLING:
      return {
        ...state,
        stylingOptions: {
          ...state.stylingOptions,
          ...action.payload,
        },
      };
    case ACTIONS.SET_USER_HANDLE:
      return {
        ...state,
        userHandle: action.payload,
      };
    case ACTIONS.SET_SAVING:
      return {
        ...state,
        isSaving: action.payload,
      };
    case ACTIONS.SET_SHARING:
      return {
        ...state,
        isSharing: action.payload,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
};

// Create context
export const StylerContext = createContext();

// Custom provider component
export const StylerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stylerReducer, initialState);

  return (
    <StylerContext.Provider value={{ state, dispatch }}>
      {children}
    </StylerContext.Provider>
  );
};

// Custom hook for accessing context
export const useStyler = () => {
  const context = useContext(StylerContext);
  if (!context) {
    throw new Error('useStyler must be used within a StylerProvider');
  }
  return context;
};
