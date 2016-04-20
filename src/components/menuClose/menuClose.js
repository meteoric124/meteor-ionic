/**
 * @ngdoc directive
 * @name menuClose
 * @module meteoric
 * @restrict AC
 *
 * @description
 * `menu-close` is an attribute directive that closes a currently opened side menu.
 * Note that by default, navigation transitions will not animate between views when
 * the menu is open. Additionally, this directive will reset the entering view's
 * history stack, making the new page the root of the history stack. This is done
 * to replicate the user experience seen in most side menu implementations, which is
 * to not show the back button at the root of the stack and show only the
 * menu button. We recommend that you also use the `enable-menu-with-back-views="false"`
 * {@link meteoric.directive:ionSideMenus} attribute when using the menuClose directive.
 *
 * @usage
 * Below is an example of a link within a side menu. Tapping this link would
 * automatically close the currently opened menu.
 *
 * ```html
 * <a menu-close href="{{pathFor route='Home'}}" class="item">Home</a>
 * ```
 *
 * Note that if your destination state uses a resolve and that resolve asynchronously
 * takes longer than a standard transition (300ms), you'll need to set the
 * `nextViewOptions` manually as your resolve completes.
 *
 * ```js
 * $ionicHistory.nextViewOptions({
 *  historyRoot: true,
 *  disableAnimate: true,
 *  expire: 300
 * });
 * ```
 */

import { TemplateAttributeDirectiveType } from 'meteor/jandres:template-attribute-directive';

let menuClose = new TemplateAttributeDirectiveType('menuClose', {
    $postLink($scope, $element, $attr) {
        let self = this;

        let clickHandler = function() { 
            $element = jqLite(this);
            var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
            if (sideMenuCtrl) {
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableAnimate: true,
                    expire: 300
                });
                // if no transition in 300ms, reset nextViewOptions
                // the expire should take care of it, but will be cancelled in some
                // cases. This directive is an exception to the rules of history.js
                $timeout(function () {
                    $ionicHistory.nextViewOptions({
                        historyRoot: false,
                        disableAnimate: false
                    });
                }, 300);
                sideMenuCtrl.close();
            }
        };

        $('body').on('click', this.$elementSelector(), clickHandler);
        $scope.$on('$destroy', function() { $('body').off('click', self.$elementSelector(), clickHandler); });
    }
});

export { menuClose };