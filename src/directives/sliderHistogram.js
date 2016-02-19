angular.module('angular-slider-histogram').directive('sliderHistogram', function(){
    return {
        restrict: 'E',
        scope: {
            slider: '='
        },
        controller: function($scope, $element){
            $scope.chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: $element.find(".slider-histogram"),
                    animation: false
                },
                exporting: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        groupPadding: 0,
                        shadow: false
                    }
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    }
                }
            });
        },
        link: function(scope, element){

        },
        templateUrl: '../src/directives/templates/sliderHistogram.html'
    }
});