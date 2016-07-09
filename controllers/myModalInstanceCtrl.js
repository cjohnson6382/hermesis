angular.module('myApp').controller('myModalInstanceCtrl', function ($scope, $uibModalInstance) {
	$scope.done = function () {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('drop', false, true);
        document.dispatchEvent(evt);
		$uibModalInstance.close("bye bye");
	};
	
	$scope.save = function (files) {
        //  disable the 'done' button
        var fun = function (response) {
          //  when background returns 'stored', activate the 'done' button
          URL.revokeObjectURL(objURL);
          console.log(response);
        };
        
        for (i = 0; i < files.length; i++) {
            objURL = URL.createObjectURL(files[i]);
            chrome.extension.sendMessage({cmd : "storetemplate", file : objURL, filename : files[i].name}, fun);
        }
    };
});