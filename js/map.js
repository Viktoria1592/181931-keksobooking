'use strict';

var AVATAR_URL = 'img/avatars/user0';
var AVATAR_TYPE = '.png';
var HOUSE_QUANTITY = 8;
var HOUSE_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var HOUSE_CHECHIN = ['12:00', '13:00', '14:00'];
var HOUSE_CHECHOUT = ['12:00', '13:00', '14:00'];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BUTTON_WIDTH = 50;
var BUTTON_HEIGHT = 70;

/**
 * Функция генерации случайного числа
 * @param   {number} min Минимальное значение
 * @param   {number} max Максимальное знаение
 * @return {number} [[Description]]
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

var roomType = function (russianRoomType) {
  var roomTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  return roomTypes[russianRoomType];
};

/**
 * [[Description]]
 * @param   {number} step [[Description]]
 * @return {object} [[Description]]
 */
var createHouse = function (step) {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(150, 500);
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
      features: HOUSE_FEATURES.slice(0, getRandomNumber(0, HOUSE_FEATURES.length)),
      description: '',
      photos: HOUSE_PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return house;
};

var houseArr = [];
for (var i = 0; i < HOUSE_QUANTITY; i++) {
  houseArr.push(createHouse(i));
}

var activateMap = document.querySelector('.map');
activateMap.classList.remove('map--faded');

/**
 * Функция создания DOM-элементов меткок на карте
 */
var createButtons = function () {
  var mapPins = document.querySelector('.map__pins');
  var buttons = document.createDocumentFragment();
  for (i = 0; i < 8; i++) {
    var positionX = houseArr[i].location.x + BUTTON_WIDTH / 2;
    var positionY = houseArr[i].location.y + BUTTON_HEIGHT / 2;
    var button = document.createElement('button');
    button.className = 'map__pin';
    button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
    button.innerHTML = '<img src=' + houseArr[i].author.avatar + ' width="40" height="40" draggable="false">';
    buttons.appendChild(button);
  }

  mapPins.appendChild(buttons);
};

createButtons();

/**
 * Функция создания PopUp окна с предложением на карте
 * @param {object} house [[Description]]
 */
var createPopUp = function (house) {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var PopUpTemplate = document.querySelector('template').content;
  var PopUpElement = PopUpTemplate.cloneNode(true);

  PopUpElement.querySelector('h3').textContent = house.offer.title;
  PopUpElement.querySelector('p small').textContent = house.offer.address;
  PopUpElement.querySelector('.popup__price').innerHTML = house.offer.price + ' &#x20bd;' + ' /ночь';
  PopUpElement.querySelector('h4').textContent = roomType(house.offer.type);
  PopUpElement.querySelectorAll('h4 + p').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей';
  PopUpElement.querySelectorAll('p + p').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
  PopUpElement.querySelectorAll('p')[4].textContent = house.description;
  PopUpElement.querySelector('.popup__avatar').src = house.author.avatar;

  var features = PopUpElement.querySelector('.popup__features');
  features.innerHTML = '';
  for (i = 0; i < house.offer.features.length; i++) {
    var featureLi = document.createElement('li');
    featureLi.className = 'feature feature--' + house.offer.features[i];
    features.appendChild(featureLi);
  }

  var pictures = PopUpElement.querySelector('.popup__pictures');
  for (i = 0; i < house.offer.photos.length; i++) {
    var photoLi = document.createElement('li');
    photoLi.innerHTML = '<img src="' + house.offer.photos[i] + '" width="65" height="65">';
    pictures.appendChild(photoLi);
  }

  map.insertBefore(PopUpElement, mapFilters);
};

createPopUp(houseArr[0]);
