angular.
  module('myApp')
  .component('textInput', {
    bindings: {
        ngModel:'=',
        regexp: '@',
        regexpErrorMessage: '@',
        placeholder: '@',
        type: '@',
        required: '=',
        minLength: '=',
        whitelist: '=',
        whitelistErrorMessage: '@',
        blacklist: '=',
        blacklistErrorMessage: '@',
    },
    templateUrl: 'components/text-input/text-input.template.html',
    controller: [
      function TextInputController() {
        // console.log(this);
      }
    ]
  })
  .directive('validator', [function () {
    return {
        require: 'ngModel',
        link: function ($scope, $elm, $attrs, ngModel) {
            // console.log($scope, ngModel);
            ngModel.$validators.blacklist = (value) => $scope.$ctrl.blacklist ? ( $scope.$ctrl.blacklist.indexOf(value) < 0 ) : true;
            ngModel.$validators.whitelist = (value) => $scope.$ctrl.whitelist ? ( $scope.$ctrl.whitelist.indexOf(value) >= 0 ) : true;
            ngModel.$validators.required = (value) => $scope.$ctrl.required ? ( !!value ) : true;
            ngModel.$validators.minLength = (value) => $scope.$ctrl.minLength ? ( value && value.length > $scope.$ctrl.minLength ) : true;
            ngModel.$validators.pattern = (value) => $scope.$ctrl.regexp ? ( new RegExp($scope.$ctrl.regexp).test(value) ) : true;
        }
    };
}]);
