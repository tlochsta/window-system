let testWindow;

    document.getElementById('createWindow').addEventListener('click', () => {
      testWindow = new Window('Test Window', '', [
        {
          icon: 'fas fa-cog',
          onClick: () => alert('Settings button clicked')
        }
      ], 'dark', '', (close) => {
        new Alert('Confirm Close', 'Are you sure you want to close this window?', 'Yes', close);
      });
    });

    document.getElementById('testShowHide').addEventListener('click', () => {
      if (testWindow) {
        if (testWindow.windowElement.style.display === 'none') {
          testWindow.show();
        } else {
          testWindow.hide();
        }
      }
    });

    document.getElementById('testSetTitle').addEventListener('click', () => {
      const newTitle = document.getElementById('testTitleInput').value;
      if (testWindow) {
        testWindow.setTitle(newTitle);
      }
    });

    document.getElementById('testSetResource').addEventListener('click', () => {
      const newResource = document.getElementById('testResourceInput').value;
      if (testWindow) {
        testWindow.setResource(newResource);
      }
    });

    document.getElementById('testAddButton').addEventListener('click', () => {
      const icon = document.getElementById('testButtonIcon').value;
      if (testWindow) {
        testWindow.addButton(icon, () => alert(`${icon} button clicked`));
      }
    });

    document.getElementById('testRemoveButton').addEventListener('click', () => {
      const icon = document.getElementById('testRemoveButtonIcon').value;
      if (testWindow) {
        testWindow.removeButton(icon);
      }
    });

    document.getElementById('testSetIcon').addEventListener('click', () => {
      const iconUrl = document.getElementById('testIconUrl').value;
      if (testWindow) {
        testWindow.setIcon(iconUrl);
      }
    });

    document.getElementById('testRemoveIcon').addEventListener('click', () => {
      if (testWindow) {
        testWindow.removeIcon();
      }
    });

    document.getElementById('testToggleTheme').addEventListener('click', () => {
      if (testWindow) {
        if (testWindow.theme === 'dark') {
          testWindow.toggleTheme('light');
        } else {
          testWindow.toggleTheme('dark');
        }
      }
    });

    document.getElementById('launchAlert').addEventListener('click', () => {
      new Alert('Alert Title', 'This is an alert message.', 'Close', () => {
        document.querySelector('.alert').remove();
      });
    });
