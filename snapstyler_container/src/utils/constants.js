/**
 * Constants used throughout the SnapStyler application
 */

// Background patterns (in a real app these would be image URLs)
export const BACKGROUND_PATTERNS = {
  none: '',
  dots: 'dots_pattern',
  lines: 'lines_pattern',
  grid: 'grid_pattern'
};

// Predefined style presets
export const STYLE_PRESETS = {
  clean: {
    cornerRadius: 8,
    backgroundType: 'solid',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modern: {
    cornerRadius: 12,
    backgroundType: 'gradient',
    backgroundGradientStart: '#4158D0',
    backgroundGradientEnd: '#C850C0',
    padding: 30,
  },
  minimal: {
    cornerRadius: 0,
    backgroundType: 'solid',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  vibrant: {
    cornerRadius: 16,
    backgroundType: 'gradient',
    backgroundGradientStart: '#0093E9',
    backgroundGradientEnd: '#80D0C7',
    padding: 25,
  },
};

// Export default configurations
export const DEFAULT_STYLING = {
  cornerRadius: 8,
  backgroundType: 'solid',
  backgroundColor: '#f0f0f0',
  backgroundGradientStart: '#f0f0f0',
  backgroundGradientEnd: '#e0e0e0',
  backgroundPattern: 'none',
  padding: 20,
};
