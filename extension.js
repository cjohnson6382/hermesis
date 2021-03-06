<<<<<<< 5e0c64f6fb51f1f131535a3f1a0b7db7adb6d91c
angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);

$('html').attr('ng-controller', 'mainCtrl');

try {
    angular.bootstrap(document.html, ['myApp']);
} catch (ex) {
    console.log("error bootstrapping");
    console.log(ex.toString());
}
=======
class ViewStore {
  constructor () {
    var idCounter = 0;
    var viewTable = {};
  }
  
  newId () {
    return idCounter++;
  }
  
  setView (id, composeView) {
    viewTable[id] = composeView;
    return id;
  }
}

var dataURLtoBlob = function (fileresource, mimeType, callback) {
  var arr = fileresource.file.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  blob = new Blob([ u8arr ], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = fileresource.name;
  callback(blob);
};

angular.module('myApp', ['ngAnimate', 'ui.bootstrap'])
  .controller('mainCtrl', [function () {
    //  $scope.contracts = chrome.extensions.sendMessage({cmd: 'getcontractnames'});
  }])
  .controller('myTemplateModifierInstanceCtrl', function ($scope, $uibModalInstance, templatefields, contract, composeview) {
    $scope.fieldList = Object.keys(templatefields);
    $scope.templatefields = templatefields;
  
    $scope.done = function () {
  
      //
      console.log("templatefields: ", templatefields);
      //
      
      chrome.extension.sendMessage({
        cmd : "fillintemplate",
        template: contract,
        fields: $scope.templatefields
      }, function (resp) {
        dataURLtoBlob(resp, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', function (blob) {
          ViewStore[composeView].attachFiles([blob]);
          $uibModalInstance.close('closing the modal after attaching a file');
        });
      });
    };
  
    $scope.cancel = function () { $uibModalInstance.dismiss('cancel') };
  })
  .directive('popover', ['$uibModal', '$sce', 'ContractsService', function ($uibModal, $sce, ContractsService) {
    console.log('in popover directive');
    return {
      restrict: 'E',
      scope: {composeView: '='},
      templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('html/popover.html')),
      compile: function ($element, $attrs) {
        return function ($scope, $element, $attrs) {
          ContractsService.get().then(function (resp) {
            $scope.contracts = resp;
          });
  
          $scope.selected = '';
          
          $scope.openTemplate = function ($item, $model, $label) {
            var modalInstance = $uibModal.open({
              templateUrl: 'html/templateModifier.html',
              controller: 'templateModifier',
              windowClass: 'app-modal-window',
              keyword: true,
              resolve: {
                templatefields: function () {return $item.fields},
                contract: function () {return $item.name},
                composeview: function () {return $scope.composeView}
              }
            });
          };
          console.log('template modifier modal opens....');
        };
      },
    };
  }])
  .factory('ContractsService', ['$q', function ($q) {
    var fetchContracts = function (callback) {
      chrome.extension.sendMessage({cmd: 'fetchcontracts'}, function (resp) {
        callback(resp);
      });
    };
    
    var contracts;
    fetchContracts(function (resp) {
      contracts = resp;
    });
    
    return {
      //  returns a promise!
      get: function () {
        var deferred = $q.defer();
        fetchContracts(function (resp) {
          deferred.resolve(resp);
        });
        return deferred.promise;
      },
      update: function () {
        fetchContracts(function (resp) {
          contracts = resp;
          return contracts;
        });
      }
    };
  }]);


$('html').attr('ng-controller', 'mainCtrl');
InboxSDK.load('1.0', 'sdk_APPLEFAPPLE_98d35548c0')
  .then(function (sdk) {
    sdk.Compose.registerComposeViewHandler(function (composeView) {
      composeView.on('destroy', function (event) {
        console.log('attached files has been destroyed', event);
      });
      composeView.addButton({
        title: "Compose Contract",
        hasDropdown: true,
        iconUrl: chrome.extension.getURL('resources/hermesis.ico'),
        type: 'MODIFIER',
        onClick: function (evt) {
          chrome.extension.sendMessage({cmd: 'auth'}, function (resp) {
            evt.dropdown.setPlacementOptions({
              position: "top",
              hAlign: "left",
            });
            evt.dropdown.el.innerHTML = '<popover compose-view=' + ViewStore(ViewStore.newId, composeView) + '></popover>';

            angular.element(document.body).injector().invoke(function ($compile) {
              var scope = angular.element($('popover')).scope();
              $compile($('popover'))(scope);
            });
          });
        }
      });
      return;
    });
  })
  .then(function () {
    try {
        if(!angular.element($('html')).injector()) {
          angular.bootstrap(document.body, ['myApp']);
        }
      } catch (ex) {
        console.log("error bootstrapping", ex.toString());
      }
  });
>>>>>>> moved code to server
