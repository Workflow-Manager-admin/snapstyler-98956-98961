import React, { useEffect } from 'react';
import { useStyler } from '../../context/StylerContext';
import { ACTIONS } from '../../context/StylerContext';
import './Notification.css';

/**
 * Component to display toast notifications for user feedback
 * Automatically dismisses notifications after a specified timeout
 */
const Notification = () => {
  const { state, dispatch } = useStyler();
  const { notification } = state;

  // Auto-dismiss notification after timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.CLEAR_NOTIFICATION });
      }, notification.duration || 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  const handleDismiss = () => {
    dispatch({ type: ACTIONS.CLEAR_NOTIFICATION });
  };

  return (
    <div 
      className={`notification-toast ${notification.type || 'info'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="notification-content">
        {notification.message}
      </div>
      <button 
        className="notification-close"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
