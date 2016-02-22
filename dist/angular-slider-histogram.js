const angularSliderHistogram = angular.module('angular-slider-histogram', ['rzModule']);
angular.module('angular-slider-histogram').directive('sliderHistogram', function(){
    return {
        restrict: 'E',
        scope: {
            slider: '=',
            series: '=',
            bucketCount: '=?'
        },
        controller: function($scope, $element){
            // Default buckets to 25
            $scope.bucketCount = $scope.bucketCount || 25;
        },
        link: function(scope, element){
            scope.$watch("slider.minValue", function(newVal, oldVal){
                if( scope.chart && typeof newVal == "number" && typeof oldVal == "number"){
                    paintBuckets(scope.slider.minValue, scope.slider.maxValue);
                }
            });
            scope.$watch("slider.maxValue", function(newVal, oldVal){
                if( scope.chart && typeof newVal == "number" && typeof oldVal == "number"){
                    paintBuckets(scope.slider.minValue, scope.slider.maxValue);
                }
            });
            scope.chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: element.find(".slider-histogram").get(0),
                    animation: false,
                    spacingLeft: 0,
                    spacingRight: 0,
                    height: element.parent().height(),
                    width: element.parent().width()
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
                series: [{
                    data: groupData(scope.series),
                    color: 'lightgrey'
                }],
                title: {
                    text: null
                },
                xAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    visible: false
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    gridLineWidth: 0,
                    labels: {
                        enabled: false
                    },
                    visible: false
                }
            });

            function paintBuckets(fromBucket, toBucket){
                const bucketInterval = scope.slider.options.ceil / scope.bucketCount;
                const fromData = parseInt(fromBucket/bucketInterval) - 1;
                const toData = parseInt(toBucket/bucketInterval) - 1;
                $.each(scope.chart.series[0].data, function(index, datum){
                    if( index >= fromData && index <= toData) {
                        datum.update({
                            color: 'lightgrey'
                        });
                    }
                    else{
                        datum.update({
                            color: '#ededed'
                        });
                    }
                });
            }

            function groupData(data){
                var buckets =  Array.apply(null, Array(scope.bucketCount)).map(Number.prototype.valueOf,0);
                $.each(data, function(index, point){
                    buckets[parseInt(point / (scope.slider.options.ceil / scope.bucketCount))]++;
                });
                return buckets;
            }

            element.find(".rz-bubble").css("top", "18px");
        },
        templateUrl: '../src/directives/templates/sliderHistogram.html'
    }
});
angular.module("angular-slider-histogram").run(["$templateCache", function($templateCache) {$templateCache.put("directives/templates/sliderHistogram.html","<div style=\"position:relative;width:100%;height:100%\">\r\n    <div style=\"position:absolute;width:100%;bottom:0;z-index:1;\">\r\n        <rzslider rz-slider-model=\"slider.minValue\" rz-slider-high=\"slider.maxValue\" rz-slider-options=\"slider.options\">\r\n        </rzslider>\r\n    </div>\r\n    <div style=\"position:absolute\">\r\n        <div class=\"slider-histogram\" style=\"width:100%;height:100%\"></div>\r\n    </div>\r\n</div>");}]);