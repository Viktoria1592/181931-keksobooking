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
var MAIN_BUTTON_WIDTH = 65;
var MAIN_BUTTON_HEIGHT = 87;
var MAIN_BUTTON_START_TOP = 375;
var MAIN_BUTTON_START_LEFT = 50;
var TOP_LIMIT = 150;
var BOTTOM_LIMIT = 500;
var ESC_KEYCODE = 27;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');

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

var roomType = function (russianRoomType) {
  var roomTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  return roomTypes[russianRoomType];
};

/**
 * Функция перетаскивания метки и активации карты
 */

var mainPinMouseUpHandler = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  createButtons();
  removeFormDisabled();
  setAddress();
  openPopUp();
  setAddress();
};

var mainPinMouseDownHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mainPinMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var mainPinY = mainPin.offsetTop + MAIN_BUTTON_HEIGHT;
    var mainPinX = mainPin.offsetLeft + MAIN_BUTTON_WIDTH / 2;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mainPinX - shift.x <= map.offsetWidth) && (mainPinX - shift.x >= mainPin.offsetWidth)) {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }
    if ((mainPinY - shift.y <= BOTTOM_LIMIT) && (mainPinY - shift.y >= TOP_LIMIT)) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAddress();
    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', mainPinMouseMoveHandler);
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

/**
 * Функция получения координат главной метки
 * @return {number} координаты x, y
 */
var getMainPinCoordinates = function () {
  var x = mainPin.offsetLeft - MAIN_BUTTON_WIDTH / 2;
  var y = mainPin.offsetTop + MAIN_BUTTON_HEIGHT;

  return x + ', ' + y;
};

/**
 * Функция добавления координат главной точки в поле адрес
 */
var setAddress = function () {
  noticeForm.querySelector('#address').value = getMainPinCoordinates();
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

var houseArr = [];
for (var i = 0; i < HOUSE_QUANTITY; i++) {
  houseArr.push(createHouse(i));
}

/**
 * Функция добавления атрибута disabled у формы
 */
var addFormDisabled = function () {
  var fieldets = document.querySelectorAll('.form__element');
  for (i = 0; i < fieldets.length; i++) {
    fieldets[i].disabled = true;
  }
};
addFormDisabled();

/**
 * Функция удаления атрибута disabled у формы
 */
var removeFormDisabled = function () {
  var fieldets = document.querySelectorAll('.form__element');
  for (i = 0; i < fieldets.length; i++) {
    fieldets[i].disabled = false;
  }
};

/**
 * Функция создания DOM-элементов меткок на карте
 */
var createButtons = function () {
  var mapPins = document.querySelector('.map__pins');
  var buttons = document.createDocumentFragment();
  for (i = 0; i < HOUSE_QUANTITY; i++) {
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

/**
 * Функция создания PopUp окна с предложением на карте
 * @param {object} house
 */
var createPopUp = function (house) {

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
var openPopUp = function () {
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', onPinClickhandler);
  }
};

/**
 * Функция закрытия popup окна при клике
 */
var closePopUp = function () {
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

/**
 * Функция валидации формы отправки
 */
var validateNoticeForm = function () {
  noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
  var MIN_PRICES = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var noticeFormType = document.querySelector('#type');
  var noticeFormPrice = document.querySelector('#price');
  var noticeFormTimeIn = document.querySelector('#timein');
  var noticeFormTimeOut = document.querySelector('#timeout');
  var noticeFormRoomNumber = document.querySelector('#room_number');
  var noticeFormRoomCapacity = document.querySelector('#capacity');

  noticeFormType.addEventListener('change', function (evt) {
    var target = evt.target;
    noticeFormPrice.min = MIN_PRICES[target.value];
  });

  noticeFormTimeIn.addEventListener('change', function () {
    noticeFormTimeOut.value = noticeFormTimeIn.value;
  });

  noticeFormTimeOut.addEventListener('change', function () {
    noticeFormTimeIn.value = noticeFormTimeOut.value;
  });

  var compareRoomsGuests = function (value) {
    if (+value !== 100) {
      noticeFormRoomCapacity.value = value;
      for (i = 0; i < noticeFormRoomCapacity.options.length; i++) {
        if (+value >= +noticeFormRoomCapacity.options[i].value && +noticeFormRoomCapacity.options[i].value !== 0) {
          noticeFormRoomCapacity.options[i].disabled = false;
        } else {
          noticeFormRoomCapacity.options[i].disabled = true;
        }
      }
    } else {
      noticeFormRoomCapacity.value = '0';
      for (i = 0; i < noticeFormRoomCapacity.options.length; i++) {
        if (+noticeFormRoomCapacity.options[i].value > 0) {
          noticeFormRoomCapacity.options[i].disabled = true;
        }
      }
    }
  };
  compareRoomsGuests(noticeFormRoomNumber.value);

  noticeFormPrice.addEventListener('invalid', function () {
    if (noticeFormPrice.validity.tooLong) {
      noticeFormPrice.setCustomValidity('Максимальное значение — 1 000 000');
    }
  });

  noticeFormRoomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    compareRoomsGuests(target.value);
  });
};
validateNoticeForm();

/**
 * Функция очистки формы и карты
 */
var resetNoticeForm = function () {
  var resetNoticeFormButton = document.querySelector('.form__reset');
  resetNoticeFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
    validateNoticeForm();
    closePopUp();
    mainPin.style.top = MAIN_BUTTON_START_TOP + 'px';
    mainPin.style.left = MAIN_BUTTON_START_LEFT + '%';
    setAddress();
  });
};
resetNoticeForm();
