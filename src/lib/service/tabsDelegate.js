/**
 * @ngdoc service
 * @name $ionicTabsDelegate
 * @module meteoric
 *
 * @description
 * Delegate for controlling the {@link meteoric.directive:ionTabs} directive.
 *
 * Methods called directly on the $ionicTabsDelegate service will control all ionTabs
 * directives. Use the {@link meteoric.service:$ionicTabsDelegate#$getByHandle $getByHandle}
 * method to control specific ionTabs instances.
 */
class ionicTabsDelegate extends meteoric.lib.Delegate {
  constructor() {
    let methods = [
      /**
       * @ngdoc method
       * @name $ionicTabsDelegate#select
       * @description Select the tab matching the given index.
       *
       * @param {number} index Index of the tab to select.
       */
      'select',
      /**
       * @ngdoc method
       * @name $ionicTabsDelegate#selectedIndex
       * @returns `number` The index of the selected tab, or -1.
       */
      'selectedIndex',
      /**
       * @ngdoc method
       * @name $ionicTabsDelegate#showBar
       * @description
       * Set/get whether the {@link meteoric.directive:ionTabs} is shown
       * @param {boolean} show Whether to show the bar.
       * @returns {boolean} Whether the bar is shown.
       */
      'showBar'
    ];

    super();
    this.addMethods(methods);
  }
}

$ionicTabsDelegate = new ionicTabsDelegate();
