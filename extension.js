angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);

$('html').attr('ng-controller', 'mainCtrl');

try {
    angular.bootstrap(document.html, ['myApp']);
} catch (ex) {
    console.log("error bootstrapping");
    console.log(ex.toString());
}
