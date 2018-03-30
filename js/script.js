
 var Gllacy = Gllacy || {}; //Gllacy namespace

// yandex map
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

// Popup menu progressive enhancement
var subMenu = document.querySelector('.sub-menu');
var subLinks = subMenu.getElementsByTagName('a');
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

