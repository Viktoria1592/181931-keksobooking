'use strict';

(function () {
  window.AVATAR_URL = 'img/avatars/user0';
  window.AVATAR_TYPE = '.png';
  window.HOUSE_QUANTITY = 8;
  var HOUSE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
  var HOUSE_CHECHIN = ['12:00', '13:00', '14:00'];
  var HOUSE_CHECHOUT = ['12:00', '13:00', '14:00'];
  var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  /**
   * Функция создания одного объекта
   * @param   {number} step
   * @return {object}
   */
  var createHouse = function (step) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(150, 500);
    var newArrOfFeatures = HOUSE_FEATURES.slice(0, getRandomNumber(0, HOUSE_FEATURES.length));
    var house = {
      author: {
        avatar: AVATAR_URL + (step + 1) + AVATAR_TYPE
      },
      offer: {
        title: getRandomItem(HOUSE_TITLE),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomItem(HOUSE_TYPE),
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 3),
        checkin: getRandomItem(HOUSE_CHECHIN),
        checkout: getRandomItem(HOUSE_CHECHOUT),
        features: newArrOfFeatures,
        description: '',
        photos: shuffleArray(HOUSE_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return house;
  };

  window.houseArr = [];
  for (var i = 0; i < HOUSE_QUANTITY; i++) {
    houseArr.push(createHouse(i));
  }


    /**
   * Функция создания PopUp окна с предложением на карте
   * @param {object} house
   */
  window.createPopUp = function (house) {

    var mapFilters = document.querySelector('.map__filters-container');
    var popUpTemplate = document.querySelector('template').content;
    var popUpTemlateElement = popUpTemplate.querySelector('article');
    var popUpElement = popUpTemlateElement.cloneNode(true);

    popUpElement.querySelector('.popup__close').addEventListener('click', closePopUp);
    popUpElement.querySelector('h3').textContent = house.offer.title;
    popUpElement.querySelector('p small').textContent = house.offer.address;
    popUpElement.querySelector('.popup__price').innerHTML = house.offer.price + ' &#x20bd;' + ' /ночь';
    popUpElement.querySelector('h4').textContent = roomType(house.offer.type);
    popUpElement.querySelectorAll('h4 + p').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей';
    popUpElement.querySelectorAll('p + p').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
    popUpElement.querySelectorAll('p')[4].textContent = house.description;
    popUpElement.querySelector('.popup__avatar').src = house.author.avatar;
    var features = popUpElement.querySelector('.popup__features');
    features.innerHTML = '';

    for (i = 0; i < house.offer.features.length; i++) {
      var featureLi = document.createElement('li');
      featureLi.className = 'feature feature--' + house.offer.features[i];
      features.appendChild(featureLi);
    }
    var pictures = popUpElement.querySelector('.popup__pictures');
    for (i = 0; i < house.offer.photos.length; i++) {
      var photoLi = document.createElement('li');
      photoLi.innerHTML = '<img src="' + house.offer.photos[i] + '" width="65" height="65">';
      pictures.appendChild(photoLi);
    }

    closePopUp();
    map.addEventListener('keydown', onPopupEscPress);
    map.insertBefore(popUpElement, mapFilters);
  };

  /**
   * Функция отрисовки Popup окна
   * @param {object} evt
   */
  var onPinClickhandler = function (evt) {
    var target = evt.currentTarget;
    var offerId = target.getAttribute('data-id');
    createPopUp(houseArr[offerId]);
  };

  /**
   * Функция отрисовки Popup окна по нажатию на метку
   */
  window.openPopUp = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', onPinClickhandler);
    }
  };

  /**
   * Функция закрытия popup окна при клике
   */
  window.closePopUp = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
      document.removeEventListener('keydown', onPopupEscPress);
      map.removeEventListener('keydown', onPopupEscPress);
    }
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopUp();
    }
  };
})();
