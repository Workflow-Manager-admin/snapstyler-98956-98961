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
 * Validate that a file is under the specified size limit
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} - Whether the file is under the size limit
 */
export const isValidFileSize = (file, maxSizeMB = 10) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
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
  
  // Find the image element inside the container
  const imageElement = imageContainer.querySelector('.preview-image');
  
  // Apply border radius to the image element instead of container
  if (imageElement) {
    imageElement.style.borderRadius = `${cornerRadius}px`;
  }
  
  // Apply padding to container
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
  // Dynamic import html2canvas for better code splitting
  const html2canvas = (await import('html2canvas')).default;
  
  try {
    const canvas = await html2canvas(previewElement, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null, // Transparent background
      scale: 2, // For better quality
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
};
