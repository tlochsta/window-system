![WE Preview](https://github.com/tlochsta/window-system/blob/main/WE-example.png?raw=true)
# WindowEngine (WE)

**WindowEngine (WE)** is a JavaScript-based library for creating and managing draggable, resizable, and customizable windows on your web page. It also includes a simplified alert system for displaying notifications. This document provides an overview of the functionality, methods, and examples for using both the window and alert systems.

## Features

- **Draggable and Resizable Windows**
- **Customizable Title Bars with Icons and Buttons**
- **Light and Dark Theme Support**
- **Favicon Management**
- **Custom Buttons with Callback Functions**
- **Alert System for Notifications**

## Functions

### Window

#### Constructor
- **`new Window(title, iframeSrc = '', customButtons = [], theme = 'dark', icon = '', beforeClose = null)`**
  - `title`: The title of the window.
  - `iframeSrc`: Optional URL for an iframe to be displayed in the window's content.
  - `customButtons`: Array of custom buttons to be added to the title bar. Each button object should include:
    - `icon`: FontAwesome icon class.
    - `onClick`: Function to be executed on button click.
  - `theme`: Theme of the window, either `'dark'` or `'light'`.
  - `icon`: Optional URL for the window's favicon.
  - `beforeClose`: Optional function to be executed before the window closes.

#### Methods
- **`show()`**
  - Displays the window.

- **`hide()`**
  - Hides the window.

- **`addButton(icon, onClick)`**
  - Adds a custom button to the title bar.
  - `icon`: FontAwesome icon class.
  - `onClick`: Function to be executed on button click.

- **`removeButton(icon)`**
  - Removes a custom button from the title bar.
  - `icon`: FontAwesome icon class to be removed.

- **`setTitle(newTitle)`**
  - Sets the window title.
  - `newTitle`: New title string.

- **`setResource(newResource)`**
  - Sets or updates the iframe source.
  - `newResource`: URL of the new iframe source.

- **`setIcon(iconUrl)`**
  - Sets the window's favicon.
  - `iconUrl`: URL of the favicon image.

- **`removeIcon()`**
  - Removes the window's favicon.

- **`toggleTheme(newTheme)`**
  - Toggles between dark and light themes.
  - `newTheme`: Theme to be applied (`'dark'` or `'light'`).

### Alert

#### Constructor
- **`new Alert(title, message, buttonText, onButtonClick)`**
  - `title`: The title of the alert window.
  - `message`: The message content of the alert.
  - `buttonText`: The text displayed on the alert's button.
  - `onButtonClick`: Function to be executed when the button is clicked.

#### Methods
- **`createElement()`**
  - Creates and displays the alert window.

- **`addEventListeners()`**
  - Adds event listeners to handle dragging and closing actions.

## Example Usage

### Creating a Window

```javascript
const myWindow = new Window(
  'My Window',                            // Title
  'https://example.com',                 // iFrame Source
  [
    { icon: 'fas fa-cog', onClick: () => alert('Settings clicked') }
  ],                                     // Custom Buttons
  'dark',                                // Theme
  'https://example.com/favicon.ico',     // Icon
  (close) => {                           // Before Close Function
    new Alert('Confirm Close', 'Are you sure?', 'Yes', close);
  }
);

// Show the window
myWindow.show();

// Set a new title
myWindow.setTitle('New Title');

// Update iframe source
myWindow.setResource('https://newexample.com');

// Add a new custom button
myWindow.addButton('fas fa-info', () => alert('Info button clicked'));

// Remove a custom button
myWindow.removeButton('fas fa-cog');

// Change theme
myWindow.toggleTheme('light');

// Remove icon
myWindow.removeIcon();
```
### Creating an Alert
```javascript
const myAlert = new Alert(
  'Alert Title',                        // Title
  'This is an alert message.',          // Message
  'Close',                              // Button Text
  () => {                               // Button Click Function
    console.log('Alert button clicked');
  }
);
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing
Contributions are welcome! Please submit a pull request or open an issue to contribute to the project.
