'use strict';

(function () {
  /**
   * Функция создания DOM-элементов меткок на карте
   */
  window.createButtons = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();
    for (var i = 0; i < HOUSE_QUANTITY; i++) {
      var positionX = houseArr[i].location.x + BUTTON_WIDTH / 2;
      var positionY = houseArr[i].location.y + BUTTON_HEIGHT / 2;
      var button = document.createElement('button');
      button.setAttribute('data-id', i);
      button.className = 'map__pin';
      button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      button.innerHTML = '<img src=' + houseArr[i].author.avatar + ' width="40" height="40" draggable="false">';
      buttons.appendChild(button);
    }

    mapPins.appendChild(buttons);
  };
})();
