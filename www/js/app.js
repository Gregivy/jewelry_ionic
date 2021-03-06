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

//angular.module('templates', []); 

fabric.Object.prototype.setCenterToOrigin = function () {
    var originPoint = this.translateToOriginPoint(
    this.getCenterPoint(),
    this._originalOriginX,
    this._originalOriginY);

    this.set({
        originX: this._originalOriginX,
        originY: this._originalOriginY,
        left: originPoint.x,
        top: originPoint.y
    });
};

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var gLang = 'en';

document.addEventListener("deviceready", function () {
  //if (!CameraPreview) {CameraPreview = cordova.plugins.camerapreview;}

});

var preorderLink = "http://grani-store.com/";

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
  },
  modalTitle: {
    ru: 'Регистрация',
    en: 'Register'
  },
  urname: {
    ru: 'Ваше имя',
    en: 'Your name'
  },
  urmail: {
    ru: 'Ваша почта',
    en: 'Your email'
  },
  submit: {
    ru: 'Отправить',
    en: 'Submit'
  },
  reqfield: {
    ru: 'Поле не может быть пустым!',
    en: 'This field is required!'
  },
  reqmail: {
    ru: 'Неверный адрес email!',
    en: 'Wrong email address!'
  }
};

angular.module('starter', ['ionic','ngCordova','ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var myStyle = document.styleSheets[0];
    myStyle.insertRule(".swiper-slide { width: "+0.6*window.innerWidth+"px !important; height: "+0.75*window.innerWidth+"px !important}", 1);
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

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $stateProvider
  .state('index', {
  	cache: true,
    url: '/',
    controller: 'categorylistCtrl',
    templateUrl: 'pages/categorylist.html'
  })
  .state('category', {
  	cache: true,
    url: '/category/:n',
    controller: 'itemlistCtrl',
    templateUrl: 'pages/itemlist.html'
  })
  .state('itempreview', {
  	cache: false,
    url: '/preview/:n',
    controller: 'itempreviewCtrl',
    templateUrl: 'pages/itempreview.html'
  })
  .state('itemdetails', {
  	cache: false,
    url: '/item/:n',
    controller: 'itemdetailsCtrl',
    templateUrl: 'pages/itemdetails.html'
  });
  $urlRouterProvider.otherwise("/");
})

.controller('index', function($scope,$http,$ionicScrollDelegate,$stateParams,$state,$ionicModal) {
  $http.get("http://138.201.20.220:4000/link.php").then(function (rsp) {
  	if (rsp.status==200) preorderLink = rsp.data;
  });
  $ionicModal.fromTemplateUrl('pages/mymodal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal;
  });
  document.addEventListener("deviceready", function () {
	  if (device.platform=="iOS") {
	  	$scope.specRules = ["top: 20px !important;","bottom: 0px !important;"];
	  } else {
	  	$scope.specRules = ["",""];
	  }
  });
  $scope.$on('$ionicView.enter', function(){
    if (localStorage.getItem('registered')!=='true') {
      localStorage.setItem('registered', 'true');
      $scope.modal.show();
    }
  });
  $scope.username = "";
  $scope.usermail = "";
  $scope.send = function (form) {
    if(form.$valid) {
      $http.get("http://138.201.20.220:4000/index.php?key=jiefj93p3XOIEJF32Sfefed&name="+form.username.$modelValue+"&mail="+form.usermail.$modelValue).then(function() {
        $scope.modal.hide();
      });
    }
  }
        /*navigator.globalization.getPreferredLanguage(
        function (language) {
          if (language.value.indexOf('ru')>-1) {
            $scope.lang  = 'ru';
          } else {
            $scope.lang  = 'en';
          }
        },
        function () {alert('Error getting language\n');}
      );*/

  $scope.lang = navigator.language.indexOf('ru')>-1?'ru':'en';
  $scope.localization = localization;
  $scope.shownCats = [];
  //$scope.lang = gLang;
  $scope.items = items;
  $scope.preorderLink = preorderLink;
  $scope.visitusLink = visitusLink;
  $scope.modalTitle = $scope.localization.modalTitle[$scope.lang];
  $scope.urname = $scope.localization.urname[$scope.lang];
  $scope.urmail = $scope.localization.urmail[$scope.lang];
  $scope.submit = $scope.localization.submit[$scope.lang];
  $scope.reqfield = $scope.localization.reqfield[$scope.lang];
  $scope.reqmail = $scope.localization.reqmail[$scope.lang];
  $scope.openPreorder = function () {
    cordova.InAppBrowser.open($scope.preorderLink, '_system');
  }
  $scope.visitUs = function () {
    cordova.InAppBrowser.open($scope.visitusLink, '_system');
  }
})

.controller('categorylistCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state,$timeout) {
  //$timeout(function() {$ionicScrollDelegate.$getByHandle('handler').freezeScroll(true);},0);
  $scope.canBeScrolled = false;
  $scope.$on('$ionicView.loaded', function () {
  	$scope.canBeScrolled = true;
  	$timeout($scope.showCats,2000);
  	//$ionicScrollDelegate.$getByHandle('handler').freezeScroll(false);
  } );
  $scope.categories = categories;
  $scope.showCats = function () {
  	if ($scope.canBeScrolled) {
	    var top = $ionicScrollDelegate.$getByHandle('handler').getScrollPosition().top;
	    var cats = document.querySelectorAll(".category");
	    var sum = 0;
	    for (var i=0;i<cats.length;i++) {
	      sum += cats[i].clientHeight;
	      if (sum>window.innerHeight+top) {
	        //alert(sum);
	        //alert(screen.height);
	        break;
	      } else if (sum>=top) {
	        if (_.indexOf($scope.shownCats,i)==-1) {
	          $scope.shownCats.push(i);
	          $scope.animateElementIn([cats[i]],i);
	        }
	      }
	    }
	}
  }
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
  //$timeout($scope.showCats);
  $scope.animated = false;
  $scope.animateElementIn = function ($el,n) {
    //console.log(($el).querySelectorAll("img"));
    //for (var i=0; i<$el[0].getElementsByTagName("img").length; i++) {
      var anim = function (i) {
        $scope.animated = true;
        console.log($scope.categories[n].imgs);
        $el[0].getElementsByTagName("img")[i].classList.remove('not-visible');
        $el[0].getElementsByTagName("img")[i].classList.add('animated');
        $el[0].getElementsByTagName("img")[i].classList.add('fadeIn');
        if ((i+1)<$el[0].getElementsByTagName("img").length) {setTimeout(function(){anim(i+1);},120+30*i);} else {
          $scope.animated = false;
          console.log(n);
          $scope.$apply(function() {
          	
          	$timeout(function() {
          		$el[0].getElementsByTagName("img")[0].classList.remove('not-visible');
          		$scope.categories[n].imgs = [];
          	},100);
          });
          console.log($scope.categories[n].imgs);
        }
      }
      anim(1);
    //}
    //$el.addClass('animated fadeInUp');
  };
  $scope.repeatAnimation = function () {
    /*if (!$scope.animated) {
      var imgs = document.querySelectorAll(".category img");
      for (var i=0;i<imgs.length;i++) {
        imgs[i].classList.add('not-visible');
        imgs[i].classList.remove('animated');
        imgs[i].classList.remove('fadeIn');
      }
      $scope.shownCats = [];
      $scope.showCats();
    }*/
  }
  $scope.showCategory = function (n) {
    $state.go("category", {n:n});
  }
})


.controller('itemlistCtrl', function($scope,$http,$ionicScrollDelegate,$stateParams,$state) {
  $scope.n = $stateParams["n"];
  $scope.title = categories[$scope.n][$scope.lang];
  $scope.globalItems = $scope.$parent.items;
  $scope.items = _.filter($scope.$parent.items,function (item) {
    return item["categoryId"] == $scope.n;
  });
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
  $scope.showDetails = function(n) {
  	console.log(n);
    $state.go("itemdetails", {n:n});
  };
  $scope.showPreview = function (n) {
    $state.go("itempreview",{n:n})
  };
})

.controller('itempreviewCtrl', function($scope,$timeout,$ionicPopup,$http,$ionicScrollDelegate,$stateParams,$state,$ionicLoading,$ionicHistory ) {
  
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
    //cordova.plugins.camerapreview.stopCamera();
  });

  $scope.n = $stateParams["n"];
  $scope.item = $scope.items[$scope.n];
  $scope.cat = $scope.item.categoryId;
  $scope.title = $scope.item["name"];
  $scope.photoTaken = false;
  $scope.savingphoto = false;
  $scope.tryitonImg = null;
  $scope.photo = null;
  $scope.imgControls = null;


  var canvas = new fabric.Canvas('photo', {
  	selection: false,
  	stateful: false,
  	enableRetinaScaling: true
  });
  canvas.setHeight(window.innerHeight-44);
  canvas.setWidth(window.innerWidth);
  var c = canvas.getElement(); // canvas = fabric.Canvas
      var w = c.width, h = c.height;

    // Scale the canvas up by two for retina
    // just like for an image
      c.setAttribute('width', w*window.devicePixelRatio);
      c.setAttribute('height', h*window.devicePixelRatio);

    // then use css to bring it back to regular size
    // or set it here
    //    c.setAttribute('style', 'width="'+w+'"; height="'+h+'";')
    // or jQuery  $(c).css('width', w);
    //      $(c).css('width', w);
    //      $(c).css('height', h);

      // finally set the scale of the context
      c.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
  canvas.renderAll();
  /*canvas.on('mouse:up', function(event){ 
  	//alert(event.target);
  	var el = event.target;
  	el.filters.push(new fabric.Image.filters.Resize({
      	 resizeType: 'bilinear', // typo fixed
      	 scaleX: 1,
      	 scaleY: 1
    }));
    el.applyFilters(function () {
    	//canvas.renderAll();
    });
  });*/

  var createPrevPhoto = function () {
  	if ($scope.cat!=3) {
	    fabric.Image.fromURL("./store/"+$scope.item.tryitonImg, function(oImg) {
	      /*var scaling = canvas.getHeight() / oImg.height;
	      oImg.filters.push(new fabric.Image.filters.Resize({
        	resizeType: 'sliceHack', scaleX: scaling , scaleY: scaling 
    	  }));*/
	      oImg.set('lockUniScaling',true);
	      if ($scope.cat==0) {
		      oImg.scaleToWidth(Math.round(window.innerWidth/6));
		      
		      oImg.set('left',(window.innerWidth-oImg.width*oImg.getScaleX())/2);
		      oImg.set('top',(window.innerHeight-44-oImg.height*oImg.getScaleX())/2);
		      //oImg.center();
		      //oImg.setCoords();
	  	  } else if ($scope.cat==1) {
	  	  	  oImg.scaleToWidth(Math.round(window.innerWidth/2.5));
		      oImg.set('left',(window.innerWidth-oImg.width*oImg.getScaleX())/2);
		      oImg.set('top',(window.innerHeight-44-oImg.height*oImg.getScaleX())/1.5);
		      //oImg.center();
		      //oImg.setCoords();
	  	  } else if ($scope.cat==2) {
	  	  	  oImg.scaleToHeight(Math.round(window.innerWidth/1.8));
		      oImg.set('left',(window.innerWidth-oImg.width*oImg.getScaleX())/2);
		      oImg.set('top',(window.innerHeight-44-oImg.height*oImg.getScaleX())/2.5);
		      //oImg.center();
		      //oImg.setCoords();
	  	  } else if ($scope.cat==4) {
	  	  	  oImg.scaleToWidth(Math.round((window.innerWidth)/6.5));
		      oImg.set('left',(window.innerWidth-oImg.width*oImg.getScaleX())/3.8);
		      oImg.set('top',(window.innerHeight-44-oImg.height*oImg.getScaleY())/1.5);
		      //oImg.center();
		      //oImg.setCoords();
	  	  }
	      oImg.set('selectable', false);
		  oImg.set('hasControls', false);
		  oImg.set('hasBorders', false);
		  oImg.set('padding', 10000);
		  /*oImg.resizeFilters.push(new fabric.Image.filters.Resize({
    			resizeType: 'bilinear'
			}));*/
		  canvas.add(oImg);
	      $scope.tryitonImg = oImg;
	      
	    });
	} else {
		fabric.Image.fromURL("./store/"+$scope.item.tryitonImg, function(oImg) {
			console.log($scope.item.tryitonImg);
			$scope.tryitonImg = [];
			$scope.tryitonImg.push(oImg);
			oImg.set('lockUniScaling',true);
			if ($scope.title=="Plates" || $scope.title=="Plates Black") {
				oImg.scaleToWidth(Math.round(window.innerWidth/14));
			} else if ($scope.title=="Delta" || $scope.title=="Delta Black") {
				oImg.scaleToWidth(Math.round(window.innerWidth/13));
			} else if ($scope.title=="Passage" || $scope.title=="Passage Black") {
				oImg.scaleToWidth(Math.round(window.innerWidth/22));
			} else {
				oImg.scaleToWidth(Math.round(window.innerWidth/20));
			}
			oImg.set('left',(window.innerWidth*0.1));
		    oImg.set('top',(window.innerHeight-44-oImg.height*oImg.getScaleY())/1.8);
		    oImg.set('selectable', false);
			oImg.set('hasControls', false);
			oImg.set('hasBorders', false);
			oImg.set('padding', Math.round(window.innerWidth/5));
			console.log(oImg);
			canvas.add(oImg);
			oImg.clone(function(c) {
				c.set('lockUniScaling',true);
				if ($scope.title=="Plates" || $scope.title=="Plates Black") {
					c.scaleToWidth(Math.round(window.innerWidth/14));
				} else if ($scope.title=="Delta" || $scope.title=="Delta Black") {
					c.scaleToWidth(Math.round(window.innerWidth/13));
				} else if ($scope.title=="Passage" || $scope.title=="Passage Black") {
					c.scaleToWidth(Math.round(window.innerWidth/22));
				} else {
					c.scaleToWidth(Math.round(window.innerWidth/20));
				}
				c.set('left',(window.innerWidth)*0.9-c.width*c.getScaleY());
				console.log(c.right);
		    	c.set('top',oImg.top);
				c.set('selectable', false);
				c.set('hasControls', false);
				c.set('hasBorders', false);
				c.set('padding', Math.round(window.innerWidth/5));
				c.set('flipX', true);
				canvas.add(c);
				$scope.tryitonImg.push(c);
			});
		});
	}
  }
  createPrevPhoto();

  /*var hammertime = Hammer(document.getElementById('zoomwrapper1'), {
        transform_always_block: true,
        transform_min_scale: 1,
        drag_block_horizontal: true,
        drag_block_vertical: true,
        drag_min_distance: 0
    });
 
    var posX=0, posY=0,
		lastPosX=0, lastPosY=0,
		bufferX=0, bufferY=0,
        scale=1, last_scale,
        rotation= 1, last_rotation, dragReady=0;
 
    hammertime.on('touch drag dragend transform', function(ev) {
        elemRect = document.getElementById('zoom1');
		manageMultitouch(ev);
    });

function manageMultitouch(ev){
 
		switch(ev.type) {
            case 'touch':
                last_scale = scale;
                last_rotation = rotation;
 
                break;
 
            case 'drag':
                	posX = ev.gesture.deltaX + lastPosX;
                	posY = ev.gesture.deltaY + lastPosY;
                break;
 
            case 'transform':
                rotation = last_rotation + ev.gesture.rotation;
                scale = last_scale * ev.gesture.scale;
                break;
 
			case 'dragend':
				lastPosX = posX;
				lastPosY = posY;
				break;
        }
 
        var transform =
                "translate3d("+posX+"px,"+posY+"px, 0) " +
                "scale3d("+scale+","+scale+", 1) " +
                "rotate("+rotation+"deg) ";
 
        elemRect.style.transform = transform;
        elemRect.style.oTransform = transform;
        elemRect.style.msTransform = transform;
        elemRect.style.mozTransform = transform;
        elemRect.style.webkitTransform = transform;
	}*/


  var cameraPriority = categories[$scope.item.categoryId].priority_front;
  var camera = cameraPriority?"front":"back";
  //var camera = cameraPriority?"front":"rear";
  $scope.props = {x: 0, y: 44, width: window.innerWidth, height: window.innerHeight-44, camera: camera, tapPhoto: false, previewDrag: false, toBack: true};
  
  //cordova.plugins.camerapreview.startCamera({x: 0, y: 44, width: window.innerWidth, height: window.innerHeight-44}, "front", false, false, true);

  CameraPreview.startCamera($scope.props);
  CameraPreview.setOnPictureTakenHandler(function (picture) {
  //cordova.plugins.camerapreview.setOnPictureTakenHandler(function (result) {
    //$scope.photo = picture; // base64 picture;
    //var picture = result[0];
    fabric.Image.fromURL("./img/arrows.png", function(ar) {
    	ar.scaleToWidth(window.innerWidth/12);
    	ar.set('top',window.innerHeight-ar.height*ar.getScaleY()-180);
    	ar.set('left',window.innerWidth-ar.width*ar.getScaleX()-20);
    	ar.set('lockUniScaling',true);
		ar.set('selectable', false);
		ar.set('hasControls', false);
		ar.set('hasBorders', false);
		$scope.imgControls = ar;
		canvas.add(ar);
		ar.bringToFront();
    });
    var img = document.createElement("img");
    img.onload = function(){
      var fImg = new fabric.Image(img, {
        top:0,
        left:0
      });
      fImg.set('selectable', false);
	  fImg.scaleToHeight(window.innerHeight-44);
	  fImg.set('left', -0.5*(fImg.get('width')*fImg.getScaleX()-window.innerWidth));
	  //alert(-0.5*(fImg.get('height')*fImg.getScaleY()-window.innerHeight));
	  if (device.platform=="Android") {
	  	  if ($scope.cat==0) {
	      	$scope.tryitonImg.scale($scope.tryitonImg.getScaleX()*0.8);
	      } else if ($scope.cat==1) {
	      	$scope.tryitonImg.scale($scope.tryitonImg.getScaleX()*0.9);
	      } else if ($scope.cat==2) {
	      	$scope.tryitonImg.scale($scope.tryitonImg.getScaleX()*0.8);
	      } else if ($scope.cat==4) {
	      	$scope.tryitonImg.scale($scope.tryitonImg.getScaleX()*0.8);
	      } else if ($scope.cat==3) {
	      	$scope.tryitonImg[0].set('left',$scope.tryitonImg[0].get('left')+fImg.get('left'));
	      	$scope.tryitonImg[1].set('left',$scope.tryitonImg[1].get('left')-fImg.get('left'));
	      	$scope.tryitonImg[0].scale($scope.tryitonImg[0].getScaleX()*0.9);
	      	$scope.tryitonImg[1].scale($scope.tryitonImg[1].getScaleX()*0.9);
	      }
  	  }
      //alert(fImg.get('width')*fImg.getScaleX());
      //var m = (fImg.get('width')*fImg.getScaleX()-window.innerWidth)/2;
      //$scope.tryitonImg.scaleToWidth($scope.tryitonImg.get('width')*$scope.tryitonImg.getScaleX()-m*fImg.getScaleX());
      //$scope.tryitonImg.set('left',$scope.tryitonImg.get('left')+m);
      //fImg.set('width', window.innerWidth);
      //fImg.set('height', window.innerHeight-44);
      $scope.photo = fImg;
      if ($scope.cat!=3) {
      	$scope.tryitonImg.set('selectable', true);
      	$scope.tryitonImg.set('top', $scope.tryitonImg.get('top')+16);
      } else {
      	$scope.tryitonImg[0].set('selectable', true);
      	$scope.tryitonImg[0].set('top', $scope.tryitonImg[0].get('top')+16);
      	$scope.tryitonImg[1].set('selectable', true);
      	$scope.tryitonImg[1].set('top', $scope.tryitonImg[1].get('top')+16);
      }
      canvas.add(fImg);
      fImg.sendToBack();
      CameraPreview.stopCamera();
      //cordova.plugins.camerapreview.stopCamera();
      $ionicLoading.hide();
    }
    if (device.platform=="Android") {
	      img.src = "data:image/png;base64," + picture;
  	 }
    else {
    	img.src = picture;
    }
  });
  $scope.swapCamera = function () {
    CameraPreview.switchCamera();
    //cordova.plugins.camerapreview.switchCamera();
  }
  $scope.takePhoto = function () {

    CameraPreview.takePicture({maxWidth:window.innerWidth, maxHeight:window.innerHeight-44});
    //cordova.plugins.camerapreview.takePicture();
    $scope.photoTaken = true;
    $ionicLoading.show({
      template: $scope.localization.pleasewait[$scope.lang]
    });
    /*var imgElement = document.getElementById('zoomwrapper1');
    domtoimage.toSvg(imgElement)
    .then(function (dataUrl) {;
		var img = new Image();
		img.src = dataUrl;
        document.getElementById('canvasplaceholder').appendChild(img);
        //document.getElementById('canvasplaceholder').appendChild(Pablo(img).toImage("jpg"));
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });*/
  }
  $scope.retakePhoto = function () {
    /*$ionicLoading.show({
      template: $scope.localization.pleasewait[$scope.lang]
    });*/
    if ($scope.imgControls) $scope.imgControls.remove();
    $scope.photoTaken = false;
    if ($scope.cat!=3) {
    	$scope.tryitonImg.remove();
    } else {
    	$scope.tryitonImg[0].remove();
    	$scope.tryitonImg[1].remove();
    }
    createPrevPhoto();
    $scope.photo.remove();
    CameraPreview.startCamera($scope.props);
    //$timeout(function () {$ionicLoading.hide();},200);
  }
  $scope.savePhoto = function () {
  	$scope.savingphoto = true;
  	$scope.imgControls.remove();
    canvas.deactivateAll().renderAll();
    /*window.canvas2ImagePlugin.saveImageDataToLibrary(function(m){
      $ionicPopup.alert({
        title: $scope.localization.savesuccess[$scope.lang],
        template: m
      });
      $ionicHistory.goBack();
    },function(e){
      alert(e);
      $ionicHistory.goBack();
    },
    document.getElementById('photo'));*/
    var options = {
  		//message: 'share this', // not supported on some apps (Facebook, Instagram)
  		//subject: 'the subject', // fi. for email
  		files: [document.getElementById('photo').toDataURL()], // an array of filenames either locally or remotely
  		//url: 'https://www.website.com/foo/#bar?a=b',
  		//chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
	}
	var onSuccess = function(result) {
		$scope.savingphoto = false;
  		/*$ionicPopup.alert({
        	title: $scope.localization.savesuccess[$scope.lang],
        	template: ""
      	});*/
      	$ionicHistory.goBack();
	}

	var onError = function(msg) {
		$scope.savingphoto = false;
  		alert(msg);
  		$ionicHistory.goBack();
	}
    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
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