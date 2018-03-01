'use strict';
(function () {
/*  var AVATAR_URL = 'img/avatars/user0';
  var AVATAR_TYPE = '.png';
  window.HOUSE_QUANTITY = 8;
  var HOUSE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
  var HOUSE_CHECHIN = ['12:00', '13:00', '14:00'];
  var HOUSE_CHECHOUT = ['12:00', '13:00', '14:00'];
  var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];*/

  window.noticeForm = document.querySelector('.notice__form');
  /**
   * Функция создания одного объекта
   * @param   {number} step
   * @return {object}
   */
  /*var createHouse = function (step) {
    var locationX = window.utils.getRandomNumber(300, 900);
    var locationY = window.utils.getRandomNumber(150, 500);
    var newArrOfFeatures = HOUSE_FEATURES.slice(0, window.utils.getRandomNumber(0, HOUSE_FEATURES.length));
    var house = {
      author: {
        avatar: AVATAR_URL + (step + 1) + AVATAR_TYPE
      },
      offer: {
        title: window.utils.getRandomItem(HOUSE_TITLE),
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(1000, 1000000),
        type: window.utils.getRandomItem(HOUSE_TYPE),
        rooms: window.utils.getRandomNumber(1, 3),
        guests: window.utils.getRandomNumber(1, 3),
        checkin: window.utils.getRandomItem(HOUSE_CHECHIN),
        checkout: window.utils.getRandomItem(HOUSE_CHECHOUT),
        features: newArrOfFeatures,
        description: '',
        photos: window.utils.shuffleArray(HOUSE_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return house;
  };

  window.houseArr = [];
  for (var i = 0; i < window.HOUSE_QUANTITY; i++) {
    window.houseArr.push(createHouse(i));
  }*/

})();
