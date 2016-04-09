/**
 * @ngdoc directive
 * @name ionHeaderBar
 * @module meteoric
 * @restrict E
 *
 * @description
 * Adds a fixed header bar above some content.
 *
 * Can also be a subheader (lower down) if the 'bar-subheader' class is applied.
 * See [the header CSS docs](/docs/components/#subheader).
 *
 * @param {string=} align-title How to align the title. By default the title
 * will be aligned the same as how the platform aligns its titles (iOS centers
 * titles, Android aligns them left).
 * Available: 'left', 'right', or 'center'.  Defaults to the same as the platform.
 * @param {boolean=} no-tap-scroll By default, the header bar will scroll the
 * content to the top when tapped.  Set no-tap-scroll to true to disable this
 * behavior.
 * Available: true or false.  Defaults to false.
 *
 * @usage
 * ```html
 * <ion-header-bar align-title="left" class="bar-positive">
 *   <div class="buttons">
 *     <button class="button" ng-click="doSomething()">Left Button</button>
 *   </div>
 *   <h1 class="title">Title!</h1>
 *   <div class="buttons">
 *     <button class="button">Right Button</button>
 *   </div>
 * </ion-header-bar>
 * <ion-content>
 *   Some content!
 * </ion-content>
 * ```
 */
Template.ionHeaderBar.onCreated(function() {
    this.alignTitle = this.data? this.data.alignTitle : null;
    this.class = new ReactiveVar('');
    this.hide = new ReactiveVar(false);

    this.autorun(() => {
        let td = Template.currentData();
        if (!td) return;

        this.class.set(td.class ? td.class : '');
    });
});

Template.ionHeaderBar.onRendered(function () {
    let isHeader = true;
    headerFooterBarDirective.call(this, isHeader);
});