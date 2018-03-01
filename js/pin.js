'use strict';

(function () {
  var BUTTON_WIDTH = 50;
  var BUTTON_HEIGHT = 70;

  /**
   * Функция создания DOM-элементов меткок на карте
   * @param {Array} pins
   */
  var createButtons = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var positionX = pins[i].location.x + BUTTON_WIDTH / 2;
      var positionY = pins[i].location.y + BUTTON_HEIGHT / 2;
      var button = document.createElement('button');
      button.setAttribute('data-id', i);
      button.className = 'map__pin';
      button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      button.innerHTML = '<img src=' + pins[i].author.avatar + ' width="40" height="40" draggable="false">';
      buttons.appendChild(button);
    }

    mapPins.appendChild(buttons);

    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', onPinClickhandler);
    }
  };

  /**
   * Функция отрисовки Popup окна
   * @param {object} evt
   */
  var onPinClickhandler = function (evt) {
    var target = evt.currentTarget;
    var offerId = target.getAttribute('data-id');
    window.createPopUp(window.housesArr[offerId]);
  };


  window.pin = {
    createButtons: createButtons,
  };
})();
