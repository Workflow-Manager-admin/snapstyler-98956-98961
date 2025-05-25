/**
 * Utility functions for handling image operations in SnapStyler
 */

/**
 * Convert a File object to a data URL for preview
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - A promise that resolves to the data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Validate that a file is an acceptable image type
 * @param {File} file - The file to validate
 * @returns {boolean} - Whether the file is a valid image type
 */
export const isValidImageType = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Apply styling to an image element based on styling options
 * @param {HTMLElement} imageContainer - The container element to style
 * @param {Object} stylingOptions - The styling options to apply
 */
export const applyImageStyling = (imageContainer, stylingOptions) => {
  if (!imageContainer) return;

  const {
    cornerRadius,
    backgroundType,
    backgroundColor,
    backgroundGradientStart,
    backgroundGradientEnd,
    backgroundPattern,
    padding
  } = stylingOptions;

  // Apply border radius
  imageContainer.style.borderRadius = `${cornerRadius}px`;
  
  // Apply padding
  imageContainer.style.padding = `${padding}px`;

  // Apply background based on type
  switch (backgroundType) {
    case 'gradient':
      imageContainer.style.background = `linear-gradient(to bottom right, ${backgroundGradientStart}, ${backgroundGradientEnd})`;
      break;
    case 'pattern':
      if (backgroundPattern !== 'none') {
        imageContainer.style.backgroundImage = `url(${backgroundPattern})`;
        imageContainer.style.backgroundRepeat = 'repeat';
      }
      break;
    case 'solid':
    default:
      imageContainer.style.backgroundColor = backgroundColor;
      break;
  }
};

/**
 * Generate a downloadable image from the styled preview
 * @param {HTMLElement} previewElement - The element to capture as an image
 * @returns {Promise<string>} - A promise that resolves to the data URL of the generated image
 */
export const generateShareableImage = async (previewElement) => {
  // This is a placeholder - in a real app, we would use a library like html2canvas
  // to convert the DOM element to an image
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock implementation - would be replaced with actual image generation
      resolve('data:image/png;base64,mockedImageDataUrlHere');
    }, 500);
  });
};
