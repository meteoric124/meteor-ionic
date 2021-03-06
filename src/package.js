Package.describe({
  name: "meteoric124:meteoric",
  summary: "Ionic components for Meteor. No Angular!",
  version: "1.2.4-beta.22",
  git: "https://github.com/JoeyAndres/meteor-ionic.git",
  documentation: "../README.md"
});

Cordova.depends({
  'ionic-plugin-keyboard': '1.0.9'
});

Package.onUse(function(api) {
  api.versionsFrom("1.3.2.4");

  api.use([
    'ecmascript'
  ]);

  api.use([
    'seba:minifiers-autoprefixer@1.0.1',
    "fourseven:scss@3.4.3",
    "meteoric124:meteoric-sass@1.2.8",
    "iron:router@1.0.0"
  ]);
  api.imply([
    'seba:minifiers-autoprefixer@1.0.1',
    "fourseven:scss@3.4.3",
    "meteoric124:meteoric-sass@1.2.8"
  ]);

  api.use([
    "jandres:template-extension@4.0.7-alpha3",

    "meteoric124:template-scope@0.1.0-beta.8",
    "meteoric124:template-attribute-directive@0.1.0-beta.5",
    "meteoric124:template-assert-parent@0.1.0-alpha.1",

    "templating",
    "underscore",
    "reactive-var",
    "tracker",
    "session",
    "promise",
    'jquery'
  ], "client");

  api.addFiles([
    "styles/main.scss"
  ], "client");

  api.addFiles([
      "sanity-check.js"
  ]);

  api.addFiles([
    "lib/meteoric.js",
    "lib/delegate.js",
    "lib/utility.js",
    "lib/polyfill.js",
    "lib/platform.js",

    // Utils
    'lib/utils/delegateService.js',
    'lib/utils/dom.js',
    'lib/utils/events.js',
    'lib/utils/gestures.js',
    'lib/utils/platform.js',
    'lib/utils/poly.js',
    'lib/utils/tap.js',
    'lib/utils/activator.js',
    'lib/utils/utils.js',
    'lib/utils/keyboard.js',
    'lib/utils/viewport.js',

    // Views
    'lib/views/view.js',
    'lib/views/scrollView.js',
    'lib/views/scrollViewNative.js',
    'lib/views/listView.js',
    'lib/views/modalView.js',
    'lib/views/sideMenuView.js',
    'lib/views/sliderView.js',
    'lib/views/slidesView.js',
    'lib/views/toggleView.js',

    // Controller.
    'lib/controller/headerBarController.js',
    'lib/controller/infiniteScrollController.js',
    'lib/controller/navBarController.js',
    'lib/controller/navViewController.js',
    'lib/controller/listController.js',
    'lib/controller/sideMenuController.js',
    'lib/controller/spinnerController.js',
    'lib/controller/scrollController.js',
    'lib/controller/viewController.js',
    'lib/controller/tabController.js',
    'lib/controller/tabsController.js',

    // Service.
    'lib/service/body.js',
    'lib/service/clickBlock.js',
    'lib/service/gesture.js',
    'lib/service/ionicConfig.js',
    'lib/service/platform.js',
    'lib/service/viewSwitcher.js',
    'lib/service/history.js',
    'lib/service/navBarDelegate.js',
    'lib/service/navViewDelegate.js',
    'lib/service/scrollDelegate.js',
    'lib/service/sideMenuDelegate.js',
    'lib/service/tabsDelegate.js',

    'lib/service/decorators/location.js',

    'lib/meteoric-config.js',

    "components/ionApp/ionApp.html",

    "components/ionActionSheet/ionActionSheet.html",
    "components/ionActionSheet/ionActionSheet.js",

    "components/ionBackdrop/ionBackdrop.html",
    "components/ionBackdrop/ionBackdrop.js",

    "components/ionCheckbox/ionCheckbox.html",
    "components/ionCheckbox/ionCheckbox.js",

    "components/ionContent/ionContent.html",
    "components/ionContent/ionContent.js",

    "components/ionDeleteButton/ionDeleteButton.html",
    "components/ionDeleteButton/ionDeleteButton.js",

    "components/ionFooterBar/ionFooterBar.html",
    "components/ionFooterBar/ionFooterBar.js",

    "components/ionHeaderBar/ionHeaderBar.html",
    "components/ionHeaderBar/ionHeaderBar.js",

    "components/ionInfiniteScroll/ionInfiniteScroll.html",
    "components/ionInfiniteScroll/ionInfiniteScroll.js",

    "components/ionItem/ionItem.html",
    "components/ionItem/ionItem.js",

    "components/ionList/ionList.html",
    "components/ionList/ionList.js",

    "components/ionLoading/ionLoading.html",
    "components/ionLoading/ionLoading.js",

    "components/ionModal/ionModal.html",
    "components/ionModal/ionModal.js",

    "components/ionNavBar/ionNavBar.html",
    "components/ionNavBar/ionNavBar.js",

    "components/ionOptionButton/ionOptionButton.html",
    "components/ionOptionButton/ionOptionButton.js",

    "components/ionNavBackButton/ionNavBackButton.html",
    "components/ionNavBackButton/ionNavBackButton.js",

    "components/ionNavButtons/ionNavButtons.html",
    "components/ionNavButtons/ionNavButtons.js",

    "components/ionNavTitle/ionNavTitle.html",
    "components/ionNavTitle/ionNavTitle.js",

    "components/exposeAsideWhen/exposeAsideWhen.js",
    "components/ionGesture/ionGesture.js",
    "components/menuClose/menuClose.js",
    "components/menuToggle/menuToggle.js",
    "components/navDirection/navDirection.js",
    "components/navTransition/navTransition.js",
    "components/ionKeyboard/keyboardAttach.js",

    "components/ionNavView/ionNavView.html",
    "components/ionNavView/ionNavView.js",

    "components/ionPane/ionPane.html",
    "components/ionPane/ionPane.js",

    "components/ionPopover/ionPopover.html",
    "components/ionPopover/ionPopover.js",

    "components/ionPopup/ionPopup.html",
    "components/ionPopup/ionPopup.js",

    "components/ionRadio/ionRadio.html",
    "components/ionRadio/ionRadio.js",

    "components/ionReorderButton/ionReorderButton.html",
    "components/ionReorderButton/ionReorderButton.js",

    "components/ionScroll/ionScroll.html",
    "components/ionScroll/ionScroll.js",

    "components/ionSideMenu/ionSideMenu.html",
    "components/ionSideMenu/ionSideMenu.js",

    "components/ionSideMenuContent/ionSideMenuContent.html",
    "components/ionSideMenuContent/ionSideMenuContent.js",

    "components/ionSideMenus/ionSideMenus.html",
    "components/ionSideMenus/ionSideMenus.js",

    "components/ionSpinner/ionSpinner.html",
    "components/ionSpinner/ionSpinner.js",

    "components/ionSlides/ionSlides.html",
    "components/ionSlides/ionSlides.js",

    "components/ionTabs/ionTabs.html",
    "components/ionTabs/ionTabs.js",

    "components/ionTabNav/ionTabNav.html",
    "components/ionTabNav/ionTabNav.js",

    "components/ionTab/ionTab.html",
    "components/ionTab/ionTab.js",

    "components/ionToggle/ionToggle.html",
    "components/ionToggle/ionToggle.js",

    "components/ionView/ionView.html",
    "components/ionView/ionView.js"

  ], "client");

  api.export([
    // Services.
    '$ionicGesture',
    '$ionicActionSheet',
    '$ionicBackdrop',
    '$ionicLoading',
    '$ionModal',
    '$ionicPlatform',
    '$ionicHistory',
    '$ionicPopup',
    '$ionicPopover',

    // ionic Delegates.
    '$ionicScrollDelegate',
    '$ionicSideMenuDelegate',
    '$ionicTabsDelegate'

    // Misc.
    // todo: export $ionicGoBack
    // todo: make 'meteoric' namespace not implicitly global. (i.e. window.meteoric).
  ], 'client');
});

Npm.depends({
  keycode: "2.1.1"
});