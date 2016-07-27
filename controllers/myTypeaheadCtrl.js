angular.module('myApp').controller('typeaheadCtrl', function ($scope, $uibModal) {
    //  what is this for? anything?
    $scope.selected = undefined;

    $scope.contracts = [
<<<<<<< 5e0c64f6fb51f1f131535a3f1a0b7db7adb6d91c
        {name = 'contract a', fields: {derp: 'yar yar', whu: 'haaaay'}}, 
        {name = 'contract b', fields: {derp: 'nar nar', whu: 'aaaay'}}, 
        {name = 'contract c', fields: {derp: 'car car', whu: 'saaaay'}}
=======
        {name: 'contract a', fields: {derp: 'yar yar', whu: 'haaaay'}},
        {name: 'contract b', fields: {derp: 'nar nar', whu: 'aaaay'}},
        {name: 'contract c', fields: {derp: 'car car', whu: 'saaaay'}}
>>>>>>> moved code to server
    ];

    //  this function is typeahead-ctrl 'on select' function

    $scope.openTemplate = function ($item, $model, $label) {
        console.log('template modifier modal opens....');
    };
})
