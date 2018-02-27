'use strict';

(function () {
  /**
   * Функция генерации случайного числа
   * @param   {number} min Минимальное значение
   * @param   {number} max Максимальное знаение
   * @return {number} возвращает число
   */
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * Функция генерации рандомного элемента массива
   * @param   {number} array Массив
   * @return {number} Номер элемента из массива
   */
  var getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  /**
   * Функция перемешивания массива
   * @param   {Array} array
   * @return {Array}
   */
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var roomType = function (russianRoomType) {
    var roomTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };
    return roomTypes[russianRoomType];
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    shuffleArray: shuffleArray,
    roomType: roomType
  };
})();
