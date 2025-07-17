   ymaps.ready(init);
    
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [54.193122, 37.617348],
        zoom: 16,
        controls: ['zoomControl']
      });
      var myPlacemark = new ymaps.Placemark([54.183528, 37.611320], {
        hintContent: 'Hungry People Restaurant',
        balloonContent: 'Россия, г. Тула, ул. Тургеньевская, д. 69'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
      });
      
      myMap.geoObjects.add(myPlacemark);
      // Disable scroll zoom on mobile
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('scrollZoom');
      }
    }