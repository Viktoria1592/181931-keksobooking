'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

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
    popUpElement.querySelector('h4').textContent = window.utils.roomType(house.offer.type);
    popUpElement.querySelectorAll('h4 + p').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей';
    popUpElement.querySelectorAll('p + p').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
    popUpElement.querySelectorAll('p')[4].textContent = house.description;
    popUpElement.querySelector('.popup__avatar').src = house.author.avatar;
    var features = popUpElement.querySelector('.popup__features');
    features.innerHTML = '';

    for (var i = 0; i < house.offer.features.length; i++) {
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
    window.createPopUp(window.houseArr[offerId]);
  };

  /**
   * Функция отрисовки Popup окна по нажатию на метку
   */
  var openPopUp = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPin.length; i++) {
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

  window.popup = {
    close: closePopUp,
    open: openPopUp
  };
})();
