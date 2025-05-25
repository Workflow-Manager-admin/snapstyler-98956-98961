# SnapStyler

A web application that allows users to beautify screenshots for social media by generating stylish backgrounds, customizing corner radius, changing backgrounds, and adding their user handle before sharing.

## Features

- **Screenshot Upload**: Drag and drop or click to upload your screenshot
- **Beautification Options**:
  - Apply corner radius to make your screenshots look polished
  - Choose from solid colors, gradients, or pattern backgrounds
  - Adjust padding for the perfect framing
- **Personal Branding**: Add your user handle to identify your content
- **Save & Share**: Download your beautified screenshot or share it to social media

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Component Structure

SnapStyler follows a modular design with the following components:

- **MainContainer**: Orchestrates all subcomponents and provides the app structure
- **ImageUploader**: Handles image upload functionality with drag and drop support
- **StyleControls**: Provides UI controls for customizing the screenshot appearance
- **Preview**: Displays a live preview of the styled screenshot

## Customization

The app includes several predefined style presets:
- Clean
- Modern
- Minimal
- Vibrant

Users can also create custom styles by adjusting individual parameters.

## Future Enhancements

- More background patterns and textures
- Advanced filters and effects
- Direct social media integration
- Cloud storage for user presets
