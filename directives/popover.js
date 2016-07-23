angular.module('myApp').directive('popover', [function () {
  return {
    restrict: 'E',
    templateURL: './html/popover.html',
    compile: function ($element, $attrs) {
      return function ($scope, $element, $attrs) {
        return;
      };
    },
  };
});
