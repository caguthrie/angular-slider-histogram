const sliderDemo = angular.module('slider-demo', ['angular-slider-histogram'])

.controller('demoCtrl', function($scope, $element, $http){
    $scope.slider = {
        minValue: 20,
        maxValue: 50,
        options: {
            floor: 0,
            ceil: 100
        }
    };

    $http.get("demoData.json").then(function(data){
        $scope.series = _.map(data.data, function(point){
            return parseFloat(point.value);
        });
        $scope.ready = true;
    });
});