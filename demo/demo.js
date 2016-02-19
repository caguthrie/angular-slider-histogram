const sliderDemo = angular.module('slider-demo', ['angular-slider-histogram'])

.controller('demoCtrl', function($scope, $element){
    $scope.slider = {
        minValue: 20,
        maxValue: 80,
        options: {
            floor: 0,
            ceil: 100
        }
    };
});