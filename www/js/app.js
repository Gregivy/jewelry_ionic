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

document.addEventListener("deviceready", function () {
  //if (!CameraPreview) {CameraPreview = cordova.plugins.camerapreview;}
  navigator.globalization.getPreferredLanguage(
        function (language) {
          if (language.value.indexOf('ru')) {
            gLang = 'ru';
          } else {
            gLang = 'en';
          }
        },
        function () {alert('Error getting language\n');}
      );
});

var preorderLink = "http://yandex.ru/";

var visitusLink = "http://grani-store.com/"

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
  save: {
    ru: 'Cохранить',
    en: 'Save'
  },
  retake: {
    ru: 'Переснять',
    en: 'Retake'
  },
  pleasewait: {
    ru: 'Пожалуйста подождите...',
    en: 'Please wait...'
  },
  savesuccess: {
    ru: 'Изображение сохранено!',
    en: 'Image saved!'
  }
};

angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var myStyle = document.styleSheets[0];
    myStyle.insertRule(".swiper-slide { width: "+0.6*window.innerWidth+"px !important; height: "+0.6*window.innerWidth+"px !important}", 1);
    if(window.cordova && window.cordova.plugins.Keyboard) {
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
  $scope.visitusLink = visitusLink;
  $scope.openPreorder = function () {
    cordova.InAppBrowser.open($scope.preorderLink, '_system');
  }
  $scope.visitUs = function () {
    cordova.InAppBrowser.open($scope.visitusLink, '_system');
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
      if (sum>window.innerHeight+top) {
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
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
  $timeout($scope.showCats);
  $scope.animated = false;
  $scope.animateElementIn = function ($el) {
    //console.log(($el).querySelectorAll("img"));
    //for (var i=0; i<$el[0].getElementsByTagName("img").length; i++) {
      var anim = function (i) {
        $scope.animated = true;
        $el[0].getElementsByTagName("img")[i].classList.remove('not-visible');
        $el[0].getElementsByTagName("img")[i].classList.add('animated');
        $el[0].getElementsByTagName("img")[i].classList.add('fadeIn');
        if ((i+1)<$el[0].getElementsByTagName("img").length) {setTimeout(function(){anim(i+1);},120+10*i);} else {
          $scope.animated = false;
        }
      }
      anim(1);
    //}
    //$el.addClass('animated fadeInUp');
  };
  $scope.repeatAnimation = function () {
    if (!$scope.animated) {
      var imgs = document.querySelectorAll(".category img");
      for (var i=0;i<imgs.length;i++) {
        imgs[i].classList.add('not-visible');
        imgs[i].classList.remove('animated');
        imgs[i].classList.remove('fadeIn');
      }
      $scope.shownCats = [];
      $scope.showCats();
    }
  }
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
  $scope.showPreview = function (n) {
    $state.go("itempreview",{n:n})
  };
})

.controller('itempreviewCtrl', function($scope,$timeout,$ionicPopup,$http,$ionicScrollDelegate,$stateParams,$state,$ionicLoading,$ionicHistory ) {
  
  alert(CameraPreview);
  alert(cordova.plugins.camerapreview);
  cordova.plugins.camerapreview = CameraPreview;
  alert(cordova.plugins.camerapreview);

  $scope.$on('$ionicView.enter', function(){
    var views = document.querySelectorAll(".view, .pane");
    for (var i=0; i<views.length; i++) {
      views[i].classList.add('transback');
    }
  });
  
  $scope.$on('$ionicView.beforeLeave', function(){
    var views = document.querySelectorAll(".view, .pane");
    for (var i=0; i<views.length; i++) {
      views[i].classList.remove('transback');
    }
    CameraPreview.stopCamera();
  });

  $scope.n = $stateParams["n"];
  $scope.item = $scope.items[$scope.n];
  $scope.title = $scope.item["name"];
  $scope.photoTaken = false;
  $scope.tryitonImg = null;
  $scope.photo = null;

  document.querySelector("#photo").width = window.innerWidth;
  document.querySelector("#photo").height = window.innerHeight-44;
  var canvas = new fabric.Canvas('photo');
  canvas.selection = false;

  var createPrevPhoto = function () {
    fabric.Image.fromURL("./store/"+$scope.item.tryitonImg, function(oImg) {
      oImg.scale(0.2);
      oImg.set('lockUniScaling',true);
      oImg.set('left',(window.innerWidth-oImg.width*0.2)/2);
      oImg.set('top',(window.innerHeight-44-oImg.height*0.2)/2);
      //oImg.center();
      //oImg.setCoords();
      oImg.set('selectable', false);
      oImg.set('hasControls', false);
      oImg.set('hasBorders', false);
      oImg.set('padding', 10000);
      canvas.add(oImg);
      $scope.tryitonImg = oImg;
    });
  }
  createPrevPhoto();


  var cameraPriority = categories[$scope.item.categoryId].priority_front;
  var camera = cameraPriority?"front":"back";
  //var camera = cameraPriority?"front":"rear";
  $scope.props = {x: 0, y: 44, width: window.innerWidth, height: window.innerHeight-44, camera: camera, tapPhoto: false, previewDrag: false, toBack: true};
  //$scope.props = {x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, camera: camera, tapPhoto: false, previewDrag: false, toBack: true};
  cordova.plugins.camerapreview.startCamera($scope.props);
  CameraPreview.setOnPictureTakenHandler(function (picture) {
    //$scope.photo = picture; // base64 picture;
    var img = document.createElement("IMG");
    img.onload = function(){
      var fImg = new fabric.Image(img, {
        top:0,
        left:0
      });
      fImg.set('selectable', false);
      fImg.scaleToHeight(window.innerHeight-44);
      fImg.set('left', -0.5*(fImg.get('width')*fImg.getScaleX()-window.innerWidth));
      $scope.tryitonImg.scale(0.18);
      //alert(fImg.get('width')*fImg.getScaleX());
      //var m = (fImg.get('width')*fImg.getScaleX()-window.innerWidth)/2;
      //$scope.tryitonImg.scaleToWidth($scope.tryitonImg.get('width')*$scope.tryitonImg.getScaleX()-m*fImg.getScaleX());
      //$scope.tryitonImg.set('left',$scope.tryitonImg.get('left')+m);
      //fImg.set('width', window.innerWidth);
      //fImg.set('height', window.innerHeight-44);
      $scope.photo = fImg;
      $scope.tryitonImg.set('selectable', true);
      canvas.add(fImg);
      fImg.sendBackwards();
      CameraPreview.stopCamera();
      $ionicLoading.hide();
    }
    img.src = "data:image/png;base64," + picture;
  });
  $scope.swapCamera = function () {
    CameraPreview.switchCamera();
  }
  $scope.takePhoto = function () {
    CameraPreview.takePicture();
    $scope.photoTaken = true;
    $ionicLoading.show({
      template: $scope.localization.pleasewait[$scope.lang]
    });
  }
  $scope.retakePhoto = function () {
    $ionicLoading.show({
      template: $scope.localization.pleasewait[$scope.lang]
    });
    $scope.photoTaken = false;
    $scope.tryitonImg.remove();
    createPrevPhoto();
    $scope.photo.remove();
    CameraPreview.startCamera($scope.props);
    $timeout(function () {$ionicLoading.hide();},200);
  }
  $scope.savePhoto = function () {
    canvas.deactivateAll().renderAll();
    window.canvas2ImagePlugin.saveImageDataToLibrary(function(m){
      $ionicPopup.alert({
        title: $scope.localization.savesuccess[$scope.lang],
        template: m
      });
      $ionicHistory.goBack();
    },function(e){
      alert(e);
      $ionicHistory.goBack();
    },document.getElementById('photo'));
  }
  

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
  $scope.title = $scope.item["name"];
  $scope.$on('$ionicView.enter', function () {
    var swiper = new Swiper('.my-swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        freeMode: true,
        coverflow: {
            rotate: 30,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows : false
        }
    });      
  }); 
    $scope.showPreview = function () {
      $state.go("itempreview",{n:$scope.n})
    };
});