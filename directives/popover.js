<<<<<<< 5e0c64f6fb51f1f131535a3f1a0b7db7adb6d91c
angular.module('myApp').directive('popover', [function () {
  return {
    restrict: 'E',
    templateURL: './html/popover.html',
    compile: function ($element, $attrs) {
      return function ($scope, $element, $attrs) {
=======
angular.module('myApp').directive('popover', ['$uibModal', function ($uibModal) {
  return {
    restrict: 'E',
    templateURL: chrome.extension.getURL('html/popover.html'),
    //  templateURL: 'html/popover.html',
    compile: function ($element, $attrs) {
      return function ($scope, $element, $attrs) {
        $scope.contracts = [
          {name: 'contract a', fields: {derp: 'yar yar', whu: 'haaaay'}},
          {name: 'contract b', fields: {derp: 'nar nar', whu: 'aaaay'}},
          {name: 'contract c', fields: {derp: 'car car', whu: 'saaaay'}}
        ];

        $scope.selected = '';
        
        $scope.openTemplate = function ($item, $model, $label) {
            console.log('template modifier modal opens....');
        };
>>>>>>> moved code to server
        return;
      };
    },
  };
<<<<<<< 5e0c64f6fb51f1f131535a3f1a0b7db7adb6d91c
});
=======
}]);
>>>>>>> moved code to server
