// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

/*var camera = {
  front:undefined,
  back:undefined,
  stream:undefined
}

var gotSources = function (sourceInfos) {
    for (var i = 0; i < sourceInfos.length; i++) {
      if (sourceInfos[i].kind == 'video') {
        if(sourceInfos[i].facing=="environment") {
          camera.back=sourceInfos[i].id;
        } else {
          camera.front=sourceInfos[i].id;
        }
      }
    }
  }
MediaStreamTrack.getSources(gotSources);*/



navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var gLang = 'en';

var preorderLink = "";

var localization = {
  tryiton: {
    ru: 'Примерить',
    en: 'Try it on'
  },
  preorder: {
    ru: 'Предзаказ',
    en: 'Pre-order'
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

angular.module('starter', ['ionic','ngCordova'])

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
  $scope.preorderLink = preorderLink;
  $scope.openPreorder = function () {
    navigator.app.loadUrl($scope.preorderLink, { openExternal:true });
  }
})

.controller('categorylistCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state,$timeout) {
  $scope.categories = categories;
  $scope.shownCats = [];
  $scope.showCats = function () {
    var top = $ionicScrollDelegate.getScrollPosition().top;
    var cats = document.querySelectorAll(".category");
    var sum = 0;
    for (var i=0;i<cats.length;i++) {
      sum += cats[i].clientHeight;
      if (sum>screen.height+top) {
        //alert(sum);
        //alert(screen.height);
        break;
      } else if (sum>=top) {
        if (_.indexOf($scope.showCats,i)==-1) {
          $scope.shownCats.push(i);
          $scope.animateElementIn([cats[i]]);
        }
      }
    }
  }
  $timeout($scope.showCats);
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
  /*var views = document.querySelectorAll(".view, .pane");
  for (var i=0; i<views.length; i++) {
    views[i].classList.add('transback');
  }
  $scope.$on('$ionicView.leave', function(){
    var views = document.querySelectorAll(".view, .pane");
    for (var i=0; i<views.lenght; i++) {
      views[i].classList.remove('transback');
    }
    cordova.plugins.camerapreview.stopCamera();
  });*/
  $scope.n = $stateParams["n"];
  $scope.item = $scope.items[$scope.n];
  $scope.title = $scope.item["name"][$scope.lang];

  var tapEnabled = true; //enable tap take picture
  var dragEnabled = false; //enable preview box drag across the screen
  var toBack = false; //send preview box to the back of the webview
  var rect = {x: 0, y: 44, width: document.body.offsetWidth, height: (500-44)};
  cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack);
  //cordova.plugins.camerapreview.switchCamera();

  /*var cameraPriority = categories[$scope.item.categoryId].priority_front;

  $scope.cameraId = cameraPriority?camera.front:camera.back;

  alert($scope.cameraId);

  var video = document.getElementById('video');
  navigator.getUserMedia({video:{
    width: {max:1920},
    height: {max:1080},
    optional: [{sourceId: $scope.cameraId}]
  }},function(stream) {
    alert(stream);
    camera.stream = stream;
    video.src = window.URL.createObjectURL(stream);
    video.play();
    //video.width = screen.width;
    //video.height = screen.height;
  },function (e) {
    alert(e);
  });

  $scope.swapCamera = function () {
    $scope.cameraId = $scope.cameraId==camera.front?camera.back:camera.front;
    alert($scope.cameraId+"ok");
    if (camera.stream) {
      camera.stream.getVideoTracks()[0].stop();
    }
    alert($scope.cameraId);
    var video = document.getElementById('video');
    navigator.getUserMedia({video:{
      width: {max:1920},
      height: {max:1080},
      optional: [{sourceId: $scope.cameraId}]
    }},function(stream) {
      camera.stream = stream;
      video.src = window.URL.createObjectURL(stream);
      video.play();
      //video.width = screen.width;
      //video.height = screen.height;
    },function (e) {
      alert(e);
    }); 
  }*/

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