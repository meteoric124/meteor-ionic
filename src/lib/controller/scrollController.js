/**
 * @private
 */
meteoric.controller.ionicScroll =
function($scope, scrollViewOptions) {
  //$location  // todo: deal with this when $location was created.

  var self = this;
  // for testing
  self.__timeout = $timeout;

  self._scrollViewOptions = scrollViewOptions; //for testing
  self.isNative = function() {
    return !!scrollViewOptions.nativeScrolling;
  };

  var element = self.element = scrollViewOptions.el;
  var $element = self.$element = jqLite(element);
  var scrollView;
  if (self.isNative()) {
    scrollView = self.scrollView = new ionic.views.ScrollNative(scrollViewOptions);
  } else {
    scrollView = self.scrollView = new ionic.views.Scroll(scrollViewOptions);
  }


  //Attach self to element as a controller so other directives can require this controller
  //through `require: '$ionicScroll'
  //Also attach to parent so that sibling elements can require this
  ($element.parent().length ? $element.parent() : $element)
    .data('$$ionicScrollController', self);

  $ionicScrollDelegate.addInstance(this);

  if (!isDefined(scrollViewOptions.bouncing)) {
    ionic.Platform.ready(function() {
      if (scrollView && scrollView.options) {
        scrollView.options.bouncing = true;
        if (ionic.Platform.isAndroid()) {
          // No bouncing by default on Android
          scrollView.options.bouncing = false;
          // Faster scroll decel
          scrollView.options.deceleration = 0.95;
        }
      }
    });
  }

  var resize = scrollView.resize.bind(scrollView);
  $window.on('resize', resize);

  var scrollFunc = function(e) {
    var detail = (e.originalEvent || e).detail || {};
    $scope.$onScroll && $scope.$onScroll({
      event: e,
      scrollTop: detail.scrollTop || 0,
      scrollLeft: detail.scrollLeft || 0
    });
  };

  $element.on('scroll', scrollFunc);

  $scope.$on('$destroy', function() {
    $ionicScrollDelegate.removeInstance(this);
    scrollView && scrollView.__cleanup && scrollView.__cleanup();
    $window.off('resize', resize);
    $element.off('scroll', scrollFunc);
    scrollView = self.scrollView = scrollViewOptions = self._scrollViewOptions = scrollViewOptions.el = self._scrollViewOptions.el = $element = self.$element = element = null;
  });

  $timeout(function() {
    scrollView && scrollView.run && scrollView.run();
  });

  self.getScrollView = function() {
    return scrollView;
  };

  self.getScrollPosition = function() {
    return scrollView.getValues();
  };

  self.resize = function() {
    return $timeout(resize, 0, false).then(function() {
      $element && $element.triggerHandler('scroll-resize');
    });
  };

  self.scrollTop = function(shouldAnimate) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      scrollView.scrollTo(0, 0, !!shouldAnimate);
    });
  };

  self.scrollBottom = function(shouldAnimate) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      var max = scrollView.getScrollMax();
      scrollView.scrollTo(max.left, max.top, !!shouldAnimate);
    });
  };

  self.scrollTo = function(left, top, shouldAnimate) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      scrollView.scrollTo(left, top, !!shouldAnimate);
    });
  };

  self.zoomTo = function(zoom, shouldAnimate, originLeft, originTop) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      scrollView.zoomTo(zoom, !!shouldAnimate, originLeft, originTop);
    });
  };

  self.zoomBy = function(zoom, shouldAnimate, originLeft, originTop) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      scrollView.zoomBy(zoom, !!shouldAnimate, originLeft, originTop);
    });
  };

  self.scrollBy = function(left, top, shouldAnimate) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      scrollView.scrollBy(left, top, !!shouldAnimate);
    });
  };

  self.anchorScroll = function(shouldAnimate) {
    self.resize().then(function() {
      if (!scrollView) {
        return;
      }
      var hash = $location.hash();
      var elm = hash && $document[0].getElementById(hash);
      if (!(hash && elm)) {
        scrollView.scrollTo(0, 0, !!shouldAnimate);
        return;
      }
      var curElm = elm;
      var scrollLeft = 0, scrollTop = 0;
      do {
        if (curElm !== null) scrollLeft += curElm.offsetLeft;
        if (curElm !== null) scrollTop += curElm.offsetTop;
        curElm = curElm.offsetParent;
      } while (curElm.attributes != self.element.attributes && curElm.offsetParent);
      scrollView.scrollTo(scrollLeft, scrollTop, !!shouldAnimate);
    });
  };

  self.freezeScroll = scrollView.freeze;
  self.freezeScrollShut = scrollView.freezeShut;

  self.freezeAllScrolls = function(shouldFreeze) {
    for (var i = 0; i < $ionicScrollDelegate._instances.length; i++) {
      $ionicScrollDelegate._instances[i].freezeScroll(shouldFreeze);
    }
  };


  /**
   * @private
   */
  self._setRefresher = function(refresherScope, refresherElement, refresherMethods) {
    self.refresher = refresherElement;
    var refresherHeight = self.refresher.clientHeight || 60;
    scrollView.activatePullToRefresh(
      refresherHeight,
      refresherMethods
    );
  };

};
