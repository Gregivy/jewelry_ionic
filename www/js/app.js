// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var gLang = 'en';

var localization = {
  tryiton: {
    ru: 'Примерить',
    en: 'Try it on'
  },
  visitus: {
    ru: 'Наш магазин',
    en: 'Visit us'
  },
  back: {
    ru: 'Назад',
    en: 'Back'
  }
};

angular.module('starter', ['ionic','ngCordova','angular-scroll-animate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      navigator.globalization.getPreferredLanguage(
        function (language) {
          if (language.indexOf('ru')) {
            gLang = 'ru';
          } else {
            gLang = 'en';
          }
        },
        function () {alert('Error getting language\n');}
      );
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    controller: 'categorylistCtrl',
    templateUrl: 'pages/categorylist.html'
  })
  .state('category', {
    url: '/category/:n',
    controller: 'itemlistCtrl',
    templateUrl: 'pages/itemlist.html'
  })
  .state('itempreview', {
    url: '/preview/:n',
    controller: 'itempreviewCtrl',
    templateUrl: 'pages/itempreview.html'
  })
  .state('itemdetails', {
    url: '/item/:n',
    controller: 'itemdetailsCtrl',
    templateUrl: 'pages/itemdetails.html'
  });
  $urlRouterProvider.otherwise("/");
})

.controller('index', function($scope,$http,$ionicScrollDelegate,$stateParams,$state) {
  $scope.localization = localization;
  $scope.lang = gLang;
  $scope.items = items;
})

.controller('categorylistCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state,$timeout) {
  $scope.categories = categories;
  $scope.animateElementIn = function ($el) {
    console.log($el[0]);
    //console.log(($el).querySelectorAll("img"));
    //for (var i=0; i<$el[0].getElementsByTagName("img").length; i++) {
      var anim = function (i) {
        console.log(i);
        $el[0].getElementsByTagName("img")[i].classList.remove('not-visible');
        $el[0].getElementsByTagName("img")[i].classList.add('animated');
        $el[0].getElementsByTagName("img")[i].classList.add('fadeIn');
        if ((i+1)<$el[0].getElementsByTagName("img").length) {setTimeout(function(){anim(i+1);},100*i);}
      }
      anim(1);
    //}
    //$el.addClass('animated fadeInUp');
  };
  $scope.showCategory = function (n) {
    $state.go("category", {n:n});
  }
})


.controller('itemlistCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state) {
  $scope.n = $stateParams["n"];
  $scope.title = categories[$scope.n][$scope.lang];
  $scope.items = _.filter($scope.$parent.items,function (item) {
    return item["categoryId"] == $scope.n;
  });
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
  $scope.showDetails = function(n) {
    $state.go("itemdetails", {n:n});
  };
})

.controller('itempreviewCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state) {
  $scope.n = $stateParams["n"];
  $scope.item = $scope.items[$scope.n];
  $scope.title = $scope.item["name"][$scope.lang];
  canvasMain = document.getElementById("camera");
                                          CanvasCamera.initialize(canvasMain);
                                          // define options
                                          var opt = {
                                              quality: 75,
                                              destinationType: CanvasCamera.DestinationType.DATA_URL,
                                              encodingType: CanvasCamera.EncodingType.JPEG,
                                              saveToPhotoAlbum:true,
                                              correctOrientation:true,
                                              width:640,
                                              height:480
                                          };
                                          CanvasCamera.start(opt);
})

.controller('itemdetailsCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state) {
  $scope.n = $stateParams["n"];
  $scope.item = $scope.items[$scope.n];
  $scope.title = $scope.item["name"][$scope.lang];
      var swiper = new Swiper('.my-swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        freeMode: true,
        coverflow: {
            rotate: 30,
            stretch: -10,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    }); 
    $scope.showPreview = function () {
      $state.go("itempreview",{n:$scope.n})
    };
});