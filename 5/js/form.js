'use strict';

/**
 * Функция валидации формы отправки
 */
(function () {
  /**
   * Функция добавления атрибута disabled у формы
   */
  var addFormDisabled = function () {
    var fieldets = document.querySelectorAll('.form__element');
    for (var i = 0; i < fieldets.length; i++) {
      fieldets[i].disabled = true;
    }
  };
  addFormDisabled();

  /**
   * Функция удаления атрибута disabled у формы
   */
  window.removeFormDisabled = function () {
    var fieldets = document.querySelectorAll('.form__element');
    for (var i = 0; i < fieldets.length; i++) {
      fieldets[i].disabled = false;
    }
  };

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
        for (var i = 0; i < noticeFormRoomCapacity.options.length; i++) {
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
})();
