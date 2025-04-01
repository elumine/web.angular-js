angular.
  module('myApp').
  service('MessagesService', ['$http',
    function() {
      const successElement = document.querySelector('.success-message');
      const errorElement = document.querySelector('.error-message');

      let messageVisibilityTimer;
      this.showMessage = (type, text, duration = 1000) => {
        clearTimeout(messageVisibilityTimer);
        (type ? errorElement : successElement).innerHTML = text; 
        setVisibility(successElement, type === 0);
        setVisibility(errorElement, type === 1);
        setTimeout(() => {
          setVisibility(successElement, false);
          setVisibility(errorElement, false);
        }, duration);
      }

      function setVisibility(el, value) {
        el.style.display = value ? 'block' : 'none';
      }
    }
  ]);
