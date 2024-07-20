    let zIndex = 1;

    class Window {
      constructor(title, iframeSrc = '', customButtons = [], theme = 'dark', icon = '', beforeClose = null) {
        this.title = title;
        this.iframeSrc = iframeSrc;
        this.customButtons = customButtons;
        this.theme = theme;
        this.icon = icon;
        this.beforeClose = beforeClose;
        this.createElement();
        this.addEventListeners();
      }

      createElement() {
        this.windowElement = document.createElement('div');
        this.windowElement.classList.add('window');
        if (this.theme === 'light') {
          this.windowElement.classList.add('light-theme');
        }

        this.titleBar = document.createElement('div');
        this.titleBar.classList.add('title-bar');

        const left = document.createElement('div');
        left.classList.add('left');

        this.iconElement = document.createElement('img');
        this.iconElement.classList.add('hidden');
        this.iconElement.style.width = '20px';
        this.iconElement.style.height = '20px';
        if (this.icon) {
          this.setIcon(this.icon);
        }
        left.appendChild(this.iconElement);

        this.titleElement = document.createElement('span');
        this.titleElement.textContent = this.title;
        left.appendChild(this.titleElement);

        this.customButtonsContainer = document.createElement('div');
        this.customButtonsContainer.classList.add('custom-buttons');
        
        this.divider = document.createElement('div');
        this.divider.classList.add('divider');
        
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('buttons');
        
        this.minimizeButton = document.createElement('i');
        this.minimizeButton.textContent = '__';
        this.minimizeButton.style.cursor = 'pointer';

        this.closeButton = document.createElement('i');
        this.closeButton.classList.add('fas', 'fa-times');
        this.closeButton.style.cursor = 'pointer';

        this.customButtons.forEach(button => {
          const btn = document.createElement('i');
          btn.className = button.icon;
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', button.onClick);
          this.customButtonsContainer.appendChild(btn);
        });

        this.titleBar.appendChild(left);
        if (this.customButtons.length > 0) {
          this.titleBar.appendChild(this.customButtonsContainer);
          this.titleBar.appendChild(this.divider);
        }
        this.buttonsContainer.appendChild(this.minimizeButton);
        this.buttonsContainer.appendChild(this.closeButton);
        this.titleBar.appendChild(this.buttonsContainer);

        this.contentElement = document.createElement('div');
        this.contentElement.classList.add('content');

        if (this.iframeSrc) {
          this.iframeElement = document.createElement('iframe');
          this.iframeElement.src = this.iframeSrc;
          this.iframeElement.style.width = '100%';
          this.iframeElement.style.height = '100%';
          this.iframeElement.style.border = 'none';
          this.contentElement.appendChild(this.iframeElement);
        }
        
        this.windowElement.appendChild(this.titleBar);
        this.windowElement.appendChild(this.contentElement);
        
        document.body.appendChild(this.windowElement);
        
        this.windowElement.style.top = '50px';
        this.windowElement.style.left = '50px';
      }

      addEventListeners() {
        this.closeButton.addEventListener('click', () => {
          if (this.beforeClose) {
            this.beforeClose(() => {
              this.windowElement.remove();
            });
          } else {
            this.windowElement.remove();
          }
        });

        this.minimizeButton.addEventListener('click', () => {
          this.hide();
        });

        this.windowElement.addEventListener('mousedown', () => {
          this.windowElement.style.zIndex = ++zIndex;
        });

        this.titleBar.addEventListener('mousedown', (e) => {
          this.onDragStart(e);
        });
        
        document.addEventListener('mousemove', (e) => {
          this.onDrag(e);
        });
        
        document.addEventListener('mouseup', () => {
          this.onDragEnd();
        });
      }

      onDragStart(e) {
        this.offsetX = e.clientX - this.windowElement.offsetLeft;
        this.offsetY = e.clientY - this.windowElement.offsetTop;
        this.isDragging = true;
      }

      onDrag(e) {
        if (this.isDragging) {
          this.windowElement.style.left = `${e.clientX - this.offsetX}px`;
          this.windowElement.style.top = `${e.clientY - this.offsetY}px`;
        }
      }

      onDragEnd() {
        this.isDragging = false;
      }

      show() {
        this.windowElement.style.display = 'block';
      }

      hide() {
        this.windowElement.style.display = 'none';
      }

      addButton(icon, onClick) {
        const btn = document.createElement('i');
        btn.className = icon;
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', onClick);
        this.customButtonsContainer.appendChild(btn);
        this.titleBar.insertBefore(this.divider, this.buttonsContainer);
      }

      removeButton(icon) {
        const buttons = this.customButtonsContainer.querySelectorAll('i');
        buttons.forEach(btn => {
          if (btn.className === icon) {
            this.customButtonsContainer.removeChild(btn);
          }
        });
        if (this.customButtonsContainer.children.length === 0) {
          this.titleBar.removeChild(this.divider);
        }
      }

      setTitle(newTitle) {
        this.titleElement.textContent = newTitle;
      }

      setResource(newResource) {
        if (!this.iframeElement) {
          this.iframeElement = document.createElement('iframe');
          this.iframeElement.style.width = '100%';
          this.iframeElement.style.height = '100%';
          this.iframeElement.style.border = 'none';
          this.contentElement.appendChild(this.iframeElement);
        }
        this.iframeElement.src = newResource;
      }

      setIcon(iconUrl) {
        this.iconElement.src = iconUrl;
        this.iconElement.classList.remove('hidden');
      }

      removeIcon() {
        this.iconElement.src = '';
        this.iconElement.classList.add('hidden');
      }

      toggleTheme(newTheme) {
        if (newTheme === 'dark') {
          this.windowElement.classList.remove('light-theme');
          this.theme = 'dark';
        } else {
          this.windowElement.classList.add('light-theme');
          this.theme = 'light';
        }
      }
    }

    class Alert {
      constructor(title, message, buttonText, onButtonClick) {
        this.title = title;
        this.message = message;
        this.buttonText = buttonText;
        this.onButtonClick = onButtonClick;
        this.createElement();
      }

      createElement() {
        this.alertElement = document.createElement('div');
        this.alertElement.classList.add('alert');

        this.titleBar = document.createElement('div');
        this.titleBar.classList.add('title-bar');

        this.titleElement = document.createElement('span');
        this.titleElement.textContent = this.title;

        this.closeButton = document.createElement('i');
        this.closeButton.classList.add('fas', 'fa-times');
        this.closeButton.style.cursor = 'pointer';

        this.titleBar.appendChild(this.titleElement);
        this.titleBar.appendChild(this.closeButton);

        this.contentElement = document.createElement('div');
        this.contentElement.classList.add('content');

        const messageElement = document.createElement('p');
        messageElement.textContent = this.message;

        const buttonElement = document.createElement('button');
        buttonElement.textContent = this.buttonText;
        buttonElement.addEventListener('click', this.onButtonClick);

        this.contentElement.appendChild(messageElement);
        this.contentElement.appendChild(buttonElement);

        this.alertElement.appendChild(this.titleBar);
        this.alertElement.appendChild(this.contentElement);

        document.body.appendChild(this.alertElement);

        this.alertElement.style.top = '50px';
        this.alertElement.style.left = '50px';

        this.addEventListeners();
      }

      addEventListeners() {
        this.closeButton.addEventListener('click', () => {
          this.alertElement.remove();
        });

        this.alertElement.addEventListener('mousedown', () => {
          this.alertElement.style.zIndex = ++zIndex;
        });

        this.titleBar.addEventListener('mousedown', (e) => {
          this.onDragStart(e);
        });

        document.addEventListener('mousemove', (e) => {
          this.onDrag(e);
        });

        document.addEventListener('mouseup', () => {
          this.onDragEnd();
        });
      }

      onDragStart(e) {
        this.offsetX = e.clientX - this.alertElement.offsetLeft;
        this.offsetY = e.clientY - this.alertElement.offsetTop;
        this.isDragging = true;
      }

      onDrag(e) {
        if (this.isDragging) {
          this.alertElement.style.left = `${e.clientX - this.offsetX}px`;
          this.alertElement.style.top = `${e.clientY - this.offsetY}px`;
        }
      }

      onDragEnd() {
        this.isDragging = false;
      }
    }
