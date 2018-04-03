(function() {

  //// yandex map

  var mapContainer = document.querySelector('#map');

  if (mapContainer) {
    ymaps.ready(init); // yandex map initialization
    function init() {
      var yMap = new ymaps.Map('map', {
        center: [59.93935341, 30.32937631],
        zoom: 16,
        controls: []
      });
      yMap.geoObjects.add(new ymaps.Placemark([59.938631, 30.323055], {
        hintContent: document.querySelector('.contact-info-address').innerHTML.split(':')[0],
        balloonContent: document.querySelector('.contact-info').innerHTML.split('<a class="btn')[0]
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icon/map-marker.svg',
        iconShadow: true,
        iconShadowImageHref: 'img/background/map-marker-shadow.png',
        iconImageSize: [80, 140],
        iconShadowImageSize: [182, 110],
        iconImageOffset: [-40, -143],
        iconShadowImageOffset: [-5, -111]
      }));
      yMap.controls.add('zoomControl', {
        size: 'small',
        position: {
          bottom: 50,
          left: 10
        }
      });
      yMap.behaviors.disable('scrollZoom');
    }
  }

  //// Popup menu progressive enhancement

  var subMenu = document.querySelector('.sub-menu');
  var subLinks = subMenu.querySelectorAll('a');
  var subMenuOut = subLinks.length;

  for (var i = 0; i < subMenuOut; i++) {
    subLinks[i].addEventListener('focus', function() {
      subMenu.classList.add('js-drop-down');
    });
  }

  var catalogueLink = document.querySelector('#catalogue-menu-item > a');

  catalogueLink.addEventListener('focus', function() {
    subMenu.classList.toggle('js-drop-down');
  });

  document.querySelector('#delivery-and-payment').addEventListener('focus', function() {
    subMenu.classList.remove('js-drop-down');
  });

  document.addEventListener('mousedown', function(evt) {
    subMenu.classList.remove('js-drop-down');
  });

  //// Form progressive enhancement

  // search form
  var searchLink = document.querySelector('#search .user-nav-btn');
  searchLink.addEventListener('mouseover', function(evt) {
    if (searchLink.hasAttribute('href')) {
      searchLink.removeAttribute('href');
    }
  });
  searchLink.addEventListener('mouseout', function(evt) {
    searchLink.setAttribute('href', '#search');
  });

  var searchForm = document.querySelector('#search form');
  var searchField = document.querySelector('#search-field');
  searchForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    searchField.value = searchField.value.trim();
    if (searchField.value) {
      searchForm.submit();
    }
  });

  // login form
  var mailRegExpression = /.+@.+\..+/i;

  var isStorageSupport = true;
  var storage = "";

  var loginLink = document.querySelector('#login .user-nav-btn');
  loginLink.addEventListener('mouseover', function(evt) {
    if (loginLink.hasAttribute('href')) {
      loginLink.removeAttribute('href');
    }
    try {
      if (!loginMail.value) {
        loginMail.value = localStorage.getItem('mail');
      }
      if (!loginPwd.value) {
        loginPwd.value = localStorage.getItem('pwd');
      }
    } catch (ex) {
      isStorageSupport = false;
    }
    if (!loginMail.value) {
      loginMail.focus();
    }
    else {
      loginPwd.focus();
    }
  });
  loginLink.addEventListener('mouseout', function(evt) {
    loginLink.setAttribute('href', '#login');
  });

  var loginMail = document.querySelector('#login-mail');
  loginMail.addEventListener('blur', function(evt) {
    loginMail.value = loginMail.value.trim();
    if (loginForm.classList.contains('js-modal-error')) {
      loginForm.classList.remove('js-modal-error');
    }
  });

  var loginPwd = document.querySelector('#login-pwd');
  loginPwd.addEventListener('blur', function(evt) {
    loginPwd.value = loginPwd.value.trim();
  });

  var loginForm = document.querySelector('#login form');
  loginForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    if (!loginMail.value || !mailRegExpression.test(loginMail.value)) {
      loginForm.classList.add('js-modal-error');
      loginMail.value = '';
      loginMail.focus();
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem('mail', loginMail.value);
        localStorage.setItem('pwd', loginPwd.value);
      }
      loginForm.submit();
      if (loginForm.classList.contains('js-modal-error')) {
        loginForm.classList.remove('js-modal-error');
      }
    }
  });
  loginForm.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && loginForm.classList.contains('js-modal-error')) {
      loginForm.classList.remove('js-modal-error');
    }
  });

  // shopping cart form
  var shoppingCartLink = document.querySelector('#shopping-cart .user-nav-btn');
  var shoppingCartNotEmpty;
  if (shoppingCartLink.hasAttribute('href')) {
    shoppingCartNotEmpty = true;
  }
  if (shoppingCartNotEmpty) {
    shoppingCartLink.addEventListener('mouseover', function(evt) {
      shoppingCartLink.removeAttribute('href');
    });
    shoppingCartLink.addEventListener('mouseout', function(evt) {
      shoppingCartLink.setAttribute('href', '#shopping-cart');
    });
  }

  // news subscribe form
  var subscribeForm = document.querySelector('.news-subscribe form');

  if (subscribeForm) {
    var subscribeMail = document.querySelector('#mail-subscribe');
    try {
      subscribeMail.value = localStorage.getItem('mail');
    } catch (ex) {
      isStorageSupport = false;
    }
    subscribeMail.addEventListener('blur', function(evt) {
      subscribeMail.value = subscribeMail.value.trim();
      if (subscribeForm.classList.contains('js-modal-error')) {
        subscribeForm.classList.remove('js-modal-error');
      }
    });

    subscribeForm.addEventListener('submit', function(evt) {
      evt.preventDefault();
      if (!subscribeMail.value || !mailRegExpression.test(subscribeMail.value)) {
        subscribeForm.classList.add('js-modal-error');
        subscribeMail.value = '';
        subscribeMail.focus();
      }
      else {
        subscribeForm.submit();
        if (subscribeForm.classList.contains('js-modal-error')) {
          subscribeForm.classList.remove('js-modal-error');
        }
      }
    });
  }

  //// Modal form: Feedback

  var feedbackContainer = document.querySelector('#feedback');
  var feedbackForm = document.querySelector('#feedback form');
  var feedbackName = document.querySelector('#feedback-name');
  var feedbackMail = document.querySelector('#feedback-mail');
  var feedbackText = document.querySelector('#feedback-text');

  if (mapContainer) {
    var feedbackLink = document.querySelector('#map .btn');
    feedbackLink.addEventListener('mouseover', function(evt) {
      feedbackLink.removeAttribute('href');
    });
    feedbackLink.addEventListener('mouseout', function(evt) {
      feedbackLink.setAttribute('href', '#feedback');
    });
    feedbackLink.addEventListener('click', function(evt) {
      try {
        feedbackContainer.classList.add('js-modal');
        feedbackName.value = localStorage.getItem('name');
        feedbackMail.value = localStorage.getItem('mail');
        feedbackText.value = localStorage.getItem('text');
      } catch (ex) {
        isStorageSupport = false;
      }

      if (!feedbackName.value) {
        feedbackName.focus();
      }
      else if (!feedbackMail.value) {
        feedbackMail.focus();
      }
      else {
        feedbackText.focus();
      }
    });
  }

  feedbackName.addEventListener('blur', function(evt) {
    feedbackName.value = feedbackName.value.trim();
  });

  feedbackMail.addEventListener('blur', function(evt) {
    feedbackMail.value = feedbackMail.value.trim();
    if (feedbackForm.classList.contains('js-modal-error')) {
      feedbackForm.classList.remove('js-modal-error');
    }
  });

  feedbackText.addEventListener('blur', function(evt) {
    feedbackText.value = feedbackText.value.trim();
  });

  feedbackForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    if (!feedbackMail.value || !mailRegExpression.test(feedbackMail.value)) {
      feedbackForm.classList.add('js-modal-error');
      feedbackMail.value = '';
      feedbackMail.focus();
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem('name', feedbackName.value);
        localStorage.setItem('text', feedbackText.value);
      }
      feedbackForm.submit();
      if (feedbackForm.classList.contains('js-modal-error')) {
        feedbackForm.classList.remove('js-modal-error');
      }
      feedbackContainer.classList.remove('js-modal');
    }
  });
  feedbackForm.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (feedbackForm.classList.contains('js-modal-error')) {
        feedbackForm.classList.remove('js-modal-error');
      }
      feedbackContainer.classList.remove('js-modal');
    }
  });

  var feedbackClose = document.querySelector('.modal-close');
  feedbackClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (feedbackForm.classList.contains('js-modal-error')) {
      feedbackForm.classList.remove('js-modal-error');
    }
    feedbackContainer.classList.remove('js-modal');
  });

  // the event handler on clicking a submit button to check the emptyness of a field.
  var submitButtons = document.querySelectorAll('button[type="submit"]');
  for (var i = 0; i < submitButtons.length; i++) {

    submitButtons[i].addEventListener('click', function (evt) {

      var targetElement = evt.target || evt.srcElement;
      var targetForm =  targetElement.closest('form');
      var requiredInputs = targetForm.querySelectorAll('[required]')

      for (var i = 0; i < requiredInputs.length; i++) {
        // if it is empty
        if (requiredInputs[i].value === '') {
          targetForm.classList.add('js-modal-error');
          setTimeout(function() {
            targetForm.classList.remove('js-modal-error');
          }, 300 );
          return true;
        }
      }
    });
  }

})();

