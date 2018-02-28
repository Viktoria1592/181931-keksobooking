'use strict';

(function () {
  var BUTTON_WIDTH = 50;
  var BUTTON_HEIGHT = 70;
  /**
   * Функция создания DOM-элементов меткок на карте
   */
  var createButtons = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();
    for (var i = 0; i < window.HOUSE_QUANTITY; i++) {
      var positionX = window.houseArr[i].location.x + BUTTON_WIDTH / 2;
      var positionY = window.houseArr[i].location.y + BUTTON_HEIGHT / 2;
      var button = document.createElement('button');
      button.setAttribute('data-id', i);
      button.className = 'map__pin';
      button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      button.innerHTML = '<img src=' + window.houseArr[i].author.avatar + ' width="40" height="40" draggable="false">';
      buttons.appendChild(button);
    }

    mapPins.appendChild(buttons);
  };

  window.pin = {
    createButtons: createButtons,
  };
})();
