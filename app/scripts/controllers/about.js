'use strict';

/**
 * @ngdoc function
 * @name zipsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the zipsApp
 */
angular.module('zipsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
