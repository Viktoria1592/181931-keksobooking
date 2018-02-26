'use strict';

(function () {
  window.BUTTON_WIDTH = 50;
  window.BUTTON_HEIGHT = 70;
  window.MAIN_BUTTON_WIDTH = 65;
  window.MAIN_BUTTON_HEIGHT = 87;
  window.MAIN_BUTTON_START_TOP = 375;
  window.MAIN_BUTTON_START_LEFT = 50;
  window.TOP_LIMIT = 150;
  window.BOTTOM_LIMIT = 500;
  window.ESC_KEYCODE = 27;

  window.map = document.querySelector('.map');
  window.mainPin = document.querySelector('.map__pin--main');
  window.noticeForm = document.querySelector('.notice__form');

  /**
   * Функция генерации случайного числа
   * @param   {number} min Минимальное значение
   * @param   {number} max Максимальное знаение
   * @return {number} возвращает число
   */
  window.getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * Функция генерации рандомного элемента массива
   * @param   {number} array Массив
   * @return {number} Номер элемента из массива
   */
  window.getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  /**
   * Функция перемешивания массива
   * @param   {Array} array
   * @return {Array}
   */
  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.roomType = function (russianRoomType) {
    var roomTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };
    return roomTypes[russianRoomType];
  };
})();
